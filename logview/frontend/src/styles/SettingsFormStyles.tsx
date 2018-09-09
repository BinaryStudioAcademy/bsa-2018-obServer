import styled, { StyledFunction } from 'styled-components';
import { media, colors } from './styles-utils';

const userEditIcon = require('src/assets/edit.png');

export const CheckBoxSwitchWrapper = styled.div`
	display: grid;
	grid-template-columns: 70px 1fr;
	gap: 10px;
	padding: 10px 0;
	line-height: 34px;
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
	background-color: #ccc;
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
		background-color: ${colors.violet};
	}

	&:focus + span {
		box-shadow: 0 0 1px ${colors.violet};
	}

	&:checked + span:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}
`;

export const CheckBoxSwitchLabel = styled.label`
	text-transform: uppercase;
`;

export const SettingFormGroup = styled.div`
     border-top: 3px solid ${colors.violet};
     background: #f1f1f1;
     padding: 15px;
     margin-bottom: 50px;
}`;

export const SettingFormGroupInput = styled.div`
    border-top: 3px solid ${colors.violet};
	background: #f1f1f1;
	padding: 15px;
	margin-bottom: 50px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
${media.desktop`grid-template-columns: 1fr;`};
}`;

export const AddNewAppGroupInput = styled.div`
	border: 1px solid rgba(0,0,0,0.1);
	background: #f1f1f1;
	padding: 15px;
	margin-top: 50px;
	margin-bottom: 50px;
	display: grid;
	grid-template-columns: 1fr;
	gap: 10px;
}`;

export const EditAppGroupInput = styled.div`
	border: 1px solid rgb(255, 234, 194);
	background: #f1f1f1;
	padding: 15px;
	display: grid;
	grid-template-columns: 1fr;
	gap: 10px;
	input 
	{
		background-color: rgb(255, 234, 194);
	}
}`;

export const SettingFormGroupOneInput = styled.div`
	border-top: 3px solid ${colors.violet};
	background: #f1f1f1;
	padding: 15px;
	margin-bottom: 50px;
}`;

export const SettingFormGroupLabel = styled.label`
	text-transform: uppercase;
	font-size: 18px;
	line-height: 2;
	padding-left: 5px;
	svg {
		margin-right: 10px;
	}
`;

export const SettingInput = styled.input`
	box-sizing: border-box;
	border: 2px solid #fff;
	border-radius: 4px;
	font-size: 16px;
	background-color: white;
	background-image: url(${userEditIcon});
	background-position: 10px 10px;
	margin: 10px 0;
	background-repeat: no-repeat;
	padding: 12px 20px 12px 40px;
	-webkit-transition: width 0.4s ease-in-out;
	transition: width 0.4s ease-in-out;
	width: 100%;

	&:focus {
		outline: 2px solid #7d7acc;
	}
`;

export const SettingsSubmitButton = styled.button`
	float: right;
	padding: 10px 30px;
	background-color: ${colors.violet};
	color: #fff;
	text-transform: uppercase;
	border: none;
	font-size: 18px;
	svg{
		margin-right: 15px;
	}
	&: hover {
		background-color: ${colors['grey-darken']};
	}
}`;

export const SubmitAppButton = styled.button`
	float: right;
	padding: 12px 20px;
	margin: 10px 0;
	background-color: ${colors.violet};
	color: #fff;
	text-transform: uppercase;
	border: none;
	font-size: 18px;
	width: 100%;
	svg {
		margin-right: 15px;
    }
    &: hover {
		background-color: ${colors['grey-darken']};
    }
}`;

export const CloseAppFormButton = styled.button`
	float: right;
	padding: 12px 20px;
	margin: 10px 0;
	background-color: #cc0000;
	color: #fff;
	text-transform: uppercase;
	border: none;
	font-size: 18px;
	width: 100%;
	svg {
		margin-right: 15px;
	}
	&: hover {
		background-color: ${colors['grey-darken']};
    }
}`;

export const ErrorInputSettings = styled.div`
	text-transform: uppercase;
	color: red;
`;

interface SettingsMenuLink {
	active: boolean;
}

const div: StyledFunction<
	SettingsMenuLink & React.HTMLProps<HTMLInputElement>
> =
	styled.div;

export const SettingsMenuLink = div`
	 display: inline-block;
	 svg {
		 margin-right: 10px;
	 }
	a {
		font-size: 18px;
		text-transform: uppercase;
		margin-left: 15px;
		line-height: 2;
		text-decoration: none;
		color: ${(props: any) => (props.active ? 'rgb(127, 120, 206)' : '#3d3d3d')};
    }
`;

export const SettingsMenuWrapper = styled.div`
	text-align: center;
	margin-bottom: 50px;
`;

export const SettingInputWrapper = styled.div`
	margin-top: 10px;
	label {
		color: ${colors['grey-darken']};
		font-size: 14px;
		text-transform: uppercase;
	}
`;

export const ServerFormsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	${media.desktop`grid-template-columns: 1fr;`};
`;

export const ServerFormsColumn = styled.div`
	border-top: 3px solid ${colors.violet};
	background: #f1f1f1;
	padding: 20px 15px;
	margin-bottom: 30px;
`;

export const EditAppFormButton = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

export const AppSecretKey = styled.span`
	cursor: pointer;
	svg {
		margin-left: 5px;
		margin-right: 5px;
	}
	&:hover {
		color: ${colors.violet};
	}
`;

export const ServerSecretKey = styled.span`
	cursor: pointer;
	line-height: 2;
	svg {
		margin-left: 5px;
		margin-right: 5px;
	}
	&:hover {
		color: ${colors.violet};
	}
`;
export const DeleteAppRow = styled.div`
	text-align: center;
	svg {
		color: ${colors['grey-darken']};
	}
	&:hover {
		svg {
			color: red;
		}
	}
`;

export const EditAppRow = styled.div`
	text-align: center;
	svg {
		color: ${colors['grey-darken']};
	}
	&:hover {
		svg {
			color: ${colors.violet};
		}
	}
`;
