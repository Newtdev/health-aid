
import { Button, Label, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../dtos/contant';
import * as yup from 'yup'
import { supabase } from '../../api/supabaseConfig';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import Loader from '../../components/Loader';
import { InputError } from '../../components/InputError';
import { LogoComp } from '../../components/LogoComp';

const Validation = yup.object().shape({
    email: yup.string().label('Email').email().required(),
    password: yup.string().trim().label('Password').required(),
    
})

type LoginTypes = {
    email: string,
    password:string
}
async function handleSignIn({ email, password }: LoginTypes) {
	try {
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		toast.error(error?.message);
		console.log('error',error?.message);
	} catch (error: unknown) {
		// toast.error(error?.message);
		console.log('siudgisd',error);
	}
}



export default function Login() {
    const login = useMutation(handleSignIn);
    const formik = useFormik({
        initialValues: {
            email: '',
            password:''
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: Validation,
        onSubmit: (values) => {
            console.log(values)
            login.mutate(values)
        }
    });

    


    return (
			<section className="w-full h-screen flex justify-center items-center">
				<article className="w-full flex items-center justify-center lg:p-16 px-4  rounded-lg ">
					{login?.isLoading ? <Loader /> : null}
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
						<div className="my-3">
							<div className="mb-2 block">
								<Label htmlFor="password1" value="Your password" />
							</div>
							<TextInput
								id="password1"
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

						<div className="flex items-center gap-2 ml-auto">
							<Label htmlFor="remember">
								<NavLink
									className="text-sm md:text-base text-primary-dark"
									to={ROUTE.Forget_Password}>
									Forgot password
								</NavLink>
							</Label>
						</div>
						<Button className="bg-primary-dark" type="submit">
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
