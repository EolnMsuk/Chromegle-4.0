// In src/core/face-bypass.js

(function() {
    'use strict';
    // This script must run at document_start in the MAIN world.

    // Store the original Worker class.
    const OriginalWorker = window.Worker;

    // Create a new fake Worker that we control.
    window.Worker = function(scriptURL) {
        // Check if the website is trying to load its face detection script.
        if (scriptURL.includes('vision-core.js')) {
            console.log('Chromegle Extension: Face detection worker intercepted.');

            // Create a dummy worker that sends a fake "face detected" message.
            const dummyWorkerCode = `
                self.onmessage = function(e) {
                    // When the main page asks for face detection,
                    // immediately send back a fake positive result.
                    self.postMessage({
                        action: 'faceDetections',
                        faces: 1 // Sending 1 tells the site a face was found.
                    });
                };
            `;
            const blob = new Blob([dummyWorkerCode], { type: 'application/javascript' });
            return new OriginalWorker(URL.createObjectURL(blob));
        }

        // If it's not the face detection script, let it load normally.
        return new OriginalWorker(scriptURL);
    };
})();
