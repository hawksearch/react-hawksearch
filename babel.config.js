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
					useBuiltIns: 'entry',
				},
			],
			'@babel/preset-typescript',
			'@babel/preset-react',
		];
	} else if (api.env('development') || api.env('test')) {
		presets = [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'entry',
				},
			],
			'@babel/preset-typescript',
			'@babel/preset-react',
		];
	}

	return {
		presets: presets,
		plugins: [
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-object-rest-spread',
			// TODO: RHL is disabled as it doesn't support React 16.7's hooks!
			//'react-hot-loader/babel',
		],
	};
};
