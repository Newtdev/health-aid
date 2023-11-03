/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";

type QueryProcessTypes = {
	queryKey: string;
	queryFn?: (variables: any, var1: any) => Promise<any>;
	mutatationFn?: (variables: any) => Promise<any>;
	Options?: any;
};

export default function useApiRequest() {
	const queryClient = useQueryClient();

	function Query({ queryKey, queryFn, Options }: QueryProcessTypes) {
		return useQuery({ queryKey, queryFn, ...Options });
	}

	function Mutation({ queryKey, mutatationFn, Options }: QueryProcessTypes) {
		console.log("options", Options);
		return useMutation({
			queryKey,
			mutatationFn,
			unSettled: () => queryClient.invalidateQueries(queryKey),
			...Options,
		});
	}
	return {
		Query,
		Mutation,
	};
}
