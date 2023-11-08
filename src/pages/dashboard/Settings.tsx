/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import UserProfile from "../../components/UserProfile";
import NextOfKin from "../../components/NextOfKin";
import PasswordReset from "../../components/PasswordReset";
import useUser from "../../hooks/useUser";
const Tabs = [
	{ id: 1, name: "User Profile" },
	// { id: 2, name: "Medical History" },
	{ id: 3, name: "Next of kin" },
	{ id: 4, name: "Password Reset" },
];

function Component({ handleActive, active = 1 }: any) {
	return (
		<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
			<ul className="flex flex-wrap -mb-px">
				{Tabs.map((d) => (
					<li key={d.id} className="mr-2" onClick={() => handleActive(d.id)}>
						<a
							href="#"
							className={` ${
								d.id === active ? "border-primary-dark" : "border-transparent"
							} inline-block p-4 border-b-2  rounded-t-lg`}>
							{d.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default function Settings() {
	const [active, setActive] = useState(1);
	const user = useUser();

	function handleActive(id: number) {
		setActive(() => id);
	}
	const formik = useFormik({
		initialValues: {
			appointmentType: "",
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			gender: "",
			date: "",
			relationship: "",
			file: null,
		},
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: () => {},
	});

	useEffect(() => {
		formik.setFieldValue("firstName", user?.firstName);
	}, [user]);
	return (
		<section className="h-full w-full">
			<article className="h-full mt-12 pt-16 ">
				<Component handleActive={handleActive} active={active} />
				<form className="flex w-full flex-col gap-4 mt-10">
					{active == 1 ? <UserProfile formik={formik} /> : null}
					{active == 3 ? <NextOfKin formik={formik} /> : null}
					{active == 4 ? <PasswordReset formik={formik} /> : null}
				</form>
			</article>
		</section>
	);
}
