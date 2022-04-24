import React, { useEffect } from 'react';
import { ColorCard } from '../ColorCard/ColorCard';
import classNames from 'classnames/bind';

import './../../styles/normalize.css';
import '../../styles/app.css';




export const App = () => {
	const [hidden, setHidden] = React.useState(undefined);
	const [score, setScore] = React.useState(0);

	return (
		<>
			<section hidden={hidden} className="intro">
				<h1 className="title">SIMON</h1>
				<h2 className="sublititle">Do what Simon says!</h2>
				<p className="instructions">
					Follow the lights and patterns as long as you can...
				</p>
				<p
					onClick={() => {
						setHidden(true);
					}}
					className="btn btnStart"
				>
					Start
				</p>
			</section>
			<section className="container">
				<div className="gameBoard">
					<ColorCard color='green'></ColorCard>
					<ColorCard color="red"></ColorCard>
					<ColorCard color="blue"></ColorCard>
					<ColorCard color="yellow"></ColorCard>
				</div>
				<section className="scoreBoard">
					<p className="quit">Quit</p>
					<p className="scoreCount">Count: {score}</p>
				</section>
			</section>
		</>
	);
};
