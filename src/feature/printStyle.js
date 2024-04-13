const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature('print-style', (_cm, _md, ns) => {
	GM_addStyle(`
		@media print {
			abbr[title] {
				text-decoration: none;
			}
			abbr[title]::after {
				font-size: 12px !important;
			}
			.markdown-body h1 {
				font-size: 1.5em;
			}
			
			.markdown-body h2 {
				font-size: 1.25em;
				margin-bottom: 0;
				margin-top: 12px;
			}
			
			:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4) {
				margin-top: 0 !important;
				padding-top: 0 !important;
			}
			
			:is(h1, h2, h3, h4):has(+ :is(h1, h2, h3, h4)) {
				margin-bottom: 0 !important;
			}
			
			:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4)::before {
				display: none !important;
			}
			
			img {
				max-width: 15em !important;
			}
			
			abbr[title="Tagesordnungspunkt"]::after {
				display: none;
			}
			
			.markdown-body {
				font-size: 10pt;
				line-height: 1.125;
			}
			
			.markdown-body blockquote {
				font-size: 10.5pt;
				margin-bottom: 4px;
			}
			  
			.markdown-body li > p {
				margin-top: inherit;
				margin-bottom: inherit;
			}
			
			h1, h2,
			h2 + ul {
				page-break-before: auto;
				break-before: auto;
				page-break-after: avoid;
				break-before: avoid;
			}
		}
	`);
	if (Setting.get([ns, 'save-trees']).value) {
		GM_addStyle(`
			@media print {
				.markdown-body ul ul,
				.markdown-body ol ol {
					margin-left: 1em;
				}
			}
		`);
	}
	// TODO: Show abbr on first occurence, hide on second
}, [
	new BooleanSetting('save-trees', true)
]).setDescription('Add a print style');
