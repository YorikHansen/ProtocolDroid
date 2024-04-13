const Setting = require('./Setting');

class StringSetting extends Setting {
	constructor(name, defaultValue) {
		super(name, defaultValue);
	}

	_setInputElemValue(value) {
		this._input.value = value;
	}
	_getInputElemValue() {
		return this._input.value;
	}

	_prepareInputElement() {
		this._input.id = this._name;
		this._input.disabled = this._disabledFn(Setting._SETTINGS);
		this._input.type = 'text';
		this._setInputElemValue(this._liveValue);

		this._input.addEventListener('input', () => {
			Setting.set(this._name, this._getInputElemValue());
		});
	}
}

module.exports = StringSetting;
