import styled from 'styled-components';
const background = require('src/assets/login-background.jpg');

export const Wrapper = styled.div`
	display: flex;
	background-color: white;
`;

export const Row = Wrapper.extend`
	background-color: transparent;
`;

export const Background = styled.div`
	background-image: url(${background});
	background-attachment: fixed;
	background-repeat: no-repeat;
	height: 100vh;
	width: 100%;
	background-size: cover;
`;

export const BackgroundContainer = Background.extend`
	width: 56%;
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

export const RegisterBox = Box.extend`
	left: calc(28% - 150px);
	top: calc(50% - 150px);
`;

export const PasswordResetContainer = styled.div`
	position: relative;
	width: 350px;
	height: 450px;
	top: calc(50% - 250px);
	left: calc(50% - 175px);
	background: inherit;
	border-radius: 8px;
	overflow: hidden;

	&:before {
		content: '';
		width: 400px;
		height: 500px;
		background: inherit;
		position: absolute;
		left: -25px;
		right: 0;
		top: -25px;
		bottom: 0;
		box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.4);
		filter: blur(8px);
	}
`;

export const LogoContainer = styled.div`
	display: flex;
`;

export const RedirectContainer = styled.div`
	margin-top: 20px;
`;

export const CenteredContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	position: relative;
`;

export const PasswordWrapper = CenteredContainer.extend`
	margin: 20px;
	height: 400px;
`;

export const EmailContainer = CenteredContainer.extend`
	justify-content: flex-start;
`;
