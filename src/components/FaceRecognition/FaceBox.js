import React from 'react';

const FaceBox = ({box}) => {
    return(
        <div className='bounding-box' style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}}></div>
    );
}

export default FaceBox;