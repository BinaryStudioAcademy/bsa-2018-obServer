import * as userActions from 'src/redux/user/actions';
import * as logActions from 'src/redux/logs/actions';

export type Action = userActions.UserAction | logActions.LogAction | any;
