<template>
  <div class="login">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
    </div>
    <div class="logo">
    </div>
<!--    <mu-tabs :value="loginType" @change="handleTabChange">
      <mu-tab value="passLogin" title="密码登录"/>
      <mu-tab value="codeLogin" title="验证码登录"/>
    </mu-tabs>-->
    <ul class="passLogin">
      <li><i class="icon iconfont icon-login_icon_user"></i>
        <input @keyup="loginChange" v-model="userName" type="text" placeholder="请输入绑定手机或邮箱地址">
        <img  class="clearBtn ML20" src="../../assets/img/clear.png" v-if="userName" @click="userName=''">

      </li>
      <li v-if="loginType=='passLogin'"><i class="icon iconfont icon-login_icon_key"></i>
        <input class="" v-if="!pwdEye" type="password" v-model="password" placeholder="请输入登录密码" maxlength="20">
        <input v-else type="text" v-model="password" placeholder="请输入登录密码" maxlength="20">
        <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="password" @click="password=''">
        <span  class="clearBtn ML10" v-else></span>
        <img  class="icon_kejian ML10 " src="../../assets/img/icon_kejian.png"  @click="pwdEye=!pwdEye" v-if="pwdEye">
        <img  class="icon_bukejian ML10 " src="../../assets/img/icon_bukejian.png"  @click="pwdEye=!pwdEye" v-else>
      </li>
      <li v-else><i class="icon iconfont icon-login_icon__yanzheng"></i><input class="code" type="number" v-model="codeNum" placeholder="请输入验证码" ><button @click="getCode($event)" :disabled="disb" class="codeBtn" v-text="getVerifyCodeMsg"></button></li>
    </ul>
    <mu-raised-button @click="loginSub()" label="登录" class="demo-raised-button"/>
    <p class="forgetBtn"><router-link to="findPass">忘记密码？</router-link></p>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  body{
    background-color: transparent!important;
  }
  div.mu-appbar{
    height:44/@base;
    background: #f6f6f6;
    color:#4a4a4a;
    border:0;
  }
  div.logo{
    height:120/@base;
    margin:35/@base 0;
    background-image: url('../../assets/img/reg-logo.png');
    background-size: 100% 100%;
  }
  .login>button:nth-child(4){
    background: #fb704c;
    color:#fff;
    width:325/@base;
    margin:20/@base auto 0 auto;
    display:block;
    span{
      font-size: 16/@base;
    }
  }
  .login,.register{
    background: #f6f6f6;
    div.mu-toast{
      bottom:60%!important;
    }
    p.forgetBtn{
      text-align: center;
      margin:20/@base 0;
      a{
        font-size: 14/@base;
        color:#9b9b9b;
      }
    }
    ul.passLogin{
      li{
        padding:11.5/@base 24/@base;
        background: #fff;
        border-bottom:1px solid #ddd;
        position: relative;
        input.code{
          display: inline-block;
          width:112/@base;
        }
        button.codeBtn:disabled{
          color:gray!important;
        }
        button.codeBtn{
          position: absolute;
          right:30/@base;
          top:-2/@base;
          color:#f14114;
          display:block;
          padding:20/@base 30/@base;
          background:none;
          border:none;
          outline:none;
        }
        i.icon{
          color:#656565;
          font-size: 24/@base;
        }
        input{
          font-size: 14/@base;
          border:none;
          outline:none;
          position: relative;
          top:-2/@base;
          left:10/@base;
          width:76%;
        }
      }
      li:first-child{
        border-top:1px solid #ddd;
      }
      li:last-child{
        input{
          font-size: 14/@base;
          border:none;
          outline:none;
          position: relative;
          top:-2/@base;
          left:10/@base;
          width:227/@base;
        }
      }
    }
    div.mu-appbar{
      height:44/@base;
      background: #f6f6f6;
      color:#4a4a4a;
      div.mu-appbar-title{
        span{
          margin-left:30/@base;
        }
      }
      div.right{
        a{
          font-size: 14/@base;
          display:block;
          padding:12/@base;
          color:#4a4a4a;
        }
      }
    }
    div.mu-tabs{
      background: #f6f6f6;
      button{
        color:#4a4a4a;
      }
      button.mu-tab-active{
        color:#f14114;
      }
      .mu-tab-link-highlight{
        background: #f14114;
      }
    }
  }
