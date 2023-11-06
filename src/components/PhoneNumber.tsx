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
			style={{ padding: "10px" }}
			className="w-full rounded-lg outline:none border text-black"
			inputClassName="w-full  outline:none border-none focus:ring-none focus:border-none text-black"
		/>
	);
}
