import { colors } from '../../styles/styles-utils';
import { UserPopup } from '../../styles/ContainerStyles';
import { UserText } from '../../styles/TextStyles';
import styled, { StyledFunction } from 'styled-components';
import { Circle } from 'styled-icons/fa-solid';

export const Select = UserPopup.extend`
	width: 160px;
	padding: 0;
	cursor: default;

	border-bottom-left-radius: ${(props: any) => (props.popup ? '0px' : '5px')};
	border-bottom-right-radius: ${(props: any) =>
		props.popup ? '0px' : '5px'};
	border: ${(props: any) =>
		props.popup ? '1px solid ghostwhite' : '1px solid'};
`;

export const OptionActive = UserText.extend`
	margin: 0;
	border: none;
	padding: 12px 20px;
	cursor: pointer;
`;

const option: StyledFunction<React.HTMLProps<HTMLElement>> = styled.div;

export const Option = option`
    display: block;
    color: #bebec5;
    border-bottom: 1px solid;
	height: 38px;
    margin: 0;
    transition-duration: 0.2s;
    width: 100%;
	position: relative;
	display: flex;
    justify-content: center;
    align-items: center;
    
	border-bottom: none;
	border-top: 1px solid;

	&:hover {
		border-bottom: none;
		border-top: 1px solid transparent;
		border-radius: 5px;
		background: ${colors.violet};
		color: white;
	}

	span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
`;

export const Dropdown = UserPopup.extend`
	position: absolute;
	border-top-left-radius: 0px;
	border-top-right-radius: 0px;
	width: 120px;
	z-index: 10;
`;

interface CircleProps {
	active: boolean;
	size: any;
}

const circle: StyledFunction<CircleProps & React.HTMLProps<HTMLElement>> =
	Circle.extend;

export const ActiveStatusIcon = circle`
    position: absolute;
    left: 25px;
	margin-right: 5px;
	transition-duration: 0.3s;
	color: ${(props: { active: boolean }) =>
		props.active ? '#1db954' : '#bebec5'};
`;

interface SpanProps {
	active: boolean;
}

const span: StyledFunction<SpanProps & React.HTMLProps<HTMLElement>> =
	styled.span;

export const Span = span`

`;
