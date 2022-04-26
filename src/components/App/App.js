import React, { useEffect } from 'react';
import { ColorCard } from '../ColorCard/ColorCard';
import { timeout } from '../utils/util';

import './../../styles/normalize.css';
import '../../styles/app.css';

export const App = () => {
	const [hidden, setHidden] = React.useState(undefined);
	const [isOn, setIsOn] = React.useState(false);
	const [flash, setFlash] = React.useState(undefined);
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

	React.useEffect(() => {
		if (isOn && play.isDisplay) {
			let newColor = colorList[Math.floor(Math.random() * 4)];
			//	console.log(newColor)

			const copyColors = [...play.colors];
			copyColors.push(newColor);
			setPlay({ ...play, colors: copyColors });
		}
	}, [isOn, play.isDisplay]);

	React.useEffect(() => {
		if (isOn && play.isDisplay && play.colors.length) {
			displayColors();
		}
	}, [isOn, play.isDisplay, play.colors.length]);

	/*
	const onClick = (color) => {
		console.log(`clicked on ${color} button...`);
	};
*/

	async function displayColors() {
		await timeout(1000);
		for (let i = 0; i < play.colors.length; i++) {
			setFlashColor(play.colors[i]);
			//setFlashColor(true);
			await timeout(1000);
		//	setFlashColor('');
		//	await timeout(1000);
		}
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
					{colorList &&
						colorList.map((color, flashColor) => <ColorCard flash={flashColor} color={color}></ColorCard>)}
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
