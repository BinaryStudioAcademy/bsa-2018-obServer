import styled, { StyledFunction } from 'styled-components';
import { Submit } from 'src/styles/Styles';
import { colors } from '../../styles/styles-utils';

export const Button = Submit.extend`
	background: ${colors['grey-darken']};
`;

export const Logo = styled.img`
	width: 500px;
	height: 500px;
`;

export const Title = styled.h2`
	font-family: 'Merriweather', serif;
	font-size: 200px;
	text-align: center;
	margin: 20px;
	color: ${colors['grey-darken']};
`;
