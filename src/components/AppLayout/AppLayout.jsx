import styles from "./AppLayout.module.scss";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import removeAuthToken from "../../utils/deleteAuthToken";

const AppLayout = ({ children }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const logoutHandler = () => {
		removeAuthToken();

		return navigate("/");
	};

	return (
		<>
			<div className={`${styles.container} min-h-screen w-screen max-w-full`}>
				<header className="h-8">
					<div className="max-width h-full flex items-center justify-between">
						<h1 className="text-white text-2xl font-bold">Viajes</h1>

						{pathname === "/home" && (
							<Popover>
								<PopoverTrigger>
									<button>
										<SettingsIcon w={30} h={30} color="white" />
									</button>
								</PopoverTrigger>
								<PopoverContent w={150}>
									<div className="p-3">
										<button onClick={logoutHandler} className="text-red-700">
											Log out
										</button>
									</div>
								</PopoverContent>
							</Popover>
						)}
					</div>
				</header>
				<main className="w-full h-full py-8">{children}</main>
			</div>
		</>
	);
};

export default AppLayout;
