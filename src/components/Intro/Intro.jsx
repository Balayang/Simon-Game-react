import React from 'react';

import styles from './Intro.module.css';

export const Intro = ({play}) => {
	const [hidden, setHidden] = React.useState(undefined);
	const [mode, setMode] = React.useState(undefined);

	return (
		<section hidden={hidden} className={styles.intro}>
			<h1 className={styles.title}>SIMON</h1>
			<h2 className={styles.sublititle}>Do what Simon says!</h2>
			<p className={styles.instructions}>
				Follow the lights and patterns as long as you can...
			</p>
			<div className={styles.mode}>
				<p
					onClick={() => {
						setHidden(true);
						setMode('easy');
						play();
					}}
					className={`${styles.btn} ${styles.btnEasy}`}
				>
					Easy
				</p>
				<p
					onClick={() => {
						setHidden(true);
						setMode('strict');
						play()
					}}
					className={`${styles.btn} ${styles.btnStrict}`}
				>
					Strict
				</p>
			</div>
		</section>
	);
};
