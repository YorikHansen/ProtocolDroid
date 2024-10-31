const StringSetting = require('./StringSetting');

class ColorSetting extends StringSetting {
	constructor(name, defaultValue) {
		super(name, defaultValue);
		this._validateFn = v => v.match(/^\#[a-f\d]{3}(?:[a-f\d]{3})?$/gi) !== null;
	}

	_prepareInputElement() {
		const colorDisplay = document.createElement('div');
		colorDisplay.style.backgroundColor = this._liveValue;
		colorDisplay.style.width = '1em';
		colorDisplay.style.height = '1em';
		colorDisplay.style.display = 'inline-block';
		colorDisplay.style.marginRight = '0.5em';
		colorDisplay.style.border = '1px solid black';
		colorDisplay.style.borderRadius = '0.25em';
		colorDisplay.style.verticalAlign = 'middle';

		super._prepareInputElement();

		document.addEventListener('protocolDroidReady', () => {
			this._input.before(colorDisplay);
		});

		this._input.addEventListener('input', () => {
			colorDisplay.style.backgroundColor = this._getInputElemValue();
		});
	}

	static toHex(r, g, b) {
		return `#${r.toString(16).padStart(2, '0')}${g
			.toString(16)
			.padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
	}

	static toRGB(hex) {
		if (hex.length < 6) {
			hex = hex.replace(/^#/, '');
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
		return match
			? [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)]
			: null;
	}
}

module.exports = ColorSetting;
