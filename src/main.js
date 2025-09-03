let lastAutoSkipTime = 0; // This will store the timestamp of the last skip

function performDebouncedSkip() {
    const now = Date.now();
    const timeSinceLastSkip = now - lastAutoSkipTime;
    const cooldownPeriod = 2000; // 2-second cooldown

    // Calculate the required delay. If we're not on cooldown, delay is 0.
    const delay = Math.max(0, cooldownPeriod - timeSinceLastSkip);

    setTimeout(() => {
        skipIfPossible();
        // Update the timestamp ONLY after the skip has occurred
        lastAutoSkipTime = Date.now(); 
    }, delay);
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

    // if (window.location.pathname !== "/") {
    //     console.log("Uhmegle started")
    //     $("html").css("visibility", "visible");
    //     return;
    // }
    $("html").css("visibility", "visible");
    Logger.INFO("Extention Starting, Loading Modules")

    // runDataLoaders(
    //     ManifestLoader,
    //     TipsLoader,
    //     VideoPopoutStyleLoader
    // )

    loadModules(
         IPBlockingManager,
         ThemeManager,
        // TopicSyncManager,
         ChatRegistryManager,
        // PasteMenu,
         ChatManager,
        // FilterManager,
        // ConfirmManager,
         AutoMessageManager,
         ReconnectManager,
         IPGrabberManager,
        // UnmoderatedChatManager,
         SpeechEngineManager,
        // VideoWrapperManager,
        // VideoBlockerManager,
        // VideoScreenshotManager,
        // FullScreenVideoManager,
        // SplashImageHandler,
        // ClearInterestsManager,
         SettingsManager,
         TimerSkipManager,
         RepeatSkipManager,
         MessageSkipManager,
         AgeSkipManager,
        // UserCountManager,
        // BroadcastManager,
        // VideoPopoutManager,
        // LinkEmbedManager
    );

})();



