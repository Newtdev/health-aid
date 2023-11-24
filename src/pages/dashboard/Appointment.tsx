/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "flowbite-react";
import TableComp from "../../components/TableComp";
// import { GoSearch } from "react-icons/go";
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

async function getUserWalletDetails(params: any) {
	return await axiosInstance.get(API_ROUTES.APPOINTMENTS_LIST, { params });
	// return res || {};
}

export default function Appointment() {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	// const [search, setSearch] = useState("");
	// const q = useDeferredValue(search);

	// const appointmentList = useQuery({
	// 	queryKey: [QUERY_KEY.WALLET, currentPage, search],
	// 	queryfn: () => getUserWalletDetails({ page: currentPage, search: q }),
	// });

	const appointmentList = useQuery({
		queryKey: [QUERY_KEY.WALLET, currentPage],
		queryFn: () => getUserWalletDetails({ page: currentPage }),
		keepPreviousData: true,
		staleTime: 200,
	});

	// getUserWalletDetails({
	// 	...(currentPage > 1 && { page: currentPage }),
	// 	...(search !== "" && { q:  }),
	// }),

	// function handleSearch(e: { target: { value: string } }) {
	// 	setSearch(e.target.value);
	// }
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
			<article className="h-full mt-16 pt-10 md:px-6 w-full">
				<div className="py-6 flex justify-end items-center px-6 md:px-0">
					{/* <TextInput
						icon={GoSearch}
						sizing="lg"
						value={q}
						className="w-full md:w-[80%]"
						placeholder="search"
						type="email"
						onChange={handleSearch}
					/> */}
					{/* {console.log(q, "sdddddd")} */}
					<Button
						className="bg-primary-dark hidden md:block"
						size="lg"
						onClick={() => navigate(ROUTE.Appointments_Create)}>
						Book appointments
					</Button>
					<Button
						className="bg-primary-dark mt-10 w-full md:hidden"
						size="md"
						onClick={() => navigate(ROUTE.Appointments_Create)}>
						Book appointments
					</Button>
				</div>
				<div></div>
				<div className="mt-6 py-6 overflow-auto">
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
