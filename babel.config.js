module.exports = function(api) {
	api.cache.using(() => process.env.NODE_ENV);

	let presets;

	if (api.env('production')) {
		presets = [
			[
				'@babel/preset-env',
				{
					targets: {
						browsers: ['last 2 versions'],
					},
				},
			],
			'@babel/preset-typescript',
			'@babel/preset-react',
		];
	} else if (api.env('development')) {
		presets = ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'];
	}

	return {
		presets: presets,
		plugins: [
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-object-rest-spread',
			'react-hot-loader/babel',
		],
	};
};
