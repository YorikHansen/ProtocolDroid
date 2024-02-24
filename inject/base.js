const getByQuery = (query) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			const el = document.querySelector(query);
			if (el && el.wrappedJSObject) {
				clearInterval(interval);
				resolve(el.wrappedJSObject);
			}
		}, 100);
	});
};

const getByQueryAll = (query) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			const el = document.querySelectorAll('query').wrappedJSObject;
			if (el) {
				clearInterval(interval);
				resolve(el);
			}
		}, 100);
	});
};


const getCodeMirror = () => {
	return new Promise((resolve, reject) => {
		getByQuery('.CodeMirror').then((codeMirror) => {
			resolve(codeMirror.CodeMirror);
		});
	});
};

const getMardownIt = () => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (window.wrappedJSObject.md) {
				clearInterval(interval);
				resolve(window.wrappedJSObject.md);
			}
		}, 100);
	});
};

const getPublishButtons = () => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			const publishButtons = document.querySelectorAll('.ui-publish');
			if (publishButtons && publishButtons.length > 0) {
				clearInterval(interval);
				resolve(publishButtons);
			}
		}, 100);
	});
};

window.wrappedJSObject.protocolDroid = cloneInto({'base': null}, window, {cloneFunctions: true});

console.log('inject/base.js');
