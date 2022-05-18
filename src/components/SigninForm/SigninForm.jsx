import {
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Users from "../../services/Users";
import AuthForm from "../AuthForm/AuthForm";
import { ownValidations, yupValidationsSchema } from "./SigninFormValidations";
import useLoadingProcess from "../../hooks/useLoadingProcess";

const submitHandler = async ({
	formValues,
	toast,
	startLoadingProcess,
	endLoadingProcess,
}) => {
	try {
		startLoadingProcess();

		const { email, password } = formValues;

		const response = await Users.siginUser({ email, password });

		endLoadingProcess();

		return toast({
			title: response.data.message,
			position: "top-right",
			isClosable: true,
			status: "success",
		});
	} catch (error) {
		endLoadingProcess();

		return toast({
			title:
				error?.response?.data?.message ||
				"Error creando usuario, intente de nuevo!",
			position: "top-right",
			isClosable: true,
			status: "error",
		});
	}
};

const SigninForm = () => {
	const toast = useToast();
	const { loading, startLoadingProcess, endLoadingProcess } =
		useLoadingProcess();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmedPassword: "",
		},
		validate: ownValidations,
		validationSchema: yupValidationsSchema,
		onSubmit: (formValues) =>
			submitHandler({
				formValues,
				endLoadingProcess,
				startLoadingProcess,
				toast,
			}),
	});

	return (
		<AuthForm submitHandler={formik.handleSubmit}>
			<h3 className="font-bold text-xl text-center">Registrate</h3>

			<FormControl>
				<FormLabel htmlFor="email">Correo:</FormLabel>
				<Input
					id="email"
					name="email"
					type="email"
					variant="filled"
					{...formik.getFieldProps("email")}
				/>
				{formik.touched.email && formik.errors.email ? (
					<div className="formik-error">{formik.errors.email}</div>
				) : null}
			</FormControl>

			<FormControl>
				<FormLabel htmlFor="password">Contraseña:</FormLabel>
				<Input
					id="password"
					name="password"
					type="password"
					variant="filled"
					{...formik.getFieldProps("password")}
				/>
				{formik.touched.password && formik.errors.password ? (
					<div className="formik-error">{formik.errors.password}</div>
				) : null}
			</FormControl>

			<FormControl>
				<FormLabel htmlFor="confirmedPassword">
					Confirma la Contraseña:
				</FormLabel>
				<Input
					id="confirmedPassword"
					name="confirmedPassword"
					type="password"
					variant="filled"
					{...formik.getFieldProps("confirmedPassword")}
				/>
				{formik.touched.confirmedPassword && formik.errors.confirmedPassword ? (
					<div className="formik-error">{formik.errors.confirmedPassword}</div>
				) : null}
			</FormControl>

			<div>
				<p>Ya tienes una cuenta?</p>
				<Link className="link" to="/">
					Incia Sesión
				</Link>
			</div>

			{loading && (
				<div className="w-full flex justify-center">
					<Spinner />
				</div>
			)}

			<Button colorScheme="blue" type="submit">
				Registrarse
			</Button>
		</AuthForm>
	);
};

export default SigninForm;
