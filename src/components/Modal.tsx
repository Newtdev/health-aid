import { Button, Modal } from "flowbite-react";
import { useState } from "react";

type ModalCompTypes = {
    header: string, text:string,show:boolean
}

export default function ModalComp({ header, text, show }: ModalCompTypes) {
	const [openModal, setOpenModal] = useState<boolean>(show);
	// const props = { openModal, setOpenModal };

	return (
		<>
			<Modal
				show={openModal}
				onClose={() => setOpenModal(false)}>
				<Modal.Header>{header}</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							{text}
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setOpenModal(false)}>OK</Button>
					<Button color="gray" onClick={() => setOpenModal(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
