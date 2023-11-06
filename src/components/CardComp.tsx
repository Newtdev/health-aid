/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";

type CardTypes = {
	name: string;
	link: string;
	btnName: string;
	icon: any;
};
export default function CardComp({ name, link, btnName, icon }: CardTypes) {
	return (
		<div
			className={`hover:shadow-xl text-black  bg-primary-light transition-shadow ease-in-out rounded-lg h-56 flex flex-col items-center justify-evenly py-6`}>
			<div>{icon}</div>
			<div>
				<h3 className="font-bold md:text-xl text-white">{name}</h3>
			</div>
			<Link
				className="inline-block py-2 rounded-lg text-white  hover:text-white px-6 bg-red-700"
				to={link}>
				{btnName}
			</Link>
		</div>
	);
}
