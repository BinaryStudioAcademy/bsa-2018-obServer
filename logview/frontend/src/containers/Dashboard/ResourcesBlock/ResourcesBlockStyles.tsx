import { ChartsPageWrapper } from "src/styles/Styles";
import { colors } from "src/styles/styles-utils";
import { Title as ResourcesTitle, Chart as ResourcesChart, ChartGrid as ResourcesChartGrid} from 'src/containers/ServerResources/ServerResourcesStyles';

export const ChartsWrapper = ChartsPageWrapper.extend`
    margin: 0;
    padding: 0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`;

export const Title = ResourcesTitle.extend`
    color: #3d3d3d;
    margin-top: 20px;
`;

export const Chart = ResourcesChart.extend`
    background-color: white;
`;

export const ChartGrid = ResourcesChartGrid.extend`
    margin-top: 30px;
`;

export const TitleSmall = Title.extend`
    font-size: 14px;
`;