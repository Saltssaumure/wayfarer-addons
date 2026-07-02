// ==UserScript==
// @name         Wayfarer Map - Spinner/Postcard Image View
// @namespace    https://github.com/Saltssaumure/wayfarer-addons
// @downloadURL  https://raw.githubusercontent.com/Saltssaumure/wayfarer-addons/refs/heads/main/.prettierrc.json
// @updateURL    https://github.com/Saltssaumure/wayfarer-addons/-/raw/main/wayfarer-map-mods-map-tiles.user.js
// @homepageURL  https://github.com/Saltssaumure/wayfarer-addons
// @version      1.0.0
// @description  Morph wayspot voting screen images to spinner and postcard shape/ratio.
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
                            let clone = document.getElementById("postcard-photo");
                            if (clone) {
                                clone.remove();
                            };
                            let bigImage = document.getElementsByClassName("wfmapmods-wayspot-overlay-image")[0];
                            clone = bigImage.cloneNode(true);
                            bigImage.id = "spinner-photo";
                            clone.id = "postcard-photo";
                            bigImage.insertAdjacentElement("afterend", clone);
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
        .wfmapmods-wayspot-overlay-image {
        aspect-ratio: 1/1;
        max-height: 380px !important;

        &#spinner-photo {
            border-radius: 50%;
            object-fit: cover!important;
        }

        &#postcard-photo {
            object-fit: fill!important;
            clip-path: inset(0 8.33% round 6px);
        }
    }

    .wfmapmods-wayspot-overlay-dialog {
        max-width: 812px;
    }
    `;
    document.head.appendChild(style);
})();