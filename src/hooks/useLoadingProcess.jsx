import { useState } from "react";

const useLoadingProcess = () => {
	const [loading, setLoading] = useState(false);

	const startLoadingProcess = () => setLoading(true);
	const endLoadingProcess = () => setLoading(false);

	return {
		loading,
		startLoadingProcess,
		endLoadingProcess,
	};
};

export default useLoadingProcess;
