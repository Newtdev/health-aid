import React, { useMemo } from "react";
import { RetriveStoredData } from "../utils/saveData";

export default function useUser() {
	return useMemo(() => RetriveStoredData()?.user, []);
}
