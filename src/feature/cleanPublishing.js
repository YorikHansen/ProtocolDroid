const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature('clean-publishing', (cm, _md, _ns) => {
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

	const cleanup = text => {
		// TODO: Don't remove stuff in code-blocks
		[
			// TODO: Move this to options
			text => {
				// cleanupComments
				return text.replace(/<!--.*?-->/gs, '');
			},
			text => {
				// cleanupAbbreveations
				return text
					.replace(/\*\[[^\n]+?\]: .+?\n/gs, '')
					.replace(/\*\[[^\n]+?\]: [^\n]+$/gs, '');
			},
			text => {
				// cleanupBlocks
				return text.replace(/:::.*\n[\s\S]*?\n:::/gs, '');
			},
			text => {
				// cleanupEmojis
				return text.replace(/:\S+:/g, '');
			},
			text => {
				// cleanupYAML
				return text.replace(/^---\n[\s\S]*?\n---/gs, '');
			},
			text => {
				// cleanupHTML
				// TODO: Should this also remove the content?
				return text.replace(/(?:<(?:[^>]+)>)/gi, '');
			},
			text => {
				// cleanupWhitespaceBeginningAndEnd
				return text.replace(/^\s+|\s+$/g, '');
			},
			text => {
				// removeMultipleNewlines
				return text.replace(/\n\n+/g, '\n\n');
			},
		].forEach(cleanupFn => {
			text = cleanupFn(text);
		});
		return text;
	};

	const publishButtons = document.querySelectorAll('.ui-publish');
	publishButtons.forEach(publishButton => {
		// Store original attributes
		const originalLink = {
			href: publishButton.href,
			target: publishButton.target,
			rel: publishButton.rel,
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

		publishButton.innerHTML =
			'<i class="fa fa-upload fa-fw"></i> Veröffentlichen';

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
			downloadButton.href =
				'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
		};

		cm.on('change', updateCode);
		preElement.appendChild(codeElement);
		modalContent.appendChild(preElement);

		// Append modal to body
		let modal = ProtocolDroid.addModal(
			'pd-publish-modal',
			modalTitle,
			modalContent,
			[closeButton, downloadButton],
		);
		$(modal).on('shown.bs.modal', updateCode);

		document.body.appendChild(modal);
	});
}).setDescription(
	'Modify the publish button to open a dialog with a cleaned version of the document ' +
		'because our protocol parser is not able to handle most of the HedgeDoc/ProtocolDroid features.',
);
