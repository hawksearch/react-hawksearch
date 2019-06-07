module.exports = function(api) {
	api.cache.using(() => process.env.NODE_ENV);
	api.cache.using(() => process.env.BUILD_ENV);

	let presets = [];
	let plugins = [];

	if (process.env.BUILD_ENV === 'min') {
		// minified JS bundle build

		if (api.env('production')) {
			presets = [
				[
					'@babel/preset-env',
					{
						targets: {
							browsers: ['last 2 versions'],
						},
						useBuiltIns: 'entry',
						corejs: 2,
					},
				],
				'@babel/preset-typescript',
				'@babel/preset-react',
			];
		} else if (api.env('development')) {
			presets = [
				[
					'@babel/preset-env',
					{
						useBuiltIns: 'entry',
						corejs: 2,
					},
				],
				'@babel/preset-typescript',
				'@babel/preset-react',
			];
		}

		plugins = [
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-object-rest-spread',
		];
	} else if (process.env.BUILD_ENV === 'esm') {
		// es6 module build

		presets = [['@babel/preset-env'], '@babel/preset-typescript', '@babel/preset-react'];

		plugins = [
			// in the ES6 module, we need to utilize @babel/plugin-transform-runtime instead of
			// @babel/polyfill - as the polyfill is only meant for applications not libraries.
			// the minified JS version _does_ use @babel/polyfill as that is built as an application
			// and not a library
			['@babel/plugin-transform-runtime', { useESModules: true }],
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-object-rest-spread',
		];
	} else if (process.env.BUILD_ENV === 'test') {
		// test build environment

		presets = [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'usage',
					corejs: 2,
				},
			],
			'@babel/preset-typescript',
			'@babel/preset-react',
		];

		// in test mode, we exclude @babel/plugin-transform-runtime.
		// this is done because the transform is usually only done for libraries, but in test we're acting like
		// an application
		plugins = [
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-object-rest-spread',
		];
	} else {
		console.error(
			`UNRECOGNIZED BUILD ENVIRONMENT '${process.env.BUILD_ENV}'! Please ensure the BUILD_ENV env var is set`
		);
	}

	return {
		presets,
		plugins,
	};
};
