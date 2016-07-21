module.exports = {
	entry: "./app/index.js",
	output: {
		path: "./build",
		filename: "build.js"
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ["style", "css"],
				exclude: "/node_modules/"
			}
		]
	},
	resolve: {
		extensions: ['', '.js','.css','jsx']//自动补全识别后缀
	}
}