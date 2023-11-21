import React from 'react';

const DialogComponent = ({ children, onClose }) => {
    // Dialog component logic here
    return (
        <div className="dialog">
            {children}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default DialogComponent;