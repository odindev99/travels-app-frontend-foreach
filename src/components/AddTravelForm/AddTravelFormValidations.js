import * as Yup from "yup";

export const yupValidationsSchema = Yup.object({
	startpoint: Yup.string()
		.trim()
		.min(6, "Se necesitan al menos 6 caracteres.")
		.max(50, "El limite es de 50 caracteres")
		.required("Requerido!"),
	endpoint: Yup.string()
		.trim()
		.min(6, "Se necesitan al menos 6 caracteres.")
		.max(50, "El limite es de 50 caracteres")
		.required("Requerido!"),
	transport: Yup.string().trim().required("Requerido!"),
	kilometres: Yup.number().required("Requerido!"),
	workers: Yup.string().trim().required("Requerido!"),
	creatorName: Yup.string().trim().required("Requerido!"),
	roundtrip: Yup.string().required("Requerido!"),
});
