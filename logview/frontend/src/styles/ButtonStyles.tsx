import styled from 'styled-components';
import { media } from './styles-utils';

export const Submit = styled.button`
	display: block;
	background: linear-gradient(
		45deg,
		rgba(127, 120, 206, 1) 0%,
		rgba(124, 184, 252, 1) 100%
	);
	border: none;
	outline: none;
	padding: 10px 70px;
	font-size: 16px;
	margin: 20px 0px 10px 0px;
	border-radius: 15px;
	color: white;
	margin-bottom: 8px;
	cursor: pointer;

	a {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: white;
		font-size: 16px;
	}
`;

export const TextLink = styled.p`
	cursor: pointer;
	border-bottom: 3px solid transparent;
	text-align: center;
	transition-duration: 0.3s ease;

	a {
		text-decoration: none;
		color: rgba(127, 120, 206, 1);
		border: 3px solid rgba(127, 120, 206, 1);
		border-image-slice: 1;
		border-radius: 15px;
		transition-duration: 0.3s;
		padding: 6px 63px;
		font-size: 16px;
	}

	a:hover {
		color: white;
		background: linear-gradient(
			to right,
			rgba(124, 184, 252, 1),
			rgba(127, 120, 206, 1)
		);
		padding: 13px 71px;
		border: none;
		transition-duration: 0.3s;
		border-radius: 15px;
	}
`;

export const LinkButton = TextLink.extend`
	padding: 0;
	margin: 5px;
	a {
		padding: 10px 40px;
		${media.phone`padding: 10px 30px`} /* color: rgba(127, 120, 206, 1); */
		color: white;
		/* border-color: rgba(127, 120, 206, 1); */
		border: none;
		background: #4a4a4a;
		/* background: #3d3d3d; */
		padding: 10px 40px;
	}

	a:hover {
		${media.phone`padding: 10px 40px;`};
	}
`;
