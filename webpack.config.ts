import * as webpack from 'webpack';

import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (env, argv): webpack.Configuration => {
	let isDevBuild = true;

	if (argv && argv.mode === 'production') {
		isDevBuild = false;
	}

	return {
		entry: {
			index: './src/index.tsx',
			search: './src/search.tsx',
		},

		output: {
			filename: '[name].js',
			chunkFilename: '[name].[contentHash:8].js',
			path: isDevBuild ? undefined : path.resolve(__dirname, './dist'),
		},

		devServer: {
			contentBase: './dist',
			hot: true,
		},

		devtool: isDevBuild ? 'eval-source-map' : 'source-map',

		resolve: {
			// These are the reasonable defaults supported by the Node ecosystem.
			// We also include JSX as a common component filename extension to support
			// some tools, although we do not recommend using it, see:
			// https://github.com/facebookincubator/create-react-app/issues/290
			// `web` extension prefixes have been added for better support
			// for React Native Web.
			extensions: ['.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx'],

			modules: [
				// adding ./src as a resolve path to match what's configured in tsconfig.json
				path.resolve(__dirname, './src'),
				path.resolve(__dirname, './node_modules'),
			],
		},

		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						priority: -20,
						chunks: 'all',
					},
				},
			},
			runtimeChunk: 'single',
		},

		module: {
			rules: [
				{
					// feed typescript and javascript through babel
					test: /\.(tsx?)|\.(jsx?)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						'css-loader',
						//'postcss-loader',
						'sass-loader',
					],
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
			],
		},

		mode: isDevBuild ? 'development' : 'production',

		plugins: [
			new HtmlWebpackPlugin({
				hash: true,
				chunks: ['index', 'runtime', 'vendor'],
				filename: 'index.html',
				template: './src/index.html',
			}),
			new HtmlWebpackPlugin({
				hash: true,
				chunks: ['search', 'runtime', 'vendor'],
				filename: 'search.html',
				template: './src/search.html',
			}),
			new webpack.HotModuleReplacementPlugin(),
			new MiniCssExtractPlugin({
				filename: '[name].[hash].css',
			}),
		],
	};
};
