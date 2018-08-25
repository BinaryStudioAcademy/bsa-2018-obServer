import styled, { StyledFunction } from 'styled-components';
import { media } from './styles-utils';

export const Submit = styled.button`
	display: block;
	background: linear-gradient(
		45deg,
		rgba(127, 120, 206, 1) 0%,
		rgba(124, 184, 252, 1) 100%
	);
	border: none;
	outline: none;
	padding: 10px 40px;
	font-size: 16px;
	margin-top: 10px;
	border-radius: 5px;
	color: white;
	margin-bottom: 8px;
	cursor: pointer;

	a {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: white;
		font-size: 16px;
	}
`;

interface SideLinkProps {
	active: boolean;
}

const p: StyledFunction<SideLinkProps & React.HTMLProps<HTMLInputElement>> =
	styled.p;
