module.exports = {
	mode: "jit",
	purge: ["./public/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
	// purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#032541",
				secondary: "#2DBBD0",
			},
			fontFamily: {
				sans: ["Source Sans Pro", "sans-serif"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
