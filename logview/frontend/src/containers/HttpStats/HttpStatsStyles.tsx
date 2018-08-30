import { CommentText, UserText } from '../../styles/TextStyles';
import { Chart, ChartInfo } from '../../styles/ChartStyles';
import {
	ChartHeader,
	ChartGridTwo as Grid,
	ChartWrapper,
	ChartsPageWrapper,
	ChartTimeRange,
	UserBar
} from '../../styles/Styles';
import { Title } from '../../styles/Styles';

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
	Title,
	Grid
};
