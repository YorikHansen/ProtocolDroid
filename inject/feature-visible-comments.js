// TODO: This is a feature that should be enabled/disabled by the user

// TODO: Get comment-button and change it's behavior
// TODO: After loading the page, a rerender should be triggered to show the comments

getMardownIt().then((md) => {		
	const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
	const defaultHTMLBlockRenderer = md.renderer.rules.html_block || proxy;
	const defaultHTMLInlineRenderer = md.renderer.rules.html_inline || proxy;

	// Comments have the form `<!-- comment ~author -->`. 
	//  There MUST be at least one white space (`\s`) before the `~`. 
	//  The author MAY NOT start with a `~`. 
	//  The author and the comment MAY NOT contain `-->`.
	//  The comment and the author MUST have at least one non-white space character.
	// TODO: <!-- - ~...--> is valid, but not recognized due to `- ` being used as a comment, so the required white space is not recognized
	const is_comment = /<!--\s*((?:[^-\s]|-[^-]|--[^>])(?:[^-]|-[^-]|--[^>])*)\s+~\s*((?:[^~-\s]|-[^-]|--[^>])(?:[^-]|-[^-]|--[^>])*)\s*-->/;

	html_block = (tokens, idx, options, env, self) => {
		let content = tokens[idx].content;

		if (content.search(is_comment) < 0) {
			// if (content.startsWith('<!--')) {
			// 	tokens[idx].content = `<p>${content}</p>`;
			// }
			// TODO: Get this right, then uncomment the previous lines
			// tokens[idx].attrJoin('class', 'part');
			// tokens[idx].attrJoin('data-startline', tokens[idx].map[0] + 1);
			// tokens[idx].attrJoin('data-endline', tokens[idx].map[1]);

			return defaultHTMLBlockRenderer(tokens, idx, options, env, self);
		}
		
		let transformed = '';
		let i = content.search(is_comment);
		while (i >= 0) {
			let match = content.match(is_comment);
			transformed += content.slice(0, i);
			transformed += `<span class="comment"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${md.utils.escapeHtml(match[1].trim())}</span> <span class="comment-author">${md.utils.escapeHtml(match[2].trim())}</span></span>`;
			content = content.slice(i + match[0].length);
			i = content.search(is_comment);
		}
		transformed += content;

		tokens[idx].content = `<p class="part" data-startline="${tokens[idx].map[0] + 1}" data-endline="${tokens[idx].map[1]}">${transformed}</p>`;
		return defaultHTMLBlockRenderer(tokens, idx, options, env, self);
	};

	html_inline = (tokens, idx, options, env, self) => {
		const match = tokens[idx].content.match(is_comment);
		if (match) {
			return `<span class="comment"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${md.utils.escapeHtml(match[1].trim())}</span> <span class="comment-author">${md.utils.escapeHtml(match[2].trim())}</span></span>`;
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

console.log('inject/feature-visible-comments.js');
