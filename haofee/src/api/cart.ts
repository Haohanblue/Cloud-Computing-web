import axios from 'axios';
import { API_BASE_URL } from './config';

//添加商品到购物车
export function addItemToCart(submitData: any) {
  return axios.post(`${API_BASE_URL}/cart`,
    {...submitData,
    withCredentials: true
    }).then(res => {
    return res.data;
  })
  .catch(err => {
    return err;
  })
  ;
}

//获取购物车列表
export function getCart() {
    return axios.get(`${API_BASE_URL}/cart`,{
        withCredentials: true
    }).then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    })
    ;
  }
// 修改购物车项数量
export function updateCartItem(cart_id: string, action: string) {
    // 将action作为查询参数
    return axios.put(`${API_BASE_URL}/cart/${cart_id}?action=${action}`).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}

// 清空购物车
export function clearCart() {
    return axios.delete(`${API_BASE_URL}/cart`, {
        withCredentials: true
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}

