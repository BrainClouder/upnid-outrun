import React from 'react';
import styled from 'styled-components';

const StraightTrack = styled.div`
		position: absolute;
    transform: perspective(50vh) rotateX(70deg) translateZ(12vh);
    background-color: #111111 ;
		height: 100vh;
    width: 20vw;
		bottom: -20vh;
		left: calc(50vw - 10vw);
    z-index: 2;    
  `;

const Track: React.FC = (props) => {
    return <StraightTrack>
        {props.children}        
        </StraightTrack>
}


export default Track;