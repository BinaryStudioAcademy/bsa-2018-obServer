import styled from 'styled-components';
import {
	UserText as ProfileText,
	UserText,
	CommentText,
	Title as DashboardTitle
} from '../../styles/TextStyles';
import { UserPopup } from '../../styles/ContainerStyles';
import { colors, media } from '../../styles/styles-utils';

export const DashboardWrapper = styled.div`
	margin: 20px;
`;

export const DashboardNav = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 50px;
`;

export const CenteredContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const DashboardMain = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	${media.dashboard`grid-template-columns: 1fr;`};
	grid-gap: 50px;
	margin: 5%;
`;

export const Select = UserPopup.extend`
	min-width: 160px;
	position: relative;
	padding: 0;
	cursor: default;
	font-size: 16px;

	border-bottom-left-radius: ${(props: any) => (props.popup ? '0px' : '0px')};
	border-bottom-right-radius: ${(props: any) =>
		props.popup ? '0px' : '0px'};
	border-bottom: ${(props: any) =>
		props.popup ? '1px solid ghostwhite' : '1px solid'};

	&:hover {
		border-bottom-left-radius: ${(props: any) =>
			props.popup ? '0px' : '5px'};
		border-bottom-right-radius: ${(props: any) =>
			props.popup ? '0px' : '5px'};
	}
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
	padding: 5px 20px;
	position: absolute;
	border-top-left-radius: 0px;
	border-top-right-radius: 0px;
	min-width: 120px;
	width: -webkit-fill-available;
`;

export const RowContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const Title = DashboardTitle.extend`
	margin: 20px;

	a {
		text-decoration: none;
		color: #3d3d3d;
		transition-duration: 0.3s;
	}

	a:hover {
		color: ${colors.violet};
	}
`;
