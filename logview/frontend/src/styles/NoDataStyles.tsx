import styled from 'styled-components';
import { colors } from './styles-utils';

export const NoDataButton = styled.button`
	padding: 12px 20px;
	margin: auto;
	background-color: ${colors.violet};
	color: #fff;
	text-transform: uppercase;
	border: none;
	font-size: 18px;
	svg {
		margin-right: 15px;
    }
    &: hover {
		background-color: ${colors['grey-darken']};
    }
}`;

export const NoDataTitle = styled.h3`
    font-family: 'Merriweather', serif;
    text-align: center;
}`;

export const NoDataWrapper = styled.div`
	text-align: center;
	margin: auto;
	margin-top: 10%;
	max-width: 900px;
	border-radius: 20px;
	padding: 15px 10px;
	background: ${colors.blue};
`;
