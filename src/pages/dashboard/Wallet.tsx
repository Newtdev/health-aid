/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput } from "flowbite-react";
import TableComp from "../../components/TableComp";
import { GoSearch } from "react-icons/go";
import { useMemo, useState } from "react";
import CardHistory from "../../components/CardHistory";
import { useQuery } from "react-query";
import { QUERY_KEY } from "../../contants/queryKey";
import { API_ROUTES } from "../../contants/ApiRoutes";
import axiosInstance from "../../api";

const tableHeader = [
	{
		id: "date",
		label: "Date",
	},
	{
		id: "time",
		label: "Time",
	},
	{
		id: "symptoms",
		label: "Symptoms",
	},
	{
		id: "practitioner",
		label: "Health Practitioner",
	},
	{
		id: "status",
		label: "Status",
	},
];


async function getUserWalletDetails() {
	return await axiosInstance.get<any>(API_ROUTES.USER_WALLET);
	// return res || {};
}

const Wallet = () => {
	const [search, setSearch] = useState("");
	const userWallerInfo = useQuery(QUERY_KEY.WALLET, getUserWalletDetails);
	const [currentPage, setCurrentPage] = useState(1);

	function handleSearch(e: { target: { value: string } }) {
		setSearch(e.target.value);
	}
	const userTransactionData = useMemo(
		() => userWallerInfo?.data?.data?.transactions,
		[userWallerInfo],
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
				<div className="mt-6">
					<TableComp
						tableHeader={tableHeader}
						tableRow={userTransactionData}
						error={userWallerInfo?.error as string}
						isLoading={userWallerInfo?.isLoading}
						isError={userWallerInfo?.isError}
						isSuccess={userWallerInfo?.isSuccess}
						onPageChange={onPageChange}
						currentPage={currentPage}
					/>
				</div>
			</article>
		</section>
	);
};

export default Wallet;
