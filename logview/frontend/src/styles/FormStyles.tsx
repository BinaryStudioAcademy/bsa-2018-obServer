import styled from 'styled-components';
import { media } from './styles-utils';

export const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 60%;
	flex: 1;
	font-size: 18px;
	font-family: 'Muli', sans-serif;
	${media.tablet`
		height: 100vh;
	`};
`;
