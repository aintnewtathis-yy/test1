import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			container: {
				center: true,
				padding: '1.25rem'
			}
		}
	},

	plugins: [forms]
};