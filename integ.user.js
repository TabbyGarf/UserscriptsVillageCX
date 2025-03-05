// ==UserScript==
// @name         Intégrateur pour Village.cx
// @namespace    http://tabbygarf.club
// @version      1.0
// @icon         https://tabbygarf.club/favicon.ico
// @description  Active ou non les intégrations dans les topics de Village
// @author       stay/TabbyGarf
// @match        https://village.cx/village/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Paramètres modifiables par l'utilisateur
    // true = activé
    // false = desactivé
    const INTEGRER_YOUTUBE_SHORTS = true;
    const INTEGRER_INSTAGRAM = true;
    const INTEGRER_STREAMABLE = true;
    const INTEGRER_MEDIA = true;
    const INTEGRER_IMAGES = true;

    // Whitelist URL, supprimer les "//" au debut du lien si vous voulez ajouter
    const WHITELIST_URLS = [
        // /^https:\/\/files\.catbox\.moe\//,
        // /^https:\/\/litter\.catbox\.moe\//,
        /^https:\/\/i\.imgur\.com\//
    ];

    function isWhitelisted(url) {
        return WHITELIST_URLS.some(pattern => pattern.test(url));
    }

    function integrerYouTubeShorts(container) {
        if (!INTEGRER_YOUTUBE_SHORTS) return;
        container.querySelectorAll('.rich-message a[href]').forEach(link => {
            const match = link.href.match(/https?:\/\/(?:www\.)?youtube\.com\/shorts\/(\w+)(?:\?[^&]*)?$/);
            if (match) {
                let shortVideoId = match[1];
                let embedUrl = 'https://www.youtube.com/embed/' + shortVideoId;

                let iframeYouTube = document.createElement('iframe');
                iframeYouTube.setAttribute('width', '380');
                iframeYouTube.setAttribute('height', '214');
                iframeYouTube.setAttribute('frameborder', '0');
                iframeYouTube.setAttribute('allowfullscreen', 'allowfullscreen');
                iframeYouTube.src = embedUrl;

                link.parentNode.replaceChild(iframeYouTube, link);
            }
        });
    }

    function integrerContenuInstagram(link, embedUrl) {
        let iframeElement = document.createElement('iframe');
        iframeElement.setAttribute('src', embedUrl);
        iframeElement.setAttribute('width', 'auto');
        iframeElement.setAttribute('height', '500');
        iframeElement.setAttribute('frameborder', '0');
        iframeElement.setAttribute('allowfullscreen', 'allowfullscreen');

        link.parentNode.replaceChild(iframeElement, link);
    }

    function integrerInstagram(container) {
        if (!INTEGRER_INSTAGRAM) return;
        container.querySelectorAll('.rich-message a[href]').forEach(link => {
            const reelsMatch = link.href.match(/https?:\/\/(?:www\.)?instagram\.com\/reel\/(\w+)/);
            const postsMatch = link.href.match(/https?:\/\/(?:www\.)?instagram\.com\/p\/(\w+)/);

            if (reelsMatch) {
                let embedUrl = `https://www.instagram.com/reel/${reelsMatch[1]}/embed/`;
                integrerContenuInstagram(link, embedUrl);
            } else if (postsMatch) {
                let embedUrl = `https://www.instagram.com/p/${postsMatch[1]}/embed/`;
                integrerContenuInstagram(link, embedUrl);
            }
        });
    }

    function integrerStreamable(container) {
        if (!INTEGRER_STREAMABLE) return;
        container.querySelectorAll('.rich-message a[href]').forEach(link => {
            const match = link.href.match(/https:\/\/(staging\.)?streamable\.com\/(\w+)/);
            if (match) {
                let isStaging = match[1] !== undefined;
                let videoId = match[2];
                let embedUrl = isStaging ? 'https://staging.streamable.com/e/' : 'https://streamable.com/e/';

                let iframeStreamable = document.createElement('iframe');
                iframeStreamable.setAttribute('width', '380');
                iframeStreamable.setAttribute('height', '214');
                iframeStreamable.setAttribute('frameborder', '0');
                iframeStreamable.setAttribute('allowfullscreen', 'allowfullscreen');
                iframeStreamable.src = embedUrl + videoId;

                link.parentNode.replaceChild(iframeStreamable, link);
            }
        });
    }

    function integrerMedia(container) {
        if (!INTEGRER_MEDIA) return;
        container.querySelectorAll('.rich-message a[href]').forEach(link => {
            const match = link.href.match(/(https:\/\/(.+)(\.mp4|\.webm|\.mov|\.mkv|\.mp3|\.wav|\.ogg|\.aac|\.flac))/);
            if (match && isWhitelisted(match[1])) {
                let urlMedia = match[1];
                let media;
                if (urlMedia.match(/\.(mp3|wav|ogg|aac|flac)$/)) {
                    media = document.createElement("audio");
                    media.setAttribute("controls", "");
                } else {
                    media = document.createElement("video");
                    media.setAttribute("controls", "");
                    media.setAttribute("width", "380");
                    media.setAttribute("height", "214");
                    media.setAttribute("style", "background-color: black");
                }
                media.setAttribute("src", urlMedia + "#t=0.1");
                media.setAttribute("preload", "metadata");

                link.parentNode.parentNode.replaceChild(media, link.parentNode);
            }
        });
    }

    function integrerImages(container) {
        if (!INTEGRER_IMAGES) return;
        container.querySelectorAll('.rich-message a[href]').forEach(link => {
            const match = link.href.match(/\.(jpg|jpeg|png|gif|bmp|webp|tiff|tif|svg|heic|heif|ico|jfif|pjpeg|pjp)$/i);
            if (match && isWhitelisted(link.href)) {
                let imgElement = document.createElement('img');
                imgElement.setAttribute('src', link.href);
                imgElement.setAttribute('alt', link.href);
                imgElement.style.maxWidth = '500px';
                link.parentNode.replaceChild(imgElement, link);
            }
        });
    }

    integrerYouTubeShorts(document);
    integrerInstagram(document);
    integrerStreamable(document);
    integrerMedia(document);
    integrerImages(document);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    integrerYouTubeShorts(node);
                    integrerInstagram(node);
                    integrerStreamable(node);
                    integrerMedia(node);
                    integrerImages(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
