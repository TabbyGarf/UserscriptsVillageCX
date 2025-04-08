// ==UserScript==
// @name         Smileys JVC pour V.CX
// @version      1
// @description  :hapoelparty:
// @author       DGSI
// @grant        none
// @match        https://village.cx/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=village.cx
// @downloadURL  https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/smileys-jvc-dgsi.user.js
// @updateURL    https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/smileys-jvc-dgsi.user.js
// ==/UserScript==

(function() {
    'use strict';

const oestrogen = [
    // Exemple: ['', '<img src="">'],
    /* JVC */
    [':)', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/326dda02-857a-41cd-b96b-10b670707d81.gif">'],
    [':(', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/a44b536e-2911-4fb3-a5a7-936772c03def.gif">'],
    [':noel:', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/a4c82724-3ca7-471e-a1fe-1008213fd975.gif">'],
    [':hap:', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/0f68c004-092c-4aec-a006-b42252d21c16.gif">'],
    [':coeur:', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/a7523aae-879c-4123-aa7d-ef8383e7a619.gif">'],
    [':question:', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/a7523aae-879c-4123-aa7d-ef8383e7a619.gif">'],
    [':ok:', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/48a51100-3155-45ec-b0c7-46b0ed19aea3.gif">'],
    [':rire:', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/2a9de4ae-f43a-4de2-8804-a525a477df53.gif">'],
    [':bave:', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/7c049de0-eec6-4e14-b8c7-80e566f3f171.gif">'],
    [':malade:', '<img src="https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/7da97f26-9433-4cdd-9503-2a6efb2610fa.gif">']
]

// Petite vérif des doublons in the doubt
const doublons = oestrogen.map(([cle])=>cle).filter((cle, i, cles) => cles.lastIndexOf(cle) !== i)
if (doublons.length !== 0) {
  alert(`[Script Smileys] Doublons: ${doublons.join(', ')}`)
  return
}

window.FormData = class extends FormData {
    constructor(form) {
        super(form)
        if (this.has('content')) {
            this.set('content', oestrogen.reduce((msg, [cle, val]) => msg.replaceAll(cle, val), this.get('content')))
        }
    }
}


    })();

