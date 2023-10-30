
import DashboardHome from "./pages/dashboard/DashboardHome";
import AuthHome from "./pages/auth/AuthHome";
import { supabase } from "./api/supabaseConfig";
import { useCallback, useEffect, useState } from "react";



function App() {
  const [userToken,setUserToken] =useState<{access_token?:string} | null>({})

  
  const userSession = useCallback(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
     
      setUserToken(session || null);
       
      if (event == "SIGNED_OUT") {
           setUserToken(null);
        }
			});
  },[])

 useEffect(() => {
  userSession()
 }, []);
  
  // console.log(getCurrentUser());

  return (
		<>
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
  