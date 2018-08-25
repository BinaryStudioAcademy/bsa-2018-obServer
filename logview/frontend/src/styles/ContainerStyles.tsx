import styled, { css, StyledFunction } from 'styled-components';
import { media } from './styles-utils';

export const Wrapper = styled.div`
	display: flex;
	width: 350px;
`;

export const Row = Wrapper.extend`
	justify-content: space-between;
	margin: 20px 0;
`;

export const Column = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	align-items: center;
`;

export const CenteredContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
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
