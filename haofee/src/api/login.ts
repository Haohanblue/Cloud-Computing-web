import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000'; // 替换为您的实际后端地址

export function getVerifyCode(phone_number:string) {
  return axios.post(`${API_BASE_URL}/users/request-login-code/`, {
    user_phone: phone_number
  });
}
export function clearAllStocks() {
  return axios.put(`${API_BASE_URL}/stocks/clear_all/`);
}
export function bulkModifyStocks(data) {
  return axios.put(`${API_BASE_URL}/stocks/bulk_modify/`, data);
}