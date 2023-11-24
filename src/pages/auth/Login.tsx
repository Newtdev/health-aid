/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import * as yup from "yup";

import { toast } from "react-toastify";
import { useMutation } from "react-query";
import Loader from "../../components/Loader";
import { InputError } from "../../components/InputError";
import { LogoComp } from "../../components/LogoComp";
import axiosInstance from "../../api";
import { API_ROUTES } from "../../contants/ApiRoutes";
import { ROUTE } from "../../contants/AppRoute";
import { QUERY_KEY } from "../../contants/queryKey";
import { SaveDataToLocalStorage } from "../../utils/saveData";

import { AuthContext } from "../../App";
import { useContext } from "react";

const Validation = yup.object().shape({
	email: yup.string().label("Email").email().required(),
	password: yup.string().trim().label("Password").required(),
});

type LoginTypes = {
	email: string;
	password: string;
};

export default function Login() {
	// const { login } = useAuth();
	const { setToken } = useContext(AuthContext) as any;

	// console.log("aaaaa", a);

	const LoginMutation = useMutation(QUERY_KEY.LOGIN, handleSignIn, {
		onSuccess: (data) => {
			SaveDataToLocalStorage(data?.data);

			setToken(data?.data);
		},
	});
	// console.log(getAuth);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: Validation,
		onSubmit: (values) => {
			LoginMutation.mutate(values);
		},
	});

	async function handleSignIn(values: LoginTypes) {
		try {
			return await axiosInstance.post(API_ROUTES.LOGIN, values);
		} catch (error: { data: { message: string } } | any) {
			toast.error(error?.data?.message);
		}
	}

	return (
		<section className="w-full h-screen flex justify-center items-center">
			<article className="w-full flex items-center justify-center lg:p-16 px-4  rounded-lg ">
				{LoginMutation?.isLoading ? <Loader /> : null}
				<form
					className="flex flex-col gap-4 w-[90%]"
					onSubmit={formik.handleSubmit}>
					<div className="flex justify-center lg:hidden">
						<LogoComp />
					</div>
					<div className="my-3 ">
						<h1 className="text-lg md:text-xl lg:text-3xl text-center text-primary-dark">
							Log in to your account
						</h1>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email1" value="Your email" />
						</div>
						<TextInput
							id="email1"
							placeholder=""
							required
							sizing="lg"
							type="email"
							color={
								formik.errors.email && formik.touched.email ? "failure" : "gray"
							}
							helperText={
								<InputError
									error={formik.errors.email && formik.touched.email}
									name={formik.errors?.email || ""}
								/>
							}
							{...formik.getFieldProps("email")}
						/>
					</div>
					<div className="my-3">
						<div className="mb-2 block">
							<Label htmlFor="password1" value="Your password" />
						</div>
						<TextInput
							id="password1"
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

					<div className="flex items-center gap-2 ml-auto">
						<Label htmlFor="remember">
							<NavLink
								className="text-sm md:text-base text-primary-dark"
								to={ROUTE.Forget_Password}>
								Forgot password
							</NavLink>
						</Label>
					</div>
					<Button size="lg" className="bg-primary-dark" type="submit">
						Log in
					</Button>
					<div className="text-gray-700 flex flex-col md:flex-row items-center justify-center  lg:gap-x-2 text-xs md:text-base">
						<p>Don't have an account?</p>
						<Label htmlFor="remember" className="font-bold text-lg">
							<NavLink
								className="text-primary-dark text-sm md:text-base"
								to={ROUTE.Sign_up}>
								Create account
							</NavLink>
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
