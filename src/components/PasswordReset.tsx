/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormik } from "formik";
import { InputError } from "../components/InputError";
import { Button, Label, TextInput } from "flowbite-react";
import * as yup from "yup";
import { useMutation } from "react-query";
import { API_ROUTES } from "../contants/ApiRoutes";
import axiosInstance from "../api";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Validate = yup.object().shape({
	currentPassword: yup
		.string()
		.trim()
		.label("Current Password")
		// .matches(
		// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
		// 	"Oops!, password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character",
		// )
		.required(),
	newPassword: yup
		.string()
		.trim()
		.label("New Password")
		// .matches(
		// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
		// 	"Oops!, password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character",
		// )
		.required(),
	confirmPassword: yup
		.string()
		.trim()
		.label("Confirm Password")
		.oneOf(
			[yup.ref("newPassword"), ""],
			"Confirm Passwords must match Password",
		)
		.required(),
});

async function handleSignIn(values: any) {
	try {
		const result = await axiosInstance.patch(
			API_ROUTES.UPDATE_PASSWORD,
			values,
		);
		toast.success(result?.data?.status);
		location.replace(result?.data?.data);
	} catch (error: { data: { message: string } } | any) {
		toast.error(error?.data?.message);
	}
}

export default function PasswordReset() {
	const resetPasswordMutation = useMutation(handleSignIn);
	const formik = useFormik({
		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		validateOnChange: true,
		validateOnBlur: true,
		validationSchema: Validate,
		onSubmit: ({ confirmPassword, ...values }) => {
			resetPasswordMutation.mutate(values);
		},
	});

	return (
		<div className="h-screen px-6">
			{resetPasswordMutation?.isLoading ? <Loader /> : null}
			<h2 className="text-black font-bold text-xl">Reset Password</h2>
			<form className="mt-10" onSubmit={formik.handleSubmit}>
				<div className="mb-2">
					<Label
						htmlFor="firstName"
						className="block mb-3"
						value="Current Password"
					/>
					<TextInput
						id="1"
						placeholder="Current Password"
						type="password"
						sizing="lg"
						color={
							formik.errors.currentPassword && formik.touched.currentPassword
								? "failure"
								: "gray"
						}
						helperText={
							<InputError
								error={
									formik.errors.currentPassword &&
									formik.touched.currentPassword
								}
								name={formik.errors?.currentPassword || ""}
							/>
						}
						{...formik.getFieldProps("currentPassword")}
					/>
				</div>
				<div className="flex flex-col justify-center mt-6">
					<Label htmlFor="text" value="New Password" className="block mb-3" />
					<TextInput
						id="2"
						placeholder="New Password"
						type="text"
						sizing="lg"
						color={
							formik.errors.newPassword && formik.touched.newPassword
								? "failure"
								: "gray"
						}
						helperText={
							<InputError
								error={formik.errors.newPassword && formik.touched.newPassword}
								name={formik.errors?.newPassword || ""}
							/>
						}
						{...formik.getFieldProps("newPassword")}
					/>
				</div>
				<div className="flex flex-col justify-center mt-6">
					<Label
						htmlFor="text"
						value="Repeat Password"
						className="block mb-3"
					/>
					<TextInput
						id="3"
						placeholder="Repeat Password"
						type="text"
						sizing="lg"
						color={
							formik.errors.confirmPassword && formik.touched.confirmPassword
								? "failure"
								: "gray"
						}
						helperText={
							<InputError
								error={
									formik.errors.confirmPassword &&
									formik.touched.confirmPassword
								}
								name={formik.errors?.confirmPassword || ""}
							/>
						}
						{...formik.getFieldProps("confirmPassword")}
					/>
				</div>

				<div className="py-4 w-full mb-4">
					<Button
						type="submit"
						className="bg-primary-dark mt-4 w-full md::w-1/2 mx-auto"
						size="lg">
						Update Password
					</Button>
				</div>
			</form>
		</div>
	);
}
