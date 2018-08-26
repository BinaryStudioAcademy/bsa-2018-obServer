import styled from 'styled-components';
import transition from 'styled-transition-group';
import {
	Submit,
	CenteredContainer,
	Title,
	Input,
	RedirectLink,
	Row
} from 'src/styles/Styles';

export const AnimatedComponent = transition.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 350px;
    text-align: center;
    font-size: 18px;

    &:enter {

    }

    &:enter-active {

    }

    &:exit {

    }

    &:exit-active {

    }
`;

export { Submit, CenteredContainer, Title, Input, RedirectLink, Row };
