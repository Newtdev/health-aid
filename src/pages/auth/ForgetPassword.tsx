
import { Button, Label, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../dtos/contant';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { supabase } from '../../api/supabaseConfig';
import { useMutation } from 'react-query';
import { InputError } from '../../components/InputError';
import Loader from '../../components/Loader';
import ModalComp from '../../components/Modal';
import { LogoComp } from '../../components/LogoComp';

const Validation = yup.object().shape({
    email: yup.string().label('Email').email().required(),
    
})

async function handleForgetPassword({ email }: { email: string }) {
	try {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: "https://health-aid.vercel.app/update-password",
		});
		toast.error(error?.message);
		console.log("error", error?.message);
	} catch (error: unknown) {
		// toast.error(error?.message);
		console.log("siudgisd", error);
	}
} 

export default function ForgotPassword() {
    const forgotPassword = useMutation(handleForgetPassword);
    const formik = useFormik({
        initialValues: {
            email: '',
        
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: Validation,
        onSubmit: (values) => {
            console.log()
            forgotPassword.mutate(values)
       
        }
    });

    return (
			<section className="w-full h-screen  flex justify-center items-center">
				<article className="w-full lg:w-[90%] flex items-center justify-center lg:p-16 bg-white rounded-lg ">
					{forgotPassword?.isLoading ? <Loader /> : null}
					{forgotPassword?.isSuccess ? (
						<ModalComp
							header="Update Password"
							text="Check your email for update password link"
							show={forgotPassword.isSuccess}
						/>
					) : null}
					<form
						className="flex flex-col gap-4 lg:w-[90%]"
						onSubmit={formik.handleSubmit}>
						<div className="my-3">
							<div className="flex justify-center lg:hidden mb-6">
								<LogoComp />
							</div>
							<h1 className="text-primary-dark text-lg md:text-lg lg:text-3xl text-center">
								Forgot Password
							</h1>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="email1" value="Email address" />
							</div>
							<TextInput
								id="email1"
								placeholder=""
								required
								type="email"
								color={
									formik.errors.email && formik.touched.email
										? "failure"
										: "gray"
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

						<Button
							className="bg-primary-dark"
							disabled={!formik.isValid}
							type="submit">
							Submit
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
