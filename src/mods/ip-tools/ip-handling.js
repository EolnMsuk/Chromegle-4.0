// A map to convert full country names to two-letter country codes.
const countryNameToCode = {
    "Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "American Samoa": "AS", "Andorra": "AD",
    "Angola": "AO", "Anguilla": "AI", "Antarctica": "AQ", "Antigua and Barbuda": "AG", "Argentina": "AR",
    "Armenia": "AM", "Aruba": "AW", "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ", "Bahamas": "BS",
    "Bahrain": "BH", "Bangladesh": "BD", "Barbados": "BB", "Belarus": "BY", "Belgium": "BE", "Belize": "BZ",
    "Benin": "BJ", "Bermuda": "BM", "Bhutan": "BT", "Bolivia": "BO", "Bosnia and Herzegovina": "BA",
    "Botswana": "BW", "Brazil": "BR", "British Indian Ocean Territory": "IO", "British Virgin Islands": "VG",
    "Brunei": "BN", "Bulgaria": "BG", "Burkina Faso": "BF", "Burundi": "BI", "Cambodia": "KH", "Cameroon": "CM",
    "Canada": "CA", "Cape Verde": "CV", "Cayman Islands": "KY", "Central African Republic": "CF", "Chad": "TD",
    "Chile": "CL", "China": "CN", "Christmas Island": "CX", "Cocos Islands": "CC", "Colombia": "CO",
    "Comoros": "KM", "Cook Islands": "CK", "Costa Rica": "CR", "Croatia": "HR", "Cuba": "CU", "Curacao": "CW",
    "Cyprus": "CY", "Czech Republic": "CZ", "Democratic Republic of the Congo": "CD", "Denmark": "DK",
    "Djibouti": "DJ", "Dominica": "DM", "Dominican Republic": "DO", "East Timor": "TL", "Ecuador": "EC",
    "Egypt": "EG", "El Salvador": "SV", "Equatorial Guinea": "GQ", "Eritrea": "ER", "Estonia": "EE",
    "Ethiopia": "ET", "Falkland Islands": "FK", "Faroe Islands": "FO", "Fiji": "FJ", "Finland": "FI",
    "France": "FR", "French Polynesia": "PF", "Gabon": "GA", "Gambia": "GM", "Georgia": "GE", "Germany": "DE",
    "Ghana": "GH", "Gibraltar": "GI", "Greece": "GR", "Greenland": "GL", "Grenada": "GD", "Guam": "GU",
    "Guatemala": "GT", "Guernsey": "GG", "Guinea": "GN", "Guinea-Bissau": "GW", "Guyana": "GY", "Haiti": "HT",
    "Honduras": "HN", "Hong Kong": "HK", "Hungary": "HU", "Iceland": "IS", "India": "IN", "Indonesia": "ID",
    "Iran": "IR", "Iraq": "IQ", "Ireland": "IE", "Isle of Man": "IM", "Israel": "IL", "Italy": "IT",
    "Ivory Coast": "CI", "Jamaica": "JM", "Japan": "JP", "Jersey": "JE", "Jordan": "JO", "Kazakhstan": "KZ",
    "Kenya": "KE", "Kiribati": "KI", "Kosovo": "XK", "Kuwait": "KW", "Kyrgyzstan": "KG", "Laos": "LA",
    "Latvia": "LV", "Lebanon": "LB", "Lesotho": "LS", "Liberia": "LR", "Libya": "LY", "Liechtenstein": "LI",
    "Lithuania": "LT", "Luxembourg": "LU", "Macau": "MO", "Macedonia": "MK", "Madagascar": "MG", "Malawi": "MW",
    "Malaysia": "MY", "Maldives": "MV", "Mali": "ML", "Malta": "MT", "Marshall Islands": "MH", "Mauritania": "MR",
    "Mauritius": "MU", "Mayotte": "YT", "Mexico": "MX", "Micronesia": "FM", "Moldova": "MD", "Monaco": "MC",
    "Mongolia": "MN", "Montenegro": "ME", "Montserrat": "MS", "Morocco": "MA", "Mozambique": "MZ", "Myanmar": "MM",
    "Namibia": "NA", "Nauru": "NR", "Nepal": "NP", "The Netherlands": "NL", "New Caledonia": "NC", "New Zealand": "NZ",
    "Nicaragua": "NI", "Niger": "NE", "Nigeria": "NG", "Niue": "NU", "Northern Mariana Islands": "MP",
    "North Korea": "KP", "Norway": "NO", "Oman": "OM", "Pakistan": "PK", "Palau": "PW", "Palestine": "PS",
    "Panama": "PA", "Papua New Guinea": "PG", "Paraguay": "PY", "Peru": "PE", "Philippines": "PH", "Pitcairn": "PN",
    "Poland": "PL", "Portugal": "PT", "Puerto Rico": "PR", "Qatar": "QA", "Republic of the Congo": "CG",
    "Reunion": "RE", "Romania": "RO", "Russia": "RU", "Rwanda": "RW", "Saint Barthelemy": "BL",
    "Saint Helena": "SH", "Saint Kitts and Nevis": "KN", "Saint Lucia": "LC", "Saint Martin": "MF",
    "Saint Pierre and Miquelon": "PM", "Saint Vincent and the Grenadines": "VC", "Samoa": "WS", "San Marino": "SM",
    "Sao Tome and Principe": "ST", "Saudi Arabia": "SA", "Senegal": "SN", "Serbia": "RS", "Seychelles": "SC",
    "Sierra Leone": "SL", "Singapore": "SG", "Sint Maarten": "SX", "Slovakia": "SK", "Slovenia": "SI",
    "Solomon Islands": "SB", "Somalia": "SO", "South Africa": "ZA", "South Korea": "KR", "South Sudan": "SS",
    "Spain": "ES", "Sri Lanka": "LK", "Sudan": "SD", "Suriname": "SR", "Svalbard and Jan Mayen": "SJ",
    "Swaziland": "SZ", "Sweden": "SE", "Switzerland": "CH", "Syria": "SY", "Taiwan": "TW", "Tajikistan": "TJ",
    "Tanzania": "TZ", "Thailand": "TH", "Togo": "TG", "Tokelau": "TK", "Tonga": "TO", "Trinidad and Tobago": "TT",
    "Tunisia": "TN", "Türkiye": "TR", "Turkmenistan": "TM", "Turks and Caicos Islands": "TC", "Tuvalu": "TV",
    "U.S. Virgin Islands": "VI", "Uganda": "UG", "Ukraine": "UA", "United Arab Emirates": "AE",
    "United Kingdom": "GB", "United States": "US", "Uruguay": "UY", "Uzbekistan": "UZ", "Vanuatu": "VU",
    "Vatican": "VA", "Venezuela": "VE", "Vietnam": "VN", "Wallis and Futuna": "WF", "Western Sahara": "EH",
    "Yemen": "YE", "Zambia": "ZM", "Zimbabwe": "ZW"
};


