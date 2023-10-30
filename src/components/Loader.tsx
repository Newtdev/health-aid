import { Spinner } from "flowbite-react";

export default function Loader() {
	return (
		<div className="h-screen w-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10 flex justify-center items-center">
			<Spinner aria-label="Extra large spinner example" size="xl" />
		</div>
	);
}
