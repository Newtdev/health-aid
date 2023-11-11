import { Fragment } from "react";
import CardComp from "../../components/CardComp";
import { ROUTE } from "../../contants/AppRoute";
import { useQuery } from "react-query";
import axiosInstance from "../../api";
import { API_ROUTES } from "../../contants/ApiRoutes";
import { QUERY_KEY } from "../../contants/queryKey";
import Loader from "../../components/Loader";
import CardHistory from "../../components/CardHistory";
import { TfiTimer } from "react-icons/tfi";

const cards = [
	{
		id: 1,
		name: "Book an Appointment",
		link: ROUTE.Appointments_Create,
		btnName: "Book Now",
		icon: <TfiTimer className="text-4xl text-primary-lighter" />,
		background: "bg-primary-lighter text-white",
	},
	{
		id: 2,
		name: "Sevice List",
		link: ROUTE.ServicesList,
		btnName: "More details",
		icon: <TfiTimer className="text-4xl text-primary-lighter" />,
		background: "bg-primary-lighter text-white",
	},
	{
		id: 3,
		name: "Get Help",
		link: ROUTE.Dashboard_Home,
		icon: <TfiTimer className="text-4xl text-primary-lighter" />,
		background: "bg-primary-lighter",
		btnName: "Contact customer agent",
	},
];

async function getUserDetails() {
	return await axiosInstance.get(API_ROUTES.GET_USER_DETAILS);
}

export default function Dashboard() {
	const result = useQuery(QUERY_KEY.USER, getUserDetails);

	return (
		<section className=" h-screen w-full bg-white">
			{result?.isLoading ? <Loader /> : null}
			<article
				className="w-full h-full
        px-6 mt-10 pt-8 
        ">
				<CardHistory />
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
					{cards.map((d) => (
						<Fragment key={d.id}>
							<CardComp {...d} />
						</Fragment>
					))}
				</div>
			</article>
		</section>
	);
}
