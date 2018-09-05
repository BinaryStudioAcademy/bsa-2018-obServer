import { UserTie, User } from 'styled-icons/fa-solid';
import styled, { StyledFunction } from 'styled-components';
import { Circle } from 'styled-icons/fa-solid'

export const AdminIcon = UserTie.extend`
    color: #3d3d3d;
    margin-bottom: 8px;
    margin-right: 40px;
`;

export const UserIcon = User.extend`
    color: #afafaf;
    margin-bottom: 8px;
    margin-right: 40px;
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    p {
        margin-right: 30px;
    }
`;

export const ActiveStatusIcon = Circle.extend`
    margin-right: 20px;
    color: ${(props: {active: boolean}) => (props.active ? '#1db954' : '#f1c232')}
`; 