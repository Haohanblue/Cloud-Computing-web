<template>
    <el-dialog v-model="dialogFormVisible" title="登录验证" style="width: 90%;">
      <el-col :span="22" :offset="1" >
    <div class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <div class="login_logo">浩韩咖啡</div>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          </div>
        </div>
        <!-- 内容部分 -->
        <div class="login_content">
           <form @submit.prevent="login">
               <!-- 短信登录 -->
             <div :class="{on: loginWay}">
                   <section class="login_message">
                     <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
                    <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">{{computeTime>0 ? `(${computeTime}s)已发送` : '获取验证码'}}</button>
                   </section>
                   <section class="login_verification">
                       <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                   </section>
                   <section class="login_hint">
                       温馨提示：未注册浩韩咖啡帐号的手机号，登录时将自动注册，且代表已同意
                        <a href="javascript:;">《用户服务协议》</a>
                   </section>
              </div>
              <button class="login_submit">登录</button>
           </form>
        </div>
      </div>
    </div>
    </el-col> 
    </el-dialog>
</template>
  <script>
  import {getVerifyCode} from '/src/api/login.ts';
  import { verifyCode } from '/src/api/login.ts';
  import { showNotify ,showConfirmDialog  } from 'vant';

  export default {
    name: "LoginCard",
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },

    data() {
      return {
        loginWay:true,//true代表短信登陆, false代表密码
        phone:'',//手机号,
        computeTime: 0,
        code:'',//验证码
        timer:null,
        showPwd:false,
        captcha:'',
        dialogFormVisible: this.visible,
      };
    },
    watch: {
        // 监听父组件传入的 visible 值变化
        visible(newVal) {
            this.dialogFormVisible = newVal;
        },
        // 监听内部 dialogFormVisible 值变化，通知父组件
        dialogFormVisible(newVal) {
            this.$emit('update:visible', newVal);
        }
    },
    computed:{
      rightPhone(){
        //利用正则对手机号匹配
        return /^1[3456789]\d{9}$/.test(this.phone);
      }
    },
    methods:{
      getCode(){
        if(this.computeTime > 0){
          showNotify({ type: 'danger', message: '请不要频繁获取短信' });
          return
        }
        if(!this.computeTime){
          this.computeTime = 30;
          this.timer = setInterval(() => {
              this.computeTime --;
              if( this.computeTime <= 0){
                clearInterval(this.timer)
              }
          }, 1000);
        }
        //调用接口
        getVerifyCode(this.phone).then(res => {
          showNotify({ type: 'success', message: '发送成功，请耐心等待短信' });
          console.log(res);
          
        });
      },
      login(){
        //短信验证
        if(this.loginWay){
           console.log(this.rightPhone);
          if(!this.rightPhone){
            showNotify({ type: 'danger', message: '手机号码格式不正确' });
           }else if(!/^\d{4}$/.test(this.code)){
            showNotify({ type: 'danger', message: '验证码格式必须为4位数字' });
          }
        }
        verifyCode(this.phone, this.code).then(res => {
          // 如果登录成功，设置cookie
              /*{
        "message": "登录成功",
        "cookie": {
            "user_token": "HeQXRK_lhxWHzoJa:59bccb0dfbc5d4f667428c46f99401f8a3165e93ae9b811ff39ba2ec47e65958""
        }
        }         */
        if (res.cookie && res.cookie.user_token) {
            // 删除之前的，设置新的
            const cookiestr = `user_token=${res.cookie.user_token}; max-age=86400;`
            console.log(cookiestr);
            document.cookie = cookiestr; // 86400 = 1 day
            console.log(document.cookie);
            // If using js-cookie: Cookies.set('user_token', res.cookie.user_token, { expires: 1 });
            showNotify({ type: 'success', message: '登录成功' });
            // 跳转到首
            //刷新页面
            window.location.reload();
          console.log(res);
        }
      }).catch(err => {
          console.log(err);
        });
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
    padding-top: 20px;
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
  