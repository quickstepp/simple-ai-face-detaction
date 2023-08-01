import React from 'react';
import './FaceRecognition.css'
import FaceBox from './FaceBox';

const FaceRecognition = ({imageURL, boxes}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageURL} alt='' width='500px' height='auto' />
                <div>
                    {
                        boxes.map((box, i) => {
                            return(
                                <FaceBox key={i} box={boxes[i]} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;