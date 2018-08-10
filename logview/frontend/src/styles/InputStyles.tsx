import styled from 'styled-components';

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

	&:focus {
		border-bottom: 1px solid transparent;
		border-image: linear-gradient(to left, #0099cc 0%, #f27280 100%);
		border-image-slice: 1;
	}
`;