import { extendTheme } from "@chakra-ui/react";
import scssVars from "../styles/_variables.module.scss"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
	colors: {
		app: {
			primary: scssVars.primaryColor,
			secondary: scssVars.secondaryColor,
			terciary: scssVars.terciaryColor,
		},
	},
});

export default theme;