class IPGrabberManager extends Module {

    IP_MENU_TOGGLE_ID = "IP_MENU_TOGGLE";
    IP_MENU_TOGGLE_DEFAULT = "true";

    ENABLE_TAG = "Show Chat-Info";
    DISABLE_TAG = "Hide Chat-Info";

    GEO_MAPPINGS = {
        country: "Country",
        state: "State",
        city: "City",
        isp: "Provider"
    }

    ipGrabberDiv = null;
    updateClock = null;
    languages = null;

    ipToggleButton = $("<button class='ipLookupButton' style='margin-bottom: 8px; margin-top: 6px;'></button>")
        .on('click', this.onIpToggleButtonClick.bind(this));

    async onIpToggleButtonClick() {
        let showQuery = {[this.IP_MENU_TOGGLE_ID]: this.IP_MENU_TOGGLE_DEFAULT};
        let result = (await chrome.storage.sync.get(showQuery))[this.IP_MENU_TOGGLE_ID];
        const enabled = !(result === "true");

        // Toggle Menu
        if (enabled) {
            this.ipToggleButton.html(this.DISABLE_TAG);
            this.ipGrabberDiv.style.display = "";
        } else {
            this.ipToggleButton.html(this.ENABLE_TAG);
            this.ipGrabberDiv.style.display = "none";
        }

        // Update Value
        showQuery[this.IP_MENU_TOGGLE_ID] = `${enabled}`;
        await chrome.storage.sync.set(showQuery)
    }

    constructor() {
        super();
        Logger.INFO("IPGrabberManager Loaded")
        this.addEventListener("displayScrapeData", this.onDisplayScrapeData, undefined, window);
        this.loadLanguageList();
        this.injectScrapeScript();
    }

    injectScrapeScript() {
        let script = document.createElement('script');
        script.src = chrome.runtime.getURL('/src/ext/scrape-ips.js')
        script.onload = () => {
            script.remove();
            document.dispatchEvent(new CustomEvent('scrapeAddress'));
        };
        (document.head || document.documentElement).appendChild(script);
    }


    loadLanguageList() {
        $.getJSON(getResourceURL("public/languages.json"), (json) => this.languages = json);
    }

