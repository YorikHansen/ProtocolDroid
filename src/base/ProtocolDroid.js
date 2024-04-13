const Setting = require('./Setting.js');
const BooleanSetting = require('./BooleanSetting.js');
const StringSetting = require('./StringSetting.js');
const Feature = require('./Feature.js');

// TODO: Check for updates
// TODO: Check if not on login page
// TODO: Document code
// TODO: Ctrl + # to comment out selected lines (replace <!-- and --> with <\!-- and --\>) and vice versa
// TODO: Move settings menu to feature (?) // But how would one reenable it?
// TODO: Make less verbose
// TODO: Feature auto-top-numbers
// TODO: Feature codemirror-commands
// TODO: Feature user-mentions


class ProtocolDroid {
	static getByQuery = (query) => {
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
	
	static getCodeMirror = () => {
		return new Promise((resolve, _reject) => {
			const interval = setInterval(() => {
				if (unsafeWindow.editor) {
					clearInterval(interval);
					resolve(unsafeWindow.editor);
				}
			}, 100);
		});
	};
	
	static getMardownIt = () => {
		return new Promise((resolve, _reject) => {
			const interval = setInterval(() => {
				if (unsafeWindow.md) {
					clearInterval(interval);
					resolve(unsafeWindow.md);
				}
			}, 100);
		});
	};
	
	static addModal = (id, title, content, buttons) => {
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
	// TODO: Import & Export from/to JSON
	static addSettingMenu = () => {
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
	
		let disclaimer = document.createElement('div');
		disclaimer.innerHTML = '<em>WORK IN PROGRESS</em><hr>';
		modalContent.prepend(disclaimer);
	
		let closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.classList.add('btn', 'btn-default');
		closeButton.setAttribute('data-dismiss', 'modal');
		closeButton.innerText = 'Abbrechen';
		closeButton.addEventListener('click', () => {
			Setting.cancelAll();
		});
	
		let resetButton = document.createElement('button');
		resetButton.type = 'button';
		resetButton.classList.add('btn', 'btn-danger');
		resetButton.innerText = 'Zurücksetzen';
		resetButton.addEventListener('click', () => {
			Setting.resetAll();
		});
	
		let saveButton = document.createElement('button');
		saveButton.type = 'button';
		saveButton.classList.add('btn', 'btn-primary');
		saveButton.innerText = 'Speichern';
		saveButton.addEventListener('click', () => {
			Setting.commitAll();
			window.location.reload();
		});
	
		let modal = ProtocolDroid.addModal('pd-settings-modal', 'Einstellungen', modalContent, [closeButton, resetButton, saveButton]);
		document.body.appendChild(modal);
	
		// Settings button
		let button = document.createElement('ul');
		button.classList.add('nav', 'navbar-nav', 'navbar-form', 'navbar-right');
		button.style = 'padding: 0;'
		button.innerHTML = '<span class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></span>';
	
		let mobileButton = document.createElement('div');
		mobileButton.classList.add('nav-mobile', 'pull-right', 'visible-xs');
		mobileButton.innerHTML = '<a class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></a>';
	
		ProtocolDroid.getByQuery('.nav.navbar-nav.navbar-right').then(elem => elem.after(button));
		ProtocolDroid.getByQuery('.nav-mobile.pull-right.visible-xs').then(elem => elem.before(mobileButton));
	};
	
	static cursorInHTMLComment = (cm, cursor) => {
		const start = cursor.line;
		let i = start + 1;
		let inComment = undefined;
		let line, commentStart, commentEnd;
		while (i > 0 && inComment === undefined) {
			i--;
			line = cm.getLine(i);
			if (i === start) {
				line = line.slice(0, cursor.ch);
			}
			commentStart = line.lastIndexOf('<!--');
			commentEnd = line.lastIndexOf('-->');
			if (commentStart >= 0 && commentEnd >= 0) {
				return commentStart > commentEnd;
			}
			if (commentStart >= 0) {
				return true;
			}
			if (commentEnd >= 0) {
				return false;
			}
		}
	};
}

module.exports = ProtocolDroid;