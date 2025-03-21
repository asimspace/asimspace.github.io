import React, { useEffect, useState } from 'react';

const Alert = ({ content, alertClass, onClose }) => {
    const [animationClass, setAnimationClass] = useState('slide-in');

    useEffect(() => {
        // Automatically fade out the alert after 5 seconds
        const timer = setTimeout(() => {
            setAnimationClass('slide-out'); // Trigger slide-out animation
            setTimeout(onClose, 500); // Call onClose after animation
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [onClose]);

    return (
        <div
            className={`alert ${alertClass} alert-dismissible fade show position-fixed top-0 end-0 m-3 ${animationClass}`}
            role="alert"
            style={{ zIndex: 1050 }}
        >
            {content}
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                    setAnimationClass('slide-out'); // Trigger slide-out animation
                    setTimeout(onClose, 500); // Call onClose after animation
                }}
            ></button>
        </div>
    );
};

export default Alert;