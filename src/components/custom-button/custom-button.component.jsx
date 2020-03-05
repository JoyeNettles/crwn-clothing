import React from 'react';

import './custom-button.styles.scss';

const CustomButtom = ({children, isGoogleSignIn, inverted, ...otherProps}) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButtom;
