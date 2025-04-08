// ==UserScript==
// @name         Blacklist pour Village.cx
// @namespace    http://tabbygarf.club
// @version      v2
// @description  Blacklist pour Village.cx
// @author       stay/TabbyGarf
// @match        https://village.cx/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=village.cx
// @downloadURL  https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/blacklist-stay.user.js
// @updateURL    https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/blacklist-stay.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //BLACKLIST CUSTOMISABLE ET QUASI INFINIE
    //STRUCTURE BLACKLIST ["PSEUDO1", "pseudo2", "PSEUDO3"]
    //le dernier pseudo ne dois jamais avoir une virgule apres ses guillemets
    //seulement ajouter une virgule si on ajoute un pseudo a la fin.
    //La blacklist est insensible a la casse donc "PsEudo" et "pseudo" marchent de la meme maniere.
    const blacklist = ["PSEUDO_EEERRREFSDCDX"].map(name => name.toLowerCase());


    function hideMessages() {
        document.querySelectorAll('.message').forEach(msg => {
            const pseudoElement = msg.querySelector('.row-center a span.font-medium');
            if (pseudoElement) {
                const pseudo = pseudoElement.innerText.trim().toLowerCase();
                if (blacklist.includes(pseudo)) {
                    const parentContainer = msg.closest('div.message');
                    if (parentContainer) {
                        parentContainer.style.display = 'none';
                    }
                }
            }
        });
    }

    function editQuotes() {
        document.querySelectorAll('.row-center.gap-2').forEach(quote => {
            const pseudoElement = quote.querySelector('span.font-medium');
            if (pseudoElement) {
                const pseudo = pseudoElement.textContent.trim().toLowerCase();
                if (blacklist.includes(pseudo)) {
                    // Retire la pdp et pseudo des citations pour remplacer le contenu efficacement par [Contenu blacklisté]
                    const img = quote.querySelector('img.object-cover.rounded-md.size-6');
                    if (img) img.remove();
                    pseudoElement.remove();


                    const quoteMessage = quote.querySelector('.rich-message');
                    if (quoteMessage) {
                        quoteMessage.textContent = "[Contenu blacklisté]";
                    }
                }
            }
        });
    }


    function hideTopics() {
        document.querySelectorAll('a.row-center.py-1.w-full').forEach(topic => {
            const pseudoElement = topic.querySelector('.row-center.text-sm.text-neutral-500 span');
            if (pseudoElement) {
                const pseudo = pseudoElement.textContent.trim().toLowerCase();
                if (blacklist.includes(pseudo)) {
                    const easeLinear = topic.closest('div[class*="ease-linear"]');
                    if (easeLinear) {
                        const parentDiv = easeLinear.parentElement;
                        if (parentDiv) {
                            parentDiv.remove();
                        }
                    }
                }
            }
        });
    }


    setTimeout(() => {
        hideMessages();
        editQuotes();
        hideTopics();
    }, 1000);


    const observer = new MutationObserver(() => {
        hideMessages();
        editQuotes();
        hideTopics();
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();
