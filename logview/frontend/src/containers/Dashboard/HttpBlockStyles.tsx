import { Grid as HttpGrid } from 'src/containers/HttpStats/HttpStatsStyles';
import styled from 'styled-components';

export const Grid = HttpGrid.extend`
    display: flex;
    flex-direction: column;
`;

export const HttpContainer = styled.div`
    background: #efefef;
    border-radius: 5px;
`;