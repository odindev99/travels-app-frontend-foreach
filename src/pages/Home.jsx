import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
	Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddTravelForm from "../components/AddTravelForm/AddTravelForm";
import TravelsTable from "../components/TravelsTable/TravelsTable";
import Users from "../services/Users";
import getAuthToken from "../utils/getAuthToken";

const Home = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [travels, setTravels] = useState();
	const toast = useToast();

	const onUpdateTravels = (newTravel) =>
		setTravels((prevTravels) => [...prevTravels, newTravel]);

	useEffect(() => {
		const authToken = getAuthToken();
		Users.getTracks(authToken)
			.then((response) => {
				console.log(response);
				setTravels(response.data.travels);
			})
			.catch((error) => {
				return toast({
					title:
						error?.response?.data?.message ||
						"Error obteniendo viajes, intente de nuevo!",
					position: "top-right",
					isClosable: true,
					status: "error",
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="w-full h-full">
			{travels ? (
				<TravelsTable onOpen={onOpen} travels={travels} />
			) : (
				<div className="w-full h-full flex justify-center items-center">
					<Spinner size="md" />
				</div>
			)}

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">Añade un Viaje</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<AddTravelForm
							onClose={onClose}
							onUpdateTravels={onUpdateTravels}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Home;
