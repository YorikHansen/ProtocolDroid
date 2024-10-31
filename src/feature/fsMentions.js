// https://www.fs-infmath.uni-kiel.de/wiki/Aktive_Kommilitonen

const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const ColorSetting = require('../base/ColorSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'fs-mentions',
	($, _cm, md, ns) => {
		const me = Setting.get([ns, 'me']).value || '';

		let fsNames = GM_getValue(`${ns}.fsNames`, {});

		const fsNameMention = /([\s\S]+)\s\(([\S]+)\)/;
		new Promise((resolve, _reject) => {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://www.fs-infmath.uni-kiel.de/wiki/Aktive_Kommilitonen',
				onload: function (response) {
					const parser = new DOMParser();
					const doc = parser.parseFromString(
						response.responseText,
						'text/html',
					);
					const names = Array.from(doc.querySelectorAll('h3')).map(h3 =>
						h3.innerText.trim().match(fsNameMention),
					);
					resolve(names);
				},
			});
		})
			.then(names => {
				fsNames = names.reduce((acc, [_, name, username]) => {
					acc[username] = name;
					return acc;
				}, fsNames);
				GM_setValue(`${ns}.fsNames`, fsNames);
			})
			.then(() =>
				document.querySelectorAll('.mention').forEach(mention => {
					const username = mention.getAttribute('data-username');
					if (fsNames[username]) {
						mention.classList.remove('deactivated');
						mention.setAttribute('data-fsname', fsNames[username]);
						if (Setting.get([ns, 'tooltip']).value) {
							mention.setAttribute('data-toggle', 'tooltip');
							mention.setAttribute(
								'data-placement',
								Setting.get([ns, 'tooltip-placement']).value,
							);
							mention.setAttribute('data-original-title', fsNames[username]);
						}
					} else {
						mention.classList.add('deactivated');
					}
				}),
			)
			.then(() => {
				if (Setting.get([ns, 'tooltip']).value) {
					$('[data-toggle="tooltip"]').tooltip();
				}
			});

		const mentionColor = ColorSetting.toRGB(
			Setting.get([ns, 'mention-color']).value,
		).join(', ');
		const mentionHighlightColor = ColorSetting.toRGB(
			Setting.get([ns, 'mention-highlight-color']).value,
		).join(', ');

		GM_addStyle(`
			@media not print {
				.mention:not(.deactivated) {
					border-radius: 3px;
					padding: 0 2px;
					transition: background-color 50ms ease-out, color 50ms ease-out;
					cursor: pointer;

					color: rgb(var(--mention-color)) !important;
					background-color: rgba(var(--mention-color), 0.1) !important;
					--mention-color: ${mentionColor};
				}
				.mention:not(.deactivated):hover {
					text-decoration: underline;
					background-color: rgba(var(--mention-color), 0.3) !important;
				}
				
				.mention:not(.deactivated).me {
					--mention-color: ${mentionHighlightColor};
				}
			}

			.mention.frontAt::before {
				content: '@';
			}
			.mention.backAt::after {
				content: '@';
			}
		`);

		const proxy = (tokens, idx, options, _env, self) =>
			self.renderToken(tokens, idx, options);
		const defaultTextRenderer = md.renderer.rules.text || proxy;
		const isMention = /(?<=\s|\b|^)(?:@([a-z]+)|([a-z]+)@)(?=\s|\b|$)/gi;

		md.renderer.rules.text = (tokens, idx, options, env, self) => {
			const content = tokens[idx].content;
			const tokenScaffold = Object.assign({}, tokens[idx], { content: '' });

			// Split content into text and mentions
			const potentialMentions = Array.from(content.matchAll(isMention)).map(
				([match, frontAt, backAt]) => [match.trim(), frontAt ?? backAt],
			);

			if (potentialMentions.length === 0) {
				return defaultTextRenderer(tokens, idx, options, env, self);
			}

			// split text and mentions into tokens.
			const newTokens = potentialMentions.reduce(
				(accs, [mention, username], i) => {
					const mentionStart = content.indexOf(mention, accs[1]);
					const mentionLength = mention.length;
					const mentionEnd = mentionStart + mentionLength;

					const frontAt = mention.startsWith('@');
					const backAt = mention.endsWith('@');

					if (mentionStart > 0) {
						accs[0].push(
							Object.assign({}, tokenScaffold, {
								content: content.slice(accs[1], mentionStart),
							}),
						);
					}

					accs[0].push(
						Object.assign({}, tokenScaffold, {
							type: 'link_open',
							tag: 'span',
							nesting: 1,
							attrs: fsNames[username]
								? Setting.get([ns, 'tooltip']).value
									? [
											['data-toggle', 'tooltip'],
											[
												'data-placement',
												Setting.get([ns, 'tooltip-placement']).value,
											],
											['data-original-title', fsNames[username]],
											['data-fsname', fsNames[username]],
											['data-username', username],
											[
												'class',
												`mention ${frontAt ? 'frontAt' : ''} ${
													backAt ? 'backAt' : ''
												} ${username === me ? 'me' : ''}`,
											],
										]
									: [
											['data-fsname', fsNames[username]],
											['data-username', username],
											[
												'class',
												`mention ${frontAt ? 'frontAt' : ''} ${
													backAt ? 'backAt' : ''
												} ${username === me ? 'me' : ''}`,
											],
										]
								: [
										[
											'class',
											`mention ${frontAt ? 'frontAt' : ''} ${
												backAt ? 'backAt' : ''
											} deactivated`,
										],
										['data-username', username],
									],
						}),
						Object.assign({}, tokenScaffold, {
							content: username,
							level: 1,
						}),
						Object.assign({}, tokenScaffold, {
							type: 'link_close',
							tag: 'span',
							nesting: -1,
						}),
					);

					if (i === potentialMentions.length - 1) {
						if (mentionEnd < content.length) {
							accs[0].push(
								Object.assign({}, tokenScaffold, {
									content: content.slice(mentionEnd),
								}),
							);
						}
					}
					return [accs[0], mentionEnd];
				},
				[[], 0],
			)[0];

			return md.renderer.render(newTokens, options, env);
		};

		document.addEventListener('mouseover', e => {
			if (e.target.classList.contains('mention')) {
				if (Setting.get([ns, 'tooltip']).value) {
					$('[data-toggle="tooltip"]').tooltip();
				}
			}
		});

		document.addEventListener('click', e => {
			if (e.target.classList.contains('mention')) {
				if (e.target.classList.contains('deactivated')) {
					return;
				}
				const name = e.target.getAttribute('data-fsname');
				const username = e.target.getAttribute('data-username');
				const a = document.createElement('a');
				a.href = encodeURI(
					`mailto:${name} <${username}@fs-informatik.uni-kiel.de>`,
				);
				a.click();
				a.remove();
			}
		});
	},
	[
		new StringSetting('me', ''),
		new ColorSetting('mention-color', '#0078d7'),
		new ColorSetting('mention-highlight-color', '#ff1100'),
		new BooleanSetting('tooltip', true),
		new StringSetting('tooltip-placement', 'right'),
	],
).setDescription('Replace FS usernames with clickable links.');
