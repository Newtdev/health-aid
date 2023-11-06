import { useMemo } from "react";
import { RetriveStoredData } from "../utils/saveData";

export default function useAuth() {
	return useMemo(() => RetriveStoredData(), []);
}
