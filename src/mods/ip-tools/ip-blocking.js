class IPBlockList {

    #data = null;

    LOCAL_STORAGE_ID = "IP_BLOCK_LIST";
    DEFAULT_STORAGE_VALUE = "{}";

    async #get() {

        if (this.#data) {
            return this.#data;
        }

        let blockQuery = {[this.LOCAL_STORAGE_ID]: this.DEFAULT_STORAGE_VALUE};
        this.#data = JSON.parse((await chrome.storage.local.get(blockQuery))[this.LOCAL_STORAGE_ID]);
        return this.#data;
    }

    async #set(data) {
        this.#data = data;
        let blockQuery = {[this.LOCAL_STORAGE_ID]: JSON.stringify(data)};
        await chrome.storage.local.set(blockQuery);
    }

    async add(address) {
        let data = await this.#get();
        if (!address) return;

        data[address] = BlockedIP.toData(
            Math.floor(Date.now() / 1000)
        );

        await this.#set(data);

    }

    async getList() {
        return await this.#get();
    }

    async clearList() {
        let data = {};
        await this.#set(data);
    }

    async remove(address) {
        let data = await this.#get();
        if (!data) return;

        try {
            delete data[address]
        } catch (ex) {
            // Silently fail
        }

        await this.#set(data);
    }

    async isBlocked(address) {
        let data = await this.#get();
        return Boolean(data[address]);
    }

    async isEmpty() {
        return Object.keys(await this.#get()).length < 1;
    }

    async mergeWith(otherList) {
        let data = await this.#get();
        if (!data) return -1;

        let added = [];
        for (const [key, value] of Object.entries(otherList)) {

            if (data[key] !== undefined) {
                continue;
            }

            data[key] = value;
            added.push(key);

        }

        await this.#set(data);
        return added;
    }
}

class BlockedIP {

    #address;
    #timestamp;

    constructor(address, timestamp) {
        this.#address = address;
        this.#timestamp = timestamp;
    }

    static fromData(address, data = {}) {
        address = address.trim();

        // Check address
        if (typeof isValidIP !== 'function' || !isValidIP(address)) {
            console.warn(`isValidIP function not available or invalid IP: ${address}`);
            // Assuming isValidIP is a global helper function. If not, this check needs implementation.
        }

        // Validate timestamp
        if (typeof isNumeric !== 'function' || !isNumeric(data?.timestamp?.toString()) || data?.timestamp > Math.floor(Date.now() / 1000)) {
             // Assuming isNumeric is a global helper function.
            return null;
        }

        return new BlockedIP(address, data.timestamp);
    }

    static toData(timestamp) {
        return {
            timestamp: timestamp
        }
    }

    toData() {
        return BlockedIP.toData(this.#timestamp);
    }
}


class IPBlockAPI {

    #blockList = new IPBlockList();

    /**
     * MODIFIED: This function now ONLY checks if an address is blocked.
     * It no longer triggers a skip action. This prevents double-skips.
     * @param {string} address The IP address to check.
     * @returns {Promise<boolean>} True if the address is blocked, false otherwise.
     */
    async isAddressBlocked(address) {
        return await this.#blockList.isBlocked(address);
    }

    async unblockAddress(address, logInChat = true) {
        // Using a custom modal/UI for confirmation is better than window.confirm
        if (!confirm(`Are you sure you want to unblock ${address}?`)) {
            return false;
        }

        if (!await this.#blockList.isBlocked(address)) {
            alert(`The IP address ${address} is not blocked!`);
            return false;
        }

        await this.#blockList.remove(address);
        Logger.INFO("Unblocked IP address <%s> in video chat", address);

        if (logInChat) {
            sendErrorLogboxMessage(`Unblocked the IP address ${address}.`);
        }

        document.getElementById("ipUnblockButton")?.replaceWith(
            ButtonFactory.ipBlockButton(address)
        );

        return true;
    }

    async blockAddress(address) {
        if (!confirm(`Are you sure you want to block ${address}?`)) {
            return false;
        }

        if (await this.#blockList.isBlocked(address)) {
            alert(`The IP address ${address} is already blocked!`);
            return true;
        }

        await this.#blockList.add(address);
        Logger.INFO("Blocked IP address <%s> in video chat", address);

        if (typeof ChatRegistry !== 'undefined' && ChatRegistry.isChatting()) {
            // UPDATED: Call the centralized intelligent skip manager.
            IPBlockingManager.triggerIntelligentSkip();
            sendErrorLogboxMessage(`Blocked ${address} and skipped chat.`);
        } else {
            sendErrorLogboxMessage(`Blocked the IP address ${address}.`);
        }

        document.getElementById("ipBlockButton")?.replaceWith(
            ButtonFactory.ipUnblockButton(address)
        );

        return true;
    }

