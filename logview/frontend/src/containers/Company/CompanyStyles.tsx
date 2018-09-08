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
import { RowContainer } from '../Dashboard/DashboardStyles';
import SettingCheckBox from '../../components/settings/SettingCheckBox';

export const Input = CompanyInput.extend`
	width: 30%;
`;

export const Submit = CompanySubmit.extend`
	margin-top: 20px;
`;

export const UserItem = CompanyUserItem.extend`
	display: grid;
	grid-template-columns: 0.8fr 1fr 1fr 1fr;
`;

export const CompanyUsers = StyledCompanyUsers.extend`
	align-items: unset;
	margin: 80 80 0 80;
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

export const Row = RowContainer.extend`
	justify-content: space-between;
`;

export const Status = styled.p`
	margin-left: 30px;
`;

export { ErrorText };
