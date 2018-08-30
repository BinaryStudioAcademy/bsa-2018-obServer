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
	display: flex;
	align-items: center;
	a {
		text-decoration: none;
		color: rgba(127, 120, 206, 1);
		color: ${colors.violet};
		font-size: 16px;
	}
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
		padding: 12px 0;
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
`;
