// ==UserScript==
// @name         Themes Sombres pour Village.cx
// @version      1.0
// @icon         https://tabbygarf.club/favicon.ico
// @description  Changeur de tintes pour le theme sombre de Village.cx
// @author       stay/TabbyGarf
// @match        https://village.cx/*
// @downloadURL  https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/themes-stay.user.js
// @updateURL    https://github.com/TabbyGarf/UserscriptsVillageCX/raw/refs/heads/main/themes-stay.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const themes = [
        // ===== Defaut (0 modif) =====
        `
        @layer theme {
            :root,
            :host {

              }
           }
        `,
        // ===== OGSteam =====
        `
        @layer theme {
            img[src="/village.png"]{
                content: url("https://pub-edb0c2460d754c5eb19e4f23b232496e.r2.dev/117b996c-fc5f-4267-9265-971962e8dd49.png") !important;
            }
            :root,
            :host {
              --font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
              --font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
              --color-green-500:oklch(1 .015 286.067); /*Nouveau Sujet */
              --color-emerald-500:oklch(65.7% 0.102 88.7); /*Send Button*/
              --color-blue-300:oklch(65.7% 0.102 88.7); /*Link Hover */
              --color-blue-400:oklch(72.6% 0.111 89.2); /*Link Color */
              --color-cyan-500:oklch(72.6% 0.111 89.2); /*Retour Topic */
              --color-indigo-500:oklch(72.6% 0.111 89.2); /*Bouton Embed*/
              --color-lime-500:oklch(72.6% 0.111 89.2); /*Notif dans topic */
              --color-blue-500:oklch(72.6% 0.102 89.2); /*Theme Dropdown*/
              --color-zinc-800:oklch(38.4% 0.042 132.6); /* Message Background */
              --color-zinc-900:oklch(33.4% 0.039 132.1); /* Page Background */
              --color-zinc-950:oklch(33.4% 0.039 132.1); /* Page Background */
              --color-black:oklch(33.4% 0.039 132.1);
              }
           }
        `,
        // ===== Terminal =====
        `
        @layer theme {
          :root,
          :host {
            --font-sans: ui-sans-serif, system-ui, sans-serif;
            --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace;
            --color-green-500: oklch(1 0.1 120);
            --color-emerald-500: oklch(1 0.12 130);
            --color-blue-300: oklch(1 0.15 200);
            --color-blue-400: oklch(1 0.18 210);
            --color-cyan-500: oklch(1 0.18 190);
            --color-indigo-500: oklch(1 0.18 220);
            --color-lime-500: oklch(1 0.2 110);
            --color-blue-500: oklch(1 0.18 205);
            --color-zinc-800: oklch(0.1 0.05 132.6);
            --color-zinc-900: oklch(0.05 0.03 132.1);
            --color-zinc-950: oklch(0.02 0.02 132.1);
            --color-black: oklch(0 0 0);
            --color-white: oklch(1 0 0);
            --color-neutral-500: oklch(0.8 0 0);
          }
        }
        `,
        // ===== Cappucino =====
        `
        @layer theme {
        :root,
        :host {
          --font-sans: ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
          --font-mono: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;

          /* Recolored according to Catppuccin Mocha */
          --color-green-500: #fff; /* Nouveau Sujet */
          --color-emerald-500: #fff; /* Send Button */
          --color-indigo-500: #fff; /* Bouton Embed */
          --color-lime-500: #fff; /* Notif dans topic */
          --color-cyan-500: #fff; /* Retour Topic */

          --color-yellow-400: #928466; /* Topic jaune */
          --color-red-600: #80678E; /* Topic Rouge */

          --color-blue-300: #A59981; /* Link Hover */
          --color-blue-400: #BBB2A0; /* Link Color */



          --color-blue-500: #BBB2A0; /* Theme Dropdown */
          --color-zinc-800: #352C25; /* Message Background */
          --color-zinc-900: #2B231D; /* Page Background */
          --color-zinc-950: #2B231D; /* Page Background */

          --color-white: #fff; /* Text */
          --color-neutral-500: #776C55; /* Muted Text */
        }
    }
    `,// ===== Crimson =====
        `
        @layer theme {
        :root,
        :host {
          --font-sans: ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
          --font-mono: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;

          /* Recolored according to Catppuccin Mocha */
          --color-green-500: #fff; /* Nouveau Sujet */
          --color-emerald-500: #fff; /* Send Button */
          --color-indigo-500: #fff; /* Bouton Embed */
          --color-lime-500: #fff; /* Notif dans topic */
          --color-cyan-500: #fff; /* Retour Topic */

          --color-yellow-400: #916666; /* Topic jaune */
          --color-red-600: #f00; /* Topic Rouge */

          --color-blue-300: #9F8479; /* Link Hover */
          --color-blue-400: #916666; /* Link Color */



          --color-blue-500: #916666; /* Theme Dropdown */
          --color-zinc-800: #39231F; /* Message Background */
          --color-zinc-900: #331212; /* Page Background */
          --color-zinc-950: #331212; /* Page Background */

          --color-white: #fff; /* Text */
          --color-neutral-500: #9F8479; /* Muted Text */
        }
    }
    `,
    ];

    const styleEl = document.createElement('style');
    styleEl.id = 'userscript-theme-style';
    document.head.appendChild(styleEl);

    const button = document.createElement('button');
    button.textContent = '🎨';
    Object.assign(button.style, {
        position: 'fixed',
        top: '2px',
        left: '45px',
        zIndex: 9999,
        padding: '10px 10px',
        borderRadius: '8px',
        background: "#33333311",
        color: "#fff",
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'sans-serif'
    });

    document.body.appendChild(button);

    let curThemeTint_tby = parseInt(localStorage.getItem('curThemeTint_tby')) || 0;
    const applyTheme = (index) => {
        styleEl.textContent = themes[index];
        localStorage.setItem('curThemeTint_tby', index);
    };

    applyTheme(curThemeTint_tby);

    button.addEventListener('click', () => {
        curThemeTint_tby = (curThemeTint_tby + 1) % themes.length;
        applyTheme(curThemeTint_tby);
    });
})();
