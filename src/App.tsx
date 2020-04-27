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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: #000000;
  border-radius: 50px;  
  z-index: 10;
`;

const StyledButton = styled.button`
  padding: 10px 5px;
  background-color: white;
  padding: 1em 2em;
  text-transform: uppercase;
  background-color: hsl(261, 21%, 13%);
  color: hsl(261, 21%, 83%);
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1em;
  transition: 200ms;
  border: 4px solid  hsl(261, 21%, 93%);
  &:hover {
    transform: scale(1.1)
  }
`;

const MainMenu = styled.div`
  background-color: #000000ff;
  color: #aaaaaa;
  text-align: center;
  box-shadow: 2px 2px 4px black;
  position: fixed;
  width: 90vw;
  padding: 1em;
  z-index: 10;
  border-radius: 25px;
  top: 5vh;
`;

const TopInterface = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 5vw;
  justify-content: space-between;
  top: 4vh;
  font-size: 20px;
  text-transform: uppercase;  
  z-index: 10;
`;

const UILabel = styled.div`
  font-weight: 300;
  color: hsl(12, 83%, 92%);
  font-size: 20px;
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
    width: 350px;
    text-shadow: 2px 2px 2px #000000aa;
    padding: 1em;
    border-radius: 25px;
`;

const ActionButtons = styled.button`
  padding: 1em;
  border-radius: 100px;
  font-weight: 800;
  font-size: 1.2em;
  text-transform: uppercase;
  background-color: hsl(261, 21%, 03%);
  color: hsl(261, 21%, 93%);
`;

const SpeedContainer = styled.div`
  display: flex;
  flex-direction: center;
  position: fixed;
  width: 300px;
  left: calc(50vw - 150px);
  top: 10vh;
  align-items: center;
  flex-direction: column;
  
`;

const FinaleMenu = styled.div`
  position: fixed;
  z-index: 10;
  width: 90vw;
  height: 90vh;
  border-radius: 50px;
  background-color: #000000ef;
  left: 5vw;
  top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly
`;

const FinaleMenuText = styled.div`
  color: #ffffffee;
  font-weight: 400;
  text-align: center;
  font-size: 1.5em;
`;

const Enfase = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  color: hsl(344, 100%, 54%);
`;

const CamadaBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000aa;
  z-index: 5;
`;

const CooldownText = styled.span`
  color:  hsl(344, 100%, 84%);
  font-size: 10em;
  position: absolute;
  top: 25vh;
  width: 100px;
  font-weight: 700;
  padding: 10px 40px;
  left: calc(50vw - 85px);
  text-align: center;
  border-radius: 40px;
  text-shadow: 2px 2px 4px  hsl(344, 100%, 54%), -2px -2px 4px  hsl(344, 100%, 54%);
  z-index: 10;
  background-color: #000000ef;
`;

interface IApp {
}

