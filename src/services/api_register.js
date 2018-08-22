import request from '../utils/request';


export async function loginAccount(params) {
  return request('/api/common/login', {
    method: 'POST',
    body: params,
  });
}
