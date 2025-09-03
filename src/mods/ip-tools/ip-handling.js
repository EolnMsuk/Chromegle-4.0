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
    "Namibia": "NA", "Nauru": "NR", "Nepal": "NP", "Netherlands": "NL", "New Caledonia": "NC", "New Zealand": "NZ",
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
    "Tunisia": "TN", "Turkey": "TR", "Turkmenistan": "TM", "Turks and Caicos Islands": "TC", "Tuvalu": "TV",
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

        if (this.ipGrabberDiv) {
            this.ipGrabberDiv.style.display = enabled ? "" : "none";
        }
        this.ipToggleButton.html(enabled ? this.DISABLE_TAG : this.ENABLE_TAG);
        
        showQuery[this.IP_MENU_TOGGLE_ID] = `${enabled}`;
        await chrome.storage.sync.set(showQuery);
    }

    constructor() {
        super();
        Logger.INFO("IPGrabberManager Loaded");
        this.addEventListener("displayScrapeData", this.onDisplayScrapeData, undefined, window);
        this.loadLanguageList();
        this.injectScrapeScript();
    }

    injectScrapeScript() {
        let script = document.createElement('script');
        script.src = chrome.runtime.getURL('/src/ext/scrape-ips.js');
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
        if (!countryCode || countryCode.length !== 2) return '';
        try {
            return String.fromCodePoint(...[...countryCode.toUpperCase()].map(x => 0x1F1A5 + x.charCodeAt(0)));
        } catch (e) {
            return '';
        }
    }

    onDisplayScrapeData(event) {
        const unhashedAddress = event.detail;
        if (!unhashedAddress) return;

        const scrapeQuery = {[this.IP_MENU_TOGGLE_ID]: this.IP_MENU_TOGGLE_DEFAULT};

        chrome.storage.sync.get(scrapeQuery, async (result) => {
            const showData = result[this.IP_MENU_TOGGLE_ID] === "true";
            const hashedAddress = await sha1(unhashedAddress);

            Logger.DEBUG("Scraped IP Address from video chat | Hashed: <%s> Raw: <%s>", hashedAddress, unhashedAddress);

            // --- UPDATED: IP Block Check ---
            // Now we check first, then trigger the central skip manager if needed.
            if (await IPBlockingManager.API.isAddressBlocked(unhashedAddress)) {
                Logger.INFO("Blocked IP address detected. Triggering intelligent skip.");
                IPBlockingManager.triggerIntelligentSkip();
                
                // Also provide feedback in the UI that a skip happened.
                sendErrorLogboxMessage(`Skipped the blocked IP address ${unhashedAddress}`)
                    .appendChild(ButtonFactory.ipUnblockButton(unhashedAddress));

                return; // Stop processing since we are skipping.
            }

            await this.geolocateAndDisplay(showData, unhashedAddress, hashedAddress);
        });
    }

    sendChatSeenEvent(seenTimes, unhashedAddress) {
        document.dispatchEvent(new CustomEvent(
            "chatSeenTimes", {
                detail: {
                    "uuid": ChatRegistry.getUUID(),
                    "seenTimes": seenTimes,
                    "ipAddress": unhashedAddress
                }
            }
        ));
    }

    async geolocateAndDisplay(showData, unhashedAddress, hashedAddress) {
        const previousQuery = {"PREVIOUS_HASHED_ADDRESS_LIST": {}};
        const result = await chrome.storage.local.get(previousQuery);

        const previouslyHashed = result["PREVIOUS_HASHED_ADDRESS_LIST"] || {};
        const seenTimes = previouslyHashed[hashedAddress] || 0;
        this.sendChatSeenEvent(seenTimes, unhashedAddress);
        
        this.createAddressContainer(showData);

        // Update times seen
        previouslyHashed[hashedAddress] = seenTimes + 1;
        await chrome.storage.local.set({"PREVIOUS_HASHED_ADDRESS_LIST": previouslyHashed});

        // Geolocation request
        try {
            const fetchResult = await fetchWithTimeout(
                `${ConstantValues.apiURL}prod/geoip2?ip_address=${unhashedAddress}`,
                {timeout: 5000}
            );
            const fetchJson = await fetchResult.json();
            
            const countryName = fetchJson.country;
            fetchJson.country_code = countryNameToCode[countryName] || 'XX';

            await this.onGeolocationRequestCompleted(unhashedAddress, fetchJson, hashedAddress, seenTimes);
        } catch (ex) {
            await this.onGeolocationRequestError(unhashedAddress);
        }
    }

    createAddressContainer(showData) {
        const innerLogBox = document.getElementsByClassName("chatWindow")[0]?.parentNode;
        if (!innerLogBox) return;

        $(innerLogBox).find(".logitem, .ipLookupButton").remove();

        this.ipGrabberDiv = document.createElement("div");
        this.ipGrabberDiv.style.display = showData ? "" : "none";
        this.ipGrabberDiv.className = "logitem";
        
        this.ipToggleButton.html(showData ? this.DISABLE_TAG : this.ENABLE_TAG);
        innerLogBox.appendChild(this.ipToggleButton.get(0));
        innerLogBox.appendChild(this.ipGrabberDiv);
    }

    async insertUnhashedAddress(unhashedAddress, isOwner = false) {
        const ipSpoiler = await (new IPAddressSpoiler(unhashedAddress)).setup();
        const ipMessage = this.createLogBoxMessage(
            "address_data", "IP Address: ", ipSpoiler.get()
        );

        if (!isOwner) {
            ipMessage.appendChild(ButtonFactory.ipBlockButton(unhashedAddress));
        }
        this.ipGrabberDiv.appendChild(ipMessage);
    }

    async onGeolocationRequestError(unhashedAddress) {
        await this.insertUnhashedAddress(unhashedAddress);
        sendErrorLogboxMessage("Geolocation failed. Please try again later.");
    }

    async skipBlockedCountries(countrySkipEnabled, geoJSON) {
        const code = geoJSON.country_code;
        if (!countrySkipEnabled || !code) return false;

        const blockedCountries = (await config.countrySkipInfo.retrieveValue() || "").toUpperCase();
        if (!blockedCountries.includes(code)) return false;
        
        // --- UPDATED: Use the centralized intelligent skip function ---
        IPBlockingManager.triggerIntelligentSkip();

        Logger.INFO("Detected user from blocked country <%s>, skipped.", code);
        sendErrorLogboxMessage(`Skipped user from blocked country: ${geoJSON.country} (${code}).`);
        return true;
    }

    containsValidKeys(obj, ...keys) {
        return keys.every(key => obj[key]);
    }

    async onGeolocationRequestCompleted(unhashedAddress, geoJSON, hashedAddress, seenTimes) {
        await this.insertUnhashedAddress(geoJSON.ip || unhashedAddress, geoJSON.owner || false);

        const countrySkipEnabled = await config.countrySkipToggle.retrieveValue() === "true";

        Logger.DEBUG("Geolocation data received: \n%s", JSON.stringify(geoJSON, null, 2));
        
        // Display fields first, so the user sees info even if we skip.
        await this.displayGeolocationFields(geoJSON, hashedAddress, seenTimes);

        // Handle blocked countries LAST.
        if (await this.skipBlockedCountries(countrySkipEnabled, geoJSON)) {
            return;
        }
    }

    insertLogboxMessage(elementId, label, ...values) {
        if(this.ipGrabberDiv) {
            this.ipGrabberDiv.appendChild(
                this.createLogBoxMessage(elementId, label, ...values)
            );
        }
    }
    
    async displayGeolocationFields(geoJSON, hashedAddress, seenTimes) {
        this.updateClock = new ChatUpdateClock(ChatRegistry.getUUID(), 1000);

        const displayOrder = ["country", "state", "city"];
        displayOrder.forEach(key => {
            if (this.containsValidKeys(geoJSON, key)) {
                this.insertLogboxMessage(`${key}_data`, `${this.GEO_MAPPINGS[key]}: `, geoJSON[key]);
            }
        });

        // Call Time
        this.insertLogboxMessage("call_time_data", "Call: ", "00:00");
        this.updateClock.addUpdate((date, startTime) => {
            const timeData = $("#call_time_data").get(0);
            if (timeData) timeData.childNodes[1].textContent = this.formatElapsedTime(date, startTime);
        });

        // Note
        if (!geoJSON.owner) {
            const note = new Note();
            await note.setup(hashedAddress);
            this.insertLogboxMessage("profile_note_data", "Note: ", note.element);
        }
        
        // Seen Before
        const plural = (seenTimes !== 1) ? "s" : "";
        const seenBeforeDiv = $(`<div class="logitem"><span class='statuslog'>You've seen this person ${seenTimes} time${plural} before.</span></div>`).get(0);
        if (this.ipGrabberDiv) this.ipGrabberDiv.appendChild(seenBeforeDiv);

        if (geoJSON.owner) this.insertOwnerMessage();

        // Other Geo data like ISP
        Object.keys(this.GEO_MAPPINGS).forEach((key) => {
            if (!displayOrder.includes(key) && this.containsValidKeys(geoJSON, key)) {
                this.insertLogboxMessage(`${key}_data`, `${this.GEO_MAPPINGS[key]}: `, geoJSON[key]);
            }
        });

        if (this.containsValidKeys(geoJSON, "accuracy")) {
            this.insertLogboxMessage("accuracy_data", "Accuracy: ", `${geoJSON.accuracy} km radius`);
        }

        // Country Flag
        if (this.containsValidKeys(geoJSON, "country_code")) {
            const countryDataElement = $("#country_data").get(0);
            if (countryDataElement) {
                const flagSpan = $(`<span> <span class='flagText nceFont'>${this.getFlagEmoji(geoJSON.country_code)}</span></span>`).get(0);
                countryDataElement.appendChild(flagSpan);
            }
        }

        // Local Time
        if (this.containsValidKeys(geoJSON, "timezone")) {
            this.insertLogboxMessage("local_time_data", "Local Time: ", this.getFormattedTime(geoJSON.timezone));
            this.updateClock.addUpdate((date) => {
                const timeData = $("#local_time_data").get(0);
                if (timeData) timeData.childNodes[1].textContent = this.getFormattedTime(geoJSON.timezone, date);
            });
        }
    }

    getFormattedTime(timezone, date = new Date()) {
        try {
            return date.toLocaleString("en-US", { timeZone: timezone, hour12: true, timeStyle: 'medium' });
        } catch (e) {
            return "Invalid Timezone";
        }
    }

    insertOwnerMessage() {
        const ownerMessageDiv = $(`<div class="logitem"><span class='statuslog' style="color: rgb(235 171 21);">You found the developer of Chromegle!</span></div>`).get(0);
        if (this.ipGrabberDiv) this.ipGrabberDiv.appendChild(ownerMessageDiv);
    }

    formatElapsedTime(currentTime, startTime) {
        const diff = new Date(currentTime - startTime);
        const minutes = diff.getUTCMinutes().toString().padStart(2, "0");
        const seconds = diff.getUTCSeconds().toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    createLogBoxMessage(elementId, label, ...values) {
        const p = document.createElement("p");
        p.className = "youmsg";
        p.id = elementId;

        const strong = document.createElement("strong");
        strong.className = "statusItem";
        strong.textContent = `${label} `;
        p.appendChild(strong);
        
        const span = document.createElement("span");
        values.forEach(value => {
            if (typeof value === 'string') {
                span.innerHTML += value;
            } else {
                span.appendChild(value);
            }
        });
        p.appendChild(span);

        return p;
    }
}
