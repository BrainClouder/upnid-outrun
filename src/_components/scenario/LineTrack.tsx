import React from 'react';
import styled from 'styled-components';

const Line = styled.div`
    position: absolute;
    height: 12vh;
    width: 5px;
    background-color: white;
    bottom: 0;
  `;

interface ILine {
    distance: number;
    offset: number;
}

const LineTrack: React.FC<ILine> = ({distance, offset}) => {
    return <>
    {
        [-1, 1].map((e: number) => <Line key={`line ${offset} ${e}`} style={{
            left: `calc(${e * 4}vw + 10vw)`,
            transform: `perspective(100vh) rotateX(65deg) translateZ(calc(55vh - ${(((distance + offset) * 2) % 100)}vh))`,
          }} />)
    }
    </>
}

export default LineTrack;