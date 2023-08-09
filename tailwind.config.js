/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				neutral: {
					25: '#FAFAFA'
				},
				echolayer: {
					blue: {
						DEFAULT: '#2654F4',
						100: '#2654F4',
						200: '#001C7F'
					},
					lightBlue: {
						DEFAULT: '#D4DDFD',
						100: '#2654f433' // Blue-100 w/ 20% opacity
					},
					content: {
						DEFAULT: '#F2F2F2'
					},
					yellow: {
						DEFAULT: '#FBBF24',
						100: '#FDF7E7'
					},
					red: {
						DEFAULT: '#D50000',
						100: '#FBF0F0'
					},
					green: {
						DEFAULT: '#1B543F',
						100: '#35A77E'
					}
				}
			},
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			},
			gridTemplateColumns: {
				'1/3-2/3': '1fr 2fr'
			}
		}
	},
	plugins: []
};
