// ==UserScript==
// @name         Silent Typing by Ence
// @version      0.0.1
// @description  try to take over the world!
// @author       Encephallus / Encendre
// @match        https://village.cx/*
// @run-at       document-start
// @icon         https://www.google.com/s2/favicons?sz=64&domain=village.cx
// @downloadURL  https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/silenttyping-ence.user.js
// @updateURL    https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/silenttyping-ence.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
      function hookMethod(obj, method, hookFn) {
      const realMethod = obj[method]
  
      function stopHook() {
          obj[method] = realMethod
      }
  
      function hook(...args) {
          return hookFn({ stopHook, method: realMethod }, this, args)
      }
  
      obj[method] = hook
  
      return stopHook
  }
  
  hookMethod(WebSocket.prototype, "send", (ctx, obj, args) => {
      const msg = args[0]
      try {
          const data = JSON.parse(msg)
          if (data.type === "typing") {
              return
          }
      } catch(e) {}
  
      return ctx.method.apply(obj, args)
  })

})();
