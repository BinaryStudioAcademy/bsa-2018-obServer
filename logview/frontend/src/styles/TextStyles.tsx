import styled from 'styled-components';

export const Title = styled.h2`
	font-family: 'Libre Baskerville', serif;
`;

export const RedirectLink = styled.p`
	margin: 0px;

	a {
		text-decoration: none;
		color: rgba(127, 120, 206, 1);
		font-size: 16px;
	}
`;

export const LogoText = styled.h3`
	text-align: center;
	position: absolute;
	left: 58%;
	top: 45%;
	transform: translate(-50%, -50%);
	background: 0;
	width: 200px;
	outline: 0;
	border: 0;
	margin: 20px 0;
	padding-bottom: 10px;
	font-size: 46px;
	font-weight: bold;
	color: rgba(255, 255, 255, 0.8);
`;
