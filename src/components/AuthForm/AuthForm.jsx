import React from "react";

const AuthForm = ({ children, submitHandler }) => {
	return (
		<div className="max-width h-full flex flex-col justify-center items-center">
			<form
				className="bg-white p-8 max-w-md w-full flex flex-col gap-y-4 shadow-lg"
				onSubmit={submitHandler}
			>
				{children}
			</form>
		</div>
	);
};

export default AuthForm;
