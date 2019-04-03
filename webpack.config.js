const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
	mode: 'production',
	entry: ['babel-polyfill', './app.js'],
	output: {
		path: path.resolve(__dirname, './'),
		filename: 'app-bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env'],
					plugins: ['transform-object-rest-spread']
				}
			}
		}]
	},
	target: 'node',
	externals: [nodeExternals()],
	node: {
		fs: 'empty',
  		net: 'empty',
		__dirname: false
	}
}
