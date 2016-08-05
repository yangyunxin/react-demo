var path = require('path');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
      	'webpack-dev-server/client?http://localhost:1000',
		path.join(__dirname, '/app/index.js')
	],
	output: {
		path:path.join(__dirname, '/build'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
			loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
			query: {
				presets: ['react', 'es2015']
			}
		}]
	}
}