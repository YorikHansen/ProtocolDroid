// ==UserScript==
// @name            Protocol Droid
// @namespace       https://protocoldroid.yorik.dev/
// @version         0.0.7
// @description     A client side HedgeDoc extension that helps with protocols.
// @author          Yorik Hansen
// @homepage        https://github.com/YorikHansen/ProtocolDroid
// @homepageURL     https://github.com/YorikHansen/ProtocolDroid
// @updateURL       https://github.com/YorikHansen/ProtocolDroid/raw/main/protocoldroid.user.js
// @downloadURL     https://github.com/YorikHansen/ProtocolDroid/raw/main/protocoldroid.user.js
// @icon            https://www.fs-infmath.uni-kiel.de/codimd/icons/favicon.ico
// @match           https://www.fs-infmath.uni-kiel.de/codimd/*
// @match           https://codimd.fs-infmath.uni-kiel.de/*
// @match           https://md.kif.rocks/*
// @match           https://md.fachschaften.org/*
// @run-at          document-body
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @connect         www.fs-infmath.uni-kiel.de
// ==/UserScript==

// TODO: Check if not on login page
// TODO: Document code
// TODO: Move settings menu to feature (?) // But how would one reenable it?

class Setting { // TODO: Load from storage
	static _SETTINGS = {};

	_name;
	_defaultValue;
	_value;
	_liveValue;

	_input = document.createElement('input');
	_disabledFn = () => false;

	constructor(name, defaultValue) {
		if (this.constructor === Setting) {
			throw new TypeError(
				'Cannot create instance of abstract class Setting'
			);
		}

		this._name = Setting.#handleName(name);
		this._defaultValue = defaultValue;

		this._value = this._defaultValue;
		this._liveValue = this._value;
	}

	setDisabledFn(disabledFn) {
		this._disabledFn = disabledFn;
		return this;
	}

	toNamespace(ns) {
		ns = Setting.#handleName(ns);
		this._name = Setting.#handleName([ns, this._name]);
		return this;
	}

	_prepareInputElement() {
		this._input.id = this._name;
		this._input.disabled = this._disabledFn(Setting._SETTINGS);
		this._input.value = this._liveValue;

		this._input.addEventListener('change', () => {
			this._liveValue = this._input.value;
		});
	}

	getDOMElement() {
		let label = document.createElement('label');
		label.htmlFor = this._name;
		label.innerText = this._name;

		this._prepareInputElement();
		this._input.addEventListener('change', () => {
			for (let setting in Setting._SETTINGS) {
				Setting._SETTINGS[setting]._input.disabled = Setting._SETTINGS[setting]._disabledFn(Setting._SETTINGS);
			}
		});

		let div = document.createElement('div');
		div.appendChild(label);
		div.appendChild(this._input);
		return div;
	}

	static add(setting) {
		Setting._SETTINGS[setting._name] = setting;
	}

	static get(name) {
		// TODO: Check if the setting exists
		name = Setting.#handleName(name);
		return {
			value: Setting._SETTINGS[name]._value,
			defaultValue: Setting._SETTINGS[name]._defaultValue,
			liveValue: Setting._SETTINGS[name]._liveValue
		};
	}

	static set(name, value) {
		// TODO: Check if the setting exists and if the value is of the correct type
		name = Setting.#handleName(name);
		Setting._SETTINGS[name]._liveValue = value;
	}

	static reset(name) {
		name = Setting.#handleName(name);
		Setting.set(name, Setting.get(name).defaultValue);
	}

	static commit(name) {
		name = Setting.#handleName(name);
		Setting._SETTINGS[name]._value = Setting._SETTINGS[name]._liveValue;
	}

	static resetAll() {
		for (let setting in Setting._SETTINGS) {
			Setting.reset(setting);
		}
	}

	static commitAll() {
		for (let setting in Setting._SETTINGS) {
			Setting.commit(setting);
		}
	}

	static bundleHTML() { // TODO: Ordering
		let html = document.createElement('div');
		for (let setting in Setting._SETTINGS) {
			html.appendChild(Setting._SETTINGS[setting].getDOMElement());
		}
		return html;
	}

	static #handleName(name) {
		if (Array.isArray(name)) {
			name = name.join('.');
		}
		return name;
	}
}

