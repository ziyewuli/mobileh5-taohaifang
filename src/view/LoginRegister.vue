<template>
  <div class="loginReg">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
    </div>
    <div class="login" v-if="!isWechat">
      <mu-raised-button @click="routerLink('login')" label="登录" class="demo-raised-button"/>
    </div>
    <div class="login-wx" v-if="isWechat">
      <mu-raised-button @click="toWechat()" label="微信登录" class="demo-raised-button"/>
    </div>
    <div class="reg" v-if="!isWechat">
      <mu-raised-button @click="routerLink('register')" label="注册" class="demo-raised-button"/>
    </div>
    <div class="Agreement">
      <p>登录即表明您同意<span><router-link to="xieyi">用户协议</router-link></span>
        <span class="float-r " v-if="isWechat">
          <span @click="routerLink('login')">账号登录</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span @click="routerLink('register')">注册</span>
        </span>
      </p>
    </div>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../assets/css/mix";
  .loginReg{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-image: url('../assets/img/logoRegBg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    div.mu-appbar {
      border:0;
      background: #fff;
    }
    div.login,div.login-wx{
      background: #fff;
      height:40/@base;
      width: 100%;
      margin-top:373/@base;
      button{
        display: block;
        background: #fb704c;
        color:#fff;
        width:325/@base;
        height:40/@base;
        line-height:40/@base;
        margin:0 auto;
        span{
          font-size: 16/@base;
        }
      };
    }

    div.reg{
      height:40/@base;
      width: 100%;
      margin-top:25/@base;
      button{
        display:block;
        background: transparent;
        color:#fb704c;
        width:325/@base;
        height:40/@base;
        line-height:40/@base;
        margin:0 auto;
        border:1px solid #fb704c;
        span{
          font-size: 16/@base;
        }
      };
    }
    div.Agreement{
      margin:100/@base 25/@base 0;
      p{
        color:#9b9b9b;
        font-size: 12/@base;
        span {
          color:#4A4A4A;
          font-size: 12/@base;
          a{
            font-size: 12/@base;
            color:#4A4A4A;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
<script>
  import {rxUtils}  from '../assets/js/rxUtils'
  export default{
      data(){
        return {
          isWechat:false
        }
      },
      methods:{
        back(){
            this.$router.back();
        },
        routerLink(name){
          if(name=='login'){
            _czc.push(['_trackEvent', '登陆注册页', 'LoginByAccount','账号登录']);
          }else if(name=='register'){
            _czc.push(['_trackEvent', '登陆注册页', 'GotoRegisterPage','注册按钮']);
          }
          if(this.$route.query.type){
            this.$router.push({path:'/'+name,query:{type:'login'}})
          }else{
            this.$router.push({path:'/'+name})
          }
        },
        toWechat(){
          _czc.push(['_trackEvent', '登陆注册页', 'LoginByWeiChat','微信登录']);
          location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+rxUtils.variable.appid+'&redirect_uri=http%3A%2F%2F'+rxUtils.variable.domainName+'%2FmobileV2%2F%23%2F&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
          //location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx58472d4ac16c8e60&redirect_uri=http%3A%2F%2F'+rxUtils.variable.domainName+'%2Fmobile%2F%23%2F&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
        }
      },
    mounted(){
          console.log(rxUtils.variable.domainName);
      document.title=this.$route.name;
      if(isWeiXin()){
          this.isWechat=true;
      }else{
        this.isWechat=false;
      }
      function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
        }else{
          return false;
        }
      }
    }
  }
</script>
