import webpack from 'webpack';
import * as path from 'path';

const config: webpack.Configuration = {
	entry: './src/index.ts',

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},

	devServer: {
		contentBase: './dist',
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
};

export default config;