const App: React.FC<IApp> = () => {
  const [loaded, doLoad] = React.useState(false);
  const [finished, doFinish] = React.useState(false);
  const [track] = React.useState(() => {
    const t = {
      name: 'Nível Zero',
      obstacles: [-5],
      obstacle_profile: [1],
      total_distance: 7500
    };
    const obstacles_number = 65;
    for (let i = 0; i < obstacles_number; i++) {
      t.obstacles.push((i + 1) * (t.total_distance / obstacles_number) + Math.floor(Math.random() * 50));
      t.obstacle_profile.push(Math.floor(Math.random() * 3 + 1));
    }
    return { ...t };
  });
  const [carColor, setCarColor] = React.useState(0);
  const [turbo, setTurbo] = React.useState(false);
  const [started, doStart] = React.useState(false);
  const [startCooldown, setStartCooldown] = React.useState(3);
  const [turbocooldown, setCooldown] = React.useState(-200);
  const [carPos, setCarPos] = React.useState(2);
  const [runtime, setRuntime] = React.useState(0);
  const [carSpeed, setSpeed] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  
  const activateTurbo = () => {
    if ((turbocooldown + 200) < runtime) {
      setCooldown(runtime);
      setTurbo(true);
    }
  }

  React.useEffect(
    () => {
      if (!started) {
        const doTheCooldown = setInterval(() => {
          if (startCooldown > 1) setStartCooldown(startCooldown - 1)
          else doStart(true);
        }, 1000);
        return () => clearInterval(doTheCooldown);

      } else if (loaded && distance < track.total_distance) {
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
            case 27:
              doLoad(false);
              break;
            case 37:
              if (carPos > 1) setCarPos(carPos - 1);
              break;
            case 39:
              if (carPos < 3) setCarPos(carPos + 1);
              break;
            case 32:
              if ((turbocooldown + 200) < runtime) {
                setCooldown(runtime);
                setTurbo(true);
              }
              break;
            default:
              break;
          }
        };
        const touchHandler = (event: any) => {
          const positionX = event.touches[0].clientX;
          if (positionX > (window.innerWidth / 2)) {
            if (carPos < 3) setCarPos(carPos + 1);
          } else {
            if (carPos > 1) setCarPos(carPos - 1);
          }
        }

        const nextObstacleDistance = track.obstacles.find(element => element > distance);
        //@ts-ignore
        const verifier = 40 - (distance - (nextObstacleDistance - 50)) * 1.25;
        //@ts-ignore
        if (verifier < 10 && carPos === track.obstacle_profile[track.obstacles.indexOf(nextObstacleDistance)]) {
          if(turbo) setTurbo(false);
          setSpeed(40);
        };
     
        window.addEventListener('keydown', keyHandler);
        window.addEventListener('scroll', (event) => console.log(event));
        window.addEventListener('touchstart', touchHandler);
        const timer = setInterval(() => {
          if (carSpeed < 75 && !turbo) setSpeed(carSpeed + 1);
          else if (turbo && carSpeed < 150) setSpeed(carSpeed + 2);
          else if (!turbo && carSpeed > 75) setSpeed(carSpeed - 3);          
          if (turbo && runtime - turbocooldown > 100) setTurbo(false);
          setDistance(distance + (carSpeed / 50));
          setRuntime(runtime + 1);
        }, 10);
        return () => {
          clearInterval(timer);
          window.removeEventListener('keydown', keyHandler);
          window.removeEventListener('touchstart', touchHandler);
          window.removeEventListener('scroll', (event) => console.log(event));
        };
      } else if (!finished) doFinish(true);
    },
    [setRuntime, runtime, distance, turbocooldown, started, startCooldown, setStartCooldown,
      setTurbo, setDistance, loaded, track, carSpeed, setSpeed, finished, doFinish, carPos, turbo],
  );

  const carColorPreset = ["#dedede", "#0059d6", "#ff1414", "#fff58a", "#cc58fd", "#29ff50", "#7afbff", "#ffb78a", "#ff14ff"];

  const ReturnTimer = () => {
    const minutes = Math.floor((runtime * 20) / 60000);
    const seconds = (((runtime * 20) % 60000) / 1000).toFixed(0);
    return (seconds === '60' ? (minutes + 1) + ':00' : minutes + ':' + (seconds.length === 1 ? '0' + seconds : seconds));
  }

  const resetGame = () => {
    setSpeed(1);
    setRuntime(0);
    setDistance(0);
    doLoad(false);
    doStart(false);
    setStartCooldown(3);
  }




  return (
    <div>
      <TopInterface>
        <UILabel>TEMPO: {ReturnTimer()}</UILabel>
        <UILabel>{distance.toFixed(2)} metros</UILabel>
      </TopInterface>

        <ActionButtons style={{fontSize: '14px', position: 'absolute', top: '5vh', right: '5vw'}} onClick={() => doLoad(false)}>PAUSE</ActionButtons>



      <SpeedContainer style={{opacity: started ? 1 : 0.5}}>
      <UISpeed> {(((carSpeed / 1000) / 1000) * 3600 * 1000).toFixed(1)}km/h</UISpeed>
      <ActionButtons style={{opacity: turbocooldown + 200 < runtime ? 1 : 0.5}} onClick={activateTurbo}>TURBO</ActionButtons>
      </SpeedContainer>
      
      {
        loaded && !started ? <CooldownText>
        {startCooldown}
      </CooldownText> : ''
      }

      <MainMenu style={{ display: !loaded && runtime === 0 ? 'flex' : 'none', left: window.innerWidth < 600 ? '1vw' : '5vw', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{margin: '1em 0', backgroundColor: '#ffffff22', padding: '1em', width: window.innerWidth < 600 ? '90vw' : '500px'}}>        
        <UILabel>Bem vindo ao desafio <Enfase>outrun</Enfase>!</UILabel>
        <UILabel>Para jogar, é bem simples:</UILabel>
        <UILabel>Pressione <Enfase>A</Enfase>, <Enfase>S</Enfase> ou <Enfase>D</Enfase> para escolher uma das três faixas</UILabel>
        <UILabel>Você também alternar entre as faixas usando as setas direcionais <Enfase>{'<-'}</Enfase> e <Enfase>{'->'}</Enfase></UILabel>
        <UILabel>Se estiver no celular, toque na tela para movimentar o veículo!</UILabel>
        <UILabel>É possível <Enfase>Pausar</Enfase> o jogo apertando a tecla <Enfase>esc</Enfase> ou clicando no botão <Enfase>pause</Enfase></UILabel>
        <UILabel>Você pode ativer o <Enfase>turbo</Enfase> apertando o botão na tela ou apertando o <Enfase>espaço</Enfase></UILabel>
        </div>
        <UILabel style={{}}>Escolha a cor do seu <Enfase style={{color: carColorPreset[carColor]}}>veículo</Enfase> e clique em <Enfase>começar</Enfase></UILabel>
        <ColorPickerContainer>
          <ColorPickerPointer style={{ backgroundColor: '' }} onClick={() => carColor <= 0 ? '' : setCarColor(carColor - 1)} />

          <div style={{
            width: '50px', height: '50px', borderRadius: '50%', backgroundColor: carColorPreset[carColor]
          }}>

          </div>
          <ColorPickerPointer style={{ transform: 'scale(-1,1)', backgroundColor: '' }} onClick={() => carColor >= carColorPreset.length - 1 ? '' : setCarColor(carColor + 1)} />

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
          <UILabel><Enfase style={{color: 'hsl(344, 100%, 84%)', fontSize: '1.5em'}}>Pause</Enfase></UILabel>
          <StyledButton onClick={() => doLoad(true)}>CONTINUAR</StyledButton>
          <StyledButton style={{backgroundColor: 'hsl(344, 100%, 54%)', color: 'hsl(344, 100%, 84%)'}} onClick={resetGame}>Reiniciar</StyledButton>
        </PausePopup> : ''
      }
    {
      loaded ? '' : <CamadaBG/>
    }
      <Scenario time={runtime} speed={carSpeed} distance={distance} track={track} carPosition={carPos} />
        <Car time={runtime} position={carPos} color={carColorPreset[carColor]} turbo={turbo} />

      {distance > track.total_distance ? <FinaleMenu>
        <FinaleMenuText>Parabéns! Você completou o percurso no tempo de <Enfase>{ReturnTimer()}</Enfase></FinaleMenuText>
        <StyledButton onClick={resetGame}>Jogar novamente</StyledButton>
      </FinaleMenu> : ''}
    </div>
  );
};

export default App;