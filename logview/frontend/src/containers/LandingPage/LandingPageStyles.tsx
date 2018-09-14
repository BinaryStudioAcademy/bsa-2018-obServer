import styled, { StyledFunction } from 'styled-components';
import { colors } from '../../styles/styles-utils';
import { Submit, RedirectLink } from '../../styles/Styles';
import { Binoculars } from 'styled-icons/fa-solid';
import { Github as GitHubIcon } from 'styled-icons/fa-brands/Github';
import { ArrowAltCircleDown } from 'styled-icons/fa-solid';

export const Background = styled.div`
	height: 100vh;
	color: #fff;
	background: linear-gradient(
		-45deg,
		${colors.blue},
		#9aa8b1,
		#afafaf,
		${colors.violet}
	);
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
	padding-top: 200px;
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

export const LandingInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
	max-width: 80%;
`;

export const InfoBlock = styled.div`
	margin-top: 2.25rem;
	margin-bottom: 2.25rem;
	display: flex;
	margin-right: -15px;
	margin-left: -15px;
	justify-content: center;
	align-items: center;
`;

export const InfoDescription = styled.div`
	max-width: 50%;
	position: relative;
	width: 100%;
	min-height: 1px;
	padding-right: 15px;
	padding-left: 15px;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	margin-left: 55px;
`;

export const TitleSmall = Title.extend`
	font-size: 48px;
`;

export const InfoTitle = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 0.75rem;
	font-family: inherit;
	font-weight: 600;
	line-height: 1.2;
	color: inherit;
`;

export const InfoImage = styled.img`
	width: 100%;
	height: auto;
	vertical-align: middle;
`;

export const InfoImageContainer = styled.div`
	max-width: 50%;
`;

export const Footer = styled.div`
	min-height: 120px;
	background: #3d3d3d;
	color: #afafaf;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const FooterTitle = styled.div`
	margin-top: 10px;
`;

export const FooterLinkText = styled.span`
	margin-left: 10px;
`;

export const FooterLink = RedirectLink.extend`
	margin-top: 10px;
`;

export const GetStartedBar = styled.div`
	margin-top: 200px;
	background: #afafaf;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	padding: 40px 0;

	div {
		margin: 0;
	}

	p {
		margin-top: 0;
	}
`;

export const GitHub = GitHubIcon.extend`
	color: ${colors.violet};
`;

export const ArrowDown = ArrowAltCircleDown.extend`
	margin-top: 200px;
	color: #3d3d3d;
	transition-duration: 0.3s;

	&:hover {
		color: white;
	}
`;
