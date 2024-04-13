// ==UserScript==
// @name            ProtocolDroid
// @namespace       https://protocoldroid.yorik.dev/
// @version         0.0.999
// @description     A client side HedgeDoc extension that helps with protocols.
// @author          Yorik Hansen
// @homepage        https://github.com/YorikHansen/ProtocolDroid
// @homepageURL     https://github.com/YorikHansen/ProtocolDroid
// @updateURL       https://github.com/YorikHansen/ProtocolDroid/raw/main/dist/protocoldroid.meta.js
// @downloadURL     https://github.com/YorikHansen/ProtocolDroid/raw/main/dist/protocoldroid.user.js
// @icon            https://www.fs-infmath.uni-kiel.de/codimd/icons/favicon.ico
// @match           https://www.fs-infmath.uni-kiel.de/codimd/*
// @match           https://codimd.fs-infmath.uni-kiel.de/*
// @match           https://md.kif.rocks/*
// @match           https://md.fachschaften.org/*
// @run-at          document-body
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// @connect         www.fs-infmath.uni-kiel.de
// @require         https://github.com/YorikHansen/ProtocolDroid/raw/main/dist/protocoldroid.user.js
// ==/UserScript==

const warnInConsole = () => {
	console.warn(
		'%c' + 'This version if ProtocolDroid is deprecated',
		'font-size: 36px; font-weight: bold; color: yellow;',
	);
	console.warn(
		'%c' + 'Please update to the latest version of ProtocolDroid!',
		'font-size: 24px; font-weight: bold; color: yellow;',
	);
};

const openPopup = () => {
	const fullscreenBlock = document.createElement('div');
	const popup = document.createElement('div');
	popup.id = 'protocoldroid-popup';
	popup.innerHTML = `
		<h1>This version if ProtocolDroid is deprecated</h1>
		<p>Please update to the latest version of ProtocolDroid!</p>
		<p><a href="https://github.com/YorikHansen/ProtocolDroid/raw/main/dist/protocoldroid.user.js" target="_blank">Download latest version</a></p>
		<p><button id="protocoldroid-popup-close">Understood</button></p>`;
	popup.style.position = 'fixed';
	popup.style.top = '50%';
	popup.style.left = '50%';
	popup.style.transform = 'translate(-50%, -50%)';
	popup.style.zIndex = '2000000002';
	popup.style.padding = '20px';
	popup.style.background = 'white';
	popup.style.border = '1px solid black';
	popup.style.borderRadius = '5px';
	fullscreenBlock.style.position = 'fixed';
	fullscreenBlock.style.top = '0';
	fullscreenBlock.style.left = '0';
	fullscreenBlock.style.width = '100%';
	fullscreenBlock.style.height = '100%';
	fullscreenBlock.style.background = 'rgba(0, 0, 0, 0.5)';
	fullscreenBlock.style.zIndex = '2000000001';
	fullscreenBlock.appendChild(popup);
	document.body.appendChild(fullscreenBlock);
	document
		.getElementById('protocoldroid-popup-close')
		.addEventListener('click', () => {
			confirm('Do you really want to continue without updating?') &&
				fullscreenBlock.remove();
		});

	warnInConsole();
	setTimeout(warnInConsole, 5000);
};

document.addEventListener('DOMContentLoaded', openPopup);
