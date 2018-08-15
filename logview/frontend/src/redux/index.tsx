import * as userActions from 'src/redux/user/actions';
import * as logActions from 'src/redux/log/actions';

export type Action = userActions.UserAction | any;
export type Logs = logActions.LogAction | any;
