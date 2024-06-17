const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'codemirror-tweaks',
	(_cm, _md, ns) => {
		GM_addStyle(`
			@font-face {
				font-family: 'JetBrains Mono';
				font-style: normal;
				font-weight: 400;
				font-display: swap;
				src: local('JetBrains Mono'), 
					url(https://protocoldroid.yorik.dev/fonts/jetbrains-mono/JetBrainsMono-Regular.woff2) format('woff2');
			}

			@font-face {
				font-family: 'JetBrains Mono';
				font-style: normal;
				font-weight: 700;
				font-display: swap;
				src: local('JetBrains Mono'), 
					url(https://protocoldroid.yorik.dev/fonts/jetbrains-mono/JetBrainsMono-Bold.woff2) format('woff2');
			}

			@font-face {
				font-family: 'JetBrains Mono';
				font-style: italic;
				font-weight: 400;
				font-display: swap;
				src: local('JetBrains Mono'),
					url(https://protocoldroid.yorik.dev/fonts/jetbrains-mono/JetBrainsMono-Italic.woff2) format('woff2');
			}

			@font-face {
				font-family: 'JetBrains Mono';
				font-style: italic;
				font-weight: 700;
				font-display: swap;
				src: local('JetBrains Mono'),
					url(https://protocoldroid.yorik.dev/fonts/jetbrains-mono/JetBrainsMono-BoldItalic.woff2) format('woff2');
			}

			@font-face {
			font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-Light.woff2') format('woff2');
				font-weight: 300;
				font-style: normal;
			}

			@font-face {
				font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-Regular.woff2') format('woff2');
				font-weight: 400;
				font-style: normal;
			}

			@font-face {
				font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-Medium.woff2') format('woff2');
				font-weight: 500;
				font-style: normal;
			}

			@font-face {
				font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-SemiBold.woff2') format('woff2');
				font-weight: 600;
				font-style: normal;
			}

			@font-face {
				font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-Bold.woff2') format('woff2');
				font-weight: 700;
				font-style: normal;
			}

			@font-face {
				font-family: 'Hack';
				src: local('Hack'), 
					url('https://protocoldroid.yorik.dev/fonts/hack/Hack-Regular.ttf') format('ttf');
				font-weight: 400;
				font-style: normal;
			}

			@font-face {
				font-family: 'Hack';
				src: local('Hack'), 
					url('https://protocoldroid.yorik.dev/fonts/hack/Hack-Bold.ttf') format('ttf');
				font-weight: 700;
				font-style: normal;
			}

			@font-face {
				font-family: 'Hack';
				src: local('Hack'), 
					url('https://protocoldroid.yorik.dev/fonts/hack/Hack-Italic.ttf') format('ttf');
				font-weight: 400;
				font-style: italic;
			}

			@font-face {
				font-family: 'Hack';
				src: local('Hack'), 
					url('https://protocoldroid.yorik.dev/fonts/hack/Hack-BoldItalic.ttf') format('ttf');
				font-weight: 700;
				font-style: italic;
			}

			@font-face {
				font-family: 'Menlo';
				src: local('Menlo'), 
					url('https://protocoldroid.yorik.dev/fonts/menlo/Menlo-Regular.woff') format('woff');
				font-weight: 400;
				font-style: normal;
			}

			@font-face {
				font-family: 'Monaco';
				src: local('Monaco'), 
					url('https://protocoldroid.yorik.dev/fonts/monaco/Monaco.woff') format('woff');
				font-weight: 400;
				font-style: normal;
			}

			/* Custom font for CodeMirror */
			.CodeMirror {
				font-family: ${Setting.get([ns, 'custom-font']).value} !important;
			}
		`);
	},
	[
		new StringSetting(
			'custom-font',
			'"JetBrains Mono", "Fira Code", "Hack", "Menlo", "Monaco", "Source Code Pro", "Courier New", "Consolas", monospace',
		),
	],
).setDescription('Small tweaks for CodeMirror');
