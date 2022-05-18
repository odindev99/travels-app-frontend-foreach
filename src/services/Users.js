import axios from "axios";

class Users {
	#fetcher = axios.create({
		baseURL: `${process.env.REACT_APP_API_URL}/users/`,
	});

	async siginUser(userData) {
		try {
			const response = await this.#fetcher.post("/signin", userData);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async loginUser(userData) {
		try {
			const response = await this.#fetcher.post("/login", userData);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async getTracks(authToken) {
		try {
			const response = await this.#fetcher.get("/travels", {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			return response;
		} catch (error) {
			throw error;
		}
	}
}

export default new Users();
