// https://www.fs-infmath.uni-kiel.de/wiki/Aktive_Kommilitonen

const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const ColorSetting = require('../base/ColorSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'fs-mentions',
	($, cm, md, ns) => {
		const mes = [];
		if (Setting.get([ns, 'me']).value.length)
			mes.push(Setting.get([ns, 'me']).value);
		if (Setting.get([ns, 'my-aliases']).value.length)
			mes.push(
				...Setting.get([ns, 'my-aliases'])
					.value.split(',')
					.map(a => a.trim()),
			);

		let fsNames = GM_getValue(`${ns}.fsNames`, {});

		const getInText = (_mention, username, fsName) => {
			return Setting.get([ns, 'full-names']).value
				? fsName ?? username
				: username;
		};
		const getInTooltip = (mention, username, fsName) => {
			return Setting.get([ns, 'full-names']).value
				? mention
				: fsName ?? username;
		};

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
				document.querySelectorAll('.mention.deactivated').forEach(mention => {
					const dataMention = mention.getAttribute('data-mention');
					const dataUsername = mention.getAttribute('data-username');
					if (fsNames[dataUsername]) {
						mention.classList.remove('deactivated');
						mention.setAttribute('data-fsname', fsNames[username]);
						if (Setting.get([ns, 'tooltip']).value) {
							mention.setAttribute('data-toggle', 'tooltip');
							mention.setAttribute(
								'data-placement',
								Setting.get([ns, 'tooltip-placement']).value,
							);
							mention.setAttribute(
								'data-original-title',
								getInTooltip(dataMention, dataUsername, fsNames[username]),
							);
						}
						if (Setting.get([ns, 'full-names']).value) {
							mention.innerText = getInText(
								dataMention,
								dataUsername,
								fsNames[username],
							);
							mention.classList.remove('frontAt', 'backAt');
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
				.mention.me,
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
				
				.mention.me {
					--mention-color: ${mentionHighlightColor};
				}

				.mention.me.deactivated {
					cursor: default;
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
		const isMention =
			/(?<=[\s,;]|\b|^)(?:@([a-z]+)|([a-z]+)@)(?=[\s,;]|\b|$)/gi;

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

					const inText = getInText(mention, username, fsNames[username]);
					const inTooltip = getInTooltip(mention, username, fsNames[username]);
					const hideAt =
						Setting.get([ns, 'full-names']).value && fsNames[username];

					const classes = ['mention'];
					if (frontAt && !hideAt) classes.push('frontAt');
					if (backAt && !hideAt) classes.push('backAt');
					if (mes.includes(username)) classes.push('me');
					if (!fsNames[username]) classes.push('deactivated');

					const attrs = [
						['data-mention', mention],
						['data-username', username],
						['class', classes.join(' ')],
					];
					if (fsNames[username]) attrs.push(['data-fsname', fsNames[username]]);
					if (fsNames[username] && Setting.get([ns, 'tooltip']).value) {
						attrs.push(['data-toggle', 'tooltip']);
						attrs.push([
							'data-placement',
							Setting.get([ns, 'tooltip-placement']).value,
						]);
						attrs.push(['data-original-title', inTooltip]);
					}

					accs[0].push(
						Object.assign({}, tokenScaffold, {
							type: 'link_open',
							tag: 'span',
							nesting: 1,
							attrs: attrs,
						}),
						Object.assign({}, tokenScaffold, {
							content: inText,
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

		if (Setting.get([ns, 'autocomplete']).value) {
			$(cm.getInputField()).textcomplete([
				{
					id: ns,
					match: /@([\S]*)/,
					search: (_term, callback, match) => {
						const names = Object.keys(fsNames).filter(
							username => 
								username.startsWith(match[1].toLowerCase()) || 
								fsNames[username].toLowerCase().includes(match[1].toLowerCase()),
								match[1] === '',
						).sort((a, b) => {
							// First show matching "at"s, then show alphabetically
							const aMatch = a.startsWith(match[1]) ? 0 : 1;
							const bMatch = b.startsWith(match[1]) ? 0 : 1;
							if (aMatch === bMatch) {
								return a.localeCompare(b);
							}
							return aMatch - bMatch;
						}).map(username => ({
							username: username.toLowerCase(),
							fsName: fsNames[username],
							usernameMatched: `<b>${username.slice(0, match[1].length)}</b>${username.slice(match[1].length)}`,
							fsNameMatched: fsNames[username].replace(
								new RegExp(`(${match[1]})`, 'i'),
								'<b>$1</b>',
							),
						}));
						callback(names);
						return;
					}, //my method
					template: elem => `<i class="fa fa-at fa-fw"></i>&nbsp;${elem.usernameMatched} (${elem.fsNameMatched})`,
					replace: elem => `@${elem.username}`,
					context: text => {
						return true;
					},
				},
			]);
		}
	},
	[
		new BooleanSetting('autocomplete', true),
		new BooleanSetting('full-names', false),
		new StringSetting('me', ''),
		new StringSetting('my-aliases', ''),
		new ColorSetting('mention-color', '#0078d7'),
		new ColorSetting('mention-highlight-color', '#ff1100'),
		new BooleanSetting('tooltip', true),
		new StringSetting('tooltip-placement', 'right'),
	],
).setDescription('Replace FS usernames with clickable links.');
