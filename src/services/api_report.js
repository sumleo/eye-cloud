import request from '../utils/request';


export async function getCaptcha(params) {
  return request('/api/doctor/email/verify', {
    method: 'POST',
    body: params,
  });
}

export async function doRegister(params) {
  return request('/api/doctor/register', {
    method: 'POST',
    body: params,
  });
}
