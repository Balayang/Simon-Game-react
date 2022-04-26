import React, { useEffect } from 'react';
import { ColorCard } from '../ColorCard/ColorCard';
import { Timeout } from '../utils/util';

//import './../../styles/normalize.css';
import '../../styles/app.css';

export const App = () => {
	const [hidden, setHidden] = React.useState(undefined);
	const [isOn, setIsOn] = React.useState(false);

	const [score, setScore] = React.useState(0);

	const colorList = ['green', 'red', 'yellow', 'blue'];

	const initPlay = {
		isDisplay: false,
		colors: [],
		score: 0,
		userPlay: false,
		userColor: [],
	};

	const [play, setPlay] = React.useState(initPlay);
// nechápu proc se vytváří useState, nemuže se rovnou pracovat s tim polem initPlay??

	const [flashColor, setFlashColor] = React.useState(undefined);

	const startHandle = () => {
		setIsOn(true);
	};

	React.useEffect(() => {
		if (isOn) {
			setPlay({ ...initPlay, isDisplay: true });
		} else {
			setPlay(initPlay);
		}
	}, [isOn]);

	useEffect(() => {
		if (isOn && play.isDisplay) {
			let newColor = colorList[Math.floor(Math.random() * 4)];

			initPlay.colors.push(newColor)
			console.log(initPlay.colors)
			/*
			const copyColors = [...play.colors];
			copyColors.push(newColor);
			setPlay({ ...play, colors: copyColors });
			console.log(`copyColors: ${copyColors}`)

			//proc se to duplikuje do copy colors neda to pushnout bez toho abch mela doplicitni pole??
*/

		}
	}, [(isOn, play.isDisplay)]);

	useEffect(() => {
		if (isOn && play.isDisplay && play.colors.length) {
			displayColors();
		}
	}, [isOn, play.isDisplay, play.colors.length]);

	// jenom placeholder (ve skutecnosti to bude state)
	const flash = false;

	const onClick = (color) => {
		console.log(`clicked on ${color} button...`);
	};

	
	async function displayColors() {

		/*
		for (let i = 0; i < play.colors.length; i++) {
			setFlashColor(play.colors[i]);
			await Timeout(1000);

			//	setFlashColor('');
			//	await Timeout (1000);
		}

		*/
	
	}
	
	return (
		<>
			{/* section je klasicky html tag a ten sam o sobe nema hidden propu */}
			{/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section */}
			<section hidden={hidden} className="intro">
				<h1 className="title">SIMON</h1>
				<h2 className="subtitle">Do what Simon says!</h2>
				<p className="instructions">
					Follow the lights and patterns as long as you can...
				</p>
				<p onClick={() => setHidden(true)} className="btn btnStart">
					Start
				</p>
			</section>
			<section className="container">
				<div className="gameBoard">
					{colorList.map((color,flashColor) => (
						<ColorCard
							color={color}
							flash={flashColor}
							// todle je taky placeholder, takto to prida jedno skore, kdyz kliknes na jednu barvu
							// ten druhy onClick je pro console log barvy na kterou jsi klikla
							onClick={() => setScore((prevScore) => prevScore + 1)}
							// onClick={() => onClick(color)}
						/>
					))}
				</div>
				{!isOn && !play.score && (
					<button onClick={startHandle} className="startButton">
						Press
					</button>
				)}
				{isOn && (play.isDisplay || play.userPlay) && (
					<div className="score">{play.score}</div>
				)}
			</section>
			<section className="scoreBoard">
				{/* todle prijde opravit :D */}
				<button className="btn quit" onClick={() => setHidden(false)}>
					Quit
				</button>
				<p className="scoreCount">Score: {score}</p>
			</section>
		</>
	);
};
