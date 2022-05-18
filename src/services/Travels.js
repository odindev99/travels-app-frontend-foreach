import axios from "axios";

class Travels {
	#fetcher = axios.create({
		baseURL: `${process.env.REACT_APP_API_URL}/travels/`,
	});

	async postTravel(travelData, authToken) {
		try {
			const response = await this.#fetcher.post("/", travelData, {
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

export default new Travels();
