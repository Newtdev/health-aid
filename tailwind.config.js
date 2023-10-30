/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					darker: "#062668",
					dark: "#194fc5",
					light: "#3d72e2",
					lighter: "#bae2ff",
				},
				secondary: {
					light: "#8341ec",
				},
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};

