import { css } from 'styled-components';

const sizes = {
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
		desktop: undefined as any,
		tablet: undefined as any,
		phone: undefined as any
	}
);
