import styled from 'styled-components';
import { colors } from './styles-utils';

export const Title = styled.h2`
	font-family: 'Merriweather', serif;
	text-align: center;
	margin: 0;
`;

export const RedirectLink = styled.p`
	margin: 0px;
	display: flex;
	align-items: center;

	a {
		text-decoration: none;
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
