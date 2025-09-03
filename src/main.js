/**
 * A simple, central function to perform a skip.
 * It clicks the disconnect button twice to handle any confirmation popups.
 */
function performSkip() {
    const disconnectButton = document.querySelector('.disconnectbtn');
    if (disconnectButton) {
        console.log("Performing a skip action.");
        disconnectButton.click(); // First click to initiate
        disconnectButton.click(); // Second click to confirm
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

