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
        // UserCountManager,
        // BroadcastManager,
        // VideoPopoutManager,
        // LinkEmbedManager
    );

})();

