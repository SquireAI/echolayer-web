import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg'
import { defineConfig, loadEnv } from 'vite'


/** @type {import('vite').defineConfig} */
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	return {
		server: {
			port: Number(env.VITE_PORT),
		},
		plugins: [
			sveltekit(),
			svg({
		includePaths: ['./src/lib/svgs/'],
		svgoOptions: {
			multipass: true,
			plugins: ['preset-default'],
		},
		})
		],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "src/variables.scss" as *;'
				}
			}
		},
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	}
});
