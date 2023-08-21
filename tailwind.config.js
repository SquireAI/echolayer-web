/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				neutral: {
					25: '#FAFAFA',
					500: '#737373'
				},
				echolayer: {
					orange: {
						DEFAULT: '#FB7124',
						50: '#FB7124',
						200: '#FEE3D3',
						500: '#FB7124',
						900: '#7E3912'
					},
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
						100: '#FDF7E7',
						900: '#7E6012'
					},
					red: {
						DEFAULT: '#D50000',
						100: '#FBF0F0',
						200: '#F7CCCC',
						900: '#6B0000'
					},
					green: {
						DEFAULT: '#1B543F',
						100: '#35A77E',
						200: '#D7EDE5',
						900: '#1B543F'
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
