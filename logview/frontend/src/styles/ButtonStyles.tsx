import styled from 'styled-components';

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

export const LinkButton = Submit.extend`
	padding: 0;
	margin: 10px;
	a {
		height: 36px;
		width: 140px;
	}

	a:hover {
		background: linear-gradient(
			45deg,
			rgba(124, 184, 252, 1),
			rgba(127, 120, 206, 1)
		);
		border-radius: 15px;
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
		padding: 10px 67px;
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
