/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useState } from "react";

import UserProfile from "../../components/UserProfile";
import NextOfKin from "../../components/NextOfKin";
import PasswordReset from "../../components/PasswordReset";
import useUser from "../../hooks/useUser";
import { Component } from "../../components/TabComp";
import axiosInstance from "../../api";
import { toast } from "react-toastify";
import { API_ROUTES } from "../../contants/ApiRoutes";

async function handleSignIn(values: any) {
	try {
		const result = await axiosInstance.patch(
			API_ROUTES.GET_USER_DETAILS,
			values,
		);
		toast.success(result?.data?.status);
		location.replace(result?.data?.data);
	} catch (error: { data: { message: string } } | any) {
		toast.error(error?.data?.message);
	}
}

export default function Settings() {
	const [active, setActive] = useState(1);
	const user = useUser();

	function handleActive(id: number) {
		setActive(() => id);
	}
	const formik = useFormik({
		initialValues: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			phoneNumber: user?.phoneNumber,
			gender: user?.gender,
			date: "",
			relationship: "",
			file: null,
			meta: {
				nextOfKin: {
					firstName: "",
					lastName: "",
					email: "",
					phoneNumber: "",
					gender: "",
					relationShip: "",
					date: "",
				},
			},
		},
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: (values) => {
			handleSignIn(values);
		},
	});

	// useEffect(() => {
	// 	formik.setFieldValue("firstName", user?.firstName);
	// }, [user]);
	return (
		<section className="h-full w-full">
			<article className="h-full mt-12 pt-16 ">
				<Component handleActive={handleActive} active={active} />
				<form
					className="flex w-full flex-col gap-4 mt-10"
					onSubmit={formik.handleSubmit}>
					{active == 1 ? <UserProfile formik={formik} /> : null}
					{active == 3 ? <NextOfKin formik={formik} /> : null}
				</form>
				{active == 4 ? <PasswordReset /> : null}
			</article>
		</section>
	);
}
