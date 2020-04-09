import React from 'react';
import { useSelector } from 'react-redux';

import './Button.sass';

interface IButton {
    onClick?: any;
    text?: string;
    disabled?: boolean;
}

export const Button: React.FC<IButton> = React.memo(({ onClick, text, disabled, children }) => {
	const { theme } = useSelector((state: any) => state.app);

    return <>
        <button 
            className={`base_button base_button_${theme}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children || text}
        </button>
    </>
})
