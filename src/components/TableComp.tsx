/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Pagination, Spinner, Table } from "flowbite-react";

// const tableRow: any[] = [
// 	{
// 		id: "date",
// 		date: "12|2|2023",
// 		time: "9:00pm",
// 		symptoms: "Malaria",
// 		practitioner: "Pairing",
// 		status: <p className="text-green-400">Active</p>,
// 	},
// 	{
// 		id: "date",
// 		date: "12|2|2023",
// 		time: "9:00pm",
// 		symptoms: "Malaria",
// 		practitioner: "Pairing",
// 		status: <p className="text-green-400">Active</p>,
// 	},
// 	{
// 		id: "date",
// 		date: "12|2|2023",
// 		time: "9:00pm",
// 		symptoms: "Malaria",
// 		practitioner: "Pairing",
// 		status: <p className="text-green-400">Active</p>,
// 	},
// 	{
// 		id: "date",
// 		date: "12|2|2023",
// 		time: "9:00pm",
// 		symptoms: "Malaria",
// 		practitioner: "Pairing",
// 		status: <p className="text-green-400">Active</p>,
// 	},
// 	{
// 		id: "date",
// 		date: "12|2|2023",
// 		time: "9:00pm",
// 		symptoms: "Malaria",
// 		practitioner: "Pairing",
// 		status: <p className="text-green-400">Active</p>,
// 	},
// ];

type TableTypes = {
	onPageChange: (arg: number) => void | any;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: string | null;
	tableHeader: { id: string; label: string }[];
	tableRow: { data: []; totalPages: any } | any;
	currentPage: number | any;
	totalPages: number | any;
	reload: () => void;
};

export default function TableComp({
	tableHeader = [],
	isLoading = false,
	isError = false,
	isSuccess = false,
	error,
	tableRow,
	onPageChange,
	currentPage,
	totalPages,
	reload,
}: TableTypes) {
	return (
		<div className="h-full">
			{isLoading ? (
				<div className="w-full h-full flex justify-center items-center">
					<Spinner size="xl" />
				</div>
			) : null}
			{isError ? (
				<div className="w-full h-56 flex flex-col justify-center items-center">
					<p>{error}</p>

					<p>
						<Button
							onClick={reload}
							className="text-white bg-primary-dark mt-4 focus:border-0 hover:bg-primary-darker">
							Reload
						</Button>{" "}
					</p>
				</div>
			) : null}

			{isSuccess && tableRow?.length < 1 ? (
				<div className="w-full h-56 flex flex-col justify-center items-center text-gray-800">
					<p>You have no data to display.</p>
				</div>
			) : null}

			{isSuccess && tableRow?.length > 0 ? (
				<Table hoverable>
					<Table.Head>
						{tableHeader?.map((d: any) => {
							return <Table.HeadCell>{d?.label}</Table.HeadCell>;
						})}
					</Table.Head>
					<Table.Body className="divide-y">
						<>
							{tableRow?.map((row: any) => (
								<Table.Row
									key={row.id}
									className="bg-white dark:border-gray-700 dark:bg-gray-800">
									{tableHeader.map((header: any) => {
										const value = row[header.id];

										return <Table.Cell>{value}</Table.Cell>;
									})}
								</Table.Row>
							))}
						</>
					</Table.Body>

					{totalPages > 1 ? (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={onPageChange}
						/>
					) : null}
				</Table>
			) : null}
		</div>
	);
}


