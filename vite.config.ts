import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import { defineConfig, loadEnv } from 'vite';
import worker from 'rollup-plugin-workers';
import { fileURLToPath } from 'node:url';

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
				plugins: [worker()],
				// external: ["pino-worker", "pino-file", "pino-pipeline-worker", "pino-pretty", "pino-datadog-transport", "thread-stream-worker"],
				output: {
					// paths: {
					// 	"pino-worker": fileURLToPath(
					// 		new URL(
					// 			'/node_modules/pino/lib/worker.js',
					// 			import.meta.url
					// 		)
					// 	),
					// 	"pino-file": fileURLToPath(
					// 		new URL(
					// 			'/node_modules/pino/file.js',
					// 			import.meta.url
					// 		)
					// 	),
					// 	"pino-pipeline-worker": fileURLToPath(
					// 		new URL(
					// 			'/node_modules/pino/lib/worker-pipeline.js',
					// 			import.meta.url
					// 		)
					// 	),
					// 	"pino-pretty": fileURLToPath(
					// 		new URL(
					// 			'/node_modules/pino-pretty',
					// 			import.meta.url
					// 		)
					// 	),
					// 	"pino-datadog-transport": fileURLToPath(
					// 		new URL(
					// 			'/node_modules/pino-datadog-transport',
					// 			import.meta.url
					// 		)
					// 	),
					// 	"thread-stream-worker": fileURLToPath(
					// 		new URL(
					// 			'/node_modules/thread-stream/lib/worker.js',
					// 			import.meta.url
					// 		)
					// 	)
					// },
					manualChunks: {
						'thread-stream-worker': [
							fileURLToPath(new URL('/node_modules/thread-stream/lib/worker.js', import.meta.url))
						],
						'pino-worker': [
							fileURLToPath(new URL('/node_modules/pino/lib/worker.js', import.meta.url))
						],
						'pino-file': [fileURLToPath(new URL('/node_modules/pino/file.js', import.meta.url))],
						'pino-pipeline-worker': [
							fileURLToPath(new URL('/node_modules/pino/lib/worker-pipeline.js', import.meta.url))
						],
						'pino-pretty': [fileURLToPath(new URL('/node_modules/pino-pretty', import.meta.url))]
					}
				}
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
