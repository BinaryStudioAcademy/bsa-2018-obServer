import styled from 'styled-components';
const background = {
	switchOn: '#7f78ce',
	switchOff: '#ccc'
};

export const CheckBoxSwitchWrapper = styled.div`
	display: grid;
	grid-template-columns: 70px 1fr;
`;

export const CheckBoxSwitch = styled.label`
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
`;

export const CheckBoxSlider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 34px;
	background-color: ${background.switchOff};
	-webkit-transition: 0.4s;
	transition: 0.4s;

	&:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		border-radius: 50%;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}
`;

export const CheckBoxInput = styled.input`
	display: none;

	&:checked + span {
		background-color: ${background.switchOn};
	}

	&:focus + span {
		box-shadow: 0 0 1px ${background.switchOn};
	}

	&:checked + span:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}
`;

export const CheckBoxSwitchLabel = styled.label``;
