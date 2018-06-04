import { getReportsInfomation } from '../services/api';

export default {
  namespace: 'report',

  state: {},

  effects: {
    * getReports({ payload }, { call, put }) {
      const response = yield call(getReportsInfomation, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
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
