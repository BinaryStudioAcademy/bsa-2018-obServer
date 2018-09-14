import { css } from 'styled-components';

const sizes = {
	dashboard: 1450 as number,
	desktop: 850 as number,
	tablet: 768 as number,
	phone: 376 as number
};

export const media = Object.keys(sizes).reduce(
	(accumulator, label) => {
		const emSize = sizes[label] / 16;
		accumulator[label] = (...args) => css`
			@media (max-width: ${emSize}em) {
				${css.call(this, ...args)};
			}
		`;
		return accumulator;
	},
	{
		dashboard: undefined as any,
		desktop: undefined as any,
		tablet: undefined as any,
		phone: undefined as any
	}
);

export const colors = {
	violet: 'rgba(127, 120, 206, 1)',
	blue: 'rgba(124, 184, 252, 1)',
	gradient:
		'linear-gradient(to right, rgba(127, 120, 206, 1), rgba(124, 184, 252, 1))',
	'gradient-reverse':
		'linear-gradient(to right, rgba(124, 184, 252, 1), rgba(127, 120, 206, 1))',
	'grey-darken': 'rgb(29,31,39)',
	grey: '#3d3d3d',
	'grey-lighten': '#bebec5'
};
