<template>
  <div>
    <el-button @click="showLoginDialog=true"> 登录 </el-button>
      <LoginCard v-model:visible="showLoginDialog"></LoginCard>
    <bottomNav />
  </div>
</template>
  <script>
  import {getVerifyCode} from '/src/api/login.ts';
  import LoginCard from '/src/views/LoginCard.vue';
  import bottomNav from "/src/components/bottomNav.vue";
  export default {
    name: "personalcenter",
    components: {LoginCard,bottomNav},
    data() {
      return {
        showLoginDialog: false
      };
    },
    computed:{
      rightPhone(){
        //利用正则对手机号匹配
        return /^1[3456789]\d{9}$/.test(this.phone);
      }
    },
    methods:{
      getCode(){
        if(!this.computeTime){
          this.computeTime = 30;
          this.timer = setInterval(() => {
              this.computeTime --;
              if( this.computeTime <= 0){
                clearInterval(this.timer)
              }
          }, 1000);
        }
        getVerifyCode(this.phone).then(res => {
          console.log(res);
        });
      },
      login(){
        //短信验证
        if(this.loginWay){
           console.log(this.rightPhone);
          if(!this.rightPhone){
          alert('手机号不正确');
           }else if(!/^\d{6}$/.test(this.code)){
           alert('验证码必须是6位')
          }
        }else{
          //密码验证
          if(!/^[\u4E00-\u9FA5]{2,4}$/.test(this.name)){
             alert('用户名必须是2-4个汉字');
          }else if(!/^\d{6}$/.test(this.pwd)){
            alert('密码必须是6位');
          }else if(!this.captcha){
            alert('图片验证码不正确');
          }
        }
       
        console.log(111);
      }
    }
  };
  </script>


  <style scoped>
  .loginContainer {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .loginInner {
    width: 80%;
    margin: 0 auto;
    padding-top: 60px;
  }
  .loginInner .login_header .login_logo {
    color: #02a774;
    font-weight: bolder;
    font-size:40px;
    text-align:center;
  }
  .login_header .login_header_title{
    text-align:center;
    padding-top:40px;
  }
  .login_header_title a{
    text-decoration: none;
    font-size:14px;
    color:#333;
    padding-bottom:4px;
  }
  .login_header_title a:first-child{
    margin-right:40px;
  }
  .login_header_title a.on{
    color :#02a774;
    font-weight: bolder;
    border-bottom:2px solid #02a774;
  }
  .login_content form div{
     display:none;
  }
  .login_content form div.on{
    display:block;
  }
  .login_content form  input{
    width:100%;
    height:100%;
    border: 1px solid #ddd;
    border-radius :4px;
    outline: none;
    padding-left:10px;
    box-sizing: border-box;
   
  }
  .login_content form  input:focus{
     border: 1px solid #02a774;
  }
  .login_message{
     position:relative;
     margin-top:16px;
     height:48px;
     font-size:14px;
     background:#fff;
  }
  .login_message .get_verification{
   position:absolute;
   top:50%;
   right:10px;
   transform: translateY(-50%);
   border:none;
   color:#ccc;
   background :transparent;
   font-size:14px;
  }
  .login_message .get_verification.right_phone{
   color:#000;
  }
  .login_hint{
    color:#999;
    margin-top:12px;
    font-size:14px;
    line-height:20px;
  }
  .login_hint a{
    text-decoration: none;
     color :#02a774;
  }
   
  .login_verification{
    position:relative;
    margin-top:16px;
    height:48px;
    font-size:14px;
    background:#fff;
  }
  .login_verification .switch_button{
    border:1px solid #ddd;
    width:30px;
    height:16px;
    position:absolute;
    top:50%;
    right:10px;
    transform: translateY(-50%);
    border-radius:8px;
    padding:0 6px;
    line-height:16px;
    font-size:12px;
    transition:  background-color 0.3s;
    
  }
  .login_verification .switch_button.on{
     background :#02a774;
  }
  .login_verification .switch_button.off{
   background:#fff;
  }
  .switch_button .switch_circle{
      background:#fff;
      border:1px solid #ddd;
      border-radius:50%;
      width:16px;
      height:16px;
      position:absolute;
      left:-1px;
      top:-1px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  .switch_button .switch_circle.right{
    transform :translateX(30px);
  }
  .switch_button  .switch_text{
     color: #ddd;
     float:right;
  }
  .login_submit{
    display:block;
    width:100%;
    height:42px;
    margin-top:30px;
    background :#4cd96f;
    border-radius:4px;
    font-size:16px;
    line-height:42px;
    color:#fff;
    text-align:center;
    border:none;
  }
   
  </style>
  