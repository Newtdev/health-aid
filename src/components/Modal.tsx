import { Button, Modal } from "flowbite-react";
import { ReactNode } from "react";

type ModalCompTypes = {
	header: string;
	show: boolean;
	children: ReactNode;
	showFooter?: boolean;
	handleClose: () => void;
};

export default function ModalComp({
	header,
	show,
	children,
	showFooter = true,
	handleClose,
}: ModalCompTypes) {
	return (
		<>
			<Modal show={show} onClose={handleClose}>
				<Modal.Header className="font-bold border-none">{header}</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
				{showFooter ? (
					<Modal.Footer className="border-none">
						<Button onClick={handleClose}>OK</Button>
						<Button color="gray" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				) : null}
			</Modal>
		</>
	);
}
