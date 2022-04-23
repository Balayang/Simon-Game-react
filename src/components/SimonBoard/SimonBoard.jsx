import React from 'react';

import styles from './SimonBoard.module.css';

let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let win;

export const SimonBoard = (mode) => {
	const [count, setCount] = React.useState(0);

	const play = () => {
		//reset variables
		win = false;
		order = [];
		playerOrder = [];
		flash = 0;
		intervalId = 0;
		turn = 1;
		setCount(1);
		good = true;

		//fill play order by generating random play quadrant
		for (var i = 0; i < 20; i++) {
			order.push(Math.floor(Math.random() * 4) + 1);
		}
		console.log(order);
	};

	return (
		<section className={styles.container}>
			<section className={styles.gameBoard}>
				<div className={`${styles.box} ${styles.yellow}`}></div>
				<div className={`${styles.box} ${styles.red}`}></div>
				<div className={`${styles.box} ${styles.blue}`}></div>
				<div className={`${styles.box} ${styles.green}`}></div>
			</section>
			<section className={styles.scoreBoard}>
				<p 	onClick={() => play()}
				className={styles.quit}>Quit</p>
				<p className={styles.scoreCount}>Count: {count}</p>
			</section>
		</section>
	);
};
