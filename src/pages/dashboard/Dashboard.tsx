import { Fragment } from "react";
import { ROUTE } from "../../dtos/contant";
import { Button } from "flowbite-react";
import CardComp from "../../components/CardComp";

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


export default function Dashboard() {
  return (
		<section className=" h-screen w-full bg-white">
			<article
				className="w-full h-full
        px-6 mt-10 pt-8 
        ">
				<div className="w-full p-6 h-56 mt-6 rounded-lg bg-primary-dark ">
					<div className="flex justify-between">
						<div>
							<p className="text-sm md:text-base">HEALTH SAVINGS ACCOUNT</p>
							<h1 className="font-bold text-base md:text-xl lg:text-2xl">
								{" "}
								N 0.00
							</h1>
						</div>
						<Button className="font-bold bg-primary-darker hover:bg-primary-dark">Fund wallet</Button>
					</div>
				</div>
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {cards.map((d) => <Fragment key={d.id}>
            <CardComp {...d} />
        </Fragment> )};
				</div>
			</article>
		</section>
	);
}
