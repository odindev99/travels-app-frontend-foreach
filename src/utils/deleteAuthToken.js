const removeAuthToken = () => {
	return localStorage.removeItem("musicverse_jwt");
};

export default removeAuthToken;
