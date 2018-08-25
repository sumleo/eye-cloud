import { getDoctorInfo,submitDoctorInfo } from '../services/api_my';
import { message } from 'antd/lib/index';

export default {
  namespace: 'my',

  state: {
  },

  effects: {
    * getUserInformation(_, { call, put }) {
      const response = yield call(getDoctorInfo);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * submitForm({ payload }, { call }) {
      console.log(payload);
      const res=yield call(submitDoctorInfo, payload);
      console.log(res)
      message.info(res.errmsg);
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