class BooleanSetting extends Setting {
	constructor(name, defaultValue) {
		super(name, defaultValue);
	}

	_prepareInputElement() {
		this._input.id = this._name;
		this._input.disabled = this._disabledFn(Setting._SETTINGS);
		this._input.type = 'checkbox';
		this._input.checked = this._liveValue;

		this._input.addEventListener('change', () => {
			this._liveValue = this._input.checked;
		});
	}
}

class StringSetting extends Setting {
	constructor(name, defaultValue) {
		super(name, defaultValue);
	}

	_prepareInputElement() {
		this._input.id = this._name;
		this._input.disabled = this._disabledFn(Setting._SETTINGS);
		this._input.type = 'text';
		this._input.value = this._liveValue;

		this._input.addEventListener('change', () => {
			this._liveValue = this._input.value;
		});
	}
}


class Feature {
	static FEATURES = [];

	constructor(name, code, options = [], enabledByDefault = true) {
		if (!name.match(/^[a-z][a-z0-9]*(?:\-[a-z0-9]+)+$/i)) {
			throw new Error('Feature names must only contain letters, numbers and hyphens. They must start with a letter, have at least one hyphen and may not end with a hyphen.');
		}
		this.name = name;
		this.code = code;

		this.options = options;
		this.enabledByDefault = enabledByDefault;

		this.description = '';
	}

	register() {
		Setting.add(
			new BooleanSetting(['features', this.name], this.enabledByDefault)
		);
		this.options.forEach(option => Setting.add(
			option.toNamespace(this.name).setDisabledFn(
				() => !Setting.get(['features', this.name]).liveValue
			)
		));

		return Feature.add(this);
	}

	load(cm, md, _ns) {
		if (Setting.get(['features', this.name]).value) {
			this.code(cm, md, [this.name]);
			console.log(`Feature ${this.name} loaded`);
		}
	}

	setDescription(description) {
		this.description = description;
		return this;
	};

	static add(feature) {
		Feature.FEATURES.push(feature);
	}

	static loadAll(cm, md) {
		Feature.FEATURES.forEach(feature => feature.load(cm, md, ''));
	}
}


const getByQuery = (query) => {
	return new Promise((resolve, _reject) => {
		const interval = setInterval(() => {
			const el = document.querySelector(query);
			if (el) {
				clearInterval(interval);
				resolve(el);
			}
		}, 100);
	});
};

const getCodeMirror = () => {
	return new Promise((resolve, _reject) => {
		const interval = setInterval(() => {
			if (unsafeWindow.editor) {
				clearInterval(interval);
				resolve(unsafeWindow.editor);
			}
		}, 100);
	});
};

const getMardownIt = () => {
	return new Promise((resolve, _reject) => {
		const interval = setInterval(() => {
			if (unsafeWindow.md) {
				clearInterval(interval);
				resolve(unsafeWindow.md);
			}
		}, 100);
	});
};

const addModal = (id, title, content, buttons) => {
	let modal = document.createElement('div');
	modal.classList.add('modal', 'fade');
	modal.id = id;
	modal.tabIndex = -1;
	modal.role = 'dialog';
	modal.setAttribute('aria-labelledby', id + '-label');
	modal.setAttribute('aria-hidden', 'true');
	let modalDialog = document.createElement('div');
	modalDialog.classList.add('modal-dialog', 'modal-lg');
	modalDialog.role = 'document';
	let modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');
	let modalHeader = document.createElement('div');
	modalHeader.classList.add('modal-header');
	let closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.classList.add('close');
	closeButton.setAttribute('data-dismiss', 'modal');
	closeButton.setAttribute('aria-label', 'Close');
	closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
	modalHeader.appendChild(closeButton);

	if (title instanceof HTMLElement) {
		if (!title.classList.contains('modal-header')) {
			title.classList.add('modal-title');
			title.id = id + '-label';
			modalHeader.appendChild(title);
		} else {
			modalHeader = title;
		}
	} else {
		let modalTitle = document.createElement('h4');
		modalTitle.classList.add('modal-title');
		modalTitle.id = id + '-label';
		modalTitle.innerText = title;
		modalHeader.appendChild(modalTitle);
	}
	modalContent.appendChild(modalHeader);
	if (content instanceof HTMLElement) {
		content.classList.add('modal-body');
		modalContent.appendChild(content);
	} else {
		let modalBody = document.createElement('div');
		modalBody.classList.add('modal-body');
		modalBody.innerHTML = content;
		modalContent.appendChild(modalBody);
	}
	if (buttons instanceof HTMLElement) {
		buttons.classList.add('modal-footer');
		modalContent.appendChild(buttons);
	} else {
		let modalFooter = document.createElement('div');
		modalFooter.classList.add('modal-footer');
		buttons.forEach(button => modalFooter.appendChild(button));
		modalContent.appendChild(modalFooter);
	}
	modalDialog.appendChild(modalContent);
	modal.appendChild(modalDialog);
	return modal;
}

