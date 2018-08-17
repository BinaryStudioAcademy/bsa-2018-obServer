import styled from 'styled-components';

export const Input = styled.input`
	display: block;
	border: none;
	outline: none;
	padding: 15px;
	width: 45%;
	margin: 5px;
	background: transparent;
	font-family: 'Muli', sans-serif;
	border-bottom: 1px solid black;
	&::placeholder {
		font-family: 'Muli', sans-serif;
		font-size: 14px;
		letter-spacing: 0.5px;
		color: #3d3d3d;
	}

	&:focus {
		border-bottom: 1px solid transparent;
		border-image: linear-gradient(
			to left,
			rgb(127, 120, 206) 0%,
			rgb(124, 184, 252) 100%
		);
		border-image-slice: 1;
	}
`;

export const InputWide = Input.extend`
	width: 80%;
`;
