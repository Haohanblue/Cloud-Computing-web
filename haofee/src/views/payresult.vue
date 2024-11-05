<template>
    <div>
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
import {getPayResult} from '/src/api/pay.ts';
  export default {
    name: 'payresult',
    data() {
      return {
        message: '正在查询支付结果...'
      };
    },
    mounted() {
      this.checkOrderStatus();
    },
    methods: {
      async checkOrderStatus() {
        try {
          const orderId = this.$route.query.out_trade_no  // 假设订单ID通过查询参数传递
          console.log(orderId);
          // 调用订单查询接口
          const data = await getPayResult(orderId);
          console.log(data);
          if (data.status === '1') {
            this.message = '支付成功';
            // 跳转到订单详情页
            setTimeout(function(){},2000);
            this.$router.push({ name: 'orderitem', params: { orderId } });

          } else {
            this.message = '支付失败';
            this.$router.push({ name: 'homepage' });
          }
        } catch (error) {
          this.message = '支付失败';
          this.$router.push({ name: 'homepage' });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 添加你的样式 */
  </style>