    getFlagEmoji(countryCode) {
        return String.fromCodePoint(...[...countryCode.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt(undefined)));
    }

    onDisplayScrapeData(event) {
        // NEW: Capture the UUID at the beginning of the process.
        const chatUUID = ChatRegistry.getUUID();
        let unhashedAddress = event["detail"];
        let scrapeQuery = {[this.IP_MENU_TOGGLE_ID]: this.IP_MENU_TOGGLE_DEFAULT};

        chrome.storage.sync.get(scrapeQuery, async (result) => {
            let showData = result[this.IP_MENU_TOGGLE_ID] === "true";
            let hashedAddress = await sha1(unhashedAddress);

            Logger.DEBUG("Scraped IP Address from video chat | Hashed: <%s> Raw: <%s>", hashedAddress, unhashedAddress);
            if (await IPBlockingManager.API.skipBlockedAddress(unhashedAddress)) {
                return;
            }

            // MODIFIED: Pass the UUID into the display function.
            await this.geolocateAndDisplay(showData, unhashedAddress, hashedAddress, chatUUID);
        });
    }

    sendChatSeenEvent(seenTimes, unhashedAddress) {
        document.dispatchEvent(new CustomEvent(
            "chatSeenTimes",
            {
                detail: {
                    "uuid": ChatRegistry.getUUID(),
                    "seenTimes": seenTimes,
                    "ipAddress": unhashedAddress
                }
            }
        ));
    }

    // MODIFIED: Accept the chatUUID.
    async geolocateAndDisplay(showData, unhashedAddress, hashedAddress, chatUUID) {
        let previousQuery = {"PREVIOUS_HASHED_ADDRESS_LIST": {}};
        let result = await chrome.storage.local.get(previousQuery);

        const previouslyHashed = result["PREVIOUS_HASHED_ADDRESS_LIST"];
        const seenTimes = previouslyHashed[hashedAddress] || 0;
        this.sendChatSeenEvent(seenTimes, unhashedAddress);
        
        this.createAddressContainer(unhashedAddress, hashedAddress, previouslyHashed, showData, seenTimes);

        // Update times seen
        previouslyHashed[hashedAddress] = seenTimes + 1;
        await chrome.storage.local.set({"PREVIOUS_HASHED_ADDRESS_LIST": previouslyHashed});

        // Geolocation request
        let fetchJson;
        try {
            let fetchResult = await fetchWithTimeout( 
                `${ConstantValues.apiURL}prod/geoip2?ip_address=${unhashedAddress}`,
                {timeout: 5000}
            );
            fetchJson = await fetchResult.json();
        } catch (ex) {
            // MODIFIED: Pass UUID to the error handler.
            await this.onGeolocationRequestError(unhashedAddress, chatUUID);
            return;
        }
        
        // NEW: Check if the chat is still active before displaying results.
        if (ChatRegistry.getUUID() !== chatUUID) {
            Logger.INFO("Geolocation display cancelled for stale chat UUID.");
            return;
        }
        
        // Country code conversion
        const countryName = fetchJson.country; 
        const countryCode = countryNameToCode[countryName] || 'XX';
        fetchJson.country_code = countryCode;

        // MODIFIED: Pass UUID to the completion handler.
        await this.onGeolocationRequestCompleted(unhashedAddress, fetchJson, hashedAddress, seenTimes, chatUUID);
    }

    createAddressContainer(unhashedAddress, hashedAddress, previousHashedAddresses, showData, seenTimes) {
        const innerLogBox = document.getElementsByClassName("chatWindow")[0].parentNode;

        const existingLogItems = innerLogBox.getElementsByClassName("logitem");
        while (existingLogItems.length > 0) {
            existingLogItems[0].remove();
        }

        this.ipGrabberDiv = document.createElement("div");
        this.ipGrabberDiv.style.display = showData ? "" : "none";
        this.ipGrabberDiv.classList.add("logitem");

        this.ipToggleButton.html(showData ? this.DISABLE_TAG : this.ENABLE_TAG);
        innerLogBox.appendChild(this.ipToggleButton.get(0));
        innerLogBox.appendChild(this.ipGrabberDiv);
    }

    async insertUnhashedAddress(unhashedAddress, isOwner = false) {
        let ipSpoiler = await (new IPAddressSpoiler(unhashedAddress)).setup();
        let ipMessage = this.createLogBoxMessage(
            "address_data", "IP Address: ", ipSpoiler.get()
        );

        if (!isOwner) {
            ipMessage.appendChild(ButtonFactory.ipBlockButton(unhashedAddress));
        }
        this.ipGrabberDiv.appendChild(ipMessage);
    }