// TODO: Somehow respect global, instance and document settings
// Document settings are most important, they are stored in the yaml-part
// Instance settings are stored in the localStorage
// Global settings are stored in the GM storage
const addSettingMenu = () => {
	console.log('Adding settings menu');

	GM_addStyle(`
		#short-online-user-list {
			line-height: 1;
		}
		@media (max-width: 821px) {
			.navbar-collapse.collapse {
				display: none !important;
			}
			.visible-xs {
				display: block !important;
			}
			.navbar-header {
				float: none;
			}
		}
	`);

	// Settings modal
	let modalContent = Setting.bundleHTML();

	// TODO: Enable settings (when implemented)
	modalContent = document.createElement('div');
	modalContent.innerHTML = '<i>Coming soon</i>';

	let closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.classList.add('btn', 'btn-default');
	closeButton.setAttribute('data-dismiss', 'modal');
	closeButton.innerText = 'Schließen';

	let resetButton = document.createElement('button');
	resetButton.type = 'button';
	resetButton.classList.add('btn', 'btn-danger');
	resetButton.innerText = 'Zurücksetzen';

	let saveButton = document.createElement('button');
	saveButton.type = 'button';
	saveButton.classList.add('btn', 'btn-primary');
	saveButton.innerText = 'Speichern';

	let modal = addModal('pd-settings-modal', 'Einstellungen', modalContent, [closeButton/*, resetButton, saveButton*/]);
	document.body.appendChild(modal); // TODO: The buttons don't work yet

	// Settings button
	let button = document.createElement('ul');
	button.classList.add('nav', 'navbar-nav', 'navbar-form', 'navbar-right');
	button.style = 'padding: 0;'
	button.innerHTML = '<span class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></span>';

	let mobileButton = document.createElement('div');
	mobileButton.classList.add('nav-mobile', 'pull-right', 'visible-xs');
	mobileButton.innerHTML = '<a class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></a>';

	getByQuery('.nav.navbar-nav.navbar-right').then(elem => elem.after(button));
	getByQuery('.nav-mobile.pull-right.visible-xs').then(elem => elem.before(mobileButton));
};


new Feature('custom-logo-overlay', (_cm, _md, ns) => {
	GM_addStyle(`
		.custom-logo-overlay {
			transform: translateY(-100%);
		}
	`);

	let logoNoNight = document.createElement('img');
	logoNoNight.classList.add('h-100', 'custom-logo-overlay', 'no-night');
	logoNoNight.src = Setting.get([ns, 'url-no-night']).value;
	document.querySelector('.header-brand').append(logoNoNight);

	let logoNight = document.createElement('img');
	logoNight.classList.add('h-100', 'custom-logo-overlay', 'night')
	logoNight.src = Setting.get([ns, 'url-night']).value;
	document.querySelector('.header-brand').append(logoNight);
}, [
	new StringSetting('url-no-night', 'https://protocoldroid.yorik.dev/shades-no-night.svg'),
	new StringSetting('url-night', 'https://protocoldroid.yorik.dev/shades-night.svg')
], true).setDescription('Add a custom logo overlay').register(); // TODO: set default to false (because privacy)

