
import DashboardHome from "./pages/dashboard/DashboardHome";
import AuthHome from "./pages/auth/AuthHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";

function App() {
	const token = useAuth();

	return (
		<>
			{!token ? <AuthHome /> : <DashboardHome />}
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default App
  