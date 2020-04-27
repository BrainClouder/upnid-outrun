import React from 'react';
import styled from 'styled-components';

interface IObstacle {
    distance: number;
    position: number;
    track: number;
    carPosition: number;
}

const ObstacleContainer = styled.div`
    position: absolute;
    height: 100px;
    width: 100px;
`;
const TopDetail = styled.div`
    width: 100px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: repeating-linear-gradient(45deg, white, white 1px, red 15px);
`;

const SideDetail = styled.div`
    background-color: #8d6b20;
    height: 80px;
    width: 15px;
    position: absolute;
    bottom: 0;
`;

const Obstacle: React.FC<IObstacle> = ({ position, distance, track }) => {
    const prep = position - 50;
    const verifier = 40 - (distance - prep) * 1.25;
    return verifier > 0 ? <ObstacleContainer style={{
        transform: `scale(${distance <= prep ? 0.1 + ((distance * 1.25) / position) / 4 : 0.6 + (distance / position) / 5})`,
        bottom: `calc(40vh - ${distance > prep ? (distance - prep) * 1.25 : 0}vh)`,
        left: `calc(${44 + (track * 3)}vw - 50px + ${distance > prep && track !== 2 ? track < 2 ? - (distance - prep) : (distance - prep) : 0}vw)`,
        zIndex: verifier < 20 ? 2 : 5
    }}>
        <TopDetail />
        <SideDetail />
        <SideDetail style={{ right: '0' }} />
    </ObstacleContainer> : <></>
}

export default Obstacle;