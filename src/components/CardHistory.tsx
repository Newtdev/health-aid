import { Button } from "flowbite-react";
import useUserWalletInfo from "../hooks/useUserWalletInfo";
import React, { useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { formatNumberToCurrency } from "../utils/formatCurrency";
import ModalComp from "./Modal";

export default function CardHistory() {
	const userWallet = useUserWalletInfo();
	const [showModal, setShowModal] = useState({ main: false, details: false });

	console.log(userWallet);

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
			};
		});
	}

	const accountInfo = [
		{ name: "Account Name", details: userWallet?.accountName },
		{ name: "Account Numer", details: userWallet?.accountBank },
	];

	return (
		<div className="w-full p-6 h-56 mt-6 rounded-lg bg-primary-dark ">
			<div className="flex justify-between items-center">
				<p className="text-sm md:text-lg text-white">HEALTH SAVINGS ACCOUNT</p>
				<Button
					className="font-bold bg-primary-darker hover:bg-primary-dark"
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
				</div>
				<div className="mt-6">
					<p className="text-sm md:text-lg text-white">WALLET INFORMATION</p>
					<div className="flex items-center mt-2 gap-x-3">
						<span className="font-bold text-sm flex text-white items-center gap-x-1">
							<h3>Account number:</h3>
							<span className="flex items-center text-sm md:text-base">
								{userWallet?.dvaID}
							</span>
						</span>
						<span className="font-bold text-base md:text-base flex text-white items-center gap-x-1">
							<h3>Bank name:</h3>
							<span className="flex items-center text-sm">
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
				<div
					className="w-full h-24 rounded-lg  py-4 px-6 border border-gray-300 cursor-pointer"
					onClick={handleDetailsToggleModal}>
					<h2 className="font-bold text-lg  text-primary-darker">
						Fund via Bank Transfers
					</h2>
					<p className="text-gray-500 text-sm">
						Direct bank transfer to your wallet account
					</p>
				</div>
			</ModalComp>

			<ModalComp
				header="Your Account Information"
				handleClose={handleDetailsToggleModal}
				show={showModal.details}>
				{accountInfo.map((d) => (
					<div
						className="w-full h-20 rounded-lg mt-4  py-4 px-6 border border-gray-300 cursor-pointer"
						onClick={() => console.log("heelll")}>
						<h2 className="font-bold text-base text-primary-darker">
							{d.name}
						</h2>
						<p className="text-gray-500 text-sm">{d.details}</p>
					</div>
				))}
			</ModalComp>
		</div>
	);
}
