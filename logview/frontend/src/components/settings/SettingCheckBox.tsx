import * as React from 'react';
import {
	CheckBoxInput,
	CheckBoxSlider,
	CheckBoxSwitch,
	CheckBoxSwitchLabel,
	CheckBoxSwitchWrapper
} from 'src/styles/SettingsFormStyles';

class SettingCheckBox extends React.Component {
	render() {
		return (
			<CheckBoxSwitchWrapper>
				<CheckBoxSwitch>
					<CheckBoxInput type="checkbox" />
					<CheckBoxSlider />
				</CheckBoxSwitch>
				<CheckBoxSwitchLabel>ddddd</CheckBoxSwitchLabel>
			</CheckBoxSwitchWrapper>
		);
	}
}

export default SettingCheckBox;