new Feature('todo-notes', (_cm, md, _ns) => {
	GM_addStyle(`
		.todo-note {
			color: #eda35e;
		}

		.todo-text::before {
			content: 'TODO: ';
			font-weight: bold;
		}

		.todo-text.empty::before {
			content: 'TODO';
		}

		@media print {
			.todo-note {
				display: none !important;
			}
		}
	`);

	const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
	const defaultHTMLBlockRenderer = md.renderer.rules.html_block || proxy;
	const defaultHTMLInlineRenderer = md.renderer.rules.html_inline || proxy;

	const is_todo = /<!--\s*(?:\[TODO\]|TODO):?\s*(\S.*\S | \S)?\s*-->/i;

	md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
		let content = tokens[idx].content;

		if (content.search(is_todo) < 0) {
			return defaultHTMLBlockRenderer(tokens, idx, options, env, self);
		}

		let transformed = '';
		let i = content.search(is_todo);
		while (i >= 0) {
			let match = content.match(is_todo);
			transformed += content.slice(0, i);
			if (match[1]) {
				transformed += `<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${md.utils.escapeHtml(match[1].trim())}</span></span>`;
			} else {
				transformed += `<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>`;
			}
			content = content.slice(i + match[0].length);
			i = content.search(is_todo);
		}
		transformed += content;

		tokens[idx].content = `<p class="part" data-startline="${tokens[idx].map[0] + 1}" data-endline="${tokens[idx].map[1]}">${transformed}</p>`;
		return defaultHTMLBlockRenderer(tokens, idx, options, env, self);
	};

	md.renderer.rules.html_inline = (tokens, idx, options, env, self) => {
		const match = tokens[idx].content.match(is_todo);
		if (match) {
			if (match[1]) {
				return `<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${md.utils.escapeHtml(match[1].trim())}</span></span>`;
			}
			return `<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>`;
		}
		return defaultHTMLInlineRenderer(tokens, idx, options, env, self)
	}

	// TODO: What about <!-- TODO: somethin ~my-name -->? Is this a comment, a TODO or a TODO-comment?
}).setDescription('Highlight TODO notes in the editor').register();

new Feature('visible-comments', (_cm, md, ns) => {
	GM_addStyle(`
			.comment {
				user-select: none;
				filter: opacity(0.5);
				display: inline;
			}

			.comment::before,
			.comment::after {
				white-space: nowrap;
			}

			.comment-block {
				display: block;
			}

			.comment[data-opened="true"] {
				user-select: auto;
			}

			.comment[data-opened="true"]::before {
				content: '<!-- ';
			}

			.comment[data-opened="true"]::after {
				content: ' -->';
			}

			.comment *:not(.comment-icon) {
				display: none;
			}

			.comment[data-opened="true"] *:not(.comment-icon) {
				display: initial;
			}

			.comment[data-opened="true"] .comment-icon {
				display: none;
			}

			.comment .comment-author {
				font-style: italic;
			}

			.comment .comment-author::before {
				content: "~";
			}

			.comment .comment-content::after {
				content: " ";
			}

			@media (hover: hover) {
				.comment:hover {
					user-select: auto;
				}

				.comment:hover::before {
					content: '<!-- ';
				}

				.comment:hover::after {
					content: ' -->';
				}

				.comment:hover *:not(.comment-icon) {
					display: initial;
				}

				.comment:hover .comment-icon {
					display: none;
				}
			}

			@media print {
				.comment {
					display: none !important;
				}
			}
		`);

	const proxy = (tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options);
	const defaultHTMLBlockRenderer = md.renderer.rules.html_block || proxy;
	const defaultHTMLInlineRenderer = md.renderer.rules.html_inline || proxy;

	// Comments have the form `<!-- comment ~author -->`. 
	//  There MUST be at least one white space (`\s`) before the `~`. 
	//  The author MAY NOT start with a `~`. 
	//  The author and the comment MAY NOT contain `-->`.
	//  The comment and the author MUST have at least one non-white space character.
	// TODO: <!-- - ~...--> is valid, but not recognized due to `- ` being used as a comment, so the required white space is not recognized
	const is_comment = /<!--\s*((?:[^-\s]|-[^-]|--[^>])(?:[^-]|-[^-]|--[^>])*)\s+~\s*((?:[^~-\s\n]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*)\s*-->/;


	// TODO: Fix error with indented html_blocks
	md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
		let content = tokens[idx].content;

		if (content.search(is_comment) < 0) {
			// if (content.startsWith('<!--')) {
			// 	tokens[idx].content = `<p>${content}</p>`;
			// }
			// TODO: Get this right, then uncomment the previous lines
			// tokens[idx].attrJoin('class', 'part');
			// tokens[idx].attrJoin('data-startline', tokens[idx].map[0] + 1);
			// tokens[idx].attrJoin('data-endline', tokens[idx].map[1]);

			return defaultHTMLBlockRenderer(tokens, idx, options, env, self);
		}

		let transformed = '';
		let i = content.search(is_comment);
		while (i >= 0) {
			let match = content.match(is_comment);
			transformed += content.slice(0, i);
			transformed += `<span class="comment"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${md.utils.escapeHtml(match[1].trim())}</span><span class="comment-author">${md.utils.escapeHtml(match[2].trim())}</span></span>`;
			content = content.slice(i + match[0].length);
			i = content.search(is_comment);
		}
		transformed += content;

		tokens[idx].content = `<p class="part" data-startline="${tokens[idx].map[0] + 1}" data-endline="${tokens[idx].map[1]}">${transformed}</p>`;
		return defaultHTMLBlockRenderer(tokens, idx, options, env, self);
	};

	md.renderer.rules.html_inline = (tokens, idx, options, env, self) => {
		const match = tokens[idx].content.match(is_comment);
		if (match) {
			return `<span class="comment"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${md.utils.escapeHtml(match[1].trim())}</span><span class="comment-author">${md.utils.escapeHtml(match[2].trim())}</span></span>`;
		}
		return defaultHTMLInlineRenderer(tokens, idx, options, env, self)
	};

	if (Setting.get([ns, 'original-comment-button']).value) {
		getByQuery('#makeComment').then((button) => {
			$('#makeComment').off('click');
			button.addEventListener('click', () => {
				const name = document.querySelector('.ui-user-item').querySelector('.ui-user-name').innerText.split(' ', 1)[0];
				const cm = unsafeWindow.editor;
				const cursor = cm.getCursor();

				// TODO: If cursor is in visible-comment, add comment after the current one, if it is in a normal comment, add author to the end

				cm.replaceRange(`<!--  ~${name} -->`, cursor, cursor);
				cm.setCursor(cursor.line, cursor.ch + 5);
				cm.focus();
			});
		});
	}

	document.addEventListener('click', (event) => {
		let target = event.target;
		while (target) {
			if (target.classList.contains('comment')) {
				target.dataset.opened = target.dataset.opened === 'true' ? 'false' : 'true';
			}
			target = target.parentElement;
		}
	});
}, [
	new BooleanSetting('bundle-comments', false), // TODO: Implement this
	new BooleanSetting('original-comment-button', false) // TODO: Implement this
]).setDescription('Make comments visible in the editor').register();

