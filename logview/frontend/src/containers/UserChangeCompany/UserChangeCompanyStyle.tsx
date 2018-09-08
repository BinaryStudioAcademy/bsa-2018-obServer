import styled, { StyledFunction } from 'styled-components';
import { Submit } from 'src/styles/Styles';
import { colors } from '../../styles/styles-utils';
import { Landing as CompanyChangeLanding } from '../../styles/ContainerStyles';
const logo = require('src/assets/invite.png');

export const Button = Submit.extend`
	background: ${colors['grey-darken']};
	margin: 0;
`;

export const Logo = styled.img`
	width: 30%;
	height: 30%;
`;

export const Title = styled.h2`
	font-family: 'Merriweather', serif;
	font-size: 40px;
	text-align: center;
	margin: 20px;
	color: ${colors['grey-darken']};
`;

export const Landing = CompanyChangeLanding.extend`
	flex-direction: column;
`;
