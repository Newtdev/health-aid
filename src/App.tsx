
import DashboardHome from "./pages/dashboard/DashboardHome";
import AuthHome from "./pages/auth/AuthHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { QUERY_KEY } from "./contants/queryKey";

const AuthObj = {
	user: null,
	setUser: () => {},
};

export const AuthContext = createContext({});

function App() {
	const [userToken, setToken] = useState<any>(AuthObj);
	const { getItem } = useLocalStorage();
	const user = getItem(QUERY_KEY.LOGIN);

	useEffect(() => {
		if (user) {
			setToken(JSON.parse(user || ""));
		}
	}, [user]);

	return (
		<AuthContext.Provider value={{ userToken, setToken }}>
			<>
				{!userToken?.token ? <AuthHome /> : <DashboardHome />}

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
		</AuthContext.Provider>
	);
}

export default App
  