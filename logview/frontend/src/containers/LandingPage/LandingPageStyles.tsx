import styled, { StyledFunction } from 'styled-components';
import { colors } from 'src/styles/styles-utils';
import { Submit } from '../../styles/Styles';
import { Binoculars } from 'styled-icons/fa-solid';

export const Background = styled.div`
	width: 100vw;
	height: 60vh;
	color: #fff;
	background: linear-gradient(-45deg, ${colors.blue}, #9aa8b1, #afafaf, ${colors.violet});
	background-size: 400% 400%;
	animation: Gradient 15s ease infinite;
	min-height: 600px;

	@keyframes Gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
`;

export const Title = styled.h1`
	text-align: center;
	top: 18%;
	right: 0;
	font-size: 60px;
	font-weight: bold;
    letter-spacing: 3px;
	margin-bottom: 0;
	color: #3d3d3d;
	left: 0;
`;

export const Slogan = styled.p`
	font-weight: 300;
	text-align: center;
	top: 30%;
	color: #3d3d3d;
	right: 0;
	left: 0;
`;

export const LandingMain = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	padding-top: 100px; 
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;
	width: calc(100vw - 50px);
	margin: 25px;
	z-index: 10;
`;

export const ObserverIcon = Binoculars.extend`
	margin: 4px;
`;

interface ButtonProps {
	primary?: boolean;
}

const button: StyledFunction<ButtonProps & React.HTMLProps<HTMLInputElement>> =
	Submit.extend;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 40px;
`;

export const Button = button`
	cursor: default;
	padding: 0;
	background-image: none;
	margin: 10px;
	border-radius: 5px;
	

	a {
		color: ${(props: { primary?: boolean }) =>
			props.primary ? '#3d3d3d' : 'white'};
		padding: 10px 40px;
		border-radius: 5px;
		cursor: pointer;
		background: ${(props: { primary?: boolean }) =>
			props.primary ? 'transparent' : '#3d3d3d'}
		color: ${(props: { primary?: boolean }) =>
			props.primary ? '#3d3d3d' : 'white'};
		border: ${(props: { primary?: boolean }) =>
			props.primary ? '1px solid #3d3d3d' : '1px solid #3d3d3d'};
	}

	a:hover {
		background: white;
		color: #3d3d3d;
		border-radius: 5px;
		border: 1px solid transparent;
	}

`;

export const LandingPageWrapper = styled.div`
	max-width: 99vw;
	min-height: 600px;
`;

export const ChatsShowcaseRight = styled.div`
	display: grid;
	grid-template-columns: 0.4fr 1fr;
`;

export const ChatsShowcaseLeft = styled.div`
	display: grid;
	grid-template-columns: 1fr 0.4fr;
`;