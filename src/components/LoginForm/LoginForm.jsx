import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import { yupValidationsSchema } from "./LoginFormValidations.js";
import Users from "../../services/Users";
import useLoadingProcess from "../../hooks/useLoadingProcess";

const submitHandler = async ({
	formValues,
	toast,
	navigate,
	startLoadingProcess,
	endLoadingProcess,
}) => {
	try {
		startLoadingProcess();

		const { email, password } = formValues;

		const response = await Users.loginUser({ email, password });

		toast({
			title: response.data.message,
			position: "top-right",
			isClosable: true,
			status: "success",
		});

		localStorage.setItem("travels_jwt", response.data.token);

		endLoadingProcess();

		return navigate("/home");
	} catch (error) {
		endLoadingProcess();

		return toast({
			title:
				error?.response?.data?.message ||
				"Error haciendo login, intente de nuevo!",
			position: "top-right",
			isClosable: true,
			status: "error",
		});
	}
};

const LoginForm = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { loading, startLoadingProcess, endLoadingProcess } =
		useLoadingProcess();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yupValidationsSchema,
		onSubmit: (formValues) =>
			submitHandler({
				formValues,
				toast,
				navigate,
				endLoadingProcess,
				startLoadingProcess,
			}),
	});

	return (
		<AuthForm submitHandler={formik.handleSubmit}>
			<h3 className="font-bold text-xl text-center">Inicia Sesión</h3>

			<FormControl>
				<FormLabel htmlFor="email">Email:</FormLabel>
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
				<FormLabel htmlFor="password">Password:</FormLabel>
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

			<div>
				<p>No tienes una cuenta?</p>
				<Link className="link" to="/signin">
					Registrate
				</Link>
			</div>

			{loading && (
				<div className="w-full flex justify-center">
					<Spinner />
				</div>
			)}

			<Button colorScheme="blue" type="submit">
				Login
			</Button>
		</AuthForm>
	);
};

export default LoginForm;
