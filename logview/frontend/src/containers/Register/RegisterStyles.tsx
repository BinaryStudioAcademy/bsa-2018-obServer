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
	display: flex;
	justify-content: flex-end;
	align-items: baseline;
	width: 94%;
	margin: 10px 0;
`;

 export const SubmitButton = Submit.extend`
	margin-top: 25px;
`;

export {
	Wrapper,
	Form,
	Title,
	Row,
	Input,
	RedirectLink,
	SubmitButton as Submit,
	ErrorText
};