var path = require('path');
var webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve('./html/index.html'),
			inject: false,
			hash: true
		}),
	],
	entry: {
		main: './src/main.js',
		base_css: './src/base.scss',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '',
		library: 'MogoHeader',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				],
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'vue-style-loader'},
					{ loader: 'css-loader'},
					{ loader: 'postcss-loader'},
					{ loader: 'sass-loader'},
				],
			},
			{
				test: /\.sass$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader?indentedSyntax'
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this necessary.
						'scss': [
							'vue-style-loader',
							'css-loader',
							'sass-loader'
						],
						'sass': [
							'vue-style-loader',
							'css-loader',
							'sass-loader?indentedSyntax'
						]
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					publicPath: './dist/',
					limit: 8192,
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.esm.js',
			'_components': path.resolve('src/components'),
			'_supports': path.resolve('src/supports'),
			'_views': path.resolve('src/views'),
			'_images': path.resolve('images'),
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	devServer: {
		historyApiFallback: true,
		host: '0.0.0.0',
		noInfo: true,
		overlay: true
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.entry= './src/index.js';
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
