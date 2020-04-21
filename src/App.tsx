import React from 'react';
import './css/main.css';
import './App.css';
import styled from 'styled-components';

const App: React.FC = () => {
  const [track] = React.useState(() => {
    const a = [];
    for (let i = 0; i < 20; i++) {
      a.push(i);
    }
    return a;
  });
  const [carPos, setCarPos] = React.useState(2); 


  const keyHandler = (event: any) => {
    console.log(event.keyCode);
    switch(event.keyCode) {
      case 65:
        if(carPos !== 1) setCarPos(1);
        break;
      case 83:
        if(carPos !== 2) setCarPos(2);
        break;
      case 68:
        if(carPos !== 3) setCarPos(3);
        break;      
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
    }
  }, [keyHandler])
  const a = 'left: ${carPos * 20}vw;';

  const Car = styled.div`
    background-color: red;
    width: 120px;
    height: 120px;
    position: absolute;
    bottom: 0;
    transition: 200ms;
    z-index: 1;
  `;


  return (
    <div className="App">
      <div>
        Ok then, lets start this game :D
     </div>
      <div>
        <div className={`moving-grid`} style={{
          animation: 'right-turn-grid 5s infinite linear'
        }}>
        </div>
        <Car className={`${['move-left', 'move-middle', 'move-right'][carPos]}`}></Car>
      </div>

      <div>
        {/* <div style={{
         transform: 'rotateX(60deg)'
       }}>
         <div style={{
           transform: 'translateY(100px)'
         }}>
         {
           track.map((e: number, i: number) => <div style={{
             backgroundColor: i%2 === 0 ? '#000000aa' : 'white',
             height: '10px'
           }} />)
         }
         </div>
       </div> */}
      </div>
    </div>
  );
}

export default App;
