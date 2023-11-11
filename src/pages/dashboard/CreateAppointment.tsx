/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../api";
import { InputError } from "../../components/InputError";
import {
	Button,
	Datepicker,
	Label,
	Select,
	TextInput,
	Textarea,
} from "flowbite-react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { API_ROUTES } from "../../contants/ApiRoutes";
import { toast } from "react-toastify";
import { IoAddOutline } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import Loader from "../../components/Loader";
import { GoogleLocationInput } from "../../components/GoogleLocation";

async function handleSignIn(values: any) {
	try {
		const result = await axiosInstance.post(API_ROUTES.APPOINTMENTS, values);
		toast.success(result?.data?.status);
		location.replace(result?.data?.data);
	} catch (error: { data: { message: string } } | any) {
		toast.error(error?.data?.message);
	}
}
export default function CreateAppointment() {
	const appointmentMutation = useMutation(handleSignIn);

	const formik = useFormik({
		initialValues: {
			type: "",
			symptoms: [],
			channel: "",
			appointmentDate: "",
			meta: {
				address: "",
				time: "",

				comment: "",
				lat: "",
				lng: "",
			},
		},
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: (values) => {
			console.log(values);
			appointmentMutation.mutate(values);
		},
	});

	function addSymptons() {
		formik.setFieldValue("symptoms", [...formik.values?.symptoms, ""]);
	}

	function removeSymptons(id: number) {
		formik.setFieldValue("symptoms", [
			...formik.values?.symptoms.filter((_, i) => id !== i),
		]);
	}

	const getLong = (value: number) => {
		formik.setFieldValue("meta.lng", String(value));
	};
	const getLat = (value: number) => {
		formik.setFieldValue("meta.lat", String(value));
	};

	const getAddress = (value: string) => {
		formik.setFieldValue("meta.address", value);
	};
	return (
		<section className="h-full w-full">
			{appointmentMutation?.isLoading ? <Loader /> : null}
			<article className="mt-12 pt-16 flex justify-between gap-x-10">
				<form
					className="flex w-full flex-col gap-4"
					onSubmit={formik.handleSubmit}>
					<div id="select">
						<div className="mb-2 block">
							<Label htmlFor="appointment-type" value="Appointment channel" />
						</div>
						<Select
							id="countries"
							sizing="lg"
							required
							color={
								formik.errors.channel && formik.touched.channel
									? "failure"
									: "gray"
							}
							helperText={
								<InputError
									error={formik.errors.channel && formik.touched.channel}
									name={formik.errors?.channel || ""}
								/>
							}
							onChange={(e) => formik.setFieldValue("channel", e.target.value)}>
							<option>Select option</option>
							<option value="video">Video call</option>
							<option value="in-person">In-person</option>
							<option value="audio">Audio</option>
						</Select>
					</div>

					<div id="select">
						<div className="mb-2 block">
							<Label htmlFor="type" value="Appointment types" />
						</div>
						<Select
							id="countries"
							sizing="lg"
							required
							color={
								formik.errors.type && formik.touched.type ? "failure" : "gray"
							}
							helperText={
								<InputError
									error={formik.errors.type && formik.touched.type}
									name={formik.errors?.type || ""}
								/>
							}
							onChange={(e) => formik.setFieldValue("type", e.target.value)}>
							<option>Select option</option>
							<option value="home_visit">Home Visit</option>
							<option value="clinic_visit">Clinic visit</option>
							<option value="tele_health">Tele health</option>
						</Select>
					</div>
					<div className="grid grid-cols-2 gap-x-4 mt-3">
						<div>
							<Label htmlFor="Date" value="Date" />
							<Datepicker
								autoHide={false}
								sizing="lg"
								color={
									formik.errors.appointmentDate &&
									formik.touched.appointmentDate
										? "failure"
										: "gray"
								}
								helperText={
									<InputError
										error={
											formik.errors.appointmentDate &&
											formik.touched.appointmentDate
										}
										name={formik.errors?.appointmentDate || ""}
									/>
								}
								{...formik.getFieldHelpers("date")}
							/>
						</div>
						<div className="flex flex-col justify-center">
							<Label htmlFor="time" value="Time" />
							<TextInput
								id="disabledInput1"
								placeholder="Disabled input"
								type="time"
								sizing="lg"
								color={
									formik.errors.meta?.time && formik.touched.meta?.time
										? "failure"
										: "gray"
								}
								helperText={
									<InputError
										error={
											formik.errors.meta?.time && formik.touched.meta?.time
										}
										name={formik.errors?.meta?.time || ""}
									/>
								}
								{...formik.getFieldHelpers("meta.time")}
							/>
						</div>
					</div>
					<div className="my-3">
						<Label className="block mb-3">Address</Label>
						<GoogleLocationInput
							getLat={getLat}
							getLong={getLong}
							getAddress={getAddress}
						/>
					</div>
					<div className="mt-3">
						<Label htmlFor="disabledInput1" className="block mb-3">
							Symptoms
						</Label>

						{formik.values?.symptoms.map((d, i) => (
							<div className="flex justify-between items-center gap-x-2">
								<TextInput
									id="symptoms"
									width="100%"
									placeholder={`Symptoms ${i + 1}`}
									// name={`symptoms-${[i]}`}
									type="text"
									sizing="lg"
									defaultValue={formik.values?.symptoms[i]}
									className="my-3 w-full"
									color={
										formik.errors.symptoms?.[i] && formik.touched.symptoms
											? "failure"
											: "gray"
									}
									helperText={
										<InputError
											error={formik.errors.symptoms && formik.touched.symptoms}
											name={formik.errors?.symptoms?.[i] || ""}
										/>
									}
									onChange={(e) =>
										formik.setFieldValue(`symptoms.${[i]}`, e.target.value)
									}
								/>
								<Button
									type="button"
									className="bg-red-700"
									onClick={() => removeSymptons(i)}>
									<LiaTimesSolid className="font-bold text-base" />
								</Button>
							</div>
						))}
						<div className="w-full flex justify-between">
							<Button
								type="button"
								className="bg-green-700"
								onClick={addSymptons}>
								<IoAddOutline className="font-bold text-lg" />
							</Button>
						</div>
					</div>
					<div>
						<div id="textarea">
							<div className="mb-2 block">
								<Label htmlFor="comment" value="How do you feel?" />
							</div>
							<Textarea
								id="comment"
								placeholder="Leave a comment..."
								rows={4}
								{...formik.getFieldHelpers("meta.comment")}
							/>
						</div>
					</div>

					<Button type="submit" className="bg-primary-dark mt-4" size="lg">
						Book appointments
					</Button>
				</form>
				<div className="basis-[40%]">
					<h6 className="font-bold text-black">Calendar</h6>
					<Datepicker className="text-white " inline />
				</div>
			</article>
		</section>
	);
}
