/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "echolayer": {
          "blue": {
            DEFAULT: "#2654F4",
            100: "#2654F4",
            200: "#001C7F",
          },
          "content": {
            DEFAULT: "#F2F2F2",
          },
          "yellow": {
            DEFAULT: "#FBBF24",
            100: "#FDF7E7",
          },
          "red": {
            DEFAULT: "#D50000",
            100: "#FBF0F0",
          },
        }
      }
    },
  },
  plugins: [],
}

