/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogoComp } from "./LogoComp";
import DropdownComp from "./DropDown";

const Header = ({ setToggleNav }: any) => {
	// const [toggleDropDown, setToggleDropDown] = useState(false);

	// function handleToggle() {
	// 	setToggleDropDown((prevState: any) => !prevState);
	// }

	return (
		<nav className="fixed top-0 z-50 w-full bg-white border-b">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						<button
							data-drawer-target="logo-sidebar"
							data-drawer-toggle="logo-sidebar"
							aria-controls="logo-sidebar"
							onClick={() => setToggleNav((prevState: any) => !prevState)}
							type="button"
							className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 bg-re-90
								 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
							<span className="sr-only">Open sidebar</span>
							<svg
								className="w-6 h-6"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									clip-rule="evenodd"
									fill-rule="evenodd"
									d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
							</svg>
						</button>
						<div className="flex items-center md:mr-24">
							<LogoComp />
						</div>
						{/* <div className="flex items-center md:mr-16">
							<p className="text-black capitalize"> {name}</p>
						</div> */}
					</div>
					<div className="flex items-center">
						<div className="flex items-center ml-3">
							<div>
								<button
									type="button"
									className="flex text-sm bg-gray-white rounded-full focus:ring-4 focus:ring-gray-300 "
									aria-expanded="false"
									data-dropdown-toggle="dropdown-user">
									<span className="sr-only">Open user menu</span>
									{/* <div className="py-3 px-4  rounded-full bg-gray-100">
										<Avatar
											className="w-8 h-8 rounded-full"
											onClick={handleToggle}
										/>
									</div> */}
								</button>
							</div>
							<DropdownComp />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
