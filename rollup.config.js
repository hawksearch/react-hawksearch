import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

const extensions = ['.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx'];

// our peer dependencies are considered external, and must be provided by the consumer
const external = Object.keys(pkg.peerDependencies);

const config = {
	input: 'src/index.ts',

	output: {
		file: pkg.module,
		format: 'esm',
		sourcemap: true,
	},

	external,

	plugins: [
		json(),
		babel({
			extensions,
			runtimeHelpers: true,
			configFile: './babel.config.js',
			exclude: 'node_modules/**',
		}),
		resolve({
			extensions,
			browser: true,
			preferBuiltIns: false,
			customResolveOptions: {
				moduleDirectory: ['src', 'node_modules'],
			},
		}),
		postcss({
			extract: true,
			minimize: true,
			sourceMap: true,
		}),
		commonjs({
			include: 'node_modules/**',
		}),
	],
};

export default config;
