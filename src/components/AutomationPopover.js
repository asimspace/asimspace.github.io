import { useState, useEffect } from 'react';
import { Popover, Button, Form } from 'react-bootstrap';
import { Gear } from 'react-bootstrap-icons';

const AutomationPopover = ({ onAutomate, isAutomating }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [interval, setInterval] = useState(5);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(isAutomating);
  }, [isAutomating]);

  const handleToggle = (e) => {
    const enabled = e.target.checked;
    setIsEnabled(enabled);
    onAutomate(enabled, interval);
  };

  const handleIntervalChange = (e) => {
    const value = Math.max(3, Math.min(10, parseInt(e.target.value) || 3));
    setInterval(value);
    if (isEnabled) {
      onAutomate(true, value);
    }
  };

  return (
    <>
      <button
        className="btn btn-link p-0 ms-2"
        onClick={() => setShowPopover(!showPopover)}
        title="Automation settings"
        style={{
          textDecoration: 'none',
          color: showPopover ? '#0d6efd' : 'inherit',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.3s ease',
          padding: '0.25rem',
        }}
      >
        <Gear size={20} />
      </button>

      {showPopover && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '0.375rem',
            padding: '1rem',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            minWidth: '280px',
            marginBottom: '0.5rem',
          }}
        >
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Automate the Picker
          </div>

          <Form.Group style={{ marginBottom: '1rem' }}>
            <Form.Label style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Interval (seconds): {interval}s
            </Form.Label>
            <Form.Range
              min={3}
              max={10}
              step={1}
              value={interval}
              onChange={handleIntervalChange}
              disabled={!isEnabled}
            />
            <Form.Text className="d-block mt-1" style={{ fontSize: '0.75rem' }}>
              Min: 3s | Max: 10s
            </Form.Text>
          </Form.Group>

          <Form.Check
            type="switch"
            id="automate-switch"
            label={isEnabled ? 'Automating' : 'Manual'}
            checked={isEnabled}
            onChange={handleToggle}
            style={{ marginBottom: '0.5rem' }}
          />

          <button
            className="btn btn-sm btn-secondary w-100"
            onClick={() => setShowPopover(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default AutomationPopover;
