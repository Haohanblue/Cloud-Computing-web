import axios from 'axios';
import { API_BASE_URL } from './config';

export function getPayUrl(order_id: string, pay_method: string) {
    return axios.post(`${API_BASE_URL}/orders/${order_id}/pay/${pay_method}`, {
        withCredentials: true
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}

export function getPayResult(order_id: string) {
    return axios.get(`${API_BASE_URL}/orders/getPayResult/${order_id}`, {
        withCredentials: true
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
;
}