    // MODIFIED: Accept chatUUID and perform a check.
    async onGeolocationRequestError(unhashedAddress, chatUUID) {
        // NEW: Check if the call is stale before modifying the DOM.
        if (ChatRegistry.getUUID() !== chatUUID) return;
        
        await this.insertUnhashedAddress(unhashedAddress);
        sendErrorLogboxMessage("Geolocation failed, try again later or contact us through our discord on the home page!");
    }

    async skipBlockedCountries(countrySkipEnabled, geoJSON) {
        const code = geoJSON["country_code"] || geoJSON["country_code3"];
        if (!countrySkipEnabled || !code) {
            return false;
        }

        const countryBlocked = (await config.countrySkipInfo.retrieveValue() || "").toUpperCase().includes(code);
        if (!countryBlocked) {
            return false;
        }
        
        // Use the intelligent skip function
        performDebouncedSkip(ChatRegistry.getUUID());

        Logger.INFO("Detected user from blocked country in chat with UUID <%s>, skipped.", ChatRegistry.getUUID());
        sendErrorLogboxMessage(`Detected user from blocked country ${geoJSON["country"]} (${code}), skipped chat.`);
        return true;
    }

    containsValidKeys(obj, ...keys) {
        let keyList = Object.keys(obj);
        for (let key of keys) {
            if (!keyList.includes(key) || !obj[key] || obj[key] === '') {
                return false;
            }
        }
        return true;
    }

    // MODIFIED: Accept chatUUID and perform a check.
    async onGeolocationRequestCompleted(unhashedAddress, geoJSON, hashedAddress, seenTimes, chatUUID) {
        // NEW: Check if the call is stale before modifying the DOM.
        if (ChatRegistry.getUUID() !== chatUUID) return;

        await this.insertUnhashedAddress(geoJSON?.ip || unhashedAddress, geoJSON?.owner || false);

        const countrySkipEnabled = await config.countrySkipToggle.retrieveValue() === "true";

        Logger.DEBUG(
            "Received IP Scraping data for chat UUID <%s> from the Chromegle web-server as the following JSON payload: \n\n%s",
            ChatRegistry.getUUID(),
            JSON.stringify(geoJSON, null, 2)
        );
        
        // Display geolocation-based fields FIRST
        await this.displayGeolocationFields(geoJSON, hashedAddress, seenTimes);

        // Handle blocked countries LAST
        if (await this.skipBlockedCountries(countrySkipEnabled, geoJSON)) {
            return;
        }
    }

    insertLogboxMessage(elementId, label, ...values) {
        this.ipGrabberDiv.appendChild(
            this.createLogBoxMessage(elementId, label, ...values)
        )
    }

    reduceData(num) {
        return parseFloat(num).toFixed(2);
    }

