import request from '../utils/request';
import marco from '../utils/macro';


export async function getReport(params) {
  return request(`${marco.url()}/api/doctor/report/`, {
    method: 'POST',
    body: params,
  });
}

export async function submitReport(params) {
  return request(`${marco.url()}/api/doctor/report/add/`, {
    method: 'POST',
    body: params,
  });
}

