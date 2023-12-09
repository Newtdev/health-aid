import { Dropdown } from "flowbite-react";
import { clearItem } from "../utils/saveData";

function DropdownComp() {
	return (
		<Dropdown
			style={{ background: "transparent", color: "#000" }}
			label="Sign out">
			<Dropdown.Item onClick={clearItem}>Sign out</Dropdown.Item>
		</Dropdown>
	);
}

export default DropdownComp;
