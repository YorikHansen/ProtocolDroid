const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'visible-comments',
	(_$, cm, md, ns) => {
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

		@media print {
			.comment {
				display: none !important;
			}
		}
	`);

		if (Setting.get([ns, 'hover-opens-comments']).value) {
			GM_addStyle(`
		
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
		`);
		}

		const proxy = (tokens, idx, options, _env, self) =>
			self.renderToken(tokens, idx, options);
		const defaultHTMLBlockRenderer = md.renderer.rules.html_block || proxy;
		const defaultHTMLInlineRenderer = md.renderer.rules.html_inline || proxy;

		// Comments have the form `<!-- comment ~author -->`.
		//  There MUST be at least one white space (`\s`) before the `~`.
		//  The author MAY NOT start with a `~`.
		//  The author and the comment MAY NOT contain `-->`.
		//  The comment and the author MUST have at least one non-white space character.
		// TODO: <!-- - ~...--> is valid, but not recognized due to `- ` being used as a comment, so the required white space is not recognized
		const isComment =
			/<!--\s*((?:[^-\s]|-[^-]|--[^>])(?:[^-]|-[^-]|--[^>])*)\s+~\s*((?:[^~-\s\n]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*)\s*-->/;
		const isComments =
			/(?:(?:<!--\s*((?:[^-\s]|-[^-]|--[^>])(?:[^-]|-[^-]|--[^>])*)\s+~\s*((?:[^~-\s\n]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*)\s*-->)\s*)+/; // For bundling

		// TODO: Fix error with indented html_blocks
		md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
			let content = tokens[idx].content;

			if (content.search(isComment) < 0) {
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
			let i = content.search(isComment);
			while (i >= 0) {
				let match = content.match(isComment);
				transformed += content.slice(0, i);
				transformed += `<span class="comment" data-opened="${Setting.get([ns, 'comment-opened-default']).value}"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${md.utils.escapeHtml(match[1].trim())}</span><span class="comment-author">${md.utils.escapeHtml(match[2].trim())}</span></span>`;
				content = content.slice(i + match[0].length);
				i = content.search(isComment);
			}
			transformed += content;

			tokens[idx].content =
				`<p class="part" data-startline="${tokens[idx].map[0] + 1}" data-endline="${tokens[idx].map[1]}">${transformed}</p>`;
			return defaultHTMLBlockRenderer(tokens, idx, options, env, self);
		};

		md.renderer.rules.html_inline = (tokens, idx, options, env, self) => {
			const match = tokens[idx].content.match(isComment);
			if (match) {
				return `<span class="comment" data-opened="${Setting.get([ns, 'comment-opened-default']).value}"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${md.utils.escapeHtml(match[1].trim())}</span><span class="comment-author">${md.utils.escapeHtml(match[2].trim())}</span></span>`;
			}
			return defaultHTMLInlineRenderer(tokens, idx, options, env, self);
		};

		if (!Setting.get([ns, 'original-comment-button']).value) {
			ProtocolDroid.getByQuery('#makeComment').then(button => {
				$('#makeComment').off('click');
				button.addEventListener('click', () => {
					const name = document
						.querySelector('.ui-user-item')
						.querySelector('.ui-user-name')
						.innerText.split(' ', 1)[0];
					const cursor = cm.getCursor();

					// TODO: If cursor is in visible-comment, add comment after the current one, if it is in a normal comment, add author to the end

					// TODO: respect cursor position

					if (cursorInHTMLComment(cm, cursor)) {
						cm.replaceRange(`--><!--  ~${name} --><!--`, cursor, cursor);
						cm.setCursor(cursor.line, cursor.ch + 8);
					} else {
						cm.replaceRange(`<!--  ~${name} -->`, cursor, cursor);
						cm.setCursor(cursor.line, cursor.ch + 5);
					}
					cm.focus();
				});
			});
		}

		document.addEventListener('click', event => {
			let target = event.target;
			while (target) {
				if (target.classList.contains('comment')) {
					target.dataset.opened =
						target.dataset.opened === 'true' ? 'false' : 'true';
				}
				target = target.parentElement;
			}
		});
	},
	[
		// new BooleanSetting('bundle-comments', false), // TODO: Implement this
		new BooleanSetting('original-comment-button', false),
		new BooleanSetting('comment-opened-default', false),
		new BooleanSetting('hover-opens-comments', true),
		// new BooleanSetting('markdown-in-comments', false), // TODO: Implement this
	],
).setDescription('Make comments visible in the editor');
