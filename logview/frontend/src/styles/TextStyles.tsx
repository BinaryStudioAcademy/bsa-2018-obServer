import styled, { StyledFunction } from 'styled-components';
import { colors } from './styles-utils';

export const Title = styled.h2`
	font-family: 'Merriweather', serif;
	text-align: center;
`;

export const CenteredText = styled.p`
	text-align: center;
	width: 80%;
	margin: 10px;
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

export const ErrorText = styled.span`
	color: #cc0000;
	font-size: 12px;
`;

export const CommentText = styled.p`
	display: block;
	color: #bebec5;
	border-bottom: 1px solid;
	margin: 0;
	transition-duration: 0.2s;
	width: 100%;
	a,
	span {
		display: inline-block;
		text-decoration: none;
		color: #bebec5;
		padding-bottom: 12px;
		padding-top: 12px;
		height: 100%;
		width: 100%;
	}

	&:hover {
		border-bottom: 1px solid transparent;
		border-radius: 5px;
		background: ${colors.violet};
		a,
		span {
			color: white;
		}
	}
`;
interface UserText {
	popup: boolean;
}

const p: StyledFunction<UserText & React.HTMLProps<HTMLInputElement>> =
	styled.p;

export const UserText = styled.p`
	transition-duration: 0.3s;
	border-bottom: 1px solid;
	padding-bottom: 12px;
	/* width: 100%; */
`;
