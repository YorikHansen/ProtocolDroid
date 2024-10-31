const ProtocolDroid = require('./base/ProtocolDroid');
const Feature = require('./base/Feature');

const cleanPublishingFeature = require('./feature/cleanPublishing');
const customLogoOverlayFeature = require('./feature/customLogoOverlay');
const dragNDropEmailFeature = require('./feature/dragNDropEmail');
const fsMentionsFeature = require('./feature/fsMentions');
const internalSpoilerFeature = require('./feature/internalSpoiler');
const markdownitTweaksFeature = require('./feature/markdownitTweaks');
const prideLogoFeature = require('./feature/prideLogo');
const printStyleFeature = require('./feature/printStyle');
const todoNotesFeature = require('./feature/todoNotes');
const visibleCommentsFeature = require('./feature/visibleComments');
const codemirrorTweaks = require('./feature/codemirrorTweaks');

(function () {
	'use strict';

	cleanPublishingFeature.register();
	codemirrorTweaks.register();
	customLogoOverlayFeature.register(1);
	dragNDropEmailFeature.register();
	fsMentionsFeature.register();
	internalSpoilerFeature.register();
	markdownitTweaksFeature.register();
	prideLogoFeature.register();
	printStyleFeature.register();
	todoNotesFeature.register();
	visibleCommentsFeature.register(1);

	ProtocolDroid.addSettingMenu();

	Promise.all([
		ProtocolDroid.getJQuery(),
		ProtocolDroid.getCodeMirror(),
		ProtocolDroid.getMardownIt(),
	]).then(([ $, cm, md ]) => {
		Feature.loadAll($, cm, md);
		ProtocolDroid.ready();
	});
})();
