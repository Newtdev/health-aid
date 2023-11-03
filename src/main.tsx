import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as AppRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppRouter>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</AppRouter>
	</React.StrictMode>,
);
