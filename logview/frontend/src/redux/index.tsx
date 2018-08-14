import * as userActions from './user/actions';
import * as logsActions from './log/actions';

export type Action = userActions.UserAction | any;
export type Logs = logsActions.LogAction | any;
