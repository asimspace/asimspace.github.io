import { Modal } from "react-bootstrap";

const QRModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>QR Code</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <img src="/qr.png" alt="QR Code" className="img-fluid" />
    </Modal.Body>
  </Modal>
);

export default QRModal;