import { useMemo } from "react";

import useLocalStorage from "./useLocalStorage";
import { QUERY_KEY } from "../contants/queryKey";

export default function useUser() {
	const { getItem } = useLocalStorage();
	return useMemo(
		() => JSON.parse(getItem(QUERY_KEY.LOGIN) || "")?.user,
		[getItem],
	);
}
