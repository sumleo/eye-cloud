import { getUserInformation, submitMyForm } from '../services/api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'my',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * getUserInformation({ payload }, { call, put }) {
      const response = yield call(getUserInformation, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * submitForm({ payload }, { call }) {
      console.log(payload);
      yield call(submitMyForm, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
