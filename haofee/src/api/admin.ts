import axios from 'axios';
import { API_BASE_URL } from './config';
//获取所有订单信息
export function getOrdersAll() {
    return axios.get(`${API_BASE_URL}/admin/orders`, {
        withCredentials: true
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}
// 完成订单
export function completeOrder(order_id: string) {
    return axios.put(`${API_BASE_URL}/admin/orders/${order_id}/complete`).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}

//获取所有产品信息
export function changeProductInfo(product_id: string, data: any) {
    return axios.put(`${API_BASE_URL}/admin/product/${product_id}`, data).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}
//新增产品
export function addProduct(data: any) {
    return axios.post(`${API_BASE_URL}/admin/product`, data).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}

//删除产品
export function deleteProduct(product_id: string) {
    return axios.post(`${API_BASE_URL}/admin/product/${product_id}`, {
        withCredentials: true
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}

//更改产品库存
export function changeProductStock(data: any) {
    return axios.put(`${API_BASE_URL}/admin/stock/`, data).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}
//获取所有用户信息
export function getUsersAll() {
    return axios.get(`${API_BASE_URL}/admin/users`, {
        withCredentials: true
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}
//查询某个用户的订单
export function getUserOrders(user_id: string) {
    return axios.get(`${API_BASE_URL}/admin/users/${user_id}/orders`, {
        withCredentials: true
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}