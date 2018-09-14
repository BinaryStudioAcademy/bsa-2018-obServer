import styled, { StyledFunction } from 'styled-components';
import { Submit } from '../../styles/Styles';
import { colors } from '../../styles/styles-utils';

export const Title = styled.h2`
	font-family: 'Merriweather', serif;
	font-size: 200px;
	text-align: center;
	margin: 20px;
	color: ${colors['grey-darken']};
`;

export const SubTitle = styled.h2`
	font-family: 'Merriweather', serif;
	text-align: center;
	color: ${colors['grey-lighten']};
	font-family: 'Muli', sans-serif;
`;

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	height: 100vh;
`;

export const Block = Wrapper.extend`
	flex-wrap: wrap;
	flex-direction: column;
`;

export const Logo = styled.img`
	width: 500px;
	height: 500px;
`;

export const Button = Submit.extend`
	background: ${colors['grey-darken']};
	margin: 0;
`;
