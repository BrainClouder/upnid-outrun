import React from 'react';
import './css/main.css';
import './App.css';
import styled from 'styled-components';
import Scenario from './_components/scenario/Scenario';
import Car from './_components/player/Car';


const PausePopup = styled.div`
  width: 350px;
  height: 350px;
  position: fixed;
  left: calc(50vw - 175px);
  top: 20vh;
  background-color: #222222;
  border-radius: 10px;
  z-index: 5;
`;

const StyledButton = styled.button`
  padding: 10px 5px;
  background-color: white;
  color: red;
  font-weight: 700;
  border-radius: 5px;
`;

const MainMenu = styled.div`
  background-color: #000000aa;
  color: #aaaaaa;
  text-align: center;
  box-shadow: 2px 2px 4px black;
  position: fixed;
  width: 350px;
  left: calc(50vw - 175px);
  padding: 1em;
  border-radius: 25px;
  top: 20vh;
`;

const TopInterface = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 80vw;
  left: 10vw;
  justify-content: space-between;
  top: 4vh;
  font-size: 20px;
  text-transform: uppercase;
`;

const UILabel = styled.div`
  font-weight: 300;
  color: hsl(12, 83%, 92%);
`;

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
`;
const ColorPickerPointer = styled.div`
  border-right: 15px solid white;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  margin: 16px;
  cursor: pointer;
`;
const UISpeed = styled.div`
    color: #eee;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    position: fixed;
    width: 350px;
    left: calc(50vw - 175px);
    text-shadow: 2px 2px 2px #000000aa;
    padding: 1em;
    border-radius: 25px;
    top: 5vh;
`;

const App: React.FC = () => {
  const [loaded, doLoad] = React.useState(false);
  const [finished, doFinish] = React.useState(false);
  const [track] = React.useState(() => {
    const t = {
      name: 'Nível Zero',
      obstacles: [-5],
      obstacle_profile: [1],
      total_distance: 5000
    };
    const obstacles_number = 30;
    for (let i = 0; i < obstacles_number; i++) {
      t.obstacles.push((i + 1) * (t.total_distance / obstacles_number) + Math.floor(Math.random() * 50));
      t.obstacle_profile.push(Math.floor(Math.random() * 3 + 1));
    }
    return { ...t };
  });
  const [carColor, setCarColor] = React.useState(0);
  const [turbo, setTurbo] = React.useState(false);
  const [carPos, setCarPos] = React.useState(2);
  const [runtime, setRuntime] = React.useState(0);
  const [carSpeed, setSpeed] = React.useState(1);
  const [distance, setDistance] = React.useState(0);
  const [coll, setColl] = React.useState(false);
  

  React.useEffect(
    () => {
      if (loaded && distance < track.total_distance) {
        const keyHandler = (event: any) => {
          switch (event.keyCode) {
            case 65:
              if (carPos !== 1) setCarPos(1);
              break;
            case 83:
              if (carPos !== 2) setCarPos(2);
              break;
            case 68:
              if (carPos !== 3) setCarPos(3);
              break;
            case 38:
              setSpeed(carSpeed + 0.5);
              break;
            case 40:
              setSpeed(carSpeed - 0.1);
              break;
            case 27:
              doLoad(false);
              break;
            default:
              break;
          }
        };
        window.addEventListener('keydown', keyHandler);
        const timer = setInterval(() => {
          if (carSpeed < 75 && !turbo) setSpeed(carSpeed + 1);
          else if (turbo && carSpeed < 150) setSpeed(carSpeed + 2);
          else if (!turbo && carSpeed > 75) setSpeed(carSpeed - 3);
          if (coll) {
            setSpeed(40);
            setColl(false);
          }
          setDistance(distance + (carSpeed / 50));
          setRuntime(runtime + 1);
        }, 10);
        return () => {
          clearInterval(timer);
          window.removeEventListener('keydown', keyHandler);
        };
      } else if (!finished) doFinish(true);
    },
    [setRuntime, runtime, distance, setDistance, loaded, track, carSpeed, setSpeed, finished, doFinish],
  );

  const carColorPreset = ["#dedede", "#0059d6", "#ff1414", "#fff58a", "#cc58fd", "#29ff50", "#7afbff", "#ffb78a", "#ff14ff"];
  
  const ReturnTimer = () => {
    const minutes = Math.floor((runtime * 20) / 60000);
    const seconds = (((runtime * 20) % 60000) / 1000).toFixed(0);
    return (seconds === '60' ? (minutes + 1) + ':00' : minutes + ':' + (seconds.length === 1 ? '0' + seconds : seconds));
  }
  
  const Collision = () => {
    // setSpeed(carSpeed - 70);
    setColl(true);
  }


  return (
    <div>
      <TopInterface>
        <UILabel>TEMPO: {ReturnTimer()}</UILabel>
        <UILabel>{distance.toFixed(2)} metros</UILabel>        
        <StyledButton onClick={() => setTurbo(!turbo)}>Turbo?</StyledButton>
      </TopInterface>

  <UISpeed> {(((carSpeed / 1000)/1000) * 3600 * 1000).toFixed(1) }km/h</UISpeed>

      <MainMenu style={{display: !loaded && runtime === 0 ? 'inline' : 'none'}}>
        <UILabel>Escolha sua cor e clique em começar</UILabel>
        <ColorPickerContainer>

        <ColorPickerPointer style={{backgroundColor: ''}} onClick={() => carColor <= 0 ? '' : setCarColor(carColor - 1)}/>

        <div style={{
          width: '50px', height: '50px', borderRadius: '50%', backgroundColor: carColorPreset[carColor]
        }}>

        </div>
        <ColorPickerPointer style={{transform: 'scale(-1,1)', backgroundColor: ''}} onClick={() => carColor >= carColorPreset.length - 1 ? '' : setCarColor(carColor + 1) }/>

        </ColorPickerContainer>

        <StyledButton onClick={() => doLoad(true)}>
          Começar
        </StyledButton>
      </MainMenu>
      
      <div style={{ position: 'fixed' }}>

        <div style={{
          position: 'relative'
        }}>

        </div>
      </div>
      {
        !loaded && runtime > 0 ? <PausePopup>
          <StyledButton onClick={() => doLoad(true)}>CONTINUAR</StyledButton>
        </PausePopup> : ''
      }

      <div style={{ display: !loaded ? 'fixed' : 'none' }}>
        <div>
        </div>
      </div>

      <Scenario time={runtime} speed={carSpeed} distance={distance} track={track} carPosition={carPos} Collision={Collision} />
      <Car time={runtime} position={carPos} color={carColorPreset[carColor]} finished={finished} />
    </div>
  );
};

export default App;
