import dayjs from "dayjs";

const formatDate = (date) => {
	const formatedDate = dayjs(date).format('DD/MM/YYYY');
	return formatedDate;
};

export default formatDate;
