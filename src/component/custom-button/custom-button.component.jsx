import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
    <div className = {`${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
        {children}
    </div>
)

export default CustomButton;