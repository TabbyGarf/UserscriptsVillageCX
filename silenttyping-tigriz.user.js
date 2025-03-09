// ==UserScript==
// @name         Silent Typing by Tigriz
// @version      0.0.1
// @description  try to take over the world!
// @author       Tigriz
// @match        https://village.cx/*
// @run-at       document-start
// @icon         https://www.google.com/s2/favicons?sz=64&domain=village.cx
// @downloadURL  https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/silenttyping-tigriz.user.js
// @updateURL    https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/silenttyping-tigriz.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Bind WebSocket send
    const nativeWebSocket = window.WebSocket;
    window.WebSocket = function (...args) {
        const socket = new nativeWebSocket(...args);
        socket._send = socket.send;
        socket.send = (...data) => {
            const payload = JSON.parse(data[0])
            if(payload.type !== "typing") socket._send(...data);
        };
        return socket;
    };
})();
