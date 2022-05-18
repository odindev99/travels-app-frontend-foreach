import "./styles/global.scss";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./components/AppRouter/AppRouter";
import chakraUiCustomTheme from "./utils/chakraUiCustomTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ChakraProvider theme={chakraUiCustomTheme}>
		<AppRouter />
	</ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