    async retrieveBlockConfig() {
        return await this.#blockList.getList();
    }

    async clearBlockConfig(noChange) {
        if (noChange) return false;

        if (!confirm(`Are you sure you want to unblock all IP addresses?`)) {
            return false;
        }

        await this.#blockList.clearList();
        Logger.INFO("Unblocked all IP addresses in video chat");
    }

    async blockListIsEmpty() {
        return await this.#blockList.isEmpty();
    }

    async bulkAddBlockList(blockList) {
        return await this.#blockList.mergeWith(blockList);
    }
}

class IPBlockingMenu {

    ROWS_PER_PAGE = 10;
    settingsModal = null;
    elementId = "modal-2";
    #page = null;
    #pages = null;
    #maxPage = () => this.#page >= this.#pages;
    #minPage = () => this.#page <= 1;

    constructor() {
        this.settingsModal = document.createElement("div");
        $(this.settingsModal).load(getResourceURL("public/html/blocked.html"));
        $("html").append(this.settingsModal);
    }

    async createTable(page) {
        let config = await IPBlockingManager.API.retrieveBlockConfig();
        let rowsHTML = Object.keys(config).length > 0
            ? this.#genTableRows(config, page).join("\n")
            : this.#genEmptyTableRow();

        return $(`
            <table class="ipListTable">
                <colgroup>
                   <col span="1" style="width: 25%;">
                   <col span="1" style="width: 50%;">
                   <col span="1" style="width: 25%;">
                </colgroup>
                <thead>
                    <tr>
                        <th>IP Address</th>
                        <th>Date Blocked</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="ipListTableBody">${rowsHTML}</tbody>
            </table>
        `).get(0);
    }

    #genEmptyTableRow() {
        this.#page = 0;
        this.#pages = 0;
        this.updatePaginator();
        return `<tr><td></td><td>You are not currently blocking anyone...</td><td/></tr>`;
    }

    #getConfigEntries(config, page) {
        this.#page = page = Math.max(page, 1);
        let sorted = Object.entries(config).sort((a, b) => b[1].timestamp - a[1].timestamp);
        this.#pages = Math.ceil(sorted.length / this.ROWS_PER_PAGE) || 1;
        this.#page = page = Math.min(this.#pages, page);

        let startIndex = (page - 1) * this.ROWS_PER_PAGE;
        let endIndex = startIndex + this.ROWS_PER_PAGE;
        let slice = sorted.slice(startIndex, endIndex);

