import * as React from 'react';
import {
	CheckBoxInput,
	CheckBoxSlider,
	CheckBoxSwitch,
	CheckBoxSwitchLabel,
	CheckBoxSwitchWrapper
} from 'src/styles/SettingsFormStyles';

class SettingCheckBox extends React.Component<any, any> {
	render() {
		return (
			<CheckBoxSwitchWrapper>
				<CheckBoxSwitch>
					<CheckBoxInput
						type="checkbox"
						name={this.props.name}
						value={this.props.name}
					/>
					<CheckBoxSlider />
				</CheckBoxSwitch>
				<CheckBoxSwitchLabel>{this.props.label}</CheckBoxSwitchLabel>
			</CheckBoxSwitchWrapper>
		);
	}
}

export default SettingCheckBox;