</style>
<script>
  import {rxUtils}  from '../../assets/js/rxUtils'
  export default{
      data(){
          return{
            pwdEye:false,
            toast:false,
            toastMsg:'',
            topTitle:'登录',
            loginType:'passLogin',
            userName:'',
            password:'',
            codeNum:'',
            timer:60,
            getVerifyCodeMsg:'获取验证码',
            disb:true
          }
      },
    mounted(){
      document.title=this.$route.name;
    },
    methods:{
      back(){
          this.$router.back();
      },
      handleTabChange (val) {
        this.loginType = val
      },
      loginChange(){
          let self=this;
          if(this.userName==''||!(/^1[0-9]{10}$/.test(self.userName))&&!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(self.userName))){
              this.disb=true;
          }else{
              this.disb=false;
          }
      },
      loginSub(){
          let self=this;

          if(this.loginType=='passLogin'){
              if(this.userName==''){
                this.toastMsg='手机或邮箱不能为空';
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false },1000)
              }else if(!(/^1[0-9]{10}$/.test(self.userName))&&!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(self.userName))){
                this.toastMsg='手机号或邮箱格式错误';
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false },1000)
              }else if(this.password==''){
                this.toastMsg='登录密码不能为空';
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false },1000)
              }else{
                self.$http.post('/sso/login.json', {
                  username:this.userName,
                  password:this.password,
                  validCode:'',
                  loginType:0,
                  authencationType:'ajax'
                }, {emulateJSON: true})
                  .then(function (response) {
                    if(response.body.authenticated){
                      localStorage.userId=response.body.userId;
                      this.toastMsg='登录成功';
                      this.toast = true
                      rxUtils.sessionStorage.setItem("authentication",response.body.authentication)
                      if (this.toastTimer) clearTimeout(this.toastTimer)
                      this.toastTimer = setTimeout(() => {
                        this.toast = false;
                        if(self.$route.query.type!==undefined){
                          self.$router.push({name:'个人中心'})
                        }else{
                          self.$router.go(-2);
                        }
                      },1000)
                    }else{
                      this.toastMsg=response.body.resultMsg;
                      this.toast = true
                      if (this.toastTimer) clearTimeout(this.toastTimer)
                      this.toastTimer = setTimeout(() => {
                        this.toast = false;
                      },1000)
                    }
                  }).then(function (error) {
                })
              }
            }else{
              if(this.userName==''){
                this.toastMsg='手机或邮箱不能为空';
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false },1000)
              }else if(!(/^1[0-9]{10}$/.test(self.userName))&&!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(self.userName))){
                this.toastMsg='手机号或邮箱格式错误';
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false },1000)
              }else if(this.codeNum==''||this.codeNum.length>6){
                this.toastMsg='请输入验证码';
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false },1000)
              }else{
                self.$http.post('/sso/login.json', {
                  username:this.userName,
                  password:'',
                  validCode:self.codeNum,
                  loginType:1,
                  authencationType:'ajax'
                }, {emulateJSON: true})
                  .then(function (response) {
                    if(response.body.authenticated){
                      localStorage.userId=response.body.userId;
                      this.toastMsg='登录成功';
                      this.toast = true
                      if (this.toastTimer) clearTimeout(this.toastTimer)
                      this.toastTimer = setTimeout(() => {
                        this.toast = false;
                        self.$router.back(2);
                      },1000)
                    }else{
                      this.toastMsg=response.body.resultMsg;
                      this.toast = true
                      if (this.toastTimer) clearTimeout(this.toastTimer)
                      this.toastTimer = setTimeout(() => {
                        this.toast = false;
                      },1000)
                    }
                  }).then(function (error) {
                })
              }
            }
      },//登录按钮逻辑
      getCode(e){
        let self=this;
        let dataIn={
          destination:self.userName,
          tplType:1,
          sendType:''
        }
        if(this.userName.indexOf('@')>-1){
            dataIn.sendType=1;
        }else{
            dataIn.sendType=0;
        }
        self.$http.post('/sms/sendCode.json', dataIn, {emulateJSON: true})
          .then(function (response) {
              if(response.body.success){
                this.toastMsg='验证码发送成功';
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => {
                    this.toast = false;
                },1000)
                let timer = setInterval(function () {
                  if (self.timer != 0) {
                    e.target.disabled = true;
                    self.timer--;
                    e.target.style.color = 'gray';
                    e.target.disabled = true;
                    self.getVerifyCodeMsg = self.timer + 's后重新获取'
                  } else {
                    clearInterval(timer);
                    e.target.disabled = false;
                    self.getVerifyCodeMsg = "重新获取";
                    self.timer = 60;
                    e.target.style.color = '#f14114';
                    //重开计时器
                    setInterval(timer)
                  }
                }, 1000)
              }else{
                this.toastMsg=response.body.resultMsg;
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false },1000)
              }
          }).then(function (error) {
        })
      },//获取验证码
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
  }
</script>
