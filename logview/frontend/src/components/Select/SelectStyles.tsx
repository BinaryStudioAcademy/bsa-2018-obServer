import { colors } from '../../styles/styles-utils';
import { UserPopup } from '../../styles/ContainerStyles';
import { UserText, CommentText } from '../../styles/TextStyles';
import styled from 'styled-components';

export const Select = UserPopup.extend`
    width: 20%;
    position: relative;
    padding: 0;
    cursor: default;

    border-bottom-left-radius: ${ (props:any) => props.popup ? '0px' : '5px'};
    border-bottom-right-radius: ${ (props:any) => props.popup ? '0px' : '5px'};
    border: ${ (props:any) => props.popup ? '1px solid ghostwhite' : '1px solid'};
`;

export const OptionActive = UserText.extend`
    margin: 0;
    border: none;
    padding: 12px 20px;
    cursor: pointer;
`;

export const Option = CommentText.extend`
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
    width: calc(100% - 40px);
`;