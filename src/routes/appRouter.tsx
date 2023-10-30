
import Dashboard from "../pages/dashboard/Dashboard";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import DashboardWrapper from "../components/DashboardWrapper";


const Layout = ({children}:{children:React.ReactElement}) => {
	return (
		<article>
		
			
		
		</article>
	);
};

const ProtectedComp = () => {
	const auth = true;

	return !auth ? (
		<Login />
	) : (
		<Layout>
			<Dashboard />
		</Layout>
	);
};


// export const Router = createBrowserRouter([
// 	{
// 		path: ROUTE.Login,
// 		element: <Login />,
// 	},
// 	{
// 		path: ROUTE.Sign_up,
// 		element: <SignUp />,
// 	},
// 	{
// 		path: ROUTE.Forget_Password,
// 		element: <ForgotPassword />,
// 	},
// 	{
// 		path: ROUTE.Reset_Password,
// 		element: <ResetPassword />,
// 	},
// 	{
// 		path: ROUTE.ErrorPage,
// 		element: <NoPage />,
// 	},
// 	{
// 		path: ROUTE.Dashboard.concat("*"),
// 		element: <ProtectedComp />,
// 		children: [
// 			{
// 				path: "dashboard/wallet",
// 				element: <Wallet />,
// 				// loader: redirectIfUser,
// 			},
// 		],
// 	},
// ]);


// export const AuthRoutes = () => { 
// const authRoutes = useRoutes([{
// 				path: ROUTE.Home,
// 				element: <Login />,
// 			},
// 			{
// 				path: ROUTE.Sign_up,
// 				element: <SignUp />,
// 			},
// 			{
// 				path: ROUTE.Forget_Password,
// 				element: <ForgotPassword />,
// 			},
// 			{
// 				path: ROUTE.Reset_Password,
// 				element: <ResetPassword />,
// 			},
// 			{
// 				path: ROUTE.ErrorPage,
// 				element: <NoPage />},
	
// 		]);
// 	return authRoutes;

// }
// export const DashboardRoutes = () => {
// 	const dashboardRoutes = useRoutes([
// 		{
// 			path: ROUTE.Home,
// 			element: <Dashboard />,
// 			// children: [
// 			// 	{
// 			// 		path: "messages",
// 			// 		element: <DashboardMessages />,
// 			// 	},
// 			// 	{ path: "tasks", element: <DashboardTasks /> },
// 			// ],
// 		},
// 		// { path: "team", element: <AboutPage /> },
// 	]);
// 	return dashboardRoutes;
// }
