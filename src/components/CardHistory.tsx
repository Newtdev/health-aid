/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Label, TextInput } from "flowbite-react";
import useUserWalletInfo from "../hooks/useUserWalletInfo";
import { useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { formatNumberToCurrency } from "../utils/formatCurrency";
import ModalComp from "./Modal";
import WalletCard from "./WalletCard";
import { useFormik } from "formik";
import { InputError } from "./InputError";
import * as yup from "yup";
import axiosInstance from "../api";
import { API_ROUTES } from "../contants/ApiRoutes";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { IoCopyOutline } from "react-icons/io5";

async function MakePayment(amount: any) {
	try {
		const result = await axiosInstance.post(
			API_ROUTES.PAYMENT_PAYSTACK,
			amount,
		);

		location.replace(result?.data?.data?.authorization_url);
	} catch (error: any) {
		toast.error(error?.data?.data?.message);
	}
}
const PaystackPayment = () => {
	const payment = useMutation(MakePayment);
	const formik = useFormik({
		initialValues: { amount: 0 },
		validateOnChange: true,
		validateOnBlur: true,
		validationSchema: yup.object().shape({
			amount: yup.string().trim().label("Amount").required(),
		}),
		onSubmit: (values) => {
			payment.mutate({
				amount: Number(values?.amount),
			});
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="mb-2 block">
				<Label htmlFor="amount" value="Amount" />
			</div>

			<TextInput
				id="amount"
				placeholder="Amount"
				required
				sizing="lg"
				type="text"
				icon={TbCurrencyNaira}
				color={
					formik.errors.amount && formik.touched.amount ? "failure" : "gray"
				}
				helperText={
					<InputError
						error={formik.errors.amount && formik.touched.amount}
						name={formik.errors?.amount || ""}
					/>
				}
				{...formik.getFieldProps("amount")}
			/>

			<div className="py-4 w-full mb-4">
				<Button
					type="submit"
					className="bg-primary-dark mt-4 w-1/2 mx-auto"
					size="lg">
					Fund Wallet
				</Button>
			</div>
		</form>
	);
};

export default function CardHistory() {
	const userWallet = useUserWalletInfo();
	const [showModal, setShowModal] = useState({
		main: false,
		details: false,
		payment: false,
	});

	function handleMainToggleModal() {
		setShowModal((prevState) => {
			return { ...prevState, main: !showModal.main };
		});
	}
	function handleDetailsToggleModal() {
		setShowModal(() => {
			return {
				details: !showModal.details,
				main: false,
				payment: false,
			};
		});
	}
	function handlePaymentToggleModal() {
		setShowModal(() => {
			return {
				details: false,
				main: false,
				payment: !showModal.payment,
			};
		});
	}

	const accountInfo = [
		{ name: "Account Name", details: userWallet?.accountName },
		{ name: "Account Number", details: userWallet?.accountNumber },
		{ name: "Bank Name", details: userWallet?.accountBank },
	];

	const handleCopyAccountDetails = async () => {
		try {
			await window.navigator?.clipboard.writeText(userWallet?.accountNumber);
			toast.success("Account number copied");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-full p-6 h-56 mt-6 rounded-lg bg-primary-dark ">
			<div className="flex justify-between items-center">
				<p className="text-sm md:text-lg text-white">HEALTH SAVINGS ACCOUNT</p>
				<Button
					className="font-bold bg-red-700 hover:bg-red-800"
					onClick={handleMainToggleModal}>
					Fund wallet
				</Button>
			</div>
			<div>
				<div>
					<span className="font-bold text-base md:text-base flex text-white items-center gap-x-3">
						<h2>Main balance:</h2>
						<span className="flex items-center text-base">
							<TbCurrencyNaira className="text-2xl" />
							<h2>
								{formatNumberToCurrency(userWallet?.balance?.mainBalance)}
							</h2>
						</span>
					</span>
					{/* //wallet/verify-transaction?reference=34567890 */}
				</div>
				<div className="mt-6">
					<p className="text-sm md:text-lg text-white">WALLET INFORMATION</p>
					<div className="flex items-center mt-2 gap-x-6">
						<span className="font-bold text-sm md:text-base flex text-white items-center gap-x-1">
							<h3>Account number:</h3>
							<span className="flex items-center ">
								{userWallet?.accountNumber}
							</span>
							<span>
								<IoCopyOutline
									className="cursor-pointer"
									onClick={handleCopyAccountDetails}
								/>
							</span>
						</span>
						<span className="font-bold text-base md:text-base flex text-white items-center gap-x-1">
							<h3>Bank name:</h3>
							<span className="flex items-center">
								{userWallet?.accountBank}
							</span>
						</span>
					</div>
				</div>
			</div>
			<ModalComp
				header="Fund Your Wallet"
				handleClose={handleMainToggleModal}
				show={showModal.main}>
				<>
					<WalletCard
						header="Fund via Bank Transfers"
						onClick={handleDetailsToggleModal}
						desc="Direct bank transfer to your wallet account"
					/>
					<br />
					<WalletCard
						header="Online Payment via Card"
						onClick={handlePaymentToggleModal}
						desc="Fund your wallet with online payment"
					/>
				</>
			</ModalComp>

			<ModalComp
				showFooter={false}
				header="Online Payment with Paystack"
				handleClose={handlePaymentToggleModal}
				show={showModal.payment}>
				<PaystackPayment />
			</ModalComp>

			<ModalComp
				header="Your Account Information"
				handleClose={handleDetailsToggleModal}
				show={showModal.details}>
				{accountInfo.map((d) => (
					<div className="w-full h-20 rounded-lg mt-4  py-4 px-6 border border-gray-300 cursor-pointer">
						<h2 className="font-bold text-base text-primary-darker">
							{d.name}{" "}
						</h2>
						<div className=" flex gap-x-6 items-center">
							<p className="text-gray-500 text-sm">{d.details}</p>
							{d.name === "Account Number" ? (
								<span>
									<IoCopyOutline
										className="cursor-pointer text-primary-light"
										onClick={handleCopyAccountDetails}
									/>
								</span>
							) : null}
						</div>
					</div>
				))}
			</ModalComp>
		</div>
	);
}
