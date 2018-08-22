import request from '../utils/request';
import marco from '../utils/macro';

export async function loginAccount(params) {
  return request(`${marco.url()}/api/common/login`, {
    method: 'POST',
    body: params,
  });
}
