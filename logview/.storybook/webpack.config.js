const webpackConfig = require('../webpack.config');
const webpack = require('webpack');

module.exports = {
	entry: webpackConfig.entry,
	output: webpackConfig.output,
	plugins: [new webpack.HotModuleReplacementPlugin()],
	module: {
		rules: webpackConfig.module.rules
	},
	resolve: webpackConfig.resolve
};
