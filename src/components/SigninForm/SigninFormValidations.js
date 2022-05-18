import * as Yup from "yup";

export const yupValidationsSchema = Yup.object({
	email: Yup.string()
		.trim()
		.email("You must provide a valid email.")
		.required("Required"),
	password: Yup.string()
		.trim()
		.min(6, "The password must have at least a length of 6 characters.")
		.max(16, "The password allows a maximum length of 16 characters.")
		.required("Required"),
});

export const ownValidations = (values) => {
	const errors = {};

	if (values.password !== values.confirmedPassword) {
		errors.confirmedPassword = "Password and confirmed password aren't equals.";
	}

	return errors;
};
