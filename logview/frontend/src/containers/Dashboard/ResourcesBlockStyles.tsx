import { ChartsPageWrapper } from "../../styles/Styles";
import { colors } from "../../styles/styles-utils";
import { Title as ResourcesTitle, Chart as ResourcesChart} from 'src/containers/ServerResources/ServerResourcesStyles';
export const ChartsWrapper = ChartsPageWrapper.extend`
    margin: 0;
    padding: 0;
    background-color: ${colors.grey}
    border-radius: 5px;
`;

export const Title = ResourcesTitle.extend`
    color: ${colors["grey-lighten"]}
`;

export const Chart = ResourcesChart.extend`
    background-color: ghostwhite;
`;