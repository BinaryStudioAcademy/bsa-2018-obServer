import {
	Input as CompanyInput,
	Submit as CompanySubmit,
	ErrorText
} from '../../styles/Styles';
import {
	UserItem as CompanyUserItem,
	CompanyUsers as StyledCompanyUsers
} from '../../styles/ContainerStyles';
import { PlusCircle, XCircle } from 'styled-icons/feather';
import styled from 'styled-components';
import { colors } from '../../styles/styles-utils';

export const Input = CompanyInput.extend`
	width: 30%;
`;

export const Submit = CompanySubmit.extend`
	margin-top: 20px;
`;

export const UserItem = CompanyUserItem.extend`
	display: grid;
	grid-template-columns: 2fr 2fr 1fr;
`;

export const CompanyUsers = StyledCompanyUsers.extend`
	align-items: unset;
	margin: 80px;
`;

export const PlusCircleIcon = PlusCircle.extend`
	color: ${colors.violet};
`;

export const TimesCircleIcon = XCircle.extend`
	color: #3d3d3d;
`;

export const InviteForm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 40px;
`;

export const FormStatusIcon = styled.div`
	display: flex;
	justify-content: flex-end;
`;

export { ErrorText };
