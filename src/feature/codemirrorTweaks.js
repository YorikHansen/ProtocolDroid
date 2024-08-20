const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'codemirror-tweaks',
	(_cm, _md, ns) => {
		const fontURLs = {
			jetbrainsMono: {
				regular: 'JetBrainsMonoRegular',
				bold: 'JetBrainsMonoBold',
				italic: 'JetBrainsMonoItalic',
				boldItalic: 'JetBrainsMonoBoldItalic',
			},
			firaCode: {
				light: 'FiraCodeLight',
				regular: 'FiraCodeRegular',
				medium: 'FiraCodeMedium',
				semiBold: 'FiraCodeSemiBold',
				bold: 'FiraCodeBold',
			},
		};

		GM_addStyle(`
			@font-face {
				font-family: 'JetBrains Mono';
				font-style: normal;
				font-weight: 400;
				font-display: swap;
				src: local('JetBrains Mono'), 
					url('${GM_getResourceURL(fontURLs.jetbrainsMono.regular)}') format('woff2');
			}

			@font-face {
				font-family: 'JetBrains Mono';
				font-style: normal;
				font-weight: 700;
				font-display: swap;
				src: local('JetBrains Mono'), 
					url('${GM_getResourceURL(fontURLs.jetbrainsMono.bold)}') format('woff2');
			}

			@font-face {
				font-family: 'JetBrains Mono';
				font-style: italic;
				font-weight: 400;
				font-display: swap;
				src: local('JetBrains Mono'),
					url('${GM_getResourceURL(fontURLs.jetbrainsMono.italic)}') format('woff2');
			}

			@font-face {
				font-family: 'JetBrains Mono';
				font-style: italic;
				font-weight: 700;
				font-display: swap;
				src: local('JetBrains Mono'),
					url('${GM_getResourceURL(fontURLs.jetbrainsMono.boldItalic)}') format('woff2');
			}

			@font-face {
			font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('${GM_getResourceURL(fontURLs.firaCode.light)}') format('woff2');
				font-weight: 300;
				font-style: normal;
			}

			@font-face {
				font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('${GM_getResourceURL(fontURLs.firaCode.regular)}') format('woff2');
				font-weight: 400;
				font-style: normal;
			}

			@font-face {
				font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('${GM_getResourceURL(fontURLs.firaCode.medium)}') format('woff2');
				font-weight: 500;
				font-style: normal;
			}

			@font-face {
				font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('${GM_getResourceURL(fontURLs.firaCode.semiBold)}') format('woff2');
				font-weight: 600;
				font-style: normal;
			}

			@font-face {
				font-family: 'Fira Code';
				src: local('Fira Code'), 
					url('${GM_getResourceURL(fontURLs.firaCode.bold)}') format('woff2');
				font-weight: 700;
				font-style: normal;
			}

			/* Custom font for CodeMirror */
			.CodeMirror {
				font-family: ${Setting.get([ns, 'custom-font']).value} !important;
			}
		`);
		console.log(GM_getResourceURL(fontURLs.jetbrainsMono.regular));
	},
	[
		new StringSetting(
			'custom-font',
			'"JetBrains Mono", "Fira Code", "Source Code Pro", "Courier New", "Consolas", monospace',
		),
	],
).setDescription('Small tweaks for CodeMirror');
