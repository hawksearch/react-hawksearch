import * as webpack from 'webpack';

import * as path from 'path';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (env, argv): webpack.Configuration => {
	let isDevBuild = true;

	if (argv && argv.mode === 'production') {
		isDevBuild = false;
	}

	return {
		entry: {
			styles: './src/styles/app.scss',
			searchbox: './src/app/SearchBox.tsx',
			search: './src/app/Search.tsx',
		},

		output: {
			filename: 'react-hawksearch-[name].js',
			path: path.resolve(__dirname, './dist/min'),

			// by default, we expect our library assets to exist at /assets/
			// this is configurable by consumers via the HawksearchConfig
			publicPath: '/assets/',
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
				'node_modules',
			],
		},

		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						name: 'vendor',
						test: /[\\/]node_modules[\\/]/,
						chunks: 'initial',
					},
				},
			},
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
							envName: isDevBuild ? 'development' : 'production',
						},
					},
				},
				{
					test: /\.scss$/,
					use: [
						// and now lastly extract the css into a dist file
						MiniCssExtractPlugin.loader,
						// then load the css
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								importLoaders: 2,
							},
						},
						// first, transpile sass to css
						'sass-loader',
					],
				},
			],
		},

		mode: isDevBuild ? 'development' : 'production',

		plugins: [
			new MiniCssExtractPlugin({
				filename: 'react-hawksearch.css',
			}),
		],
	};
};
