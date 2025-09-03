/**
 * A robust, central function to perform a skip.
 * It dispatches a 'mousedown' event, which is a more reliable way to
 * simulate a user click than a simple .click() call.
 * It is called twice to handle any "Are you sure?" confirmation dialogs
 * that might appear after the first click.
 */
function performSkip() {
    const disconnectButton = document.querySelector('.disconnectbtn');
    if (disconnectButton) {
        console.log("Dispatching robust skip events.");
        const downEvent = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        // Dispatch the event twice to handle confirmations
        disconnectButton.dispatchEvent(downEvent);
        disconnectButton.dispatchEvent(downEvent);
    } else {
        console.warn("Could not find the disconnect button to perform a skip.");
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

