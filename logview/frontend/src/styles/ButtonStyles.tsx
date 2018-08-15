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
`;

export const LinkButton = Submit.extend`
	padding: 0;
	margin: 10px;
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: white;
		font-size: 16px;
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

export const CheckboxLabel = styled.label`
	position: relative;
	display: inline-block;
	width: 40px;
	height: 20px;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;
	transform: translate3d(0, 0, 0);

	&:before {
		content: '';
		position: relative;
		top: 3px;
		left: 3px;
		width: 34px;
		height: 14px;
		display: block;
		background: #80cbc4;
		border-radius: 8px;
		transition: background 0.2s ease;
	}
`;

export const CheckboxSpan = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	width: 20px;
	height: 20px;
	display: block;
	background: white;
	border-radius: 10px;
	box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
	transition: all 0.2s ease;

	&:before {
		content: '';
		position: absolute;
		display: block;
		margin: -18px;
		width: 56px;
		height: 56px;
		background: rgba(0, 150, 136, 0.5);
		border-radius: 50%;
		transform: scale(0);
		opacity: 1;
		pointer-events: none;
	}
`;

export const CheckboxInput = styled.input``;
