import styled from 'styled-components';
import {
	Wrapper,
	Form,
	Title,
	Row,
	Input,
	RedirectLink,
	Submit,
	ErrorText
} from 'src/styles/Styles';

export const RedirectRegister = RedirectLink.extend`
	display: inherit;
	margin: 0 5px;
`;

export const Redirect = styled.div`
	width: 50%;
	display: flex;
`;

export { Wrapper, Form, Title, Row, Input, RedirectLink, Submit, ErrorText };
