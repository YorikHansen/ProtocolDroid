const ProtocolDroid = require('../base/ProtocolDroid.js');
const Feature = require('../base/Feature.js');
const Setting = require('../base/Setting.js');
const BooleanSetting = require('../base/BooleanSetting.js');
const StringSetting = require('../base/StringSetting.js');

module.exports = new Feature('todo-notes', (cm, md, ns) => {
	GM_addStyle(`
		.todo-note {
			color: ${Setting.get([ns, 'default-color']).value};
		}

		.todo-text::before {
			content: 'TODO: ';
			font-weight: bold;
		}

		.todo-text.empty::before {
			content: 'TODO';
		}

		@media print {
			.todo-note {
				display: none !important;
			}
		}
	`);

	const proxy = (tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options);
	const defaultHTMLBlockRenderer = md.renderer.rules.html_block || proxy;
	const defaultHTMLInlineRenderer = md.renderer.rules.html_inline || proxy;
	// (?:[^-\n]|-[^-\n]|--[^>\n])*
	const isTodo = /<!--\s*(?:\[TODO\]|TODO):?\s*((?:[^-\s]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*(?:[^-\s]|-[^-\s]|--[^>\s]) | (?:[^-\s]|-[^-\n]|--[^>\n]))?\s*-->/i;

	md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
		let content = tokens[idx].content;

		if (content.search(isTodo) < 0) {
			return defaultHTMLBlockRenderer(tokens, idx, options, env, self);
		}

		let transformed = '';
		let i = content.search(isTodo);
		while (i >= 0) {
			let match = content.match(isTodo);
			transformed += content.slice(0, i);
			if (match[1]) {
				transformed += `<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${md.utils.escapeHtml(match[1].trim())}</span></span>`;
			} else {
				transformed += `<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>`;
			}
			content = content.slice(i + match[0].length);
			i = content.search(isTodo);
		}
		transformed += content;

		tokens[idx].content = `<p class="part" data-startline="${tokens[idx].map[0] + 1}" data-endline="${tokens[idx].map[1]}">${transformed}</p>`;
		return defaultHTMLBlockRenderer(tokens, idx, options, env, self);
	};

	md.renderer.rules.html_inline = (tokens, idx, options, env, self) => {
		const match = tokens[idx].content.match(isTodo);
		if (match) {
			if (match[1]) {
				return `<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${md.utils.escapeHtml(match[1].trim())}</span></span>`;
			}
			return `<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>`;
		}
		return defaultHTMLInlineRenderer(tokens, idx, options, env, self)
	}


	let todoButton = document.createElement('a');
	todoButton.classList.add('btn', 'btn-sm', 'text-uppercase');
	todoButton.id = 'makeTodo';
	todoButton.innerHTML = '<i class="fa fa-sticky-note fa-fw"></i>';
	todoButton.title = 'Add TODO note';
	todoButton.role = 'button';
	todoButton.setAttribute('data-toggle', 'dropdown');
	todoButton.setAttribute('aria-haspopup', 'true');
	todoButton.setAttribute('aria-expanded', 'true');
	todoButton.addEventListener('click', () => {
		const cursor = cm.getCursor();
		// TODO: Handle selection replacement
		if (cursorInHTMLComment(cm, cursor)) {
			cm.replaceRange('--><!-- TODO:  --><!--', cursor, cursor);
			cm.setCursor(cursor.line, cursor.ch + 14);
		} else {
			cm.replaceRange('<!-- TODO:  -->', cursor, cursor);
			cm.setCursor(cursor.line, cursor.ch + 11);
		}
		cm.focus();
	});
	ProtocolDroid.getByQuery('.toolbar .btn-group').then(el => el.appendChild(todoButton));

	// TODO: What about <!-- TODO: somethin ~my-name -->? Is this a comment, a TODO or a TODO-comment?
}, [
	new StringSetting('default-color', '#eda35e').setValidateFn(v => v.match(/^\#[a-f\d]{3}(?:[a-f\d]{3})?$/gi) !== null),
]).setDescription('Highlight TODO notes in the editor');