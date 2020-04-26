import React from 'react';
import styled from 'styled-components';
import '../../css/car.css';


const CarContainer = styled.div`
	position: absolute;
  	z-index: 2;
  	transition: 250ms;
`;
const CarBody = styled.div`
	width: 300px;
	height: 60px;
	border-bottom-right-radius: 20px;
	border-bottom-left-radius: 20px;
	z-index: 2;
`;
const CarTopBody = styled.div`
	width: 200px;
	height: 60px;
	border-top-left-radius: 20%;
	border-top-right-radius: 20%;
	margin-left: 50px;
`;
const CarTopSide = styled.div`
	border-top: 50px solid transparent;
	bottom: 0;
	left: 0;
	position: absolute;
`;

const GridContainer = styled.div`
	width: 260px;
	height: 15px;
	left: 15px;
	position: absolute;
	bottom: 10px;
	border: 5px solid #000000aa;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
`;

const CarBackGrid = styled.div`
	width: 100%;
	height: 100%;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background-image: repeating-linear-gradient(
			90deg,
			black 2px,
			transparent 4px,
			transparent 15px,
			transparent 4px
		),
		repeating-linear-gradient(
			180deg,
			black 1px,
			transparent 3px,
			transparent 10px,
			transparent 2px,
			black 1px
		);
`;

const GridInner = styled.div`
	width: 100%;
	height: 100%;
`;

const CarBackWindow = styled.div`
	width: 160px;
	height: 41px;
	background-color: black;
	position: absolute;
	top: 5px;
  left: 70px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px; 
`;

const CarBackWindowSide = styled.div`
	border-right: 40px solid black;
	border-top: 41px solid transparent;
	position: absolute;
	top: 5px;
	z-index: 2;
`;
const CarLightContainer = styled.div`
    position: absolute;
    height: 20px;
    width: 80px;
`;
const CarLight = styled.div`
      width: 100%;
      height: 50%;
      background-color: red;
`;

const Placa = styled.div`
      position: absolute;
      left: 115px;
      bottom: 40px;

`;
const PlacaInner = styled.div`
      width: 60px;
      border: 4px solid black;
      border-radius: 4px;
      background-color: #eeeeee;
      heght: 15px;
      margin-left: 2px;
      margin-top: 7px;
      font-weight: 700;
      font-size: 14px;
`;
const HoverModule = styled.div`
      width: 80px;
      height: 25px;
      background-color: #666666;
      position: absolute;
	  bottom: -10px;
	  z-index: -1;
`;
const HoverEffect = styled.div`
	width: 70px;
	margin-left: 5px;
	height: 10px;
	position: absolute;
	transition: 100ms;
	bottom: -10px;
	border-bottom-left-radius: 100%;
	border-bottom-right-radius: 100%;
`;


interface ICar {
	time: number;
	position: number;
	color: string;
	finished: boolean;
}

const Car: React.FC<ICar> = ({ time, position, color, finished}) => {	
	return (
		<CarContainer
		 style={{
			transform: `scale(${window.innerWidth < 900 ? 0.5 : 1})`,
			left: `calc(${position === 2 ? 50 : position > 2 ? 85 : 15}vw - 150px)`,
			bottom: `${(window.innerWidth < 900 ? 10 : 50) + time % 20}px`

		}}>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: '' }}>
				<div style={{ position: 'relative' }}>
					<CarTopSide style={{ left: '1px', borderRight: `50px solid ${color}` }} />
				</div>
				<CarTopBody style={{backgroundColor: color}}>
					<CarBackWindowSide style={{ left: '32px' }} />
					<CarBackWindow />
					<CarBackWindowSide
						style={{
							transform: `scale(-1, 1)`,
							right: '32px',
						}}
					/>
				</CarTopBody>
				<div style={{ position: 'relative' }}>
					<CarTopSide
						style={{
							right: '-52px',
							position: 'absolute',
							transform: `scale(-1, 1)`, 
							borderRight: `50px solid ${color}`
						}}
					/>
				</div>
			</div>

			<CarBody style={{backgroundColor: color}}>
				<GridContainer style={{ backgroundColor: `#aaaaaaff` }}>
					<CarBackGrid>
						<GridInner
							style={{
								backgroundColor: `#eeaacc22`,
							}}
						/>
					</CarBackGrid>
				</GridContainer>
				<CarLightContainer style={{ left: '15px' }}>
					<CarLight style={{ borderTopLeftRadius: '70%', borderTopRightRadius: '10%', backgroundColor: 'darkred' }} />
					<CarLight style={{ backgroundImage: `linear-gradient(to right, black, yellow, yellow, black, green, green 74%, black 79%, red 80%, red 95%, black 100%)` }} />
				</CarLightContainer>
				<CarLightContainer style={{ transform: 'scale(-1, 1)', right: '15px' }}>
					<CarLight style={{ borderTopLeftRadius: '70%', borderTopRightRadius: '10%', backgroundColor: 'darkred' }} />
					<CarLight style={{ backgroundImage: `linear-gradient(to right, black, yellow, yellow, black, green, green 74%, black 79%, red 80%, red 95%, black 100%)` }} />
				</CarLightContainer>

				<Placa>
					<PlacaInner>
						UPCAR
              </PlacaInner>
				</Placa>

				<HoverModule style={{ left: '10px', transform: 'rotateZ(20deg)' }}>
					<HoverEffect style={{
						backgroundImage: `linear-gradient(to bottom, hsl(191, 100%, 57%, 0.99), hsl(191, 100%, 89%, ${(time%10)/100}))`
					}} />

				</HoverModule>
				<HoverModule style={{ right: '10px', transform: 'rotateZ(-20deg)' }}>
					<HoverEffect style={{
						backgroundImage: `linear-gradient(to bottom, hsl(191, 100%, 57%, 0.99), hsl(191, 100%, 89%, ${(time%10)/100})` 
					}} />
				</HoverModule>

			</CarBody>
		</CarContainer>
	);
};

export default Car;
