import { DashboardWrapperType } from "../dtos/types";

const DashboardWrapper = ({ children }: DashboardWrapperType) => {
    return (
		<div className="p-4 w-full overflow-x-hidden bg-white">
			{children}
			</div>
		);
};


export default DashboardWrapper;