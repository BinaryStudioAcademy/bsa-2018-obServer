import styled, { css } from 'styled-components';
import { media } from './styles-utils';
const background = require('src/assets/login-background.jpg');
const backgroundmedium = require('src/assets/background-medium.png');

export const Wrapper = styled.div`
	display: flex;
	background-color: white;
`;

export const Row = Wrapper.extend`
	display: flex;
	margin-top: 5%;
	background-color: transparent;
`;

export const Background = styled.div`
	background-image: url(${background});
	background-attachment: fixed;
	background-repeat: no-repeat;
	height: 100vh;
	width: 100%;
	background-size: cover;
	${media.tablet`
		/* background-image: url(${backgroundmedium}); */
		/* background: inherit; */
	`} ${media.phone`
		/* background-image: url(${backgroundmedium}); */
		background: inherit;
	`};
`;

export const BackgroundContainer = Background.extend`
	width: 56%;
	${media.tablet`display:none`};
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
	${media.phone`
		width: 80%;
		left: 10%;
	`} height: 450px;
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
		${media.phone`width: 350px`};
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
	justify-content: space-between;
	height: 90%;
	/* margin: 20px; */
	/* height: 400px; */
	/* width: 100wh;
	height: 90vh;
	color: #fff;
	background: linear-gradient(-45deg, 
		rgba(238, 119, 82, 0.5),
		rgba(231, 60, 126, 0.5), 
		rgba(35, 166, 213, 0.5), 
		rgba(35, 213, 171, 0.5));
	background-size: 400% 400%;
	-webkit-animation: Gradient 8s ease infinite;
	-moz-animation: Gradient 8s ease infinite;
	animation: Gradient 8s ease infinite;

	@keyframes Gradient {
		0% {
			background-position: 0% 50%
		}
		25% {
			background-position: 100% 50%
		}
		50% {
			background-position: 100% 100%
		}
		75% {
			background-position: 50% 100%			
		}
		100% {
			background-position: 0% 50%
		}
	}*/
`;

export const EmailContainer = CenteredContainer.extend`
	justify-content: flex-start;
`;
