/* eslint-disable @typescript-eslint/no-explicit-any */

import PhoneInput from "react-phone-number-input";
import { InputError } from "../components/InputError";
import { Button, Label, TextInput } from "flowbite-react";

export default function PasswordReset({ formik }: { formik: any }) {
	return (
		<div className="h-screen">
			<h2 className="text-black font-bold text-xl">Reset Password</h2>
			<div className="mt-10">
				<div className="mb-2">
					<Label
						htmlFor="firstName"
						className="block mb-3"
						value="New Password"
					/>
					<TextInput
						id="2"
						placeholder="New password"
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
						{...formik.getFieldHelpers("firstName")}
					/>
				</div>
				<div className="flex flex-col justify-center mt-6">
					<Label
						htmlFor="text"
						value="Repeat Password"
						className="block mb-3"
					/>
					<TextInput
						id="1"
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
						{...formik.getFieldHelpers("confirmPassword")}
					/>
				</div>

				<div className="py-4 w-full mb-4">
					<Button
						type="submit"
						className="bg-primary-dark mt-4 w-1/2 mx-auto"
						size="lg">
						Update Password
					</Button>
				</div>
			</div>
		</div>
	);
}
