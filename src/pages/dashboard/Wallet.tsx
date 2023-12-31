/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput } from "flowbite-react";
import TableComp from "../../components/TableComp";
import { GoSearch } from "react-icons/go";
import { useMemo, useState } from "react";
import CardHistory from "../../components/CardHistory";
import { useQuery } from "react-query";
import { QUERY_KEY, STATUS } from "../../contants/queryKey";
import { API_ROUTES } from "../../contants/ApiRoutes";
import axiosInstance from "../../api";
import { formatNumberToCurrency } from "../../utils/formatCurrency";
import { format } from "date-fns";

type CurrentDataTypes = {
	createdAt: string | number | Date;
	fees: string | undefined;
	reference: any;
	status: "pending" | "success" | "failed";
};

const tableHeader = [
	{
		id: "date",
		label: "Date",
	},
	// {
	// 	id: "time",
	// 	label: "Time",
	// },
	// {
	// 	id: "symptoms",
	// 	label: "Symptoms",
	// },
	// {
	// 	id: "practitioner",
	// 	label: "Health Practitioner",
	// },
	{
		id: "reference",
		label: "Reference Number",
	},
	{
		id: "fees",
		label: "Fees",
	},
	{
		id: "status",
		label: "Status",
	},
];

async function getUserWalletDetails(params: any) {
	return await axiosInstance.get<any>(API_ROUTES.USER_WALLET, { params });
	// return res || {};
}

const Wallet = () => {
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const userWallerInfo = useQuery({
		queryKey: [QUERY_KEY.WALLET, currentPage],
		queryFn: () => getUserWalletDetails({ page: currentPage }),
	});
	const userWalletData = useMemo(
		() => userWallerInfo?.data?.data?.transactions,
		[userWallerInfo?.data?.data?.transactions],
	);

	function handleSearch(e: { target: { value: string } }) {
		setSearch(e.target.value);
	}
	const userTransactionData = () =>
		userWalletData?.data.reduce(
			(acc: any, cur: CurrentDataTypes) => [
				...acc,
				{
					...cur,
					date: format(new Date(cur?.createdAt), "d-MM-yyyy"),
					fees: `N ${formatNumberToCurrency(cur?.fees)}`,
					reference: cur?.reference,
					status: (
						<span className={`${STATUS[cur?.status]} capitalize`}>
							{cur?.status}
						</span>
					),
				},
			],
			[],
		);

	const onPageChange = (page: number) => setCurrentPage(page);
	return (
		<section className=" h-screen w-full ">
			<article className="h-full mt-16 pt-10 px-6 w-full">
				<CardHistory />
				<div className="py-6 flex justify-between items-center">
					<TextInput
						icon={GoSearch}
						sizing="lg"
						value={search}
						className="w-full"
						placeholder="search"
						type="email"
						onChange={handleSearch}
					/>
				</div>
				<div></div>
				<div className="mt-6 overflow-auto">
					<TableComp
						tableHeader={tableHeader}
						tableRow={userTransactionData()}
						error={userWallerInfo?.error as string}
						isLoading={userWallerInfo?.isLoading || userWallerInfo?.isFetching}
						reload={userWallerInfo?.refetch}
						isError={userWallerInfo?.isError}
						isSuccess={userWallerInfo?.isSuccess}
						onPageChange={onPageChange}
						currentPage={currentPage}
						totalPages={userWalletData?.totalPages}
					/>
				</div>
			</article>
		</section>
	);
};

export default Wallet;
