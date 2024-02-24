// TODO: Get config and only inject selected features

browser.runtime.onMessage.addListener((message) => {
	if (message === 'inject') {
		browser.tabs.executeScript({file: '/inject/base.js'});
		browser.tabs.executeScript({file: '/inject/feature-drag-n-drop-email.js'});
	}
});
