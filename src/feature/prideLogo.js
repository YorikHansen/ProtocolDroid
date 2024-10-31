const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature(
	'pride-logo',
	(_$, _cm, _md, _ns) => {
		const logoNoNightImgs = Array.from(
			document.querySelectorAll('.navbar-brand img.no-night'),
		);
		const logoNightImgs = Array.from(
			document.querySelectorAll('.navbar-brand img.night'),
		);

		GM_addStyle(`
			/* make the Logo rainbow colored */
			.header-brand {
				background-image: linear-gradient(
                    #fe0000 24.7%,
                    #fd8c00 24.7%, 37.35%,
                    #ffd000 37.35%, 50%,
                    #119f0b 50%, 62.65%,
                    #457cdf 62.65%, 75.3%,
                    #c22edc 75.3%
                );
				mask: ${logoNightImgs
					.map(img => `url(${img.src}) center/contain no-repeat`)
					.join(', ')};
				mask-origin: content-box;
				mask-mode: luminance, alpha;
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
