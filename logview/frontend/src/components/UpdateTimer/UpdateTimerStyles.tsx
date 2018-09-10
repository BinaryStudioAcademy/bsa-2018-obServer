import { colors } from '../../styles/styles-utils';
import { UserPopup } from '../../styles/ContainerStyles';
import { UserText, CommentText } from '../../styles/TextStyles';
import styled, { StyledFunction } from 'styled-components';

export const Select = UserPopup.extend`
	width: 160px;
	padding: 0;
    height: fit-content;
	cursor: default;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: ${(props: any) => (props.popup ? '1px solid transparent' : '1px solid grey')};
    

    &:hover {
        border-bottom-left-radius: ${(props: any) => (props.popup ? '0px' : '5px')};
        border-bottom-right-radius: ${(props: any) => (props.popup ? '0px' : '5px')};
        border-bottom: 1px solid transparent;
    }
`;

export const OptionActive = UserText.extend`
	margin: 0;
	border: none;
	padding: 12px 0;
    color: ${(props: any) => (props.popup ? 'white' : 'grey')};
	cursor: pointer;
`;

const option: StyledFunction<React.HTMLProps<HTMLElement>> = CommentText.extend;

export const Option = option`
	border-bottom: none;
	border-top: 1px solid;

	&:hover {
		border-bottom: none;
		border-top: 1px solid transparent;
		border-radius: 5px;
		background: ${colors.violet};
		color: white;
	}
`;

export const Dropdown = UserPopup.extend`
	position: absolute;
	border-top-left-radius: 0px;
	border-top-right-radius: 0px;
	width: 120px;
    z-index: 10;
`;