        this.updatePaginator();
        return slice;
    }

    updatePaginator() {
        let nextPage = document.getElementById("nextIpPageButton");
        let previousPage = document.getElementById("previousIpPageButton");
        let pageCount = document.getElementById("ipPage");
        
        if (!nextPage || !previousPage || !pageCount) return;

        nextPage.classList.toggle("disabled", this.#maxPage());
        previousPage.classList.toggle("disabled", this.#minPage());
        pageCount.innerText = this.#pages > 0 ? `${this.#page}/${this.#pages}` : 'N/A';
    }

    nextPage() {
        if (!this.#maxPage()) this.setPage(this.#page + 1);
    }

    previousPage() {
        if (!this.#minPage()) this.setPage(this.#page - 1);
    }

    #genTableRows(config, page) {
        return this.#getConfigEntries(config, page).map(([address, data]) => `
            <tr>
                <td>${address || " "}</td>
                <td>${data ? new Date(data.timestamp * 1000).toLocaleString() : ""}</td>
                <td>${data ? `<button class="ipUnblockMenuButton" value="${address}">Unblock</button>` : ""}</td>
            </tr>
        `);
    }

    enable(noChange) {
        if (noChange) return;
        if (typeof Settings !== 'undefined') Settings.disable();
        this.genTable(1);
    }

    replaceTable(table) {
        let anchor = document.getElementById("blockedListDiv");
        if (anchor) {
            $(anchor).empty().append(table);
        }
    }

    genTable(page = 1) {
        this.createTable(page).then((table) => {
            this.replaceTable(table);
            if (typeof MicroModal !== 'undefined') MicroModal.show(this.elementId);
        });
    }

    setPage(page) {
        this.createTable(page).then(table => this.replaceTable(table));
    }

    disable() {
        if (typeof MicroModal !== 'undefined') MicroModal.hide(this.elementId);
    }
}

class IPBlockingManager extends Module {
    // --- NEW: Centralized static properties for the Intelligent Skip Manager ---
    static skipDelay = 2000; // 2-second delay between skips.
    static lastSkipTime = 0;
    static skipTimeoutId = null;

    static MENU = new IPBlockingMenu();
    static API = new IPBlockAPI();

    #menu = IPBlockingManager.MENU;
    #api = IPBlockingManager.API;

    constructor() {
        super();
        Logger.INFO("IPBlockingManager Loaded")
        this.addEventListener("click", this.onButtonClick);
    }
    
    /**
     * NEW: The method that physically finds and clicks the skip button.
     * This should be the ONLY place in the code that programmatically clicks this button.
     */
    static _performActualSkip() {
        // This selector might need to be adjusted for your specific website.
        const disconnectButton = document.querySelector('.disconnectbtn');
        if (disconnectButton) {
            Logger.INFO("Executing skip action.");
            disconnectButton.click();
        } else {
            Logger.WARN("Could not find the disconnect button to perform a skip.");
        }
    }

    /**
     * NEW: The core logic for the Intelligent Skip Manager.
     * Any part of the extension that needs to skip should call this function.
     */
    static triggerIntelligentSkip() {
        clearTimeout(IPBlockingManager.skipTimeoutId);

        const now = Date.now();
        const timeSinceLastSkip = now - IPBlockingManager.lastSkipTime;

        // If it's been longer than 'skipDelay', we can perform a "quick skip".
        if (timeSinceLastSkip >= IPBlockingManager.skipDelay) {
            Logger.INFO("Performing quick skip.");
            IPBlockingManager._performActualSkip();
            IPBlockingManager.lastSkipTime = now;
        } else {
            // Otherwise, we're in the cooldown period. Schedule the next skip.
            const delayNeeded = IPBlockingManager.skipDelay - timeSinceLastSkip;
            Logger.INFO(`In cooldown. Scheduling skip in ${delayNeeded}ms.`);
            IPBlockingManager.skipTimeoutId = setTimeout(() => {
                IPBlockingManager._performActualSkip();
                IPBlockingManager.lastSkipTime = Date.now();
            }, delayNeeded);
        }
    }

    async onButtonClick(event) {
        const target = event.target;
        if (!target) return;

        if (target.classList.contains("ipBlockButton")) {
            await this.onIpBlockButtonClick(event);
        } else if (target.classList.contains("ipUnblockButton")) {
            await this.onIpUnblockButtonClick(event, true);
        } else if (target.classList.contains("ipUnblockMenuButton")) {
            let unblocked = await this.onIpUnblockButtonClick(event, false);
            if (unblocked) await this.onIpUnblockMenuButtonClick();
        }

        switch (target.id) {
            case "importIpList": await this.onIpImportListButtonClick(); break;
            case "exportIpList": await this.onIpExportListButtonClick(); break;
            case "previousIpPageButton": this.#menu.previousPage(); break;
            case "nextIpPageButton": this.#menu.nextPage(); break;
        }
    }

    async onIpImportListButtonClick() {
        let json = prompt("Paste the JSON data to import:");
        let data;
        try {
            data = JSON.parse(json);
        } catch (ex) {
            alert("Invalid JSON submitted. No IP addresses were imported.");
            return;
        }
        if (!data) return;

        let sanitizedList = {};
        for (const [address, config] of Object.entries(data)) {
            let blockedIp = BlockedIP.fromData(address, config);
            if (blockedIp) {
                sanitizedList[address] = blockedIp.toData();
            }
        }

        let originalLength = Object.keys(data).length;
        let sanitizedLength = Object.keys(sanitizedList).length;
        let importedList = await this.#api.bulkAddBlockList(sanitizedList);
        let importedLength = importedList.length;
        let duplicates = sanitizedLength - importedLength;
        let invalid = originalLength - sanitizedLength;

        let message = `Imported ${importedLength} of ${originalLength} addresses. (${invalid} invalid, ${duplicates} duplicate(s)).`;
        alert(message);
        Logger.INFO(message);
        this.#menu.genTable(1);
    }

    async onIpExportListButtonClick() {
        let text = JSON.stringify(await this.#api.retrieveBlockConfig());
        const download = document.createElement("a");
        download.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
        download.download = `IP-List-${new Date().toDateString().replace(/ /g, '_')}.json`;
        download.click();
        download.remove();
        Logger.INFO("Exported IP address list as \"%s\"", download.download);
    }

    async onIpBlockButtonClick(event) {
        let blockValue = event.target.getAttribute("value");
        if (blockValue) await this.#api.blockAddress(blockValue);
    }

    async onIpUnblockButtonClick(event, logInChat) {
        let unblockValue = event.target.getAttribute("value");
        return unblockValue ? await this.#api.unblockAddress(unblockValue, logInChat) : false;
    }

    async onIpUnblockMenuButtonClick() {
        this.#menu.genTable(this.#menu._page || 1);
    }
}
