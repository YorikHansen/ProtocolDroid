const Setting = require('./Setting.js');
const BooleanSetting = require('./BooleanSetting.js');

class Feature {
	static _precedences = [];
	static _features = [];

	constructor(name, code, options = [], enabledByDefault = true) {
		if (!name.match(/^[a-z][a-z0-9]*(?:\-[a-z0-9]+)+$/i)) {
			throw new Error(
				'Feature names must only contain letters, numbers and hyphens. They must start with a letter, have at least one hyphen and may not end with a hyphen.',
			);
		}
		this.name = name;
		this.code = code;

		this.options = options;
		this.enabledByDefault = enabledByDefault;

		this.description = '';
	}

	register(precedence = 0) {
		Setting.add(
			new BooleanSetting(['features', this.name], this.enabledByDefault),
		);
		this.options.forEach(option =>
			Setting.add(
				option
					.toNamespace(this.name)
					.setDisabledFn(() => !Setting.get(['features', this.name]).liveValue),
			),
		);

		return Feature.add(this, precedence);
	}

	load($, cm, md, _ns) {
		if (Setting.get(['features', this.name]).value) {
			this.code($, cm, md, [this.name]);
			console.log(`Feature ${this.name} loaded`);
		}
	}

	setDescription(description) {
		this.description = description;
		return this;
	}

	static add(feature, precedence = 0) {
		if (!(precedence in Feature._features)) {
			Feature._precedences.push(precedence);
			Feature._features[precedence] = [];
		}
		Feature._features[precedence].push(feature);
		return true; // TODO: Return false if feature already exists
	}

	static loadAll($, cm, md) {
		Feature._precedences.sort();
		for (let i = Feature._precedences.length - 1; i >= 0; i--) {
			Feature._features[Feature._precedences[i]].forEach(feature =>
				feature.load($, cm, md, ''),
			);
		}
	}
}

module.exports = Feature;
