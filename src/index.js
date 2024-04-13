const ProtocolDroid = require('./base/ProtocolDroid');
const Feature = require('./base/Feature');

const cleanPublishingFeature = require('./feature/cleanPublishing');
const customLogoOverlayFeature = require('./feature/customLogoOverlay');
const dragNDropEmailFeature = require('./feature/dragNDropEmail');
const markdownitTweaksFeature = require('./feature/markdownitTweaks');
const printStyleFeature = require('./feature/printStyle');
const todoNotesFeature = require('./feature/todoNotes');
const visibleCommentsFeature = require('./feature/visibleComments');


(function () {
	'use strict';
	
	cleanPublishingFeature.register();
	customLogoOverlayFeature.register();
	dragNDropEmailFeature.register();
	markdownitTweaksFeature.register();
	printStyleFeature.register();
	todoNotesFeature.register();
	visibleCommentsFeature.register(1);


	ProtocolDroid.addSettingMenu();

	ProtocolDroid.getCodeMirror().then(
		(cm) => ProtocolDroid.getMardownIt().then(
			(md) => Feature.loadAll(cm, md)
		)
	);
})();