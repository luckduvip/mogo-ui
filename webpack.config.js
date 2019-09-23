var path = require('path');
var webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	VueLoaderPlugin = require('vue-loader/lib/plugin');

let plugins,
	entry,
	devtool;
if (process.env.NODE_ENV === 'production') {
	entry = './src/index.js';
	devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new VueLoaderPlugin(),
	])
}else{
	devtool= '#eval-source-map';
	plugins = [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve('./html/index.html'),
			inject: false,
			hash: true
		}),
		new HtmlWebpackPlugin({
			template: path.resolve('./html/app.html'),
			filename: 'app.html',
			inject: false,
			hash: true
		}),
	];
	entry = {
		main: './src/main.js',
		app: './src/app.js',
		base_css: './src/scss/base.scss',
	};
}
module.exports = {
	plugins,
	entry,
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
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				]
			},
			{
				test: /\.vue$/,
				use: [{
					loader: 'vue-loader',
					options: {
						ts: 'ts-loader',
						scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
					}
				}]
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
			'_lib': path.resolve('src/lib'),
		},
		extensions: ['*', '.js', '.vue', '.json', '.ts']
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
	devtool,
}

