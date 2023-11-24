// import { useContext, useEffect, useMemo, useState } from "react";
// import { RetriveStoredData } from "../utils/saveData";
// import { AuthContext } from "../App";
// import useLocalStorage from "./useLocalStorage";
// import useUser from "./useUser";
// import { QUERY_KEY } from "../contants/queryKey";

// export default function useAuth() {
// 	const { getItem } = useLocalStorage();
// 	const { userToken, setToken } = useContext(AuthContext);

// 	const user = getItem(QUERY_KEY.LOGIN);

// 	useEffect(() => {
// 		setToken(JSON.parse(user || ""));
// 	}, []);

// 	return { user: userToken };
// }
