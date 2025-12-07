import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { VolumeUp, VolumeMute } from "react-bootstrap-icons";
import AutomationPopover from "./AutomationPopover";

const Footer = ({ onAutomate, isAutomating, isSoundEnabled, onSoundToggle }) => {
  const location = useLocation();
  const isPlayBingoPage = location.pathname === '/play-bingo';

  return (
    <footer style={{ position: 'relative' }}>
        <hr/>
        <Container>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '3rem' }}>
                <p style={{ margin: 0, textAlign: 'center' }}>&copy; Bingo 2025. Enjoy Responsibly! </p>
                {isPlayBingoPage && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'absolute', right: 0 }}>
                        <button
                          onClick={() => onSoundToggle(!isSoundEnabled)}
                          style={{
                            background: isSoundEnabled ? '#0d6efd' : '#6c757d',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            transition: 'all 0.3s ease',
                            padding: '0.5rem',
                            borderRadius: '50%',
                          }}
                          title={isSoundEnabled ? 'Mute sound' : 'Unmute sound'}
                        >
                          {isSoundEnabled ? <VolumeUp size={20} /> : <VolumeMute size={20} />}
                        </button>
                        <AutomationPopover onAutomate={onAutomate} isAutomating={isAutomating} />
                      </div>
                    )}
                </div>
        </Container>
    </footer>
  );
};
  
export default Footer;