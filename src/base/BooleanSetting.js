const Setting = require('./Setting');

class BooleanSetting extends Setting {
	constructor(name, defaultValue) {
		super(name, defaultValue);
	}

	_setInputElemValue(value) {
		this._input.checked = value;
	}
	_getInputElemValue() {
		return this._input.checked;
	}

	_prepareInputElement() {
		this._input.id = this._name;
		this._input.disabled = this._disabledFn(Setting._SETTINGS);
		this._input.type = 'checkbox';
		this._setInputElemValue(this._liveValue);

		this._input.addEventListener('input', () => {
			Setting.set(this._name, this._getInputElemValue());
		});
	}
}

module.exports = BooleanSetting;
