const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'markdownit-tweaks',
	(_$, _cm, md, ns) => {
		// Add custom markdown to the renderer
		if (Setting.get([ns, 'german-quotes'])) {
			md.options.quotes = '„“‚‘'; // German quotes
		}
	},
	[new BooleanSetting('german-quotes', true)],
).setDescription('Small tweaks for MarkdownIt');
