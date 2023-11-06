/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function PhoneNumber({ formik, phoneChange }: any) {
	return (
		<PhoneInput
			placeholder="Enter phone number"
			defaultCountry="ng"
			value={formik?.values?.phoneNumber}
			onChange={phoneChange}
			className="w-full rounded-lg  text-black h-14 flex items-center border border-gray-400"
			inputClassName="w-full  outline-none border-none focus:ring-none focus:border-none text-black py-6 
            !h-full"
		/>
	);
}
