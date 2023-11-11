/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextInput } from "flowbite-react";
import TableComp from "../../components/TableComp";
import { GoSearch } from "react-icons/go";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../contants/AppRoute";
import { useQuery } from "react-query";
import { APPOINTMENT_TYPE, QUERY_KEY, STATUS } from "../../contants/queryKey";
import { API_ROUTES } from "../../contants/ApiRoutes";
import axiosInstance from "../../api";
import { format } from "date-fns";

const tableHeader = [
	{
		id: "createdAt",
		label: "Date",
	},
	{
		id: "appointmentDate",
		label: "Appointment Date",
	},
	{
		id: "type",
		label: "Appointment type",
	},
	{
		id: "channel",
		label: "Appointment Channel",
	},
	{
		id: "address",
		label: "Address",
	},
	{
		id: "status",
		label: "Status",
	},
];

async function getUserWalletDetails() {
	return await axiosInstance.get(API_ROUTES.APPOINTMENTS_LIST);
	// return res || {};
}

export default function Appointment() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const appointmentList = useQuery(QUERY_KEY.WALLET, getUserWalletDetails);
	const [currentPage, setCurrentPage] = useState(1);

	function handleSearch(e: { target: { value: string } }) {
		setSearch(e.target.value);
	}
	const allAppointments = useMemo(
		() => appointmentList?.data?.data?.data,
		[appointmentList],
	);
	const useAppointmentsList = () =>
		allAppointments?.data?.reduce(
			(acc: any[], curr: any) => [
				...acc,
				{
					...curr,
					appointmentDate: format(
						new Date(curr?.appointmentDate),
						"d-MM-yyy h:m:s a",
					),
					createdAt: format(
						new Date(curr?.appointmentDate),
						"d-MM-yyy h:m:s a",
					),
					type: APPOINTMENT_TYPE[curr.type],
					address: curr?.meta?.address,
					status: (
						<span className={`${STATUS[curr?.status]} capitalize`}>
							{curr?.status}
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
				<div className="py-6 flex justify-between items-center">
					<TextInput
						icon={GoSearch}
						sizing="lg"
						value={search}
						className="w-[80%]"
						placeholder="search"
						type="email"
						onChange={handleSearch}
					/>
					<Button
						className="bg-primary-dark"
						size="lg"
						onClick={() => navigate(ROUTE.Appointments_Create)}>
						Book appointments
					</Button>
				</div>
				<div></div>
				<div className="mt-6 py-6">
					<TableComp
						tableHeader={tableHeader}
						tableRow={useAppointmentsList()}
						error={appointmentList?.error as string}
						isLoading={
							appointmentList?.isLoading || appointmentList?.isFetching
						}
						reload={appointmentList?.refetch}
						isError={appointmentList?.isError}
						isSuccess={appointmentList?.isSuccess}
						onPageChange={onPageChange}
						currentPage={currentPage}
						totalPages={allAppointments?.totalPages}
					/>
				</div>
			</article>
		</section>
	);
}
