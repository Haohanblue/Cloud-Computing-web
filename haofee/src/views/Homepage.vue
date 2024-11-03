<template>
    
    <div class="container">
        <el-carousel :interval="4000" class="carousel" height="200px" :autoplay="true">

          <el-carousel-item>
            <img ref="bannerHeight" src="/src/assets/images/nav/coffe1.png" style="width:100%" @load="imgLoad" />
            <el-row class="head-part">
              <el-col :offset="1" :span="22">
                <el-row>
                  <el-col :span="24" class="head-part-info">
                    <span>浩韩咖啡</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
                   <img ref="bannerHeight" src="/src/assets/images/nav/coffe2.png" style="width:100%" @load="imgLoad" />
            <el-row class="head-part">
              <el-col :offset="1" :span="22">
                <el-row>
                  <el-col :span="24" class="head-part-info">
                    <span>浩韩咖啡</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-carousel-item>         <el-carousel-item>
                   <img ref="bannerHeight" src="/src/assets/images/nav/coffe3.png" style="width:100%" @load="imgLoad" />
            <el-row class="head-part">
              <el-col :offset="1" :span="22">
                <el-row>
                  <el-col :span="24" class="head-part-info">
                    <span>浩韩咖啡</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-carousel-item>         <el-carousel-item>
                   <img ref="bannerHeight" src="/src/assets/images/nav/coffe4.png" style="width:100%" @load="imgLoad" />
            <el-row class="head-part">
              <el-col :offset="1" :span="22">
                <el-row>
                  <el-col :span="24" class="head-part-info">
                    <span>浩韩咖啡</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-carousel-item>

        </el-carousel>
        <div v-if="!isLogin" style="display: flex;flex-direction: row;justify-content: right;">
          <el-text tag="b" style="margin-right: 2rem;">您好啊，使用本程序请登录后使用</el-text>
          <el-button @click="showLoginDialog=true" :v-show="!isLogin" type="success" round> 去登录/注册 </el-button>
        </div>
        <div v-if="isLogin"  style="display: flex;flex-direction: row;justify-content: right;">
          <el-text tag="b" style="margin-right: 2rem;">想要退出登录</el-text>
          <el-button @click="Mylogout" :v-show="isLogin" type="warning" round> 注销 </el-button>
        </div>
        <LoginCard v-model:visible="showLoginDialog"></LoginCard>
        
        <el-row>
          <el-col :span="22" :offset="1" class="part-title">
            <span>购物中心</span>
          </el-col>
          <el-col :span="22" :offset="1" class="home-box competition-center">
            <el-row class="center" @click="$router.push({path: '/menu'})">
              <el-col :span="22" :offset="1">
                <h3>购物中心</h3>
              </el-col>
              <el-col style="margin-top: 10px;" :span="22" :offset="1" >
                <!-- <span style="font-size:14px;color: #555555;">简介</span> -->
              </el-col>
              <el-col style="margin-top: 10px">
                
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="22" :offset="1" class="part-title">
            <span>订单中心</span>
          </el-col>
          <el-col :span="22" :offset="1" class="home-box order-center">
            <el-row class="center" @click="$router.push({path: '/order'})">
              <el-col :span="22" :offset="1">
                <h3>订单中心</h3>
              </el-col>
              <el-col style="margin-top: 10px;" :span="22" :offset="1" >
                <!-- <span style="font-size:14px;color: #555555;">简介</span> -->
              </el-col>
              <el-col style="margin-top: 10px">
              </el-col>
            </el-row>
          </el-col>
        </el-row>



      </div>
    <bottom-nav  :current-page="'home'"></bottom-nav>

  </template>
  
  <script>
