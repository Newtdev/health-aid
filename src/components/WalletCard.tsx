type WalletCardTypes = {
	onClick: () => void;
	header: string;
	desc: string;
};
const WalletCard = ({ onClick, header, desc }: WalletCardTypes) => (
	<div
		className="w-full h-24 rounded-lg  py-4 px-6 border border-gray-300 cursor-pointer"
		onClick={onClick}>
		<h2 className="font-bold text-lg  text-primary-darker">{header}</h2>
		<p className="text-gray-500 text-sm">{desc}</p>
	</div>
);

export default WalletCard;
