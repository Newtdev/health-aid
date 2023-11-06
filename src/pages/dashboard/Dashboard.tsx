import { Fragment } from "react";
import CardComp from "../../components/CardComp";
import { ROUTE } from "../../contants/AppRoute";
import { useQuery } from "react-query";
import axiosInstance from "../../api";
import { API_ROUTES } from "../../contants/ApiRoutes";
import { QUERY_KEY } from "../../contants/queryKey";
import Loader from "../../components/Loader";
import CardHistory from "../../components/CardHistory";

const cards = [
	{
		id: 1,
		name: "Book an Appointment",
		link: ROUTE.Appointments,
		btnName: "Book Now",
		icon: "",
		background: "bg-primary-lighter text-white",
	},
	{
		id: 2,
		name: "Sevice List",
		link: ROUTE.Appointments,
		btnName: "More details",
		icon: "",
		background: "bg-primary-lighter text-white",
	},
	{
		id: 3,
		name: "Get Help",
		link: ROUTE.Appointments,
		icon: "",
		background: "bg-primary-lighter",
		btnName: "Contact customer agent",
	},
	{
		id: 4,
		name: "Refer and Earn",
		link: ROUTE.Appointments,
		background: "bg-primary-lighter text-black",
		icon: "",
		btnName: "More details",
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
				{/* <div className="w-full p-6 h-56 mt-6 rounded-lg bg-primary-dark ">
					<div className="flex justify-between items-center">
						<p className="text-sm md:text-lg text-white">
							HEALTH SAVINGS ACCOUNT
						</p>
						<Button
							className="font-bold bg-primary-darker hover:bg-primary-dark"
							onClick={handleMainToggleModal}>
							Fund wallet
						</Button>
					</div>
					<div>
						<div className="mt-2">
							<span className="font-bold text-base md:text-base flex text-white items-center gap-x-3">
								<h2>Main balance:</h2>
								<span className="flex items-center text-base">
									<TbCurrencyNaira />
									<h2>
										{formatNumberToCurrency(userWallet?.balance?.mainBalance)}
									</h2>
								</span>
							</span>
							<span className="font-bold text-base md:text-base flex text-white items-center gap-x-3">
								<h2>Ledger balance:</h2>
								<span className="flex items-center text-base">
									<TbCurrencyNaira />
									<h2>
										{formatNumberToCurrency(userWallet?.balance?.ledgerBalance)}
									</h2>
								</span>
							</span>
						</div>
						<div className="mt-4">
							<p className="text-sm md:text-lg text-white">
								WALLET INFORMATION
							</p>
							<div className="flex items-center mt-2 gap-x-3">
								<span className="font-bold text-base md:text-base flex text-white items-center gap-x-1">
									<h3>Account number:</h3>
									<span className="flex items-center text-sm">
										{userWallet?.dvaID}
									</span>
								</span>
								<span className="font-bold text-base md:text-base flex text-white items-center gap-x-1">
									<h3>Bank name:</h3>
									<span className="flex items-center text-sm">
										{userWallet?.accountBank}
									</span>
								</span>
							</div>
						</div>
					</div>
				</div> */}
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
