import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import { defineConfig, loadEnv } from 'vite';
import esbuildPluginPino from 'esbuild-plugin-pino';

/** @type {import('vite').defineConfig} */
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		server: {
			port: Number(env.VITE_PORT)
		},
		optimizeDeps: {
			esbuildOptions: {
				plugins: [
					esbuildPluginPino({
						transports: [
							'pino-pretty',
							'pino-datadog-transport',
							'pino-abstract-transport',
							'pino-std-serializers'
						]
					})
				]
			}
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
