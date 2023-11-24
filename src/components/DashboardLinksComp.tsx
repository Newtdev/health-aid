import { NavLink, useLocation } from "react-router-dom";
import { LinksType } from "../dtos/types";

const DashboardLinkesComp = ({
	name,
	links,
	icon,
	setToggleNav,
}: LinksType) => {
	const location = useLocation();
	const a = location.pathname.startsWith(`/${name.toLowerCase()}`)
		? "bg-primary-light text-white"
		: "text-gray-200 text-primary-light";

	return (
		<li className="mt-4">
			<NavLink
				onClick={() => setToggleNav(() => false)}
				to={links}
				className={`flex  ${a} items-center px-4 py-4 text-gray-100 rounded-lg dark:text-white hover:bg-gray-100  group`}>
				{icon}
				<span className="ml-3 text-base md:text-lg">{name}</span>
			</NavLink>
		</li>
	);
};
 

export default DashboardLinkesComp;