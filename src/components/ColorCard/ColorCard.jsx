import React from 'react';
import classNames from 'classnames/bind';

import styles from './ColorCard.module.css';

const cx = classNames.bind(styles);

export const ColorCard = (color, onClick, flash) => {
	return (
		<div
			onClick={onClick}
			className={cx('colorCard', 'color',
				'flash' ? 'flash' : '')}
		></div>
	);
};