new Feature('markdownit-tweaks', (_cm, md, ns) => {
	// Add custom markdown to the renderer
	if (Setting.get([ns, 'german-quotes'])) {
		md.options.quotes = '„“‚‘';  // German quotes
	}
}, [
	new BooleanSetting('german-quotes', true)
]).setDescription('Small tweaks for MarkdownIt').register();

new Feature('drag-n-drop-email', (cm, _md, ns) => {
	const rfc2047Decode = (encoded) => {
		let decoded = '';
		for (let i = 0; i < encoded.length; i++) {
			let char = encoded[i];
			if (char === '=') {
				// =?charset?encoding?text?= -> charset, encoding, text
				let [charset, encoding, text] = encoded.slice(i + 2).split('?', 3);
				let j = charset.length + encoding.length + text.length + 5; // =? + ? + ? + ?=

				let textDecoder = new TextDecoder(charset);
				let bytes;
				switch (encoding.toUpperCase()) {
					case 'B':
						let binary = atob(text);
						bytes = new Uint8Array(binary.length);
						for (let i = 0; i < binary.length; i++) {
							bytes[i] = binary.charCodeAt(i);
						}
						break;
					case 'Q':
						bytes = new Uint8Array(text.length - 2 * (text.split('=').length - 1));
						let j = 0;
						for (let i = 0; i < text.length; i++) {
							let byte = text.charCodeAt(i);
							switch (byte) {
								case 95: // _ -> space
									bytes[i - j] = 32;
									break;
								case 61: // =XX -> hex
									bytes[i - j] = parseInt(text.slice(i + 1, i + 3), 16);
									i += 2;
									j += 2;
									break;
								default: // ASCII
									bytes[i - j] = byte;
									break;
							}
						}
						break;
				}
				decoded += textDecoder.decode(bytes);
				i += j;
			} else {
				decoded += char;
			}
		}
		return decoded;
	};

	const handleEmail = (file) => {
		return new Promise((resolve, _reject) => {
			let reader = new FileReader();
			reader.addEventListener('load', () => {
				let [header_section, _message_body] = reader.result.split(/\r\n\r\n/);
				header_section = header_section.replaceAll(/\r\n\s+/g, ' ');
				let lines = header_section.split('\r\n');
				let headers = {};
				for (let j = 0; j < lines.length; j++) {
					let line = lines[j].trim();
					let [header_field, value] = line.split(/\:(.*)/s).map(s => s.trim());
					if (header_field) {
						headers[header_field] = value;
					}
				}
				let date = (new Date(headers['Date'])).toISOString().slice(0, 10);
				let subject = rfc2047Decode(headers['Subject']);
				// TODO: Make this a template
				// Only use vars: {{date}}, {{subject}}, {{from}}, {{to}}
				resolve(`- \`${date}\`: ${subject}\n`);
			}, false);
			reader.readAsText(file);
		});
	};

	const dropHandler = (cm, e) => {
		for (let file of e.dataTransfer.files) {
			if (file.type === 'message/rfc822') {
				e.preventDefault();
				handleEmail(file).then(line => {
					// TODO: Insert at given mark (<!-- [EMAILS] -->), not at cursor, if set in config
					let coords = cloneInto({ 'left': e.x, 'top': e.y }, window, { cloneFunctions: false });
					cm.replaceRange(line, cm.coordsChar(coords, 'window'));
				});
			}
		}
	}

	cm.on('drop', dropHandler);
}, [
	new StringSetting('email-template', '- `{{date}}`: {{subject}}\n'), // TODO: Implement this
	new BooleanSetting('fixed-position', false) // TODO: Implement this
]).setDescription('Drag and drop emails into the editor').register();


