import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BingoModeModal = ({ show, onHide }) => {
  const navigate = useNavigate();

  const handleClassicBingo = () => {
    onHide();
    navigate('/play-bingo');
  };

  const handleBabyShowerBingo = () => {
    onHide();
    navigate('/baby-shower-bingo');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Choose Bingo Mode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select the type of bingo you want to play:</p>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="primary" 
          onClick={handleClassicBingo}
          className="rounded-0 fw-light"
        >
          Classic Bingo
        </Button>
        <Button 
          variant="info" 
          onClick={handleBabyShowerBingo}
          className="rounded-0 fw-light"
        >
          Baby Shower Bingo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BingoModeModal;
