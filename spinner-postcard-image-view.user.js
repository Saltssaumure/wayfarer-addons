// ==UserScript==
// @name         Wayfarer Map - Spinner/Postcard Image View
// @namespace    https://github.com/Saltssaumure/wayfarer-addons
// @downloadURL  https://github.com/Saltssaumure/wayfarer-addons/raw/refs/heads/main/spinner-postcard-image-view.user.js
// @updateURL    https://github.com/Saltssaumure/wayfarer-addons/raw/refs/heads/main/spinner-postcard-image-view.user.js
// @homepageURL  https://github.com/Saltssaumure/wayfarer-addons
// @version      1.1.0
// @description  Adds spinner and postcard previews to the Wayspot photo voting window. Requires Wayfarer Map Mods - Base by Tntnnbltn.
// @author       Saltssaumure
// @match        https://wayfarer.nianticlabs.com/new/mapview*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nianticlabs.com
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach((node) => {
                    if (node.classList) {
                        if (node.classList[0] === "wfmapmods-photo-vote-badge") {
                            // Remove old added views
                            let alternateImagesContainer = document.getElementById("alternate-images-wrapper");
                            if (alternateImagesContainer) {
                                alternateImagesContainer.remove();
                            };

                            // Make and populate new views
                            alternateImagesContainer = document.createElement("div");
                            alternateImagesContainer.id = "alternate-images-wrapper";
                            let originalImage = document.getElementsByClassName("wfmapmods-wayspot-overlay-image")[0];
                            originalImage.id = "original-image";
                            let alternateImagesInfo = [
                                {
                                    id: "spinner-image",
                                    res: "512",
                                    note: "Spinner",
                                },
                                {
                                    id: "postcard-image",
                                    res: "128",
                                    note: "Postcard",
                                },
                            ];
                            alternateImagesInfo.forEach((info) => {
                                let imageWrapper = document.createElement("div");
                                imageWrapper.classList.add("alternate-image-wrapper");

                                let imageNote = document.createElement("div");
                                imageNote.classList.add("alternate-image-note");
                                imageNote.classList.add("wfmapmods-photo-meta-overlay-label");
                                imageNote.appendChild(document.createTextNode(info.note));

                                let image = originalImage.cloneNode();
                                image.id = info.id;
                                image.src = image.currentSrc + "=s" + info.res;

                                imageWrapper.appendChild(image);
                                imageWrapper.appendChild(imageNote);
                                alternateImagesContainer.appendChild(imageWrapper);
                            });
                            originalImage.insertAdjacentElement("afterend", alternateImagesContainer);
                        };
                    };
                });
            };
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    let style = document.createElement("style");
    style.innerHTML = `
    #alternate-images-wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;
        --alternate-image-size: 200px;

        .wfmapmods-wayspot-overlay-image {
            aspect-ratio: 1/1;
            min-height: unset;
        }
    }

    #original-image {
        height: 100%!important;
    }

    #spinner-image {
        border-radius: 50%;
        object-fit: cover!important;
        width: calc(var(--alternate-image-size) * 0.833)!important;
        height: calc(var(--alternate-image-size) * 0.833)!important;
    }

    #postcard-image {
        object-fit: fill!important;
        clip-path: inset(0 8.33% round 6px);
        width: var(--alternate-image-size)!important;
        height: var(--alternate-image-size)!important;
    }

    .alternate-image-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .alternate-image-note {
        position: relative;
        inset: 4px auto auto;
    }

    .wfmapmods-wayspot-overlay-image-link {
        align-items: center;
    }

    .wfmapmods-photo-vote-host {
        inset: auto auto 10px 10px;
    }

    .wfmapmods-wayspot-overlay-dialog {
        max-width: 812px;
    }
    `;
    document.head.appendChild(style);
})();
