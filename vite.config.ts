import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import { defineConfig, loadEnv } from 'vite';
import nodePolyfills from 'rollup-plugin-polyfill-node';

/** @type {import('vite').defineConfig} */
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		server: {
			port: Number(env.VITE_PORT)
		},
		plugins: [
			sveltekit(),
			svg({
				includePaths: ['./src/lib/svgs/'],
				svgoOptions: {
					multipass: true,
					plugins: ['preset-default']
				}
			})
		],
		build: {
			rollupOptions: {
				plugins: [nodePolyfills()]
			}
		},
		resolve: {
			alias: {
				Buffer: 'node:Buffer'
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "src/styles/main.scss" as *;'
				}
			}
		},
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	};
});
