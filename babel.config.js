module.exports = {
	presets: [
		[
			'@babel/env',
			{
				targets: {
					browsers: ['last 2 versions'],
				},
			},
		],
		'@babel/typescript',
		'@babel/react',
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/proposal-class-properties',
		'@babel/proposal-object-rest-spread',
		//'react-hot-loader/babel',
	],
	env: {
		test: {
			plugins: ['dynamic-import-node'],
		},
	},
};
