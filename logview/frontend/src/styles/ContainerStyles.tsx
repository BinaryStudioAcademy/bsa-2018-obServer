import styled, { css, StyledFunction } from 'styled-components';
import { media } from './styles-utils';
const background = require('src/assets/login-background.jpg');

export const Wrapper = styled.div`
	display: flex;
	background-color: white;
`;

export const Row = Wrapper.extend`
	margin-top: 5%;
	background-color: transparent;
`;

export const Background = styled.div`
	background-image: url(${background});
	background-attachment: fixed;
	background-repeat: no-repeat;
	height: 100vh;
	width: 100%;
	background-size: cover;
	${media.tablet`
	`} ${media.phone`
		background: inherit;
	`};
`;

export const BackgroundContainer = Background.extend`
	width: 56%;
	${media.tablet`display:none`};
`;

export const Box = styled.div`
	width: 300px;
	height: 300px;
	background: inherit;
	position: absolute;
	overflow: hidden;
	left: calc(100% - 26% - 150px);
	top: calc(50% - 150px);
	border-radius: 8px;

	&:before {
		width: 400px;
		height: 550px;
		content: '';
		position: absolute;
		top: -25px;
		left: -25px;
		bottom: 0;
		right: 0;
		background: inherit;
		box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.2);
		filter: blur(8px);
	}
`;

export const RegisterBox = Box.extend`
	left: calc(28% - 150px);
	top: calc(50% - 150px);
`;

export const PasswordResetContainer = styled.div`
	position: relative;
	width: 350px;
	${media.phone`
		width: 80%;
		left: 10%;
	`} height: 450px;
	top: calc(50% - 250px);
	left: calc(50% - 175px);
	background: inherit;
	border-radius: 8px;
	overflow: hidden;

	&:before {
		content: '';
		width: 400px;
		height: 500px;
		background: inherit;
		position: absolute;
		left: -25px;
		right: 0;
		top: -25px;
		bottom: 0;
		box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.4);
		filter: blur(8px);
		${media.phone`width: 350px`};
	}
`;

export const LogoContainer = styled.div`
	display: flex;
`;

export const RedirectContainer = styled.div`
	margin-top: 20px;
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
