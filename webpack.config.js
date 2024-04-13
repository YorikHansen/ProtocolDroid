const path = require('path');
const { UserscriptPlugin } = require('webpack-userscript');

module.exports = {
	mode: 'production',
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		filename: 'protocoldroid.user.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [new UserscriptPlugin({
		headers: './src/headers.json',
	})],
};