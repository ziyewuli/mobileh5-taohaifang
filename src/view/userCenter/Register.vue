<template>
  <div class="register" @click.stop="picker=false">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
    </div>
    <div class="logo">

    </div>
 <!--   <mu-tabs :value="regType" @change="handleTabChange">
      <mu-tab value="phoneReg" title="手机注册"/>
      <mu-tab value="mailReg" title="邮箱注册"/>
    </mu-tabs>-->
    <ul class="passLogin">
      <li v-if="regType=='phoneReg'"><i class="icon iconfont icon-login_icon_phone"></i><span class="chainaPhone" @click.stop="picker=!picker">{{countNum}}</span><input v-model="phone" type="number" maxlength="11" placeholder="请输入手机号"></li>
      <li v-else><i class="icon iconfont icon-login_icon_email"></i>
        <input  type="text" v-model="mail" placeholder="请输入邮箱地址" >
        <img  class="clearBtn ML20" src="../../assets/img/clear.png" v-if="mail" @click="mail=''">
      </li>
      <li><i class="icon iconfont icon-login_icon_user"></i>
        <input v-model="userName" type="text" placeholder="请输入用户昵称" maxlength="16">
        <img  class="clearBtn ML20" src="../../assets/img/clear.png" v-if="userName" @click="userName=''">
      </li>
      <li><i class="icon iconfont icon-login_icon__yanzheng"></i>
        <input class="code" type="text" maxlength="6" v-model="codeNum" placeholder="请输入验证码" >
        <img  class="clearBtn ML20" src="../../assets/img/clear.png" v-if="codeNum" @click="codeNum=''">
        <button @click="getCode($event)" class="codeBtn" v-text="getVerifyCodeMsg"></button>
      </li>
      <li><i class="icon iconfont icon-login_icon_key"></i>
        <input v-if="!showPwd" v-model="password" type="password" placeholder="请输入登录密码" maxlength="20">
        <input v-else v-model="password" type="input"  placeholder="请输入登录密码" maxlength="20">
        <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="password" @click="password=''">
        <span  class="clearBtn ML10" v-else></span>
        <img  class="icon_kejian ML10 " src="../../assets/img/icon_kejian.png"  @click="showPwd=!showPwd" v-if="showPwd">
        <img  class="icon_bukejian ML10 " src="../../assets/img/icon_bukejian.png"  @click="showPwd=!showPwd" v-else>
      </li>
    </ul>
    <mu-raised-button :disabled="!single" @click="regSub()" label="注册" class="reg-button"/>
    <div class="Agreement">
      <p>注册即表明您同意<span><router-link to="xieyi">用户协议</router-link></span></p>
    </div>
    <div class="xieyi">
      <!--<mu-checkbox v-model="single" /><span class="xieyi-content">我已阅读并同意<router-link to="xieyi">《海外安居用户协议》</router-link></span>-->
    </div>
    <mu-picker v-show="picker" :slots="countSlots" :visible-item-count="5" @change="countChange" :values="number"/>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @base:375/15rem;
  .register{
    background: #f6f6f6;
    div.Agreement{
      margin:170/@base 25/@base 0;
      p{
        color:#9b9b9b;
        font-size: 12/@base;
        span a{
          font-size: 12/@base;
          color:#4A4A4A;
          text-decoration: underline;
        }
      }
    }
    div.mu-toast{
      bottom:60%!important;
    }
    p.forgetBtn{
      float:right;
      margin-right:17/@base;
      margin-top:10/@base;
      a{
        font-size: 12/@base;
        color:#9b9b9b;
      }
    }
    ul.passLogin{
      li:first-child{
        border-top:1px solid #ddd;
      }
      li:last-child{
        input{
          width:230/@base;
        }
      }
      li{
        padding:11/@base 24/@base;
        background: #fff;
        border-bottom:1px solid #ddd;
        position: relative;
        input.code{
          display: inline-block;
          width:170/@base;
        }
        button.codeBtn:disabled{
          color:gray!important;
        }
        button.codeBtn{
          position: absolute;
          right:0;
          top:-2/@base;
          color:#f14114;
          display:block;
          padding:20/@base 15/@base;
          background:none;
          border:none;
          outline:none;
        }
        i.icon{
          color:#656565;
          font-size: 24/@base;
        }
        i.icon-icon_bukejian,i.icon-icon_kejian{
          font-size: 18/@base;
          color:#dcdcdc;
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
    }
    div.mu-appbar{
      height:44/@base;
      background: #f6f6f6;
      color:#4a4a4a;
      border:0;
    }
    div.logo{
      height:120/@base;
      background-image: url('../../assets/img/reg-logo.png');
      background-size: 100% 100%;
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
  div.xieyi-content{
    padding:0 10/@base;
    line-height:22/@base;
    font-size: 12/@base;
    color: #4A4A4A;
  }
  .register{
    div.mu-tabs{
      height:44/@base;
    }
    ul.passLogin{
      li{
        span.chainaPhone{
          position: relative;
          top:-4/@base;
          border-right:1px solid #ececec;
          padding-right:14/@base;
        }
        i.icon-cha{
          position: absolute;
          right:30/@base;
          top:28/@base;
          color:#aaa!important;
          font-size: 14/@base!important;
        }
      }
    }
    button.reg-button:active{
      background-color: #C8593C;
    }
    button.reg-button:disabled{
      background-color: #ddd;
    }
    button.reg-button{
      background-color: #fb704c;
      color:#fff;
      width:325/@base;
      display:block;
      margin:20/@base auto 0 auto;
      font-size: 16/@base;
      span{
        font-size: 16/@base;
      }
    }
    div.xieyi{
      width:305/@base;
      margin:10/@base auto;
      .mu-checkbox input[type=checkbox]:checked+.mu-checkbox-wrapper .mu-checkbox-icon-uncheck{
        color:#f14114;
      }
      label.mu-checkbox{
        vertical-align: middle;
        .mu-checkbox-icon-uncheck{
          color:#ddd;
        }
        .mu-checkbox-icon-checked{
          color:#f14114;
        }
      }
      span.xieyi-content{
        font-size: 12/@base;
        color: #9B9B9B;
        position: relative;
        top:1/@base;
        a{
          color:#f14114;
        }
      }
    }
  }
</style>
<script>
  const count=['+86 中国','+1 加拿大/美国']
  import {rxUtils} from '../../assets/js/rxUtils'
  export default{
      data(){
          return{
            showPwd:false,
            picker:false,
            countSlots: [
              {
                width: '100%',
                textAlign: 'center',
                values: ['+86 中国','+1 加拿大/美国']
              },
            ],
            topTitle:'注册',
            regType:'mailReg',
            timer:60,
            getVerifyCodeMsg:'获取验证码',
            toast:false,
            toastMsg:'',
            userName:'',
            mail:'',
            phone:'',
            codeNum:'',
            password:'',
            hasUser:false,
            single:true,
            rightPopup:false,
            number:['+86 中国'],
            countNum:'+86'
          }
      },
    watch: {
      topPopup (val) {
        if (val) {
          setTimeout(() => {
            this.topPopup = false
          }, 2000)
        }
      }
    },
    mounted(){
      document.title=this.$route.name;
    },
    methods:{
      checkPwd(){
          this.password=this.password.replace(/[^\da-z]/ig, '')
      },
      countChange (value, index) {
        this.number[0]=value;
        if(value=='+86 中国'){
           this.countNum='+86'
        }else{
          this.countNum='+1'
        }
        console.log(this.countNum)
      },
      getDeleteBtn(){
          if(this.userName!==''){
              this.hasUser=true;
          }else{
              this.hasUser=false;
          }
      },//显示删除按钮
      back(){
        this.$router.back();
      },
      handleTabChange (val) {
        this.regType = val
      },
      regSub(){
        let self=this;
        let reg = /^1[0-9]{10}$/;
        let pwdReg=/^[\x21-\x7E]{6,20}$/;
        let codeReg=/^\d{6}$/;
        _czc.push(['_trackEvent', '注册页', 'RegisterButton','提交注册']);
        if(this.mail==''){
            this.toastMsg='邮箱地址不能为空';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.mail))){
            this.toastMsg='邮箱地址格式有误';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else if(this.userName==''){
            this.toastMsg='请输入用户昵称';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else if(this.userName.length<2){
            this.toastMsg='请输入2-16个字符之间的用户昵称';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else if(this.codeNum==''){
            this.toastMsg='请输入验证码';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else if(!codeReg.test(this.codeNum)){
            this.toastMsg='验证码错误';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else if(this.password==''){
            this.toastMsg='登陆密码不能为空';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else if(!pwdReg.test(this.password)){
            this.toastMsg='请输入由数字、字母特殊符号组成的密码(6-20个字符)';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }
          self.$http.post('/sso/register.json', {
            phone:'',
            email:self.mail,
            password:self.password,
            validCode:self.codeNum,
            nickName:self.userName
          }, {emulateJSON: true})
            .then(function (response) {
              if(response.body.success){
                this.toastMsg='注册成功'
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => {
                  this.toast = false;
                  rxUtils.sessionStorage.setItem("authentication",response.body.data.authentication)
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
                this.toastTimer = setTimeout(() => { this.toast = false },1000)
                return false;
              }
              console.log(response.body.data)
            }).then(function (error) {
          })
      },//注册提交逻辑
      getCode(e){
        let reg = /^1[0-9]{10}$/;
        let self=this;
        if(this.regType=='phoneReg'){
          if(this.phone!==''&&reg.test(this.phone)){
            self.$http.post('/sms/sendCode.json', {
              destination:self.phone,
              tplType:0,
              sendType:0
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  this.toastMsg='发送成功';
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => { this.toast = false },1000)
                  let timer = setInterval(function () {
                    if (self.timer != 0) {
                      self.timer--;
                      e.target.style.color = 'gray';
                      e.target.disabled = true;
                      console.log(e.target.disabled)
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
                console.log(response.body.data)
              }).then(function (error) {
            })
          }else{
            this.toastMsg='请检查手机号码是否正确';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }
        }else{
          if(this.mail==''){
            this.toastMsg='邮箱地址不能为空';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.mail))){
            this.toastMsg='邮箱地址格式有误';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else{
            self.$http.post('/sms/sendCode.json', {
              destination:self.mail,
              tplType:0,
              sendType:1
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  this.toastMsg='发送成功';
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => { this.toast = false },1000)
                  let timer = setInterval(function () {
                    if (self.timer != 0) {
                      self.timer--;
                      e.target.style.color = 'gray';
                      e.target.disabled = true;
                      console.log(e.target.disabled)
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
          }
        }
      },//获取验证码
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      close () {
        this.rightPopup= false
      },//关闭弹窗
    }
  }
</script>
