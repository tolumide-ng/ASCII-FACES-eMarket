const { colors, maxWidth, width } = require("tailwindcss/defaultTheme");

module.exports = {
	theme: {
		screens: {
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }
		},
		extend: {
			width: {
				"2/7": "22.2222222%",
				"3/9": "33.1111111%",
			},
		},
	},
	variants: {},
	plugins: [],
};
