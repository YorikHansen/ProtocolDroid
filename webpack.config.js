const path = require('path');
const { UserscriptPlugin } = require('webpack-userscript');
const pkg = require('./package.json');
const headers = require('./src/headers.json');

module.exports = {
	mode: 'production',
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		filename: 'protocoldroid.user.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new UserscriptPlugin({
			headers: {
				...headers,
				version: pkg.version,
				author: pkg.author.name,
				homepage: pkg.homepage,
			},
			pretty: true,
		}),
	],
};
