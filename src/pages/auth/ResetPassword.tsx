
import { Button, Label, TextInput } from 'flowbite-react';
import {useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../dtos/contant';
import * as yup from 'yup'
import { InputError } from '../../components/InputError';
import { supabase } from '../../api/supabaseConfig';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import Loader from '../../components/Loader';
import { LogoComp } from '../../components/LogoComp';

// import ModalComp from '../../components/Modal';

const Validation = yup.object().shape({
    password: yup.string().trim().label('Password').required(),
    confirm_password: yup.string().trim().label("Confirm Password").oneOf([yup.ref("password")], "Confirm Passwords must match Password").required()
    
})
 

async function handleUpdatePassword({
	password,
}: {
	password: string;
}) {
	try {

		// const  a = supabase.auth.onAuthStateChange(async (event, session) => {
		// 	if (event == "PASSWORD_RECOVERY") {
				
		// 		const { data, error } = await supabase.auth.updateUser({
		// 			password,
		// 		});

		// 		// console.log(data,session)
		// 		if (data) alert("Password updated successfully!");
		// 		if (error) alert("There was an error updating your password.");
		// 	}
		// });
		// console.log(a)
		const { error } = await supabase.auth.updateUser({
			password,
		});
		toast.error(error?.message);
		console.log("error", error?.message);
	} catch (error: unknown) {
		// toast.error(error?.message);
		console.log("siudgisd", error);
	}
} 


export default function ResetPassword() {
	const updatePassword = useMutation(handleUpdatePassword);
    const formik = useFormik({
        initialValues: {
            password:'',
            confirm_password:'',
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: Validation,
        onSubmit: (values) => {
           updatePassword.mutate(values);
        }
	});
	

    return (
			<section className="w-full h-screen  flex justify-center items-center">
				<article className="lg:w-[90%]  flex items-center justify-center lg:p-16 bg-white rounded-lg ">
					{updatePassword?.isLoading ? <Loader /> : null}
					{/* {updatePassword?.isSuccess ? (
						<ModalComp
							header="Update Password"
							text="Check your email for update password link"
							show={updatePassword.isSuccess}
						/>
					) : null} */}
					<form
						className="flex flex-col gap-4 lg:w-[90%]"
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
									<Label htmlFor="new_password" value="New Password" />
								</div>
								<TextInput
									id="new_password"
									placeholder=""
									required
									type="password"
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
