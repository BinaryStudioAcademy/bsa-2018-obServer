import styled from 'styled-components';
const background = require('src/assets/login-background.jpg');

export const NavAside = styled.aside`
	width: 200px;
	margin: 0 5px 5px 5px;
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 15px;
	padding: 10px 5px;
`;
export const UserInfo = styled.h2`
	color: white;
	font-size: 0.9rem;
	font-weight: bold;
	line-height: 1.7;
	margin: 0;
	padding: 0.3rem 0.6rem;
	border-radius: 15px;
	border: 3px solid rgb(127, 120, 206);
`;
export const Nav = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;
export const NavLink = styled.li`
	background: linear-gradient(
		45deg,
		rgb(127, 120, 206) 0%,
		rgb(124, 184, 252) 100%
	);
	border-radius: 15px;
	border: none;
	outline: none;
	margin: 0.8rem 0;
	line-height: 1.7;

	a {
		display: block;
		width: 100%;
		height: 100%;
		padding: 0.6rem 0.6rem;
		text-decoration: none;
		color: white;
		font-weight: bold;
	}
	:hover {
		background: linear-gradient(
			45deg,
			rgb(124, 184, 252),
			rgb(127, 120, 206)
		);
	}
	:hover ul {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: space-around;
		z-index: 1;
	}
`;
export const UserControl = NavLink.extend`
	background: rgba(255, 255, 255, 0.9);
	border: 3px solid rgb(127, 120, 206);
	a {
		width: 90%;
		color: rgb(127, 120, 206);
	}

	a:hover {
		color: white;
		background: linear-gradient(
			to right,
			rgb(124, 184, 252),
			rgb(127, 120, 206)
		);
		border-radius: 15px;
	}
`;
export const SubLinkUl = styled.ul`
	display: none;
	width: calc(100vw - 260px);
	height: 96vh;
	border-radius: 8px;
	background-color: rgba(255, 255, 255, 0.9);
	position: absolute;
	right: 10px;
	top: 10px;
	padding: 10px 20px 10px 0;
`;
export const SubLink = styled.li`
	background: linear-gradient(
		45deg,
		rgb(127, 120, 206) 0%,
		rgb(124, 184, 252) 100%
	);
	width: 30%;
	height: 30wh;
	border-radius: 15px;
	text-align: center;
	font-size: 1.1rem;
	line-height: 1.7;
	:hover {
		background: linear-gradient(
			45deg,
			rgb(124, 184, 252),
			rgb(127, 120, 206)
		);
	}
`;
export const Main = styled.main`
	width: calc(100vw - 280px);
	border-radius: 8px;
	background-color: rgba(255, 255, 255, 0.9);
	position: absolute;
	right: 10px;
	top: 10px;
	padding: 10px 20px;
`;
export const ContentHeader = styled.h1`
	text-align: center;
`;
export const Greeting = styled.h2`
	font-style: italic;
`;
export const ContentSubheader = styled.h4``;
export const ContentBlock = styled.p``;
export const Span = styled.span``;
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
