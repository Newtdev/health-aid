import { Button, Modal } from "flowbite-react";
import { ReactNode } from "react";

type ModalCompTypes = {
	header: string;
	show: boolean;
	children: ReactNode;
	handleClose: () => void;
};

export default function ModalComp({
	header,
	show,
	children,
	handleClose,
}: ModalCompTypes) {
	return (
		<>
			<Modal show={show} onClose={handleClose}>
				<Modal.Header className="font-bold border-none">{header}</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
				<Modal.Footer className="border-none">
					<Button onClick={handleClose}>OK</Button>
					<Button color="gray" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
