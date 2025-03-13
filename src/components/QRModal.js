import { Modal } from "react-bootstrap";

const QRModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Static Image</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <img src="https://via.placeholder.com/400" alt="Static" className="img-fluid" />
    </Modal.Body>
  </Modal>
);

export default QRModal;