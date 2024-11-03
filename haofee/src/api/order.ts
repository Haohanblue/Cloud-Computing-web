import axios from 'axios';
import { API_BASE_URL } from './config';

//获取订单列表
export function getOrders() {
  return axios.get(`${API_BASE_URL}/orders`).then(res => {
    return res;
  })
  .catch(err => {
    return err;
  })
  ;
}

//创建订单
export function createOrder() {
    return axios.post(`${API_BASE_URL}/orders`,{
        withCredentials: true
    }).then(res => {
      return res;
    })
    .catch(err => {
      return err;
    })
    ;
  }
//获取订单详情
export function getOrderDetail(order_id: string) {
    return axios.get(`${API_BASE_URL}/orders/${order_id}`).then(res => {
      return res;
    })
    .catch(err => {
      return err;
    })
    ;
  }