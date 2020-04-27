import React from 'react';
import styled from 'styled-components';

const Line = styled.div`
    position: absolute;
    height: 12vh;
    width: 5px;
    background-color: hsl(41, 100%, 65%);
    bottom: 0;
  `;

interface ILine {
    distance: number;
    offset: number;
}

const LineTrack: React.FC<ILine> = ({distance, offset}) => {
    const ver = 50 - ((distance + offset) * 2) % 100;
    return ver > -8 ? <>
    {
        [-1, 1].map((e: number) => <Line key={`line ${offset} ${e}`} style={{
            left: `calc(${e * 4}vw + 10vw)`,
            transform: `perspective(100vh) rotateX(65deg) translateZ(calc(50vh - ${(((distance + offset) * 2) % 100)}vh))`,
          }} />)
    }
    </> : <></>
}

export default LineTrack;