new Feature('print-style', (_cm, _md, ns) => {
	GM_addStyle(`
		@media print {
			abbr[title] {
				text-decoration: none;
			}
			abbr[title]::after {
				font-size: 12px !important;
			}
			.markdown-body h1 {
				font-size: 1.5em;
			}
			
			.markdown-body h2 {
				font-size: 1.25em;
				margin-bottom: 0;
				margin-top: 12px;
			}
			
			:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4) {
				margin-top: 0 !important;
				padding-top: 0 !important;
			}
			
			:is(h1, h2, h3, h4):has(+ :is(h1, h2, h3, h4)) {
				margin-bottom: 0 !important;
			}
			
			:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4)::before {
				display: none !important;
			}
			
			img {
				max-width: 15em !important;
			}
			
			abbr[title="Tagesordnungspunkt"]::after {
				display: none;
			}
			
			.markdown-body {
				font-size: 10pt;
				line-height: 1.125;
			}
			
			.markdown-body blockquote {
				font-size: 10.5pt;
				margin-bottom: 4px;
			}
			  
			.markdown-body li > p {
				margin-top: inherit;
				margin-bottom: inherit;
			}
			
			h1, h2,
			h2 + ul {
				page-break-before: auto;
				break-before: auto;
				page-break-after: avoid;
				break-before: avoid;
			}
		}
	`);
	if (Setting.get([ns, 'save-trees']).value) {
		GM_addStyle(`
			@media print {
				.markdown-body ul ul,
				.markdown-body ol ol {
					margin-left: 1em;
				}
			}
		`);
	}

	// TODO: Show abbr on first occurence, hide on second
}, [
	new BooleanSetting('save-trees', true)
]).setDescription('Add a print style').register();


