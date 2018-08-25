import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import {getCaptcha,doRegister} from "../services/api_register";
import {message} from 'antd';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    * submit({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(doRegister, payload);
      message.info(response.errmsg);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    * getCaptcha({payload},{call}){
      console.log(payload);
      const response=yield call(getCaptcha,payload);
      console.log(response);
      message.info(response.errmsg);
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.errmsg,
      };
    },
  },
};
