/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

export const GoogleLocationInput = ({
	getLat,
	getLong,
	getAddress,
}: {
	getLat: (arg: number) => void;
	getLong: (arg: number) => void;
	getAddress: (arg: string) => void;
}) => {
	const originRef = useRef();
	const [result, setResult] = useState<any>(null);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyCDfI1GOcaZ2W3xQZyWwN_d2ZUzMufGSS4",
		libraries: ["places", "geometry"],
	});
	const onLoad = (autoComplete: any) => {
		setResult(autoComplete);
	};
	const onLocationSelected = () => {
		const place = result?.getPlace();

		getAddress(place.formatted_address as any);
		getLat(place.geometry.location.lat());
		getLong(place.geometry.location.lng());
	};

	return (
		<div>
			{isLoaded ? (
				<Autocomplete onLoad={onLoad} onPlaceChanged={onLocationSelected}>
					<>
						<input
							className="py-3 w-full bg-white rounded-lg border text-gray-800 border-gray-300 px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
							ref={originRef as any}
							name="origin"
						/>
					</>
				</Autocomplete>
			) : null}
		</div>
	);
};
