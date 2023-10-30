import { InputError } from '../../components/InputError';
import { Button, Datepicker, FileInput, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { useFormik } from 'formik';
import React from 'react'

export default function CreateAppointment() {

    const formik = useFormik({
        initialValues: {
            appointmentType: '',
            date: '',
            time: '',
            address: '',
            comment: '',
            file:null
        },
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: ()=> {}
    });
  return (
		<section className="h-screen w-full">
			<article className="mt-12 pt-16 flex justify-between gap-x-10">
				<form className="flex w-full flex-col gap-4">
					<div id="select">
						<div className="mb-2 block">
							<Label htmlFor="appointment-type" value="Appointment type" />
						</div>
						<Select
							id="countries"
							sizing="lg"
							required
							color={
								formik.errors.appointmentType && formik.touched.appointmentType
									? "failure"
									: "gray"
							}
							helperText={
								<InputError
									error={
										formik.errors.appointmentType &&
										formik.touched.appointmentType
									}
									name={formik.errors?.appointmentType || ""}
								/>
							}
							{...formik.getFieldHelpers("appointmentType")}>
							<option>Physical</option>
							<option>Virtual</option>
						</Select>
					</div>
					<div className="grid grid-cols-2 gap-x-4 ">
						<div>
							<Label htmlFor="Date" value="Date" />
							<Datepicker
								autoHide={false}
								sizing="lg"
								color={
									formik.errors.date && formik.touched.date ? "failure" : "gray"
								}
								helperText={
									<InputError
										error={formik.errors.date && formik.touched.date}
										name={formik.errors?.date || ""}
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
									formik.errors.time &&
									formik.touched.time
										? "failure"
										: "gray"
								}
								helperText={
									<InputError
										error={
											formik.errors.time &&
											formik.touched.time
										}
										name={formik.errors?.time || ""}
									/>
								}
								{...formik.getFieldHelpers("time")}
							/>
						
						
						</div>
					</div>
					<div>
						<Label htmlFor="disabledInput1">Address</Label>
						<TextInput
							id="disabledInput1"
							placeholder="Disabled input"
							type="text"
							sizing="lg"
							color={
								formik.errors.address && formik.touched.address
									? "failure"
									: "gray"
							}
							helperText={
								<InputError
									error={
										formik.errors.address &&
										formik.touched.address
									}
									name={formik.errors?.address || ""}
								/>
							}
							{...formik.getFieldHelpers("address")}
						/>
					</div>
					<div>
						<div id="textarea">
							<div className="mb-2 block">
								<Label htmlFor="comment" value="How do you feel?" />
							</div>
							<Textarea
								id="comment"
								placeholder="Leave a comment..."
								required
							  rows={4}
								{...formik.getFieldHelpers("comment")}
							/>
						</div>
					</div>

					{/* <div>
						<Label htmlFor="disabledInput2">Personal access token</Label>
						<TextInput
							id="disabledInput2"
							placeholder="Disabled readonly input"
							type="text"
							sizing="lg"
						/>
					</div> */}

					<div>
						<div className="" id="fileUpload">
							<div className="mb-2 block">
								<Label
									htmlFor="file"
									value="Anything you want to show your Health Practitioner, please attach."
								/>
							</div>
							<FileInput helperText="" id="file" />
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
