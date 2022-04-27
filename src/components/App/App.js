import React, { useEffect } from 'react';
import { ColorCard } from '../ColorCard/ColorCard';
import { timeout } from '../utils/util';
import sound from '../../../public/audio/red.mp3';

import './../../styles/normalize.css';
import '../../styles/app.css';

const playTestAudio = () => {
	new Audio(sound).play();
};

export const App = () => {
	const [hidden, setHidden] = React.useState(undefined);
	const [isOn, setIsOn] = React.useState(false);
	const [score, setScore] = React.useState(0);
	const [audio, setAudio] = React.useState(undefined);

	const colorList = ['green', 'red', 'yellow', 'blue'];

	const initPlay = {
		isDisplay: false,
		colors: [],
		score: 0,
		userPlay: false,
		userColors: [],
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

	async function displayColors() {
		await timeout(800);
		for (let i = 0; i < play.colors.length; i++) {
			setFlashColor(play.colors[i]);

			/*
			setAudio(new Audio(`../../../public/audio/${play.colors[i]}.mp3`));
			audio.play()
*/

			await timeout(800);
			setFlashColor('');
			await timeout(800);

			if (i === play.colors.length - 1) {
				const copyColors = [...play.colors];

				setPlay({
					...play,
					isDisplay: false,
					userPlay: true,
					userColors: copyColors.reverse(),
				});
			}
		}
	}

	async function cardClickHandle(color) {
		if (!play.isDisplay && play.userPlay) {
			const copyUserColors = [...play.userColors];
			const lastColor = copyUserColors.pop();

			if (color === lastColor) {
				if (copyUserColors.length) {
					setPlay({ ...play, userColors: copyUserColors });
				} else {
					await timeout(800);
					setPlay({
						...play,
						isDisplay: true,
						userPlay: false,
						score: play.colors.length,
						userColors: [],
					});
				}
			} else {
				await timeout(800);
				setPlay({ ...initPlay, score: play.colors.length });
			}
			await timeout(800);
			setFlashColor('');
		}
	}

	function closeHandle() {
		setIsOn(false);
	}

	const sound = new Audio(`../../../public/audio/red.mp3`);

	const start = () => {
		audio.play();
	};

	return (
		<>
			<section hidden={hidden} className="intro">
				<h1 onClick={playTestAudio} className="title">
					SIMON
				</h1>
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
						colorList.map((color) => (
							<ColorCard
								onClick={() => {
									cardClickHandle(color);
								}}
								flash={flashColor === color}
								color={color}
							></ColorCard>
						))}
				</div>

				{isOn && !play.isDisplay && !play.userPlay && play.score && (
					<div className="lost">
						<div>FinalScore: {play.score}</div>
						<button onClick={closeHandle}>Start Again</button>
					</div>
				)}
				{!isOn && !play.score && (
					<button onClick={startHandle} className="startButton">
						Start
					</button>
				)}
				{isOn && (play.isDisplay || play.userPlay) && (
					<div className="score">{play.score}</div>
				)}
			</section>
			<section className="scoreBoard"></section>
		</>
	);
};
