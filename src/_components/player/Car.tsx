import React from 'react';
import styled from 'styled-components';
import '../../css/car.css';

const CarContainer = styled.div`
	position: absolute;
	z-index: 3;
	transition: 250ms;
`;
const CarBody = styled.div`
	width: 300px;
	height: 75px;
	border-bottom-right-radius: 33%;
	border-bottom-left-radius: 33%;
	z-index: 3;
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
	bottom: 15px;
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
`;

const GridInner = styled.div`
	width: 100%;
	height: 100%;
`;

const CarBackWindow = styled.div`
	width: 160px;
	height: 40px;
	background-color: hsl(233, 17%, 5%);
	position: absolute;
	top: 5px;
	left: 70px;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
`;

const CarBackWindowSide = styled.div`
	border-right: 40px solid  hsl(233, 17%, 5%);
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
`;

const Placa = styled.div`
	position: absolute;
	left: 115px;
	bottom: 50px;
`;
const PlacaInner = styled.div`
	width: 60px;
	border: 4px solid black;
	border-radius: 4px;
	background-color: #eeeeee;
	heght: 15px;
	text-align: center;
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
	turbo: boolean;
}

const Car: React.FC<ICar> = ({ time, position, color, turbo }) => {
	return (
		<CarContainer
			style={{
				transform: `scale(${window.innerWidth < 900 ? 0.5 : 1})`,
				left: `calc(${position === 2 ? 50 : position > 2 ? 85 : 15}vw - 150px)`,
				bottom: `25px`,
			}}
		>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: '' }}>
				<div style={{ position: 'relative' }}>
					<CarTopSide style={{ left: '1px', borderRight: `50px solid ${color}` }} />
				</div>
				<CarTopBody style={{ backgroundColor: color }}>
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
							borderRight: `50px solid ${color}`,
						}}
					/>
				</div>
			</div>

			<CarBody style={{ backgroundColor: color }}>
				<GridContainer style={{ backgroundColor: `#aaaaaaff` }}>
					<CarBackGrid style={{

backgroundImage: `repeating-linear-gradient(90deg, black 2px, ${turbo ? 'white' : '#00000066'} 4px, ${turbo ? 'white' : '#00000033'} 15px, ${turbo ? 'white' : '#00000066'} 4px),
repeating-linear-gradient(180deg, black 1px, ${turbo ? 'white' : '#00000066'} 3px, ${turbo ? 'white' : '#00000033'} 10px, ${turbo ? 'white' : '#00000066'} 2px, black 1px)`
					}}>
						<GridInner
							style={{
								backgroundColor: `#eeaacc22`,
							}}
						/>
					</CarBackGrid>
				</GridContainer>
				<CarLightContainer style={{ left: '15px' }}>
					<CarLight
						style={{ borderTopLeftRadius: '70%', borderTopRightRadius: '10%', backgroundColor: 'darkred' }}
					/>
					<CarLight
						style={{
							backgroundImage: `linear-gradient(to top, ${turbo ? 'hsl(344, 100%, 34%)' : 'hsl(344, 60%, 24%)'}, ${turbo ? 'hsl(344, 100%, 54%)' : 'hsl(344, 70%, 34%)'})`,
						}}
					/>
				</CarLightContainer>
				<CarLightContainer style={{ transform: 'scale(-1, 1)', right: '15px' }}>
					<CarLight
						style={{ borderTopLeftRadius: '70%', borderTopRightRadius: '10%', backgroundColor: 'darkred' }}
					/>
					<CarLight
						style={{
							backgroundImage: `linear-gradient(to top, ${turbo ? 'hsl(344, 100%, 34%)' : 'hsl(344, 60%, 24%)'}, ${turbo ? 'hsl(344, 100%, 54%)' : 'hsl(344, 70%, 34%)'})`,
						}}
					/>
				</CarLightContainer>

				<Placa>
					<PlacaInner>UPCAR</PlacaInner>
				</Placa>

				<HoverModule style={{ left: '10px', transform: 'rotateZ(20deg)' }}>
					<HoverEffect
						style={{
							backgroundImage: `linear-gradient(to bottom, ${turbo ? 'hsl(198, 100%, 69%)' : 'hsl(344, 70%, 34%)'}, hsl(191, 100%, 89%, ${time %
								10 /
								100}))`,
						}}
					/>
				</HoverModule>
				<HoverModule style={{ right: '10px', transform: 'rotateZ(-20deg)' }}>
					<HoverEffect
						style={{
							backgroundImage: `linear-gradient(to bottom, ${turbo ? 'hsl(198, 100%, 69%)' : 'hsl(344, 70%, 34%)'}, hsl(191, 100%, 89%, ${time %
								10 /
								100})`,
						}}
					/>
				</HoverModule>
			</CarBody>
		</CarContainer>
	);
};

export default Car;
