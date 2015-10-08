var path = require('path');
module.exports = {
	entry: './js/master.js',
	output: {
		path: path.join(__dirname, './js/dist'),
		filename: 'global.js'
	},
	resolve: {
		// Allow require('./blah') to require blah.jsx
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: path.join(__dirname),
			loader: 'babel-loader'
		}]
	}
};
