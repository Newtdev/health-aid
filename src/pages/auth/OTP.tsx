import axiosInstance from "../../api";
import { API_ROUTES } from "../../contants/ApiRoutes";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Loader from "../../components/Loader";

import { ROUTE } from "../../contants/AppRoute";

export default function OtpPage() {
	const OTP = useMutation(handleOTPRequest);
	const navigate = useNavigate();
	const location = useLocation();
	const phone = location?.state;
	const formik = useFormik({
		initialValues: {
			token: "",
		},
		onSubmit: (values) => {
			OTP.mutate(values);
		},
	});

	async function handleOTPRequest(values: unknown) {
		try {
			const data = await axiosInstance.post(API_ROUTES.VERIFY, values);
			// <Navigate to={ROUTE.Otp} />;
			toast.success(data?.data?.message);
			navigate(ROUTE.Home);
			console.log(data);
		} catch (error: unknown) {
			// toast.error(error?.message);
			console.log(error);
		}
	}

	return (
		<div className=" flex min-h-screen flex-col justify-center overflow-hidden  py-12">
			{OTP?.isLoading ? <Loader /> : null}

			<div className="relative bg-white px-6 pt-10 pb-9  mx-auto w-full max-w-lg rounded-2xl">
				<div className="mx-auto flex w-full max-w-md flex-col space-y-16">
					<div className="flex flex-col items-center justify-center text-center space-y-2">
						<div className="font-semibold text-3xl text-black">
							<p>Email Verification</p>
						</div>
						<div className="flex flex-row text-sm font-medium text-gray-400">
							<p>We have sent a code to your email {phone}</p>
						</div>
					</div>

					<div>
						<form onSubmit={formik.handleSubmit}>
							<div className="flex flex-col space-y-16">
								<div className="flex flex-row items-center justify-between  w-full max-w-xs">
									<div className="w-16 h-16 ">
										<OtpInput
											containerStyle={{
												display: "flex",
												justifyContent: "center",

												width: "30rem",
												gap: "20px",
												color: "black",
											}}
											inputStyle={{
												width: "4rem",
												borderRadius: 10,

												fontSize: "2rem",
											}}
											inputType="text"
											value={formik.values?.token}
											onChange={(value) => formik.setFieldValue("token", value)}
											numInputs={4}
											renderInput={(props) => <input {...props} />}
										/>
									</div>
								</div>

								<div className="flex flex-col space-y-5">
									<div>
										<button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
											Verify Account
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
