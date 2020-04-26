import React from 'react';
import styled from 'styled-components';

interface IObstacle {
    distance: number;
    position: number;
    track: number;
    carPosition: number;
    Collision: () => void;
}

const ObstacleContainer = styled.div`
    position: absolute;
    height: 100px;
    width: 100px;
    left: calc(50vw - 50px);
    z-index: 2;
`;
const TopDetail = styled.div`
    width: 100px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
`;

const SideDetail = styled.div`
    background-color: red;
    height: 80px;
    width: 15px;
    position: absolute;
    bottom: 0;
`;

const Obstacle: React.FC<IObstacle> = ({position, distance, track, Collision, carPosition}) => {
    const [collided, doColide] = React.useState(false);
    const prep = position - 50;
    const verifier = 40 - (distance - prep) * 1.25;
    if (distance > prep && verifier < 10 && track === carPosition && !collided && verifier > 0) {
        Collision();
        doColide(true);
    };

    return <ObstacleContainer style={{transform: `scale(${distance <= prep ? 0.2 + (distance/position)/4 : 0.6 + (distance/position)/5})`,     
        bottom: `calc(40vh - ${distance > prep ? (distance - prep) * 1.25 : 0}vh)`,
        left: `calc(${44 + (track * 3)}vw - 50px + ${distance > prep && track !== 2 ? track < 2 ? - (distance - prep) : (distance - prep) : 0}vw)`
        }}>
        <TopDetail/>
        <SideDetail/>
        <SideDetail style={{right: '0'}}/>
    </ObstacleContainer>
}

export default Obstacle;