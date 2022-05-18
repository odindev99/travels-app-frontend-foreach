import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Signin from "../../pages/Signin";

function AppRouter() {
	return (
		<BrowserRouter>
			<AppLayout>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</AppLayout>
		</BrowserRouter>
	);
}

export default AppRouter;
