import React from 'react';
import classNames from 'classnames/bind';

import styles from './ColorCard.module.css';

const cx = classNames.bind(styles);

export const ColorCard = ({ color, flash, onClick }) => (
	<div
		onClick={onClick}
		className={cx(color, flash, 'colorCard')}
	/>
);
