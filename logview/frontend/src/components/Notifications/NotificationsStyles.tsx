import styled from "styled-components";
import transition from 'styled-transition-group';
import { colors } from "../../styles/styles-utils";

export const NotificationPopup = transition.div`
    position: absolute;
    background: #3d3d3d;
    color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    left: 50px;
    top: 0;
    min-width: 300px;
    min-height: 400px;
	z-index: 2;

    &:enter {
        opacity: 0.01;
        transform: translateY(-50%);
    }
    &:enter-active {
        opacity: 1;
        transform: translateY(0%);
        transition: all 200ms ease-out;
    }
    &:exit {
        transform: translateY(0%);
        opacity: 1;
    }
    &:exit-active {
        opacity: 0;
        transform: translateY(-50%);
        transition: all 200ms ease-out;
    }
`;

export const Wrapper = styled.span`
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