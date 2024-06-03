const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'pride-logo',
	(_cm, _md, _ns) => {
		const logoNoNightImgs = Array.from(
			document.querySelectorAll('.navbar-brand img.no-night'),
		);
		const logoNightImgs = Array.from(
			document.querySelectorAll('.navbar-brand img.night'),
		);

		GM_addStyle(`
			/* make the Logo rainbow colored */
			.header-brand {
				background-image: linear-gradient(-220deg,
					#FE0000 16.66%, 
					#FD8C00 16.66%, 33.33%, 
					#FFD000 33.33%, 50%, 
					#119F0B 50%, 66.66%, 
					#457CDF 66.66%, 83.33%, 
					#C22EDC 83.33%
				);
				mask: ${logoNightImgs
					.map(img => `url(${img.src}) center/contain no-repeat`)
					.join(', ')};
				mask-origin: content-box;
				mask-mode: luminance;
				mask-composite: exclude;
			}

			.header-brand img {
				visibility: hidden;
			}

			body:not(.night) .header-brand {
				filter: brightness(0.8) contrast(1.5);
			}

			body.night .header-brand {
				filter: saturate(2);
			}
		`);
	},
	[],
	true,
).setDescription('"Prideify" the logo');
