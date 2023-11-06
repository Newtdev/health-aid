/* eslint-disable @typescript-eslint/no-explicit-any */

import { InputError } from "../components/InputError";
import { Button, Datepicker, Label, Select, TextInput } from "flowbite-react";
import PhoneNumber from "./PhoneNumber";
const Relationships = [
	{
		code: "FTH",
		display: "father",
	},
	{
		code: "MTH",
		display: "mother",
	},
	{
		code: "HUSB",
		display: "husband",
	},
	{
		code: "WIFE",
		display: "wife",
	},
	{
		code: "SONC",
		display: "son",
	},
	{
		code: "DAUC",
		display: "daughter",
	},
	{
		code: "BRO",
		display: "brother",
	},
	{
		code: "SIS",
		display: "sister",
	},
	{
		code: "COUSN",
		display: "cousin",
	},
	{
		code: "UNCLE",
		display: "uncle",
	},
	{
		code: "AUNT",
		display: "aunt",
	},
	{
		code: "NEPHEW",
		display: "nephew",
	},
	{
		code: "NIECE",
		display: "niece",
	},
	{
		code: "SIGOTHR",
		display: "significant other",
	},
	{
		code: "PGRFTH",
		display: "paternal grandfather",
	},
	{
		code: "PGRMTH",
		display: "paternal grandmother",
	},
	{
		code: "MGRFTH",
		display: "maternal grandfather",
	},
	{
		code: "MGRMTH",
		display: "maternal grandmother",
	},
	{
		code: "TWINBRO",
		display: "twin brother",
	},
	{
		code: "TWINSIS",
		display: "twin sister",
	},
	{
		code: "STPBRO",
		display: "stepbrother",
	},
	{
		code: "STPSIS",
		display: "stepsister",
	},
	{
		code: "GRNDSON",
		display: "grandson",
	},
	{
		code: "GRNDDAU",
		display: "granddaughter",
	},
	{
		code: "BROINLAW",
		display: "brother-in-law",
	},
	{
		code: "SISINLAW",
		display: "sister-in-law",
	},
];

export default function NextOfKin({ formik }: { formik: any }) {
	const phoneChange = (value: string) =>
		formik.setFieldValue("phoneNumber", value);
	return (
		<div>
			<h2 className="text-black font-bold text-xl">Next of Kin Information</h2>

			<div className="grid grid-cols-2 gap-x-4 mt-10">
				<div className="mb-2">
					<Label
						htmlFor="firstName"
						className="block mb-3"
						value="First name"
					/>
					<TextInput
						id="disabledInput1"
						placeholder="First name"
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
					<Label htmlFor="text" value="Last name" className="block mb-3" />
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
			<div id="select " className="mb-2">
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
				</div>
			</div>

			<div id="select" className="mb-2">
				<div className="my-3 block">
					<Label htmlFor="Relationship" value="Relationship" />
				</div>
				<Select
					id="Relationship"
					sizing="lg"
					required
					color={
						formik.errors.relationship && formik.touched.relationship
							? "failure"
							: "gray"
					}
					helperText={
						<InputError
							error={formik.errors.relationship && formik.touched.relationship}
							name={formik.errors?.relationship || ""}
						/>
					}
					{...formik.getFieldHelpers("relationship")}>
					{Relationships.map((d) => (
						<option key={d.code} value={d.display}>
							{d.display}
						</option>
					))}
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
					Update Information
				</Button>
			</div>
		</div>
	);
}
