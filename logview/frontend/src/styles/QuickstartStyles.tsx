import styled from 'styled-components';
const background = require('src/assets/login-background.jpg');

import { Submit, LinkButton } from 'src/styles/Styles';

export const NavAside = styled.aside`
	width: 20vw;
	min-width: 200px;
	margin: 20px;
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 15px;
`;
export const UserInfo = styled.h2`
	font-size: 1.3rem;
	color: white;
	text-align: center;
	font-weight: bold;
	line-height: 1.7;
	margin: 0;
	padding: 0.6rem 0.6rem;
`;
export const Nav = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;
export const NavLink = styled.li`
	background: linear-gradient(
		45deg,
		rgba(127, 120, 206, 1) 0%,
		rgba(124, 184, 252, 1) 100%
	);
	border-radius: 15px;
	border: none;
	outline: none;
	padding: 0.6rem 0.6rem;
	margin: 0.8rem 0;
	cursor: pointer;
	a {
		text-decoration: none;
		color: white;
		font-size: 1.2rem;
	}
	:hover {
		background: linear-gradient(
			45deg,
			rgba(124, 184, 252, 1),
			rgba(127, 120, 206, 1)
		);
		border-radius: 15px;
	}
`;
export const UserControl = NavLink.extend`
	background: white;
	border-bottom: 3px solid transparent;
	color: rgba(127, 120, 206, 1);
	border: 3px solid rgb(127, 120, 206);
	transition-duration: 0.3s ease;

	a {
		color: rgb(127, 120, 206);
		border-image-slice: 1;
		transition-duration: 0.3s;
	}

	a:hover {
		color: white;
		background: linear-gradient(
			to right,
			rgba(124, 184, 252, 1),
			rgba(127, 120, 206, 1)
		);
		border: none;
		transition-duration: 0.3s;
	}
`;
export const Main = styled.main`
	width: 75vw;
	border-radius: 8px;
	background-color: rgba(255, 255, 255, 0.7);
	position: absolute;
	right: 0px;
	top: 20px;
	padding: 0.6rem 0.6rem;
`;
export const ContentHeader = styled.h1`
	text-align: center;
`;
export const Greeting = styled.h2`
	font-style: italic;
`;
export const ContentSubheader = styled.h4``;
export const ContentBlock = styled.p``;
export const Pre = styled.pre`
	max-width: 100%;
	margin-bottom: 1.2rem;
	border-radius: 3px;
	padding: 0.6rem 1.2rem;
	overflow-x: auto;
	display: block;
	margin-top: 0;
`;
export const Code = styled.code`
	padding: 0.2rem 0.4rem;
	font-size: 90%;
	color: #bd4147;
	background-color: #f7f7f9;
	border-radius: 0.25rem;
	font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
		monospace;
	line-height: 1.7;
`;
