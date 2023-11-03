import { ROUTE } from "../contants/AppRoute";
import DashboardLinkesComp from "./DashboardLinksComp";

const DashboardLinks = [
	{ id: 1, name: "Dashboard", link: "/" },
	{ id: 3, name: "Appointment", link: ROUTE.Appointments },
	// { id: 2, name: 'Wallet', link: '/wallet' },
	// { id: 4, name: 'Service', link: '/services' },
	// { id: 5, name: 'Referral', link: '/referral' },
	// { id: 6, name: 'Settings', link: '/settings' },
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
						<DashboardLinkesComp name={d.name} links={d.link} />
					))}
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
