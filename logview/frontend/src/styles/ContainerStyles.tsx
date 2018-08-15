import styled from 'styled-components';
const background = require('src/assets/login-background.jpg');

export const Wrapper = styled.div`
	display: flex;
`;

export const Row = styled.div`
	display: flex;
`;

export const Background = styled.div`
	background-image: url(${background});
	background-attachment: fixed;
	background-repeat: no-repeat;
	height: 100vh;
	width: 100%;
	background-size: cover;
`;

export const BackgroundContainer = styled.div`
	background-image: url(${background});
	background-attachment: fixed;
	background-repeat: no-repeat;
	height: 100vh;
	width: 56%;
	background-size: cover;
`;

export const Box = styled.div`
	width: 300px;
	height: 300px;
	background: inherit;
	position: absolute;
	overflow: hidden;
	left: calc(100% - 26% - 150px);
	top: calc(50% - 150px);
	border-radius: 8px;

	&:before {
		width: 400px;
		height: 550px;
		content: '';
		position: absolute;
		top: -25px;
		left: -25px;
		bottom: 0;
		right: 0;
		background: inherit;
		box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.2);
		filter: blur(8px);
	}
`;

export const RegisterContainer = styled.div`
	background-image: url(${background});
	background-attachment: fixed;
	background-repeat: no-repeat;
	height: 100vh;
	width: 56%;
	background-size: cover;
`;

export const RegisterBox = styled.div`
	width: 300px;
	height: 300px;
	background: inherit;
	position: absolute;
	overflow: hidden;
	left: 15%;
	top: calc(50% - 150px);
	border-radius: 8px;

	&:before {
		width: 400px;
		height: 550px;
		content: '';
		position: absolute;
		top: -25px;
		left: -25px;
		bottom: 0;
		right: 0;
		background: inherit;
		box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.2);
		filter: blur(8px);
	}
`;

export const PasswordResetContainer = styled.div`
	width: 400px;
	position: absolute;
	left: calc(100% - 200px);
`

export const LogoContainer = styled.div`
	display: flex;
`;

export const RedirectContainer = styled.div`
	margin-top: 20px;
`;
