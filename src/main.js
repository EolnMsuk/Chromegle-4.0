/**
 * A robust, central function to perform a skip.
 * This function simulates a complete, realistic user click to ensure it works
 * on modern websites that might ignore simpler click methods.
 */
function performSkip() {
    // 1. Find all possible buttons that could be used for skipping.
    const possibleButtons = document.querySelectorAll('.disconnectbtn, .skipbutton, .newchatbutton');
    let buttonClicked = false;

    possibleButtons.forEach(button => {
        // 2. Check if the button is actually visible on the page to avoid errors.
        const isVisible = !!(button.offsetWidth || button.offsetHeight || button.getClientRects().length);
        
        if (isVisible && !buttonClicked) {
            console.log("Found visible skip button. Attempting a comprehensive click simulation.", button);

            // 3. Create a sequence of events to simulate a full, realistic click.
            const mouseDownEvent = new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true });
            const mouseUpEvent = new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true });
            const clickEvent = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });

            // 4. Fire the complete click sequence twice. This is crucial for handling
            // any "Are you sure?" confirmation dialogs that appear after the first click.
            for (let i = 0; i < 2; i++) {
                button.dispatchEvent(mouseDownEvent);
                button.dispatchEvent(mouseUpEvent);
                button.dispatchEvent(clickEvent);
            }
            
            buttonClicked = true; // Make sure we only click one button per skip command.
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

