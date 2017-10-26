<template>
  <div class="new-pass">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right"></div>
    </div>
    <p class="yanz">验证码已发送到您的手机<span v-text="text" ></span></p>
    <ul class="new-pass-list">
      <li><i class="icon iconfont icon-denglu-yanzhengma"></i>
        <input type="text" placeholder="请输入验证码" maxlength="6" v-model="code">
        <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="code" @click="code=''">
      </li>
      <li><i class="icon iconfont icon-denglu-mima"></i>
        <input v-if="!showPwd" v-model="pass" type="password" placeholder="请输入新密码" maxlength="20">
        <input v-else v-model="pass" type="input"  placeholder="请输入新密码" maxlength="20">
        <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="pass" @click="pass=''">
        <span  class="clearBtn ML10" v-else></span>
        <img  class="icon_kejian ML10 " src="../../assets/img/icon_kejian.png"  @click="showPwd=!showPwd" v-if="showPwd">
        <img  class="icon_bukejian ML10 " src="../../assets/img/icon_bukejian.png"  @click="showPwd=!showPwd" v-else>
      </li>
    </ul>
    <mu-raised-button @click="findSub()" label="确定" class="action-btn demo-raised-button"/>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  .new-pass{
    button.mu-raised-button{
      background: #fb704c;
      color: #fff;
      width:325/@base;
      margin:20/@base auto 0 auto;
      display: block;
    }
    .mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#4a4a4a;
    }
    p.yanz{
      font-size: 14/@base;
      color: #9B9B9B;
      margin:19/@base 0 16/@base 25/@base;
      span{
        color:#f14114;
      }
    }
    ul.new-pass-list{
      li:last-child input{
        width: 250/@base;
      }
      li{
        padding:16/@base 25/@base;
        background-color: #fff;
        font-size: 14/@base;
        border-bottom:1px solid #ececec;
        input{
          border:none;
          outline: none;
          position: relative;
          top:-4/@base;
          width: 280/@base;
        }
        i.icon{
          font-size: 26/@base;
          color:#f14114;
        }
        i.icon-denglu-buxianshimima,i.icon-denglu-xianshimima{
          float:right;
          color:#ddd;
          font-size: 36/@base;
          margin-top:-6/@base;
        }
      }
    }
  }
</style>
<script>
  export default{
      data(){
          return{
            showPwd:false,
            topTitle:'设置新密码',
            look:true,
            code:'',
            pass:'',
            toast:false,
            toastMsg:'',
            text:''
          }
      },
    mounted(){
      this.$nextTick(function () {
        document.title=this.$route.name;
          let s1=this.$route.params.type;
          let s2=this.$route.params.type;
          let a=String(s1).substring(0,3);
          let b=String(s2).substring(7,11);
          this.text=a+'****'+b;
      })
    },
    methods:{
        back(){
            this.$router.back();
        },
      lookOrNo(){
          let val=this.pass;
          this.look=!this.look;
          if(document.getElementsByClassName('passInput')[0].getAttribute('type')=='password'){
            document.getElementsByClassName('passInput')[0].setAttribute('type','text')
          }else{
            document.getElementsByClassName('passInput')[0].setAttribute('type','password')
          }
          this.pass=val;
      },
      findSub(){
        let self=this;
        let pwdReg=/^[\x21-\x7E]{6,20}$/;
        let codeReg=/^\d{6}$/;
        if(this.code==''){
          this.toastMsg='请输入验证码';
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false },1000)
        }else if(!codeReg.test(this.code)){
          this.toastMsg='验证码错误';
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false },1000)
        }else  if(this.pass==''){
          this.toastMsg='请输入新密码';
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false },1000)
        }else if(!pwdReg.test(this.pass)){
          this.toastMsg='请输入由数字、字母特殊符号组成的密码(6-20个字符)';
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false },1000)
        }else{
          self.$http.post('/user/retrievePwd.json', {
            newPwd:self.pass,
            validCode:self.code,
            destination:self.$route.params.type
          }, {emulateJSON: true})
            .then(function (response) {
              if(response.body.success){
                this.toastMsg='修改成功';
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => {
                  this.toast = false;
                  self.$router.push({name:'个人中心'})
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
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
    }
  }
</script>
