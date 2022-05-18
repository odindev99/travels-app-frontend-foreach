import {
	FormControl,
	FormLabel,
	Input,
	Select,
	RadioGroup,
	Stack,
	Radio,
	Button,
	useToast,
	Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { yupValidationsSchema } from "./AddTravelFormValidations";
import Travels from "../../services/Travels";
import getAuthToken from "../../utils/getAuthToken";
import useLoadingProcess from "../../hooks/useLoadingProcess";

const submitHandler = async (
	formValues,
	onUpdateTravels,
	formik,
	toast,
	startLoadingProcess,
	endLoadingProcess
) => {
	try {
		startLoadingProcess();

		const { roundtrip, ...rest } = formValues;
		const travelData = {
			...rest,
			roundtrip: roundtrip === "si" ? true : false,
		};

		const authToken = getAuthToken();

		const response = await Travels.postTravel(travelData, authToken);

		onUpdateTravels(response.data.newTravel);

		endLoadingProcess();

		formik.resetForm();

		return toast({
			title: response.data.message,
			position: "top-right",
			isClosable: true,
			status: "success",
		});
	} catch (error) {
		endLoadingProcess();

		formik.resetForm();

		return toast({
			title:
				error?.response?.data?.message ||
				"Error agregando travel, intente de nuevo!",
			position: "top-right",
			isClosable: true,
			status: "error",
		});
	}
};

const AddTravelForm = ({ onClose, onUpdateTravels }) => {
	const toast = useToast();
	const { loading, startLoadingProcess, endLoadingProcess } =
		useLoadingProcess();

	const formik = useFormik({
		initialValues: {
			startpoint: "",
			endpoint: "",
			transport: "",
			kilometres: undefined,
			workers: "",
			creatorName: "",
			roundtrip: "si",
		},
		validationSchema: yupValidationsSchema,
		onSubmit: (values) => {
			submitHandler(
				values,
				onUpdateTravels,
				formik,
				toast,
				startLoadingProcess,
				endLoadingProcess
			);
		},
	});

	return (
		<form className="pb-3 flex flex-col gap-y-5" onSubmit={formik.handleSubmit}>
			<FormControl>
				<FormLabel htmlFor="startpoint">
					Dirección del punto de partida:
				</FormLabel>
				<Input
					id="startpoint"
					name="startpoint"
					type="text"
					variant="filled"
					{...formik.getFieldProps("startpoint")}
				/>
				{formik.touched.startpoint && formik.errors.startpoint ? (
					<div className="formik-error">{formik.errors.startpoint}</div>
				) : null}
			</FormControl>

			<FormControl>
				<FormLabel htmlFor="endpoint">
					Dirección del punto de término:
				</FormLabel>
				<Input
					id="endpoint"
					name="endpoint"
					type="text"
					variant="filled"
					{...formik.getFieldProps("endpoint")}
				/>
				{formik.touched.endpoint && formik.errors.endpoint ? (
					<div className="formik-error">{formik.errors.endpoint}</div>
				) : null}
			</FormControl>

			<FormControl>
				<FormLabel htmlFor="transport">Medio de transporte:</FormLabel>
				<Select
					placeholder="Seleccione una opción"
					id="transport"
					name="transport"
					variant="filled"
					{...formik.getFieldProps("transport")}
				>
					<option value="metro">Metro</option>
					<option value="auto">Auto</option>
					<option value="camioneta">Camioneta</option>
					<option value="motocicleta">Motocicleta</option>
					<option value="bus trasantiago">Bus Transantiago</option>
					<option value="bus privado">Bus Privado</option>
					<option value="avion nacional">Avión Nacional</option>
					<option value="avion internacional">Avión Internacional</option>
					<option value="caminando">Caminando</option>
				</Select>
				{formik.touched.transport && formik.errors.transport ? (
					<div className="formik-error">{formik.errors.transport}</div>
				) : null}
			</FormControl>

			<FormControl>
				<FormLabel htmlFor="kilometres">Cantidad de kilómetros:</FormLabel>
				<Input
					id="kilometres"
					name="kilometres"
					type="number"
					variant="filled"
					{...formik.getFieldProps("kilometres")}
				/>
				{formik.touched.kilometres && formik.errors.kilometres ? (
					<div className="formik-error">{formik.errors.kilometres}</div>
				) : null}
			</FormControl>

			<FormControl>
				<FormLabel htmlFor="workers">
					Nombre de los trabajadores en el viaje:
				</FormLabel>
				<Input
					id="workers"
					name="workers"
					type="text"
					variant="filled"
					{...formik.getFieldProps("workers")}
				/>
				{formik.touched.workers && formik.errors.workers ? (
					<div className="formik-error">{formik.errors.workers}</div>
				) : null}
			</FormControl>

			<FormControl>
				<FormLabel htmlFor="creatorName">
					Nombre de quien registra el viaje:
				</FormLabel>
				<Input
					id="creatorName"
					name="creatorName"
					type="text"
					variant="filled"
					{...formik.getFieldProps("creatorName")}
				/>
				{formik.touched.creatorName && formik.errors.creatorName ? (
					<div className="formik-error">{formik.errors.creatorName}</div>
				) : null}
			</FormControl>

			<FormControl>
				<FormLabel htmlFor="roundtrip">¿Es ida y vuelta o solo ida?</FormLabel>
				<RadioGroup
					defaultValue="si"
					onChange={(value) => formik.setFieldValue("roundtrip", value)}
					id="roundtrip"
					name="roundtrip"
				>
					<Stack spacing={4} direction="row">
						<Radio value="si">Sí</Radio>
						<Radio value="no">No</Radio>
					</Stack>
				</RadioGroup>
				{formik.touched.roundtrip && formik.errors.roundtrip ? (
					<div className="formik-error">{formik.errors.roundtrip}</div>
				) : null}
			</FormControl>

			{loading && (
				<div className="w-full flex justify-center">
					<Spinner />
				</div>
			)}

			<div className="flex justify-center gap-x-6">
				<Button type="submit" colorScheme="blue" size="sm">
					Añadir
				</Button>
				<Button type="button" colorScheme="red" size="sm" onClick={onClose}>
					Cancelar
				</Button>
			</div>
		</form>
	);
};

export default AddTravelForm;
