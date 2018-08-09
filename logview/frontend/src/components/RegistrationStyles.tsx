import styled from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 60%;
	height: calc(100vh - 200px);
	margin: auto;
	margin-top: 100px;
	font-family: 'Quicksand', sans-serif;
	background-color: #f2f2f2;
	box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.2);
`;
export const Input = styled.input`
	display: block;
	border: none;
	outline: none;
	padding: 15px;
	margin: 5px;
	background: transparent;
	border-bottom: 1px solid black;
	font-family: 'Quicksand', sans-serif;
	&::placeholder {
		color: #3d3d3d;
	}
`;
export const SignUp = styled.input`
	display: block;
	background: linear-gradient(
		45deg,
		rgba(127, 120, 206, 1) 0%,
		rgba(124, 184, 252, 1) 100%
	);
	border: none;
	outline: none;
	padding: 10px 70px;
	font-size: 16px;
	border-radius: 15px;
	color: white;
`;
export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column wrap;
	align-content: stretch;
`;
