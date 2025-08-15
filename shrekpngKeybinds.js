// ==UserScript==
// @name         Wplace keybinds
// @namespace    http://tampermonkey.net/
// @version      2025-08-14
// @description  try to take over the world!
// @author       MLPdiscord aka shrek.png
// @match        *://*.wplace.live/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wplace.live
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Keybind script for wplace");

    let keys = {};

    const storageItem = localStorage.getItem("shrekpngKeybinds");
    if (storageItem) {
        keys = JSON.parse(storageItem);
    }

    const createLabel = (id) => {
        const label = document.createElement("div");
        label.id = id;
        label.style.color = "black";
        label.style.backgroundColor = "white";
        label.style.borderRadius = "10px";
        label.style.width = "20px";
        label.style.height = "20px";
        return label;
    }

    const drawLabels = () => {
        for (const key in keys) {
            const btn = document.querySelector("#color-" + keys[key]);

            if (btn === null) {
                return;
            }
            if (btn.innerHTML.includes(key)) {
                return;
            }

            const label = createLabel("shrekpng-" + btn.id);
            label.innerHTML = key;
            btn.appendChild(label);
        }
    }

    // Whenever you press the "Paint" button it gets deleted. Then it gets created again when you close the palette. So I just try to redraw the bind labels on the colors every 200 ms
    setInterval(drawLabels, 200);

    document.addEventListener("keypress", (e) => {
        const key = e.key;

        if (key === "=") {
            const btn = document.querySelector(".border-primary.ring-primary");
            if (btn === null) {
                return;
            }
            if (btn.innerHTML.includes(btn.id)) {
                delete keys[Object.keys(keys).find(key => keys[key] === btn.id.split("-")[1])];
                btn.querySelector("#shrekpng-" + btn.id).remove();
            } else {
                const key = prompt("Input keybind (single character [a-z0-9])");
                if (!key) {
                    return;
                }
                if (!key.match(/[a-z0-9]/)) {
                    return;
                }
                if (key in keys) {
                    document.querySelector("#shrekpng-color-" + keys[key]).remove();
                }
                const label = createLabel("shrekpng-" + btn.id);
                label.innerHTML = key[0];
                btn.appendChild(label);
                keys[key] = btn.id.split("-")[1];
            }

            localStorage.setItem("shrekpngKeybinds", JSON.stringify(keys));

            return;
        }

        if (!(key in keys)) {
            return;
        }
        const btn = document.querySelector("#color-" + keys[key]);
        if (btn === null) {
            return;
        }
        btn.click();
    });
})();
