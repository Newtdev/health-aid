export function formatNumber(n: string) {
	return n
		.toString()
		.replace(/\D/g, "")
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNumberToCurrency(number = "", decimalPlace = false) {
	let value = number.toString();
	const decimalPosition = value.indexOf(".");
	if (decimalPosition >= 0) {
		const leftSide = formatNumber(value.substring(0, decimalPosition));
		let rightSide = formatNumber(value.substring(decimalPosition));
		if (decimalPlace) {
			rightSide += "00";
		}

		rightSide = rightSide.substring(0, 2);
		value = leftSide + "." + rightSide;
	} else {
		value = formatNumber(value);
		if (decimalPlace) {
			value += ".00";
		}
	}
	return value;
}
