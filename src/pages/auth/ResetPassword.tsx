/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { InputError } from "../../components/InputError";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import Loader from "../../components/Loader";
import { LogoComp } from "../../components/LogoComp";
import { ROUTE } from "../../contants/AppRoute";
import axiosInstance from "../../api";
import { API_ROUTES } from "../../contants/ApiRoutes";

// import ModalComp from '../../components/Modal';

const Validation = yup.object().shape({
	token: yup.string().trim().label("Token").required(),
	password: yup.string().trim().label("Password").required(),
	confirm_password: yup
		.string()
		.trim()
		.label("Confirm Password")
		.oneOf([yup.ref("password")], "Confirm Passwords must match Password")
		.required(),
});

export default function ResetPassword() {
	const updatePassword = useMutation(handleUpdatePassword);
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			token: "",
			password: "",
			confirm_password: "",
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: Validation,
		onSubmit: (values) => {
			updatePassword.mutate(values);
		},
	});

	async function handleUpdatePassword({ confirm_password, ...values }: any) {
		try {
			const response = await axiosInstance.post(
				API_ROUTES.RESET_PASSWORD,
				values,
			);
			toast.success(response?.data?.message);
			navigate(ROUTE.Home);
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	}

	return (
		<section className="w-full h-screen  flex justify-center items-center">
			<article className="w-full lg:w-[90%]  flex items-center justify-center lg:p-16 bg-white rounded-lg ">
				{updatePassword?.isLoading ? <Loader /> : null}

				<form
					className="w-full flex flex-col gap-4 md:w-[90%]"
					onSubmit={formik.handleSubmit}>
					<div className="my-3">
						<div className="flex justify-center lg:hidden">
							<LogoComp />
						</div>
						<h1 className="text-primary-dark text-3xl text-center">
							Update Password
						</h1>
					</div>
					<div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="new_password" value="Token" />
							</div>
							<TextInput
								id="token"
								placeholder=""
								required
								type="text"
								sizing="lg"
								color={
									formik.errors.token && formik.touched.token
										? "failure"
										: "gray"
								}
								helperText={
									<InputError
										error={formik.errors.token && formik.touched.token}
										name={formik.errors?.token || ""}
									/>
								}
								{...formik.getFieldProps("token")}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="new_password" value="New Password" />
							</div>
							<TextInput
								id="new_password"
								placeholder=""
								required
								type="password"
								sizing="lg"
								color={
									formik.errors.password && formik.touched.password
										? "failure"
										: "gray"
								}
								helperText={
									<InputError
										error={formik.errors.password && formik.touched.password}
										name={formik.errors?.password || ""}
									/>
								}
								{...formik.getFieldProps("password")}
							/>
						</div>
						<div className="my-3">
							<div className="mb-2 block">
								<Label htmlFor="password1" value="Repeat password" />
							</div>
							<TextInput
								id="password1"
								required
								type="password"
								sizing="lg"
								color={
									formik.errors.confirm_password &&
									formik.touched.confirm_password
										? "failure"
										: "gray"
								}
								helperText={
									<InputError
										error={
											formik.errors.confirm_password &&
											formik.touched.confirm_password
										}
										name={formik.errors?.confirm_password || ""}
									/>
								}
								{...formik.getFieldProps("confirm_password")}
							/>
						</div>
					</div>

					<Button
						disabled={!formik.isValid}
						className="bg-primary-dark"
						size="lg"
						type="submit">
						Update password
					</Button>
					<div className="text-gray-700  flex items-center justify-center gap-x-2">
						<p>Don't have an account?</p>
						<Label
							htmlFor="remember"
							className="font-bold text-lg text-primary-dark">
							<NavLink to={ROUTE.Sign_up}>Create account</NavLink>
						</Label>
					</div>
					{/* <div className='flex items-center justify-center gap-x-3'>

                        <span className='w-1/2 h-[1px] inline-block bg-gray-200' /> 
                        <p className='font-bold text-gray-400'>or</p>
                        <span className='w-1/2 h-[1px] inline-block bg-gray-200'/>
                    </div> */}
					{/* <div>
                    <Button className='w-full rounded-full py-2 bg-transparent border border-black text-black' type="submit">
                       Lo
                    </Button>
                    </div> */}
				</form>
			</article>
		</section>
	);
}
