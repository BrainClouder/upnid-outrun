import React from 'react';
import Track from './Track';
import styled from 'styled-components';
import LineTrack from './LineTrack';
import Obstacle from './Obstacle';

interface IScenario {
    time: number;
    speed: number;
    distance: number;
    track: any;
    carPosition: number;
    Collision: () => void;
}


const Hole = styled.div`
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #000000ee;
`;

const SunsetBG = styled.div`
  position: absolute;
  width: 100vw;
  height: 57vh;
  z-index: -3;  
`;

const Sun = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  z-index: -2;
  position: absolute;
  top: calc(55vh - 100px);
  left: calc(50vw - 100px);
  background-image: linear-gradient(to bottom, #e71d34, #e63746, #ff9f1a, #fcc14a, #f57e00 );
  box-shadow: -2px -1px 4px #f6c079aa, 2px -1px 4px #f6c079aa;
`;

const ForegroundGrass = styled.div`
  position: absolute;
  top: 55vh;
  width: 100vw;
  height: 60vh;
  background-color: limegreen;
  z-index: 1;
`;



const FirstBuilding = styled.div`
  height: 60px;
  width: 20px;
  background-color: black;
  position: absolute;
  left: calc(50vw - 10px);
  top: calc(55vh - 30px);
  z-index: -1;
`;

const Scenario: React.FC<IScenario> = ({time, speed, distance, track, carPosition, Collision}) => {

    return <div>
      <SunsetBG style={{
        backgroundImage: `linear-gradient(to bottom, #140d26 ${-40 + time/1000}%, 
          #503a55 ${-25 + time/800}%, #22223a ${-15 + time/1000}%, 
          hsl(12, 83%, 62%) ${20 + time/1000}%, #ff9f1a ${93 + time/1000}%, #ffeea8 ${120 + time/1000}%)`
      }}/>
      <Sun style={{
        top: `calc(35vh - 100px + ${time/100}px)`
      }}></Sun>

         {/* {
         [0, 30, 52, 74, 96, 112, 134 ].map((e: number, i: number) => <FirstBuilding key={e + 'a'}
         style={{
          left: `calc(55vw - ${(e) + (( i < 2 ? -1 : 1) * 5)}px)`,
          top: `calc(54vh - ${[25,10,20,30, 40, 20][i]}px)`,
          transform: `scale(${1 + (distance > 4000 ? 2: distance/2000) })`
        }} />)
        }
        {
          [15, 45, 65, 85, 105, 125].map((e: number, i: number) => <FirstBuilding key={e + 'building'}
          style={{
            left: `calc(55vw - ${(e) + (( i < 2 ? -1 : 1) * 5) + (distance > 4000 ? 2 * 20 : (20 * distance)/2000)}px)`,            
            top: `calc(55vh - ${[12,10,15,8, 17, 11][i]}px)`,
            backgroundColor: '#0a0a0a',
            transform: `scale(${1 + (distance > 4000 ? 2: distance/2000) })`
          }}/>)
          } */}

        <Track>
        {
          [0, 10, 20, 30, 40].map((e: number) => <LineTrack key={e} offset={e} distance={distance} />)
        }
        </Track>
        <ForegroundGrass/>

        {
          track.obstacles.map((e: number, i: number) => i > 0 && (distance + 100) > e && (e + 200) > distance ? <Obstacle key={e} Collision={Collision} carPosition={carPosition} distance={distance} position={e} track={track.obstacle_profile[i]} /> : '')
        }
{/*         
        <Obstacle distance={distance} position={100} track={2}/> */}
    </div>
}

export default Scenario;