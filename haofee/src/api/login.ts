import axios from 'axios';
import { API_BASE_URL } from './config';

//request-login-code 获取登录验证码
export function getVerifyCode(phone_number:string) {
  return axios.post(`${API_BASE_URL}/users/request-login-code/`, {
    "PhoneNumber": phone_number
  }).then(res => {
    return res.data;
  })
  .catch(err => {
    return err;
  })
  ;
}
//verify-code 验证验证码
export function verifyCode(phone_number:string, code:string) {
  return axios.post(`${API_BASE_URL}/users/verify-code`, {
    "PhoneNumber": phone_number,
    "Code": code
  }).then(res => {
      return res.data;  
  })
  .catch(err => {
      return err;
  })
  ;
}
//me 获取我的信息
export function getMe() {
  return axios.get(`${API_BASE_URL}/users/me/`, {
    withCredentials: true
  }).then(res => {
    return res.data;
  })
  .catch(err => {
    return err;
  })
  ;
}
//logout 退出登录
export function logout() {
  return axios.post(`${API_BASE_URL}/users/logout/`, {
    withCredentials: true
  }).then(res => {
    return res;
  })
  .catch(err => {
    return err;
  })
  ;
}