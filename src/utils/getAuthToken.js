const getAuthToken = () => {
	const authToken = localStorage.getItem("travels_jwt");

	return authToken;
};

export default getAuthToken;
