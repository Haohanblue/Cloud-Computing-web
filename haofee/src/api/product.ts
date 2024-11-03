import axios from 'axios';
import { API_BASE_URL } from './config';

//products 获取商品列表
export function getProducts() {
  return axios.get(`${API_BASE_URL}/products`).then(res => {
    return res.data;
  })
  .catch(err => {
    return err;
  })
  ;
}

//productsbyID 获取单个商品信息
export function getProductsById(product_id: number) {
    return axios.get(`${API_BASE_URL}/products/${product_id}`).then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    })
    ;
  }

//

//stocks 获取商品库存
export function getStocks() {
    return axios.get(`${API_BASE_URL}/stock`).then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    })
    ;
}

