import { useMemo } from "react";
import { RetriveStoredData } from "../utils/saveData";

export default function useUserWalletInfo() {
	return useMemo(() => RetriveStoredData()?.wallet, []);
}
