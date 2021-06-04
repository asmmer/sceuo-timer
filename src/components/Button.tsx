import React from 'react';

import './Button/Button.css';

interface IButton {
    onClick?: () => void;
    text?: string;
    disabled?: boolean;
}

export const Button: React.FC<IButton> = React.memo(({ onClick, text, disabled, children }) =>
    <button
        className="base_button"
        onClick={onClick}
        disabled={disabled}
    >
        {children || text}
    </button>
)
