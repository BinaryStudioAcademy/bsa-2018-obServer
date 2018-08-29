import styled, { css, StyledFunction } from 'styled-components';
import { media } from './styles-utils';

export const Landing = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const Wrapper = styled.div`
	display: flex;
	background-color: white;
`;

export const Row = Wrapper.extend`
	justify-content: space-between;
	width: 90%;
	margin: 20px 0;
`;

export const CenteredContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	position: relative;
`;

export const PasswordWrapper = CenteredContainer.extend`
	justify-content: space-between;
	height: 90%;
`;

export const EmailContainer = CenteredContainer.extend`
	justify-content: flex-start;
`;

export const Column = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	/* justify-content: space-between; */
	align-items: center;
`;

export const SideNav = styled.div`
	/* box-shadow: 6px 0px 29px 0px rgba(0, 0, 0, 0.1); */
`;

export const DashboardBackground = styled.div`
	font-family: 'Muli', serif;
	display: flex;

	min-height: 100vh;
	background-color: #efefef;
`;

export const Main = styled.div`
	padding: 3%;
	margin-left: 16%;
	width: 84%;
	background: white;
`;

export const Sidebar = Column.extend`
	width: 16%;
	display: flex;
	height: calc(100vh - 7%);
	position: fixed;
	justify-content: space-between;
`;

export const UserBar = styled.div`
	min-width: 80%;
`;

export const Profile = styled.div`
	font-family: 'Merriweather', serif;
	font-size: 18px;
	font-weight: bold;
`;

interface UserPopup {
	popup: boolean;
}

const div: StyledFunction<UserPopup & React.HTMLProps<HTMLInputElement>> =
	styled.div;

export const UserPopup = div`
	display: block;
	padding: 5px 20px;
	text-align: center;
	background-color: ${(props: any) => (props.popup ? '#3d3d3d' : 'inherit')};
	color: ${(props: any) => (props.popup ? '#bebec5' : '#3d3d3d')};
	font-size: 14px;
	font-weight: normal;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #3d3d3d;
		color: #bebec5;
	}
`;

export const CompanyUsers = Column.extend`
	list-style-type: none;
`;

export const UserItem = styled.li`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;
