import { getReport,submitReport } from '../services/api_report';
import {message} from 'antd';

export default {
  namespace: 'report',

  state: {
    data:[],
  },

  effects: {
    * getReports(_, { call, put }) {
      const response = yield call(getReport, {page:1,size:100000});
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * submitForm({payload},{call}){
      const response=yield call(submitReport,{reportInfo:payload});
      message.info(response.errmsg);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload.reportList||[],
      };
    },
  },
};
