
import DashboardHome from "./pages/dashboard/DashboardHome";
import AuthHome from "./pages/auth/AuthHome";
import { supabase } from "./api/supabaseConfig";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [userToken, setUserToken] = useState<{ access_token?: string } | null>(
		{},
	);

	const userSession = useCallback(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			setUserToken(session || null);

			if (event == "SIGNED_OUT") {
				setUserToken(null);
			}
		});
	}, []);

	useEffect(() => {
		userSession();
	}, [userSession]);

	return (
		<>
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
			{/* {isLoading ? <Loader /> : null} */}
			{/* <AppState.Provider value={state}>
      <AppDispatchState.Provider value={dispatch}> */}
			{!userToken?.access_token ? <AuthHome /> : <DashboardHome />}

			{/* </AppDispatchState.Provider>
			</AppState.Provider> */}
		</>
	);
}

export default App
  