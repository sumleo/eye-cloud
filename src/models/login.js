import { routerRedux } from 'dva/router';
import { loginAccount } from '../services/api_login';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import {message} from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(loginAccount, payload);
      response.status=true;
      response.type=response.role;
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      message.info(response.errmsg);
      // Login successfully
      if (response.role) {
        reloadAuthorized();
        yield put(routerRedux.push('/my/index'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.role);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
