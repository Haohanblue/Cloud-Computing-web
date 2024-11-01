import axios from 'axios';
const API_BASE_URL = "http://localhost:8000";
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