new Feature('clean-publishing', (cm, _md, _ns) => {
	GM_addStyle(`
		.ui-publish-link {
			float: right;
			font-size: 0.7em;
			margin-top: 4px;
			margin-right: 8px;
		}

		.ui-publish-copy {
			float: right; 
			cursor: pointer;
			opacity: 0;
			transition: opacity 0.2s;
		}

		pre:hover .ui-publish-copy {
			opacity: 0.6;
		}
	`);


	const cleanup = (text) => {
		[ // TODO: Move this to options
			(text) => { // cleanupComments
				return text.replace(/<!--.*?-->/gs, '');
			},
			(text) => { // cleanupAbbreveations
				return text.replace(/\*\[[^\n]+?\]: .+?\n/gs, '');
			},
			(text) => { // cleanupBlocks
				return text.replace(/:::.*\n[\s\S]*?\n:::/gs, '');
			},
			(text) => { // cleanupEmojis
				return text.replace(/:\S+:/g, '');
			},
			(text) => { // cleanupYAML
				return text.replace(/^---\n[\s\S]*?\n---/gs, '');
			},
			(text) => { // cleanupHTML
				return text.replace(/(?:<(?:[^>]+)>)/gi, ''); // TODO: Should this also remove the content?
			},
			(text) => { // cleanupWhitespaceBeginningAndEnd
				return text.replace(/^\s+|\s+$/g, '');
			},
		].forEach((cleanupFn) => {
			text = cleanupFn(text);
		});
		return text;
	};

	const publishButtons = document.querySelectorAll('.ui-publish');
	publishButtons.forEach((publishButton) => {
		// Store original attributes
		const originalLink = {
			href: publishButton.href,
			target: publishButton.target,
			rel: publishButton.rel
		};

		// Remove original attributes
		publishButton.removeAttribute('href');
		publishButton.removeAttribute('target');
		publishButton.removeAttribute('rel');

		// Add modal attributes
		publishButton.classList.add('ui-publish');
		publishButton.title = 'Veröffentlichen';
		publishButton.setAttribute('data-toggle', 'modal');
		publishButton.setAttribute('data-target', '#pd-publish-modal');

		publishButton.innerHTML = '<i class="fa fa-upload fa-fw"></i> Veröffentlichen';

		// Add modal
		let modalTitle = document.createElement('h4');
		modalTitle.classList.add('modal-title');
		modalTitle.innerText = 'Veröffentlichen';

		let linkElement = document.createElement('a');
		linkElement.classList.add('ui-publish-link');
		linkElement.href = originalLink.href;
		linkElement.target = originalLink.target;
		linkElement.rel = originalLink.rel;
		linkElement.innerText = 'Default HedgeDoc publishing';
		modalTitle.appendChild(linkElement);

		let closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.classList.add('btn', 'btn-default');
		closeButton.setAttribute('data-dismiss', 'modal');
		closeButton.innerText = 'Schließen';

		let downloadButton = document.createElement('a');
		downloadButton.classList.add('btn', 'btn-primary');
		downloadButton.innerHTML = '<i class="fa fa-download"></i> Download';
		downloadButton.download = 'protocol.md';

		// TODO: Add copy to clipboard in top right corner
		let modalContent = document.createElement('div');
		let preElement = document.createElement('pre');

		let timeout;
		let copyElement = document.createElement('i');
		copyElement.classList.add('fa', 'fa-file-o', 'fa-fw', 'ui-publish-copy');
		copyElement.title = 'In Zwischenablage kopieren';
		copyElement.addEventListener('click', () => {
			if (timeout) {
				clearTimeout(timeout);
			}
			navigator.clipboard.writeText(cleanup(cm.getValue()));
			copyElement.classList.remove('fa-file-o');
			copyElement.classList.add('fa-check');
			timeout = setTimeout(() => {
				copyElement.classList.remove('fa-check');
				copyElement.classList.add('fa-file-o');
			}, 1000);
		});
		preElement.appendChild(copyElement);

		let codeElement = document.createElement('code');
		// codeElement.classList.add('md', 'hljs');  // TODO: highlight markdown

		const updateCode = () => {
			let text = cleanup(cm.getValue());
			codeElement.innerText = text;
			downloadButton.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
		};

		cm.on('change', updateCode);
		preElement.appendChild(codeElement);
		modalContent.appendChild(preElement);


		// Append modal to body
		let modal = addModal('pd-publish-modal', modalTitle, modalContent, [closeButton, downloadButton]);
		$(modal).on('shown.bs.modal', updateCode);

		document.body.appendChild(modal);
	});
}).setDescription(
	'Modify the publish button to open a dialog with a cleaned version of the document'
).register();

// TODO: Feature auto-top-numbers
// TODO: codemirror-commands
// TODO: user-mentions

(function () {
	'use strict';

	addSettingMenu();

	getCodeMirror().then((cm) => {
		console.log('CodeMirror found');
		getMardownIt().then((md) => {
			console.log('MarkdownIt found');
			Feature.loadAll(cm, md);
		});
	});
})();
