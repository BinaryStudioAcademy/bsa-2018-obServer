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
	width: 51%;
	display: flex;
`;

export const RowStyle = Row.extend`

`;

 export { Wrapper, Form, Title, RowStyle as Row, Input, RedirectLink, Submit, ErrorText };