    async displayGeolocationFields(geoJSON, hashedAddress, seenTimes) {
        this.updateClock = new ChatUpdateClock(ChatRegistry.getUUID(), 1000);

        // --- START OF REORDERED SECTION ---
        // Desired Order: IP, Country, State, City, Call, Note, Seen Before

        // 1. Country, State, City (manual order) (IP Address is added before this function is called)
        const displayOrder = ["country", "state", "city"];
        displayOrder.forEach(key => {
            if (this.containsValidKeys(geoJSON, key)) {
                this.insertLogboxMessage(
                    `${key}_data`, `${this.GEO_MAPPINGS[key]}: `, geoJSON[key]
                );
            }
        });

        // 2. Call Time
        {
            this.insertLogboxMessage(
                "call_time_data", "Call: ", "00:00"
            );
            this.updateClock.addUpdate(
                (date, startTime) => {
                    let timeData = $("#call_time_data").get(0);
                    if (timeData) timeData.childNodes[1].innerHTML = this.formatElapsedTime(date, startTime);
                }
            );
        }

        // 3. Note
        if (!geoJSON.owner) {
            let note = new Note();
            await note.setup(hashedAddress);
            this.insertLogboxMessage(
                "profile_note_data", "Note: ", note.element
            );
        }
        
        // 4. You've seen this person...
        const plural = (seenTimes > 1 || seenTimes === 0) ? "s" : "";
        const seenBeforeDiv = $(`<div class="logitem"><span class='statuslog'>You've seen this person ${seenTimes} time${plural} before.</span></div>`).get(0);
        this.ipGrabberDiv.appendChild(seenBeforeDiv);

        // --- END OF REORDERED SECTION ---

        // Owner message
        if (geoJSON?.owner) {
            this.insertOwnerMessage();
        }

        // Coordinates (already commented out)
        /*
        if (this.containsValidKeys(geoJSON, "longitude", "latitude")) {
            this.insertLogboxMessage(
                "long_lat_data", "Coordinates: ", `${this.reduceData(geoJSON.longitude)}/${this.reduceData(geoJSON.latitude)} `,
                `<a class="ipMapsButton" href='https://maps.google.com/maps?q=${geoJSON.latitude},${geoJSON.longitude}' target="_blank">(Google Maps)</a>`
            )
        }
        */

        // Automatic geolocation keys (now for remaining items like 'isp')
        Object.keys(this.GEO_MAPPINGS).forEach((key) => {
            // Skip the ones we already handled
            if (displayOrder.includes(key)) {
                return;
            }
            const entry = geoJSON[key];
            if (!this.containsValidKeys(geoJSON, key)) {
                return;
            }
            this.insertLogboxMessage(
                `${key}_data`, `${this.GEO_MAPPINGS[key]}: `, entry
            );
        });

        // Accuracy Information
        if (this.containsValidKeys(geoJSON, "accuracy")) {
            this.insertLogboxMessage(
                "accuracy_data", "Accuracy: ", `${geoJSON.accuracy} km radius`
            )
        }

        // Country Flag & Languages
        if (this.containsValidKeys(geoJSON, "country_code", "country")) {
            // Country Flag
            const countryDataElement = $("#country_data").get(0);
            if (countryDataElement) { // Check if element exists before appending
                countryDataElement.appendChild(
                    $(`<span>
                                <span class='flagText nceFont'>${this.getFlagEmoji(geoJSON.country_code)}</span>
                              </span>
                    `).get(0)
                );
            }

            // Languages (already commented out)
            /*
            if (this.languages != null) {
                let userLanguages = this.languages[geoJSON.country_code]?.join(", ") || null;
                if (userLanguages != null) {
                    this.insertLogboxMessage(
                        "language_data", "Language(s): ", userLanguages
                    )
                }
            }
            */
        }

        // Local Time
        if (this.containsValidKeys(geoJSON, "timezone")) {
            this.insertLogboxMessage(
                "local_time_data", "Local Time: ", this.getFormattedTime(geoJSON.timezone)
            );
            this.updateClock.addUpdate(
                (date) => {
                    let timeData = $("#local_time_data").get(0);
                    if (timeData) timeData.childNodes[1].innerHTML = this.getFormattedTime(geoJSON.timezone, date);
                }
            )
        }

        // Chromegle User
        if (this.containsValidKeys("chromegler") && geoJSON.chromegler) {
            let chromegleLogItem = $(`
                <div class="logitem">
                    <span class='statuslog' style="color: rgb(32, 143, 254);">This person is also using Chromegle right now!</span>
                </div>
            `).get(0);
            this.ipGrabberDiv.appendChild(chromegleLogItem);
        }
    }

    getFormattedTime(timezone, date = new Date()) {
        const options = {
            timeZone: timezone,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        return date.toLocaleString("en-US", options);
    }

    insertOwnerMessage() {
        Logger.DEBUG("You found the owner of Chromegle!");
        let ownerMessageDiv = $(
            `<div class="logitem">
                        <img class='owner' alt="owner" src="${ConstantValues.apiURL}users/owner/gif"</img>
                        <span class='statuslog' style="color: rgb(235 171 21);">
                            You found the developer of Chromegle! It's lovely to meet you!
                        </span>
                </div>`
        );
        this.ipGrabberDiv.appendChild(ownerMessageDiv);
    }

    formatElapsedTime(currentTime, startTime) {
        const diff = new Date(currentTime - startTime);
        const hours = diff.getUTCHours();
        const minutes = diff.getUTCMinutes().toString().padStart(2, "0");
        const seconds = diff.getUTCSeconds().toString().padStart(2, "0");
        return `${hours > 0 ? hours + ":" : ""}${minutes}:${seconds}`;
    }

    createLogBoxMessage(elementId, label, ...values) {
        let youMsgClass = document.createElement("p");
        youMsgClass.classList.add("youmsg");
        youMsgClass.id = elementId;

        let field = document.createElement("strong");
        field.classList.add("statusItem");
        field.innerText = label + "";

        let entry = document.createElement("span");
        for (let value of values) {
            if (typeof value === 'string') {
                entry.innerHTML += value;
            } else {
                entry.appendChild(value);
            }
        }

        youMsgClass.appendChild(field);
        youMsgClass.appendChild(entry);
        return youMsgClass;
    }
}
