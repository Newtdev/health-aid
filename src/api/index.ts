import axios from "axios";
import { RetriveStoredData } from "../utils/saveData";

const axiosInstance = axios.create({
	baseURL: "https://health-sup-aid.up.railway.app/api/v1/",
});

axiosInstance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		const token = RetriveStoredData()?.token;
		if (token) {
			console.log("token", token);
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},

	function (error) {
		console.log("errrrrr", error);
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		// console.log("response", response);
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		console.log("response error", error);
		return Promise.reject(error?.response);
	},
);

export default axiosInstance;
