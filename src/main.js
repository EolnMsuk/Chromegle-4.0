let lastAutoSkipTime = 0; // This will store the timestamp of the last skip
let consecutiveSkips = 0; // Counter for rapid consecutive skips

function performDebouncedSkip() {
    const now = Date.now();
    const timeSinceLastSkip = now - lastAutoSkipTime;
    const RESET_INTERVAL = 5000; // 5 seconds of no skips resets the fast skip
    const COOLDOWN_PERIOD = 3000; // 3 seconds between consecutive skips

    // Reset the consecutive skip counter if enough time has passed since the last skip
    if (timeSinceLastSkip > RESET_INTERVAL) {
        consecutiveSkips = 0;
    }

    let delay = 0;
    if (consecutiveSkips === 0) {
        // The first skip in a series is immediate
        delay = 0;
    } else {
        // Subsequent skips are throttled to ensure a minimum time between them
        delay = Math.max(0, COOLDOWN_PERIOD - timeSinceLastSkip);
    }

    setTimeout(() => {
        // This assumes a function `skipIfPossible()` exists globally or in scope
        if (typeof skipIfPossible === 'function') {
            skipIfPossible();
        } else {
            console.error("Chromegle tweak: skipIfPossible() function not found!");
        }
        
        // Update state after the skip has been performed
        lastAutoSkipTime = Date.now();
        consecutiveSkips++;
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
