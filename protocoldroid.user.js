// ==UserScript==
// @name            Protocol Droid
// @namespace       https://protocoldroid.yorik.dev/
// @version         0.0.2
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

class Setting {
    static SETTINGS = {};

    constructor(name, defaultValue, disabled = () => false) {
        this.name = Setting.#handleName(name);
        this.defaultValue = defaultValue;
        this.disabled = disabled;

        this.value = defaultValue;
    }

    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }

    toNamespace(ns = 'protocoldroid') {
        ns = Setting.#handleName(ns);
        this.name = Setting.#handleName([ns, this.name]);
        return this;
    }

    getDOMElement() {
        let elem = document.createElement('input');
        elem.value = this.value;
        elem.disabled = this.disabled(Setting.SETTINGS);
        return elem;
    }

    static add(setting) {
        Setting.SETTINGS[setting.name] = setting;
    }
    static get(name) {
        // TODO: Check if the setting exists
        name = Setting.#handleName(name);
        return Setting.SETTINGS[name];
    }
    static set(name, value) {
        // TODO: Check if the setting exists and if the value is of the correct type
        name = Setting.#handleName(name);
        Setting.SETTINGS[name].value = value;
    }

    static bundleHTML() { // TODO
        let html = '';
        for (let setting in Setting.SETTINGS) {
            html += `<div class="form-group"><label for="${setting}">${setting}</label>${Setting.SETTINGS[setting].getDOMElement().outerHTML}</div>`;
        }
        return html;
    }

    static #handleName(name) {
        if (Array.isArray(name)) {
            name = name.join('.');
        }
        if (!name.startsWith('protocoldroid.')) {
            name = 'protocoldroid.' + name;
        }
        return name;
    }
}

class BooleanSetting extends Setting {

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
            option.toNamespace(this.name).setDisabled(
                () => !Setting.get(['features', this.name]).value
            )
        ));

        return Feature.add(this);
    }

    load(cm, md, ns) {
        if (Setting.get(['features', this.name]).value) {
            this.code(cm, md, [ns, this.name]);
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
        Feature.FEATURES.forEach(feature => feature.load(cm, md, 'protocoldroid'));
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
    let modalTitle = document.createElement('h4');
    modalTitle.classList.add('modal-title');
    modalTitle.id = id + '-label';
    modalTitle.innerText = title;
    modalHeader.appendChild(modalTitle);
    modalContent.appendChild(modalHeader);
    if (content instanceof HTMLElement) {
        console.log('HTMLElement');
        content.classList.add('modal-body');
        modalContent.appendChild(content);
    } else {
        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.innerHTML = content;
        modalContent.appendChild(modalBody);
    }
    let modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    buttons.forEach(button => {
        switch (button) {
            case 'close':
                let closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.classList.add('btn', 'btn-default');
                closeButton.setAttribute('data-dismiss', 'modal');
                closeButton.innerText = 'Schließen';
                modalFooter.appendChild(closeButton);
                break;
            case 'reset':
                let resetButton = document.createElement('button');
                resetButton.type = 'button';
                resetButton.classList.add('btn', 'btn-danger');
                resetButton.innerText = 'Zurücksetzen';
                modalFooter.appendChild(resetButton);
                break;
            case 'delete':
                let deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.classList.add('btn', 'btn-danger');
                deleteButton.innerText = 'Löschen';
                modalFooter.appendChild(deleteButton);
                break;
            case 'save':
                let saveButton = document.createElement('button');
                saveButton.type = 'button';
                saveButton.classList.add('btn', 'btn-primary');
                saveButton.innerText = 'Speichern';
                modalFooter.appendChild(saveButton);
                break;
            default:
                break;
        }
    });
    modalContent.appendChild(modalFooter);
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

    // Settings modal
    let modalContent = document.createElement('div');
    modalContent.innerHTML = Setting.bundleHTML();

    let modal = addModal('pd-settings-modal', 'Einstellungen', modalContent, ['close', 'reset', 'save']);
    document.body.appendChild(modal); // TODO: The buttons don't work yet

    // Settings button
    let button = document.createElement('ul');
    button.classList.add('nav', 'navbar-nav', 'navbar-form', 'navbar-right');
    button.style = 'padding: 0;'
    button.innerHTML = '<span class="btn btn-link btn-file ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></span>';

    getByQuery('.nav.navbar-nav.navbar-right').then(elem => elem.after(button));
};


new Feature('visible-comments', (_cm, md, _ns) => {
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
            
            .comment:hover,
            .comment[data-opened="true"] {
                user-select: auto;
            }
            
            .comment:hover::before,
            .comment[data-opened="true"]::before {
                content: '<!-- '
            }
            
            .comment:hover::after,
            .comment[data-opened="true"]::after {
                content: ' -->'
            }
            
            .comment *:not(.comment-icon) {
                display: none;
            }
            
            .comment:hover *:not(.comment-icon),
            .comment[data-opened="true"] *:not(.comment-icon) {
                display: initial;
            }
            
            .comment:hover .comment-icon,
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
        `);

    const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
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

    getByQuery('#makeComment').then((button) => {
        $('#makeComment').off('click');
        button.addEventListener('click', () => {
            const name = document.querySelector('.ui-user-item').querySelector('.ui-user-name').innerText.split(' ', 1)[0];
            const cm = unsafeWindow.editor;
            const cursor = cm.getCursor();

            cm.replaceRange(`<!--  ~${name} -->`, cursor, cursor);
            cm.setCursor(cursor.line, cursor.ch + 5);
            cm.focus();
        });
    });

    document.addEventListener('click', (event) => {
        let target = event.target;
        while (target) {
            if (target.classList.contains('comment')) {
                target.dataset.opened = target.dataset.opened === 'true' ? 'false' : 'true';
            }
            target = target.parentElement;
        }
    });
}).setDescription('Make comments visible in the editor').register();

new Feature('markdownit-tweaks', (_cm, md, ns) => {
    // Add custom markdown to the renderer
    if (Setting.get([ns, 'german-quotes'])) {
        md.options.quotes = '„“‚‘';  // German quotes
    }
}, [ // Options
    new BooleanSetting('german-quotes', true)
]).setDescription('Small tweaks for MarkdownIt').register();

new Feature('drag-n-drop-email', (cm, _md) => {
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
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.addEventListener('load', () => {
                let [header_section, message_body] = reader.result.split(/\r\n\r\n/);
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
                    // TODO: Insert at given mark, not at cursor
                    let coords = cloneInto({ 'left': e.x, 'top': e.y }, window, { cloneFunctions: false });
                    cm.replaceRange(line, cm.coordsChar(coords, 'window'));
                });
            }
        }
    }

    cm.on('drop', dropHandler);
}).setDescription('Drag and drop emails into the editor').register();


(function () {
    'use strict';
    console.log('Hello World!')

    addSettingMenu();

    getCodeMirror().then((cm) => {
        console.log('CodeMirror found');
        getMardownIt().then((md) => {
            console.log('MarkdownIt found');
            Feature.loadAll(cm, md);
        });
    });
})();