import bottomNav from "/src/components/bottomNav.vue";
import LoginCard from '/src/views/LoginCard.vue';
import { getMe ,logout} from "/src/api/login.ts";
import { showNotify, showConfirmDialog } from "vant";
  export default {
    name: "homepage",
    components: {LoginCard,bottomNav},
    data() {
      return {
        bannerHeight: 200,
        showLoginDialog: false,
        isLogin:null
      }
    },
    mounted() {
      getMe().then(res => {
        if (res.status === 401){
          console.log("未登录");
          this.isLogin = false;
        }else if (res.UserID){
          console.log("已登录");
          this.isLogin = true;
        }
        console.log(res);
      });
    },
    created: function () {
  
    },
    methods: {
      Mylogout(){
        showConfirmDialog({
            title: '注销登录',
            theme: 'round-button',
            message:
              '确认退出当前账号？',
          })
            .then(() => {
              logout().then(res => {
                showNotify({ type: 'success', message: '注销成功' });
                window.location.reload();
              console.log(res);
              });
            })
            .catch(() => {
              // on cancel
            });
       
      }
 
    },
  
  }
  </script>
  
  <style scoped>
  
  /*头部部分*/
  .head-part {
    height: 200px;
    padding-top: 10px;
    padding-bottom: 20px;
    background: #F4AB46; /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #EC716C, #F4AB46); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #EC716C, #F4AB46); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  
  .head-part-info {
    font-size: 16px;
    color: #FFFFFF;
  }
  
  .part-title {
    font-size: 22px;
    font-weight: bolder;
    color: #000000;
    margin-top: 20px;
  }
  
  .to-activitySquare {
    width: 100%;
    background-color: #FFFFFF;
    border-color: #FFFFFF;
  }
  
  .to-activitySquare-contain {
    font-size: 13px;
    color: rgb(237, 119, 105);
  }
  
  /*典型应用*/
  /*收益预测*/
  .weekly-forecast {
    background: rgba(221, 214, 243); /* fallback for old browsers */
    background: -webkit-linear-gradient(53deg, rgba(221, 214, 243, 1) 3%, rgba(250, 172, 168, 1) 100%);
    background: linear-gradient(53deg, rgba(221, 214, 243, 1) 3%, rgba(250, 172, 168, 1) 100%)
  }
  
  .to-more {
    color: #FFFFFF;
    background: rgb(132, 52, 235); /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, rgb(246, 108, 113), rgb(132, 52, 235)); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, rgb(246, 108, 113), rgb(132, 52, 235)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  
  /*股价波动预测*/
  .stock-predict{
    background-image: linear-gradient(to right top, #cab6f3, #c4bdf5, #c0c3f5, #bdc8f4, #bdcdf2);
  }
  
  /*不确定性预警*/
  .economic-uncertainty {
    background: rgb(245, 248, 250); /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, rgb(245, 248, 250), rgb(222, 223, 223)); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, rgb(245, 248, 250), rgb(222, 223, 223)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  
  /*赛事中心*/
  .competition-center{
    background-image: url('/src/assets/images/nav/shop.png');
    background-size: contain; /* 使图片按比例缩放至容器内 */
    display: inline-block;
    border-radius: 10px;
    padding-top: 50px;
    padding-bottom: 30px;
    margin-bottom: 20px;
  }
   /*赛事中心*/
   .order-center{
    background-image: url('/src/assets/images/nav/order.png');
    background-size: contain; /* 使图片按比例缩放至容器内 */
    display: inline-block;
    border-radius: 10px;
    padding-top: 50px;
    padding-bottom: 30px;
    margin-bottom: 20px;
  }
  
  .to-competition{
    color: #FFFFFF;
    background-image: linear-gradient(to right, #40ada3, #1ba8b6, #17a1c5, #4098cd, #688dcc);
  }
  
  /*免责声明*/
  .res_deceleration {
    /*bottom: 60px;*/
    /*position: fixed;*/
    padding-bottom: 60px;
  }
  
  .detail__inner {
    padding-top: 45%;
  }
  
  .introduction {
    font-size: 18px;
    color: #FFFFFF;
    padding-top: 30px;
  }
  
  .banner-btn {
    background: rgb(254, 250, 245);
    color: rgb(236, 115, 109);
    border-radius: 20px;
    padding: 5px 8px;
  }
  
  .home-box{
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgba(170, 170, 170, 0.9);
  }
  
  .home-box span:first-child {
    line-height: 23px;
  }
  
  .home-box h3 {
    font-size: 20px;
    color: #333333;
  }
  
  .home-box button{
    border: none;
    font-size:13px;
    padding:3px 5px;
    border-radius: 5px;
    min-height:28px;
  }
  
  .typical-box {
    display: inline-block;
    /* width: 250px; */
    /* 宽度先调大 */
    /* margin-right: 5%; */
    padding-bottom: 30px;
    white-space: normal;
  }
  
  </style>