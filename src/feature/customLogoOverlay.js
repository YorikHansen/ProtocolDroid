const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'custom-logo-overlay',
	(_$, _cm, _md, ns) => {
		GM_addStyle(`
			.custom-logo-overlay {
				transform: translateY(-100%);
			}
		`);

		let logoNoNight = document.createElement('img');
		logoNoNight.classList.add('h-100', 'custom-logo-overlay', 'no-night');
		logoNoNight.src = Setting.get([ns, 'url-no-night']).value;
		document.querySelector('.header-brand').append(logoNoNight);

		let logoNight = document.createElement('img');
		logoNight.classList.add('h-100', 'custom-logo-overlay', 'night');
		logoNight.src = Setting.get([ns, 'url-night']).value;
		document.querySelector('.header-brand').append(logoNight);
	},
	[
		new StringSetting(
			'url-no-night',
			'https://protocoldroid.yorik.dev/shades-no-night.svg',
		),
		new StringSetting(
			'url-night',
			'https://protocoldroid.yorik.dev/shades-night.svg',
		),
	],
	true,
).setDescription('Add a custom logo overlay'); // TODO: set default to false (because privacy)
