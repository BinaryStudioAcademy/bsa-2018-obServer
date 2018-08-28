import { CommentText, UserText } from '../../styles/TextStyles';
import { UserPopup } from '../../styles/ContainerStyles';
import { Chart, ChartInfo } from '../../styles/ChartStyles';
import {
	ChartHeader,
	ChartGrid as Grid,
	ChartWrapper,
	ChartsPageWrapper,
	ChartTimeRange,
	UserBar
} from '../../styles/Styles';
import { Title } from '../../styles/Styles';
import styled from 'styled-components';
import { colors } from '../../styles/styles-utils';

export const ChartGrid = Grid.extend`
	margin-top: 100px;
`;

export {
	CommentText,
	UserText,
	Chart,
	ChartInfo,
	ChartHeader,
	ChartWrapper,
	ChartsPageWrapper,
	ChartTimeRange,
	UserBar,
	Title
};
