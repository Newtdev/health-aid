import { Accordion } from "flowbite-react";
import { ServiceListData } from "../../utils/Data";
import { Fragment } from "react";

const AccordionList = ({ desc }: any) => {
	return (
		<Accordion.Content>
			<ul>
				<li>{desc}</li>
			</ul>
		</Accordion.Content>
	);
};

export default function ServiceList() {
	return (
		<section className=" h-screen">
			<article className="pt-24">
				<Accordion collapseAll className="my-3 border-none  ">
					{ServiceListData.map((d, i) => (
						<Accordion.Panel key={d.id} className="active:border-none">
							<Accordion.Title className="h-24 py-6 mt-6 text-white bg-primary-light active:outline-none focus:outline-none hover:text-primary-dark">
								{d.heading}
							</Accordion.Title>

							<Accordion.Content className="text-gray-800 ">
								{d.list.map((dt) => (
									<div className=" px-4">
										<ul>
											<li className="py-2 list-disc">{dt.desc}</li>
										</ul>
									</div>
								))}
							</Accordion.Content>
						</Accordion.Panel>
					))}
				</Accordion>
			</article>
		</section>
	);
}
