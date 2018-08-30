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

export const TextLink = styled.p`
	cursor: pointer;
	border-bottom: 3px solid transparent;
	text-align: center;
	transition-duration: 0.3s ease;

	a {
		text-decoration: none;
		color: rgba(127, 120, 206, 1);
		border: 3px solid rgba(127, 120, 206, 1);
		border-image-slice: 1;
		border-radius: 15px;
		transition-duration: 0.3s;
		padding: 6px 63px;
		font-size: 16px;
	}

	a:hover {
		color: white;
		background: linear-gradient(
			to right,
			rgba(124, 184, 252, 1),
			rgba(127, 120, 206, 1)
		);
		padding: 13px 71px;
		border: none;
		transition-duration: 0.3s;
		border-radius: 15px;
	}
`;

export const LinkButton = TextLink.extend`
	padding: 0;
	margin: 5px;
	a {
		padding: 10px 40px;
		${media.phone`padding: 10px 30px`} color: white;
		border: none;
		background: #4a4a4a;
		padding: 10px 40px;
	}

	a:hover {
		${media.phone`padding: 10px 40px;`};
	}
`;

interface SideLinkProps {
	active: boolean;
}

const p: StyledFunction<SideLinkProps & React.HTMLProps<HTMLInputElement>> =
	styled.p;

export const SideLink = p`
	svg {
		color: ${(props: any) => (props.active ? 'rgb(127, 120, 206)' : '#3d3d3d')};
	}
	a {
		margin-left: 15px;
		text-decoration: none;
		font-weight: ${(props: any) => (props.active ? 'bold' : 'initial')};
		color: ${(props: any) => (props.active ? 'rgb(127, 120, 206)' : '#3d3d3d')};
	}
`;
