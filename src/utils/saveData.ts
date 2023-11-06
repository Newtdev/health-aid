import { QUERY_KEY } from "../contants/queryKey";

// type DataTypes = {};

export const SaveDataToLocalStorage = (data: any) => {
	if (data && data !== undefined) {
		localStorage.setItem(QUERY_KEY.LOGIN, JSON.stringify(data));
	}
	return;
};

export const RetriveStoredData = () => {
	const data = localStorage.getItem(QUERY_KEY.LOGIN);

	if (data && data !== undefined) {
		return JSON.parse(data);
	}
	return data;
};
