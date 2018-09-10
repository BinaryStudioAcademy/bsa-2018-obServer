import styled, { StyledFunction } from 'styled-components';
import transition from 'styled-transition-group';
import { Notifications } from 'styled-icons/material';
import { Circle } from 'styled-icons/fa-solid';

export const NotificationActive = Circle.extend`
	position: absolute;
	right: 10px;
	top: 0px;
	color: red;
`;

export const NotificationIcon = Notifications.extend`
	padding: 3px;
	margin: 0 10px;
	border-radius: 7px;
	color: #a0a0a0;

	&:hover {
		color: #3d3d3d;
	}
`;

export const NotificationPopup = transition.div`
    position: absolute;
    background: #3d3d3d;
    color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    left: -89px;
    top: 50px;
    min-width: 300px;
    min-height: 400px;
	z-index: 2;

    &:enter {
        opacity: 0.01;
        transform: translateX(50%);
    }
    &:enter-active {
        opacity: 1;
        transform: translateX(0%);
        transition: all 300ms cubic-bezier(.04,.64,.44,1);
    }
    &:exit {
        transform: translateX(0%);
        opacity: 1;
    }
    &:exit-active {
        opacity: 0;
        transform: translateX(50%);
        transition: all 300ms cubic-bezier(.04,.64,.44,1);
    }
`;

export const Wrapper = styled.span`
	display: flex;
	align-items: center;
	position: relative;
`;

export const Timestamp = styled.p`
	border-right: 1px solid white;
	padding: 10px;
`;

export const Message = styled.p`
	padding: 10px;
`;

export const Item = styled.div`
	display: grid;
	grid-template-columns: 100px 1fr;
	font-size: 14px;
	font-weight: normal;
	margin: 10px 10px 0 10px;
`;
