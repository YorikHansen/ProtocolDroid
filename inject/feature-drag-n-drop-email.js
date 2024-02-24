const rfc2047Decode = (encoded) => {
	let decoded = '';
	for (let i = 0; i < encoded.length; i++) {
		let char = encoded[i];
		if (char === '=') {
			// =?charset?encoding?text?= -> charset, encoding, text
			let [charset, encoding, text] = encoded.slice(i + 2).split('?', 3);
			let j = charset.length + encoding.length + text.length + 5; // =? + ? + ? + ?=

			let textDecoder = new TextDecoder(charset);
			let bytes;
			switch (encoding) {
				case 'B':
					let binary = atob(text);
					bytes = new Uint8Array(binary.length);
					for (let i = 0; i < binary.length; i++) {
						bytes[i] = binary.charCodeAt(i);
					}
					break;
				case 'Q':
					bytes = new Uint8Array(text.length - 2 * (text.split('=').length - 1));
					let j = 0;
					for (let i = 0; i < text.length; i++) {
						let byte = text.charCodeAt(i);
						switch (byte) {
							case 95: // _ -> space
								bytes[i - j] = 32;
								break;
							case 61: // =XX -> hex
								bytes[i - j] = parseInt(text.slice(i + 1, i + 3), 16);
								i += 2;
								j += 2;
								break;
							default: // ASCII
								bytes[i - j] = byte;
								break;
						}
					}
					break;
			}
			decoded += textDecoder.decode(bytes);
			i += j;
		} else {
			decoded += char;
		}
	}
	return decoded;
};

const handleEmail = (file) => {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.addEventListener('load', () => {
			let [header_section, message_body] = reader.result.split(/\r\n\r\n/);
			header_section = header_section.replaceAll(/\r\n\s+/g, ' ');
			let lines = header_section.split('\r\n');
			let headers = {};
			for (let j = 0; j < lines.length; j++) {
				let line = lines[j].trim();
				let [header_field, value] = line.split(/\:(.*)/s).map(s => s.trim());
				if (header_field) {
					headers[header_field] = value;
				}	
			}
			let date = (new Date(headers['Date'])).toISOString().slice(0, 10);
			let subject = rfc2047Decode(headers['Subject']);
			// TODO: Make this a template
			// Only use vars: {{date}}, {{subject}}, {{from}}, {{to}}
			resolve(`- \`${date}\`: ${subject}\n`);
		}, false);
		reader.readAsText(file);
	});
};

const __dropHandler = (cm, e) => {
	cm = cm.wrappedJSObject;
	for (let file of e.dataTransfer.files) {
		if (file.type === 'message/rfc822') {	
			e.preventDefault();
			handleEmail(file).then(line => {
				// TODO: Insert at given mark, not at cursor
				let coords = cloneInto({'left': e.x, 'top': e.y}, window, {cloneFunctions: false});
				cm.replaceRange(line, cm.coordsChar(coords, 'window'));
			});
		}
	}
}

const featureDragNDropEmail = {
	'rfc2047Decode': rfc2047Decode,
	'handleEmail': handleEmail,
	'__dropHandler': __dropHandler
};

window.wrappedJSObject.protocolDroid.featureDragNDropEmail = cloneInto(featureDragNDropEmail, window, {cloneFunctions: true});

getCodeMirror().then((cm) => {
	cm.on('drop', window.wrappedJSObject.protocolDroid.featureDragNDropEmail.__dropHandler);
});

console.log('inject/feature-drag-n-drop-email.js');
