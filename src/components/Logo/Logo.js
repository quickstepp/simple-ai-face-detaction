import React from 'react';
import Tilt from 'react-parallax-tilt';
import face from './face-scan.png';
import './Logo.css';

const Logo = () => {
    return(
        <Tilt className='logo ma4 mt0' tiltReverse={true}>
            <div>
                <a href="https://www.flaticon.com/free-icons/face-recognition" target='_blank' title="face recognition icons" rel="noreferrer">
                    <img src={face} alt='logo' />
                </a>
            </div>
        </Tilt>
    );
}

export default Logo;