import DashboardWrapper from '../../components/DashboardWrapper';
import Header from "../../components/Header";
import Dashboard from './Dashboard';
import { Navigate, useRoutes } from 'react-router-dom';
import { configureRoutes } from '../../routes/config';
import Sidebar from '../../components/SideBar';
import Wallet from './Wallet';
import Appointment from './Appointment';
import CreateAppointment from './CreateAppointment';
import { ROUTE } from "../../contants/AppRoute";
import Settings from "./Settings";
import ServiceList from "./ServiceList";
import { useState } from "react";

export default function DashboardHome() {
	const routes = useRoutes(DashboardRoutes);
	const [toggleNav, setToggleNav] = useState(false);
	return (
		<section className="h-full w-screen overflow-x-hidden">
			<Header setToggleNav={setToggleNav} />
			<Sidebar toggleNav={toggleNav} setToggleNav={setToggleNav} />
			<div className="lg:w-[calc(100vw-16rem)] ml-auto  h-full flex items-center justify-between">
				<DashboardWrapper>{routes}</DashboardWrapper>
			</div>
		</section>
	);
}
const DashboardRoutes = configureRoutes([
	{ path: "*", element: <Navigate to={ROUTE.Dashboard_Home} /> },
	{
		path: ROUTE.Dashboard_Home,
		element: <Dashboard />,
	},

	{
		path: ROUTE.Appointments,
		element: <Appointment />,
	},
	{
		path: ROUTE.Appointments_Create,
		element: <CreateAppointment />,
	},
	{
		path: ROUTE.Wallet,
		element: <Wallet />,
	},
	{
		path: ROUTE.ServicesList,
		element: <ServiceList />,
	},
	{
		path: ROUTE.Settings,
		element: <Settings />,
	},
]);
