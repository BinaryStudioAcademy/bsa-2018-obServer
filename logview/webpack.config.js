const NODE_ENV = process.env.NODE_ENV;
const path = require('path');

module.exports = {
	entry: './frontend/src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist'
	},

	devServer: {
		historyApiFallback: true,
		noInfo: false,
		overlay: true,
		host: '0.0.0.0',
		watchOptions: {
			aggregateTimeout: 300,
			poll: 300
		}
	},

	// Enable sourcemaps for debugging webpack's output.
	// devtool: "source-map",
	devtool: 'eval-source-map',

	resolve: {
		alias: {
			components: path.resolve(__dirname, './frontend/src')
		},
		extensions: ['.js', '.ts', '.tsx', 'json', 'jpg', 'png', 'svg'],
		modules: [path.resolve(__dirname, './node_modules/')],
		symlinks: true
	},

	module: {
		rules: [
			{
				enforce: 'pre',
				exclude: /node_modules/,
				loader: 'tslint-loader',
				test: /\.(ts|tsx)$/
			},
			{
				exclude: /node_modules/,
				test: /\.(ts|tsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: ['env', 'react', 'es2015']
						}
					},
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								preserveConstEnums: true
							}
						}
					}
				]
			},
			{
				exclude: /node_modules/,
				test: /\.(jpg|png|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[hash].[ext]'
				}
			}
		]
	},
	mode: 'development'
};
