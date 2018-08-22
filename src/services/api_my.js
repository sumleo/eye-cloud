import request from '../utils/request';
import marco from '../utils/macro';


export async function getDoctorInfo() {
  return request(`${marco.url()}/api/doctor/userinfo`, {
    method: 'POST',
  });
}

export async function submitDoctorInfo(param) {
  return request(`${marco.url()}/api/doctor/userinfo/reset`, {
    method: 'POST',
    body:param,
  });
}
