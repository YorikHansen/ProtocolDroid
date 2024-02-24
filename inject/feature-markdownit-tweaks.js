getMardownIt().then((md) => {
	// Add custom markdown to the renderer
	md.options.quotes = '„“‚‘';  // German quotes
});