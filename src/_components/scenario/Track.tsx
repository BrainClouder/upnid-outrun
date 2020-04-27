import React from 'react';
import styled from 'styled-components';

const StraightTrack = styled.div`
		position: absolute;
    transform: perspective(40vh) rotateX(60deg) translateZ(10.5vh);
    background-color: #111111 ;
		height: 62vh;
    width: 20vw;
		bottom: 0vh;
		left: calc(50vw - 10vw);
    z-index: 2;    
  `;

const Track: React.FC = (props) => {
    return <StraightTrack>
        {props.children}        
        </StraightTrack>
}


export default Track;