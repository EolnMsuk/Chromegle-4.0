/**
 * A robust, central function to perform a skip.
 * This function is designed to be highly reliable.
 */
function performSkip() {
    // 1. Find all possible buttons that could be used for skipping.
    const possibleButtons = document.querySelectorAll('.disconnectbtn, .skipbutton, .newchatbutton');
    let buttonClicked = false;

    possibleButtons.forEach(button => {
        // 2. Check if the button is actually visible on the page.
        // An element is visible if it has a size and is not hidden.
        const isVisible = !!(button.offsetWidth || button.offsetHeight || button.getClientRects().length);
        
        if (isVisible && !buttonClicked) {
            console.log("Found a visible skip button, attempting robust click:", button);

            // 3. Perform a more realistic click by simulating a 'mousedown' event.
            // This is more effective than a simple .click() on many websites.
            const clickEvent = new MouseEvent('mousedown', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            // 4. Dispatch the event twice to handle any "Are you sure?" confirmations.
            button.dispatchEvent(clickEvent);
            button.dispatchEvent(clickEvent);
            
            buttonClicked = true; // Ensure we only click one button.
        }
    });

    if (!buttonClicked) {
        console.warn("Chromegle could not find a visible disconnect/skip button to click.");
    }
}


/** @type {SettingsManager} */
let Settings;

/** @type {ChatRegistryManager} */
let ChatRegistry;

/** @type {Object} */
let Manifest;

(function () {

    if (window.location.href.includes('banredir.html') || window.location.href.includes('ban.html')) {
        window.location.href = ConstantValues.websiteURL + "/banned";
        return;
    }

    $("html").css("visibility", "visible");
    Logger.INFO("Extension Starting, Loading Modules")

    loadModules(
         IPBlockingManager,
         ThemeManager,
         ChatRegistryManager,
         ChatManager,
         AutoMessageManager,
         ReconnectManager,
         IPGrabberManager,
         SpeechEngineManager,
         SettingsManager
    );

})();

