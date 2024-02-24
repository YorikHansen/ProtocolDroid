// TODO: This is a feature that should be enabled/disabled by the user

// TODO: Get comment-button and change it's behavior

getMardownIt().then((md) => {		
	const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
	const defaultInlineRenderer = md.renderer.rules.text || proxy;
	const defaultHTMLBlockRenderer = md.renderer.rules.html_block || proxy;
	const defaultHTMLInlineRenderer = md.renderer.rules.html_inline || proxy;

	// TODO: Check this on <li>, not in text

	text = (tokens, idx, options, env, self) => {
		console.log(tokens[idx]);
		if (tokens[idx].content.startsWith('[intern]')) {
			// tokens[idx].attrSet('class', 'intern');
			tokens[idx].content = tokens[idx].content.substring(9);
			return `<span class="intern">${defaultInlineRenderer(tokens, idx, options, env, self)}</span>`;
		}
		return defaultInlineRenderer(tokens, idx, options, env, self)
	};

	// md.renderer.rules.text = cloneInto(text, md.renderer.rules, {cloneFunctions: true});

	// TODO: Lines that start with a comment should not be all comments
	html_block = (tokens, idx, options, env, self) => {
		const is_comment = /<!--\s*(\S.*?\S|\S)\s*~\s*(\S.*?\S|\S)\s*-->/;
		const match = tokens[idx].content.match(is_comment);
		if (match) {
			return `<span class="comment comment-block"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${md.utils.escapeHtml(match[1])}</span> <span class="comment-author">${md.utils.escapeHtml(match[2])}</span></span>`;
		}
		return defaultHTMLBlockRenderer(tokens, idx, options, env, self)
	};

	html_inline = (tokens, idx, options, env, self) => {
		const is_comment = /<!--\s*(\S.*?\S|\S)\s*~\s*(\S.*?\S|\S)\s*-->/;
		const match = tokens[idx].content.match(is_comment);
		if (match) { // md.render(match[1])
			return `<span class="comment"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${md.utils.escapeHtml(match[1])}</span> <span class="comment-author">${md.utils.escapeHtml(match[2])}</span></span>`;
		}
		return defaultHTMLInlineRenderer(tokens, idx, options, env, self)
	};

	md.renderer.rules.html_block = cloneInto(html_block, md.renderer.rules, {cloneFunctions: true});
	md.renderer.rules.html_inline = cloneInto(html_inline, md.renderer.rules, {cloneFunctions: true});
});

document.addEventListener('click', (event) => {
	let target = event.target;
	while (target) {
		if (target.classList.contains('comment')) {
			target.dataset.opened = target.dataset.opened === 'true' ? 'false' : 'true';
		}
		target = target.parentElement;
	}
});
