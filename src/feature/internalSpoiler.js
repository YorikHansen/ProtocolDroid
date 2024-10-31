const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'internal-spoiler',
	(_cm, md, ns) => {
		if (Setting.get([ns, 'blur']).value) {
			GM_addStyle(`
				@media not print {
					.spoiler:not(:hover):not([data-open]) {
						filter: blur(5px);
					}

					.spoiler::marker {
						filter: blur(0px);
					}
				}
			`);
		} else {
			GM_addStyle(`
				@media not print {
					.spoiler {
						background-color: black;
						transition: background-color 0.5s;
					}

					.spoiler:not(:hover):not([data-open]), 
					.spoiler:not(:hover):not([data-open]) * {
						color: transparent !important;
					}

					.spoiler:hover, .spoiler[data-open] {
						background-color: #eee !important;
					}

					.spoiler::marker {
						color: #333 !important;
					}

					.night .spoiler, .night .spoiler[data-open] {
						background-color: black;
						transition: color 0.5s;
					}

					.night .spoiler:not(:hover), .night .spoiler:not(:hover) *,
					.night .spoiler[data-open], .night .spoiler[data-open] * {
						color: transparent !important;
					}

					.night .spoiler:hover,
					.night .spoiler[data-open] {
						background-color: black !important;
					}

					.night .spoiler::marker {
						color: #ededed !important;
					}
				}
			`);
		}

		const proxy = (tokens, idx, options, _env, self) =>
			self.renderToken(tokens, idx, options);
		const defaultListItemOpenRenderer =
			md.renderer.rules.list_item_open || proxy;
		// (?:[^-\n]|-[^-\n]|--[^>\n])*
		const isInternal = /^\[(?:intern(?:al)?|spoiler)\]\s*(\S.*)$/i;

		md.renderer.rules.list_item_open = (tokens, idx, options, env, self) => {
			// list
			if (
				tokens[idx + 1] &&
				tokens[idx + 1].type === 'paragraph_open' &&
				tokens[idx + 2] &&
				tokens[idx + 2].type === 'inline'
			) {
				let list_item_open = tokens[idx];
				let inline = tokens[idx + 2];

				let match = inline.content.match(isInternal);
				if (match) {
					inline.content = match[1];
					list_item_open.attrPush(['class', 'spoiler']);
				}
			}

			return defaultListItemOpenRenderer(tokens, idx, options, env, self);
		};

		document.addEventListener('click', e => {
			const nextSpoiler = e.target.closest('.spoiler');
			if (nextSpoiler) {
				if (nextSpoiler.hasAttribute('data-open')) {
					nextSpoiler.removeAttribute('data-open');
				} else {
					nextSpoiler.setAttribute('data-open', '');
				}
			}
		});
	},
	[new BooleanSetting('blur', false)],
).setDescription(
	'Blur or black out spoilers/internal notices in the generated HTML',
);
