import * as webpack from 'webpack';

import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
	entry: './src/index.ts',

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, './dist'),
	},

	devServer: {
		contentBase: './dist',
		hot: true,
	},

	resolve: {
		// These are the reasonable defaults supported by the Node ecosystem.
		// We also include JSX as a common component filename extension to support
		// some tools, although we do not recommend using it, see:
		// https://github.com/facebookincubator/create-react-app/issues/290
		// `web` extension prefixes have been added for better support
		// for React Native Web.
		extensions: ['.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx'],
		alias: {
			src: path.resolve(__dirname, './src'),
		},
	},

	module: {
		rules: [
			{
				// feed typescript and javascript through babel
				test: /\.(tsx?)|\.(jsx?)$/,
				exclude: /node_modules/,
				loader: 'babel-loader?cacheDirectory=true',
			},
		],
	},

	mode: 'development',

	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			filename: 'index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};

export default config;
