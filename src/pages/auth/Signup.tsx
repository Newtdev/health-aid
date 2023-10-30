
import { InputError } from '../../components/InputError';
import { Button, Label, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup'
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { supabase } from '../../api/supabaseConfig';
import { useMutation } from 'react-query';
import Loader from '../../components/Loader';
import ModalComp from '../../components/Modal';
import { toast } from 'react-toastify';
import { LogoComp } from '../../components/LogoComp';

const Validation = yup.object().shape({
    firstName: yup.string().label('first name').required(),
    lastName: yup.string().label('last name').required(),
    email: yup.string().label('Email').email().required(),
    password: yup.string().label('Password').required(),
    phoneNumber: yup.string().label('Password').required(),
    
});


type SignUpRequestType = {
	email: string;
	password: string;
	phoneNumber: string;
	firstName: string;
	lastName: string;

	rest?: unknown;
};

async function handleSignUp({ email, password, ...rest }: SignUpRequestType) {
	
	try {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {data:rest},
		});
		toast.error(error?.message);
		console.log(data, error);
	} catch (error:unknown) {
		// toast.error(error?.message);
		console.log(error);
	}
}
    

export default function SignUp() {
    const signUp = useMutation(handleSignUp);
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phoneNumber:'',
            email: '',
            password:''
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: Validation,
        onSubmit: (values) => {
            signUp.mutate(values);
        }
    });


 
    // console.log(formik.errors, formik.isValid);

    const phoneChange = (value:string) =>
			formik.setFieldValue("phoneNumber", value);
    return (
			<section className="w-full h-screen  flex justify-center items-center lg:px-16">
				<article className="w-full  flex items-center justify-center lg:p-16 bg-white rounded-lg max-w-3xl">
					{signUp?.isLoading ? <Loader /> : null}
					{signUp?.isSuccess ? (
						<ModalComp
							show={signUp?.isSuccess}
							header="Confirmation Email"
							text="Verification link has been sent to email address"
						/>
					) : null}
					<form
						className="flex flex-col gap-4 lg:w-[90%]"
						onSubmit={formik.handleSubmit}>
						<div className="my-1">
							<div className="flex justify-center lg:hidden">
								<LogoComp />
							</div>
							<h1 className="text-primary-dark text-lg lg:text-3xl text-center">
								Create an account
							</h1>
						</div>
						<div>
							<div className="mb-1 block">
								<Label value="First name" />
							</div>
							<TextInput
								color={
									formik.errors.firstName && formik.touched.firstName
										? "failure"
										: "gray"
								}
								helperText={
									<InputError
										error={formik.errors.firstName && formik.touched.firstName}
										name={formik.errors?.firstName || ""}
									/>
								}
								id="firstname"
								placeholder=""
								required
								{...formik.getFieldProps("firstName")}
							/>
						</div>
						<div>
							<div className="mb-1 block">
								<Label htmlFor="lastname" value="Last name" />
							</div>
							<TextInput
								color={
									formik.errors.lastName && formik.touched.lastName
										? "failure"
										: "gray"
								}
								helperText={
									<InputError
										error={formik.errors.lastName && formik.touched.lastName}
										name={formik.errors?.lastName || ""}
									/>
								}
								id="lastname"
								placeholder=""
								required
								{...formik.getFieldProps("lastName")}
							/>
						</div>
						<div>
							<div className="mb-1 block">
								<Label htmlFor="phoneNumber" value="Phone number" />
							</div>

							<PhoneInput
								placeholder="Enter phone number"
								value={formik.values.phoneNumber}
								onChange={phoneChange}
								style={{ borderRadius: "10px" }}
								className="w-full rounded-lg px-4 outline:none border text-black"
							/>
						</div>
						<div>
							<div className="mb-1 block">
								<Label htmlFor="email1" value="Email" />
							</div>
							<TextInput
								id="email1"
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
								placeholder=""
								required
								type="email"
								{...formik.getFieldProps("email")}
							/>
						</div>
						<div className="mb-1">
							<div className="mb-1 block">
								<Label htmlFor="password1" value="Password" />
							</div>
							<TextInput
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
								id="password1"
								required
								type="password"
								{...formik.getFieldProps("password")}
							/>
						</div>

						<Button
							className="bg-primary-dark"
							disabled={!formik.isValid}
							type="submit">
							Register
						</Button>
						<div className="text-gray-700 flex items-center justify-center gap-x-2">
							<p>Already have an account?</p>
							<Label
								htmlFor="remember"
								className="font-bold text-lg text-primary-dark">
								<NavLink to="/">Log in here</NavLink>
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
