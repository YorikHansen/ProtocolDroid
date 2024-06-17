const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'codemirror-tweaks',
	(_cm, _md, ns) => {
		GM_addStyle(`
			/* Custom font for CodeMirror */
			.CodeMirror {
				font-family: ${Setting.get([ns, 'custom-font']).value};
			}
		`);
	},
	[new StringSetting('custom-font', '"JetBrains Mono", "Fira Code", "Hack", "Menlo", "Monaco", "Source Code Pro", "Courier New", "Consolas", monospace')],
).setDescription('Small tweaks for CodeMirror');
