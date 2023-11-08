/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineCloudUpload } from "react-icons/ai";
import { InputError } from "../components/InputError";
import { Button, Datepicker, Label, Select, TextInput } from "flowbite-react";
import useUser from "../hooks/useUser";
import PhoneNumber from "./PhoneNumber";
// import { useEffect } from "react";

export default function UserProfile({ formik }: { formik: any }) {
	const user = useUser();
	// console.log(formik.values);

	const phoneChange = (value: string) =>
		formik.setFieldValue("phoneNumber", value);

	return (
		<div>
			<h2 className="text-black font-bold text-xl">Update User Profile</h2>
			<div className="flex flex-col pb-10 mt-10">
				{/* <img
							alt="Bonnie image"
							height="96"
							src="/images/people/profile-picture-3.jpg"
							width="96"
							className="mb-3 rounded-full shadow-lg"
						/> */}

				<label htmlFor="input">
					<p className="mb-3 rounded-full shadow-lg h-24 w-24 font-bold text-xl text-black flex justify-center items-center">
						<AiOutlineCloudUpload className="text-black text-xl" />
					</p>
					<input id="input" type="file" hidden />
				</label>

				<h5 className="mb-1 text-base font-medium text-gray-900 dark:text-white">
					{user?.firstName} {user?.lastName}
				</h5>
			</div>

			<div className="grid grid-cols-2 gap-x-4 ">
				<div className="mb-2">
					<Label
						htmlFor="firstName"
						className="block my-3"
						value="First name"
					/>
					<TextInput
						id="disabledInput1"
						placeholder="First name"
						defaultValue={formik.values?.firstName}
						values={formik.values?.firstName}
						type="text"
						sizing="lg"
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
						{...formik.getFieldHelpers("firstName")}
					/>
				</div>
				<div className="flex flex-col justify-center mb-2">
					<Label htmlFor="text" value="Last name" className="block my-3" />
					<TextInput
						id="disabledInput1"
						placeholder="Last name"
						type="text"
						sizing="lg"
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
						{...formik.getFieldHelpers("lastName")}
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-x-4 content-center">
				<div className="mb-2">
					<Label htmlFor="email" className="block my-3">
						Email{" "}
					</Label>
					<TextInput
						id="email"
						placeholder="Email address"
						type="text"
						sizing="lg"
						color={
							formik.errors.email && formik.touched.email ? "failure" : "gray"
						}
						helperText={
							<InputError
								error={formik.errors.email && formik.touched.email}
								name={formik.errors?.email || ""}
							/>
						}
						{...formik.getFieldHelpers("email")}
					/>
				</div>
				<div className="mb-2 block">
					<Label
						htmlFor="phoneNumber"
						value="Phone number"
						className="block my-3"
					/>
					<PhoneNumber
						placeholder="Enter phone number"
						value={formik.values.phoneNumber}
						onChange={phoneChange}
					/>
					{/* <PhoneInput
						placeholder="Enter phone number"
						value={formik.values.phoneNumber}
						onChange={phoneChange}
						style={{ borderRadius: "4px" }}
						className="w-full rounded-lg px-4 py-2 outline:none border text-black"
					/> */}
				</div>
			</div>

			<div id="select" className="mb-2">
				<div className="my-3 block">
					<Label htmlFor="gender" value="Gender" />
				</div>
				<Select
					id="gender"
					sizing="lg"
					required
					color={
						formik.errors.gender && formik.touched.gender ? "failure" : "gray"
					}
					helperText={
						<InputError
							error={formik.errors.gender && formik.touched.gender}
							name={formik.errors?.gender || ""}
						/>
					}
					{...formik.getFieldHelpers("gender")}>
					<option>Male</option>
					<option>Female</option>
					<option>Others</option>
				</Select>
			</div>

			<div className="mb-2">
				<Label htmlFor="Date" value="Date" className="block my-3" />
				<Datepicker
					autoHide={false}
					sizing="lg"
					color={formik.errors.date && formik.touched.date ? "failure" : "gray"}
					helperText={
						<InputError
							error={formik.errors.date && formik.touched.date}
							name={formik.errors?.date || ""}
						/>
					}
					{...formik.getFieldHelpers("date")}
				/>
			</div>
			<div className="py-4 w-full mb-4">
				<Button
					type="submit"
					className="bg-primary-dark mt-4 w-1/2 mx-auto"
					size="lg">
					Update Profile
				</Button>
			</div>
		</div>
	);
}
