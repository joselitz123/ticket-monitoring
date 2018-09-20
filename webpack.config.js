const path = require('path');

const webpack = require('webpack');
require ('babel-polyfill');

module.exports = {
	entry: ['babel-polyfill','./src/index.js'],
	output: {
		path: path.resolve(__dirname, 'public/'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.js?/,
			use: 'babel-loader',
			exclude: /node_modules/
		}]
	}
};