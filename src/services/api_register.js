import request from '../utils/request';
import marco from '../utils/macro';


export async function getCaptcha(params) {
  return request(`${marco.url()}/api/doctor/email/verify`, {
    method: 'POST',
    body: params,
  });
}

export async function doRegister(params) {
  return request(`${marco.url()}/api/doctor/register`, {
    method: 'POST',
    body: params,
  });
}
