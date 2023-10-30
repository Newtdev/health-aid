import { ROUTE } from '../../dtos/contant';
import { useRoutes } from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';
import ForgotPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import NoPage from '../404';
import { configureRoutes } from '../../routes/config';
import { LogoComp } from '../../components/LogoComp';


export default function AuthHome() {
const routes = useRoutes(authRoutes)
  return (
		<div className="w-screen flex justify-between ">
			<div className="bg-primary-dark hidden lg:flex h-screen basis-[50%] justify-between flex-col ">
				<LogoComp />
				<div className="lg:basis-[90%]  flex justify-center items-center">
					<img
						className="w-[80%]"
						src="https://assets-global.website-files.com/605d16c4271d547755d78227/651f68e75e1d6043d4a2954b_Group%204035.svg"
						loading="lazy"
						alt=""
					/>
				</div>
			</div>
			<div className="basis-full lg:basis-[50%] bg-white">{routes}</div>
		</div>
	);
}


const authRoutes = configureRoutes([
	{
		path: "*",
		element: <Login />,
	},
	{
		path: ROUTE.Home,
		element: <Login />,
	},
	{
		path: ROUTE.Sign_up,
		element: <SignUp />,
	},
	{
		path: ROUTE.Forget_Password,
		element: <ForgotPassword />,
	},
	{
		path: ROUTE.Update_Password,
		element: <ResetPassword />,
	},
	{
		path: ROUTE.ErrorPage,
		element: <NoPage />,
	},
]);