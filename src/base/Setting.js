class Setting {
	static _SETTINGS = {};

	_name;
	_defaultValue;
	_value;
	_liveValue;

	_input = document.createElement('input');
	_disabledFn = () => false;
	_validateFn = () => true; // TODO: Mark invalid functions and don't allow saving if invalid

	constructor(name, defaultValue) {
		if (this.constructor === Setting) {
			throw new TypeError('Cannot create instance of abstract class Setting');
		}

		this._name = Setting.#handleName(name);
		this._defaultValue = defaultValue;

		this._value = GM_getValue(this._name.replace('.', '_'), this._defaultValue);
		this._liveValue = this._value;
	}

	setDisabledFn(disabledFn) {
		this._disabledFn = disabledFn;
		return this;
	}
	setValidateFn(validateFn) {
		this._validateFn = validateFn;
		return this;
	}

	toNamespace(ns) {
		ns = Setting.#handleName(ns);
		this._name = Setting.#handleName([ns, this._name]);
		this._value = GM_getValue(this._name.replace('.', '_'), this._defaultValue);
		this._liveValue = this._value;
		return this;
	}

	_setInputElemValue(value) {
		this._input.value = value;
	}
	_getInputElemValue() {
		return this._input.value;
	}
	_setInputElemValid(isValid) {
		this._input.classList.toggle('is-invalid', !isValid);
	}

	_prepareInputElement() {
		this._input.id = this._name;
		this._input.disabled = this._disabledFn(Setting._SETTINGS);
		this._setInputElemValue(this._liveValue);

		this._input.addEventListener('input', () => {
			Setting.set(this._name, this._getInputElemValue());
		});
	}

	getDOMElement() {
		let label = document.createElement('label');
		label.htmlFor = this._name;
		label.innerText = this._name;

		this._prepareInputElement();
		this._input.addEventListener('input', () => {
			for (let setting in Setting._SETTINGS) {
				Setting._SETTINGS[setting]._input.disabled = Setting._SETTINGS[
					setting
				]._disabledFn(Setting._SETTINGS);
			}
		});

		let div = document.createElement('div');
		div.appendChild(label);
		div.appendChild(this._input);
		return div;
	}

	static add(setting) {
		Setting._SETTINGS[setting._name] = setting;
	}

	static get(name) {
		// TODO: Check if the setting exists
		name = Setting.#handleName(name);
		return {
			value: Setting._SETTINGS[name]._value,
			defaultValue: Setting._SETTINGS[name]._defaultValue,
			liveValue: Setting._SETTINGS[name]._liveValue,
		};
	}

	static set(name, value) {
		// TODO: Check if the setting exists and if the value is of the correct type
		name = Setting.#handleName(name);
		if (Setting._SETTINGS[name]._disabledFn(Setting._SETTINGS)) {
			return;
		}
		let isValid = Setting._SETTINGS[name]._validateFn(value);
		Setting._SETTINGS[name]._setInputElemValid(isValid);
		if (isValid) {
			Setting._SETTINGS[name]._liveValue = value;
			if (Setting._SETTINGS[name]._getInputElemValue() !== value) {
				Setting._SETTINGS[name]._setInputElemValue(value);
			}
		}
	}

	static reset(name) {
		name = Setting.#handleName(name);
		Setting.set(name, Setting.get(name).defaultValue);
	}

	static cancel(name) {
		name = Setting.#handleName(name);
		Setting._SETTINGS[name]._liveValue = Setting._SETTINGS[name]._value;
		Setting._SETTINGS[name]._setInputElemValue(Setting._SETTINGS[name]._value);
	}

	static commit(name) {
		name = Setting.#handleName(name);
		Setting._SETTINGS[name]._value = Setting._SETTINGS[name]._liveValue;
		GM_setValue(name.replace('.', '_'), Setting._SETTINGS[name]._value);
	}

	static resetAll() {
		for (let setting in Setting._SETTINGS) {
			Setting.reset(setting);
		}
	}

	static commitAll() {
		for (let setting in Setting._SETTINGS) {
			Setting.commit(setting);
		}
	}

	static cancelAll() {
		for (let setting in Setting._SETTINGS) {
			Setting.cancel(setting);
		}
	}

	static bundleHTML() {
		// TODO: Ordering
		let html = document.createElement('div');
		for (let setting in Setting._SETTINGS) {
			html.appendChild(Setting._SETTINGS[setting].getDOMElement());
		}
		return html;
	}

	static #handleName(name) {
		if (Array.isArray(name)) {
			name = name.join('.');
		}
		return name;
	}
}

module.exports = Setting;
