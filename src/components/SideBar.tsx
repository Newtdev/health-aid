import { ROUTE } from "./../contants/AppRoute";
import DashboardLinkesComp from "./DashboardLinksComp";
import { TfiTimer } from "react-icons/tfi";
import { PiWalletLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { GoHome } from "react-icons/go";

const DashboardLinks = [
	{
		id: 1,
		name: "Dashboard",
		link: ROUTE.Home,
		icon: <GoHome className="text-2xl" />,
	},
	{
		id: 3,
		name: "Appointment",
		link: ROUTE.Appointments,
		icon: <TfiTimer className="text-2xl" />,
	},
	{
		id: 2,
		name: "Wallet",
		link: ROUTE.Wallet,
		icon: <PiWalletLight className="text-2xl" />,
	},
	// { id: 4, name: 'Service', link: '/services' },
	// { id: 5, name: 'Referral', link: '/referral' },
	{
		id: 6,
		name: "Settings",
		link: ROUTE.Settings,
		icon: <CiSettings className="text-2xl" />,
	},
	// { id: 7, name: 'Log out', link: '/' }
];

const Sidebar = () => {
	return (
		<aside
			id="logo-sidebar"
			className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white text- border-r border-gray-200 sm:translate-x-0 "
			aria-label="Sidebar">
			<div className="h-full px-3 pb-4 overflow-y-auto ">
				<ul className="space-y-2 font-medium mt-6 text-white">
					{DashboardLinks.map((d) => (
						<DashboardLinkesComp name={d.name} links={d.link} icon={d.icon} />
					))}
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
