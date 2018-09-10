import styled, { StyledFunction } from "styled-components";
import { colors } from "src/styles/styles-utils";
import { Submit } from "../../styles/Styles";
import { Binoculars } from "styled-icons/fa-solid";

export const Background = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	color: #fff;
	background: linear-gradient(-45deg, #9aa8b1, #afafaf, ${colors.violet});
	background-size: 400% 400%;
	animation: Gradient 15s ease infinite;

    @keyframes Gradient {
        0% {
            background-position: 0% 50%
        }
        50% {
            background-position: 100% 50%
        }
        100% {
            background-position: 0% 50%
        }
    }
`;

export const Title = styled.h1`
	font-weight: 300;
	text-align: center;
	position: absolute;
	top: 35%;
	right: 0;
	left: 0;
`;

export const Slogan = styled.p`
    font-weight: 300;
	text-align: center;
	position: absolute;
	top: 40%;
	right: 0;
	left: 0;
`;

export const LandingNav = styled.div`
	width: calc(100vw - 50px);
	margin: 25px;
	position: absolute;
	display: flex;
	justify-content: space-between;
`;

export const NavItem = styled.div`
	display: flex;
`;

export const ObserverIcon = Binoculars.extend`
	margin: 4px;
`;

interface ButtonProps {
	primary?: boolean;
}

const button: StyledFunction<ButtonProps & React.HTMLProps<HTMLInputElement>> = Submit.extend;

export const Button = button`
	background-image: none;
	background: ${ (props: {primary?: boolean}) => props.primary ? "transparent" : "#3d3d3d"}
	margin: 10px;
	color: ${ (props: {primary?: boolean}) => props.primary ? "#3d3d3d" : "white"};
	border: ${ (props: {primary?: boolean}) => props.primary ? "1px solid #3d3d3d" : "1px solid #3d3d3d"};

	a {
		color: ${ (props: {primary?: boolean}) => props.primary ? "#3d3d3d" : "white"};
	}
`;