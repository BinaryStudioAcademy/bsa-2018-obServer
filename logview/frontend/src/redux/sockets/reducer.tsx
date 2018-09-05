import * as constants from './constants';

const initialState = {
    channelStatus: 'off',
    serverStatus: 'unknown',
  };
  
export function socketsReducer (state = initialState, action) {
    switch (action.type) {
      case constants.CHANNEL_ON:
        return {...state, channelStatus: 'on'};
      case constants.CHANNEL_OFF:
        return {...state, channelStatus: 'off', serverStatus: 'unknown'};
      case constants.SERVER_OFF:
        return {...state, serverStatus: 'off'};
      case constants.SERVER_ON:
        return {...state, serverStatus: 'on'};
      default:
        return state;
    }
  };