/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Spinner, Table } from "flowbite-react";
import { isError } from "react-query";
import { Link } from "react-router-dom";
const tableHeader: any[] = [
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

const tableRow: any[] = [
	{
		id: "date",
		date: "12|2|2023",
		time: "9:00pm",
		symptoms: "Malaria",
		practitioner: "Pairing",
		status: <p className="text-green-400">Active</p>,
	},
	{
		id: "date",
		date: "12|2|2023",
		time: "9:00pm",
		symptoms: "Malaria",
		practitioner: "Pairing",
		status: <p className="text-green-400">Active</p>,
	},
	{
		id: "date",
		date: "12|2|2023",
		time: "9:00pm",
		symptoms: "Malaria",
		practitioner: "Pairing",
		status: <p className="text-green-400">Active</p>,
	},
	{
		id: "date",
		date: "12|2|2023",
		time: "9:00pm",
		symptoms: "Malaria",
		practitioner: "Pairing",
		status: <p className="text-green-400">Active</p>,
	},
	{
		id: "date",
		date: "12|2|2023",
		time: "9:00pm",
		symptoms: "Malaria",
		practitioner: "Pairing",
		status: <p className="text-green-400">Active</p>,
	},
];

export default function TableComp({isLoading=false,isError=false, isSuccess=true}) {
    return (
			<div className="h-full">
				{isLoading ? (
					<div className="w-full h-full flex justify-center items-center">
						<Spinner size="xl" />
					</div>
				) : null}
				{isError ? (
					<div className="w-full h-56 flex flex-col justify-center items-center">
						<p>oops! Something we wrong!</p>

						<p>
							<Button  className="text-white bg-primary-dark mt-4 focus:border-0 hover:bg-primary-darker">
								Reload
							</Button>{" "}
							
						</p>
					</div>
				) : null}
				{tableRow?.length < 1 ? (
					<div className="w-full h-56 flex flex-col justify-center items-center">
						<p>You have no appointments.</p>

						<p>
							<Link to="/" className="text-primary-light">
								Click here
							</Link>{" "}
							to start booking an appoinment.
						</p>
					</div>
				) : null}
				{isSuccess ? (
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
					</Table>
				) : null}
			</div>
		);
}


