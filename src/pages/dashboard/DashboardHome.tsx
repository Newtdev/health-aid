import DashboardWrapper from '../../components/DashboardWrapper';
import Header from '../../components/Header';
import { ROUTE } from '../../dtos/contant';
import Dashboard from './Dashboard';
import { Navigate, useRoutes } from 'react-router-dom';
import { configureRoutes } from '../../routes/config';
import Sidebar from '../../components/SideBar';
import Wallet from './Wallet';
import Appointment from './Appointment';
import CreateAppointment from './CreateAppointment';

export default function DashboardHome() {
    const routes = useRoutes(DashboardRoutes); 
    return (
			<section className="h-full w-screen overflow-x-hidden">
				<Header />
				<Sidebar />
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
	]);