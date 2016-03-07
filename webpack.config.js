var path = require('path');

module.exports = {
	entry: './js/master.js',
	output: {
		path: path.join(__dirname, './js/dist'),
		filename: 'global.min.js'
	},
	module: {
		loaders: [{
			test: path.join(__dirname),
			loader: 'babel-loader'
		}]
	}
};
