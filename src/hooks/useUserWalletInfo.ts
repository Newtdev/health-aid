import { useMemo } from "react";
import { QUERY_KEY } from "../contants/queryKey";
import useLocalStorage from "./useLocalStorage";

export default function useUserWalletInfo() {
	const { getItem } = useLocalStorage();
	return useMemo(
		() => JSON.parse(getItem(QUERY_KEY.LOGIN) || "")?.wallet,
		[getItem],
	);
}
