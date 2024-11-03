<template>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/menu" icon="cart-o">菜单</van-tabbar-item>
      <van-tabbar-item replace to="/order" icon="records-o">订单</van-tabbar-item>
      <!-- <van-tabbar-item replace to="/personal_center" icon="contact-o">我的</van-tabbar-item> -->
    </van-tabbar>
  </template>
  <script>
  
  export default {
    name: "bottomNav",
    props: ['currentPage'],
    mounted() {
    },
    methods: {
    }
  
  }
  </script>
  
  <style scoped>
  .bottom-nav {
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  /*超链接样式，取消下划线，改颜色*/
  .bottom-nav a {
    text-decoration: none;
    color: #7f7f7f;
  }
  
  .bottom-nav span {
    font-weight: bold;
    font-size: 14px;
  }
  
  /*设置点击后的样式 */
  a.bottom-act {
    text-decoration: none;
    color: #EF9C19;
  }
  </style>