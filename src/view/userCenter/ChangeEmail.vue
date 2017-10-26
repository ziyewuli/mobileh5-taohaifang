<template>
  <div class="edit-email">
    <div class="mu-appbar mu-paper-1" style="margin-bottom:0;">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>修改邮箱</span></div>
      <div class="right"></div>
    </div>
    <div class="mail-box" style="background-color: #f5f5f5;"><span>原邮箱：</span><a v-text="data.email"></a></div>
    <div class="mail-box">
      <span>新邮箱：</span>
      <input v-model="email" type="text" placeholder="请输入邮箱账号">
      <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="email" @click="email=''">
    </div>
    <div class="code-box">
      <span>验证码：</span>
      <input v-model="code" maxlength="6" type="text" placeholder="请输入验证码">
      <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="code" @click="code=''">
      <button @click="getCode($event)" v-text="getVerifyCodeMsg"></button></div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    <mu-raised-button @click="submit" label="完成" fullWidth/>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  button.mu-raised-button{
    width:90%;
    background-color: #F14114;
    color:#fff;
    margin:20/@base auto;
    display:block;
  }
  div.mu-appbar{
    height:44/@base;
    background-color: #fff;
    color:#4a4a4a;
    font-size: 27/@base;
    box-shadow: none;
    border-bottom:1px solid #ececec;
    margin-bottom:10/@base;
  }
  div.code-box{
    input{
      width:160/@base !important;
    }
  }
  div.mail-box,div.code-box{
    padding:20/@base 16/@base;
    background-color: #fff;
    font-size: 16/@base;
    color:#4a4a4a;
    border-bottom:1px solid #ececec;
    button{
      background:none;
      border:none;
      color:#f14114;
      outline:none;
      float:right;
    }
    input{
      width:230/@base;
      border:none;
      font-size: 12/@base;
      outline:none;
    }
  }
</style>
<script>
  export default{
    data(){
      return{
        toast:false,
        toastMsg:'',
        timer:60,
        getVerifyCodeMsg:'获取验证码',
        email:'',
        code:'',
        data:{},
        faData:{}
      }
    },
    mounted(){
      let self=this;
      document.title=this.$route.name;
      this.$nextTick(function () {
        self.$http.post('/user/myInfo.json', {
        }, {emulateJSON: true})
          .then(function (response) {
            self.data=response.body.data.user;
            self.faData=response.body.data;
          }).then(function (error) {
        })
      })
    },
    methods:{
      back(){
        this.$router.back();
      },
      submit(){
        let self=this;
        if(self.email==''){
          this.toastMsg='请输入邮箱'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(self.email))){
          this.toastMsg='邮箱格式错误'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else if(self.code==''){
          this.toastMsg='请输入验证码'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else if(self.code.length<4){
          this.toastMsg='请输入4位数验证码'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else if(isNaN(self.code)){
          this.toastMsg='验证码错误'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else{
          self.$http.post('/user/changeEmail.json', {
            email:self.email,
            validCode:self.code
          }, {emulateJSON: true})
            .then(function (response) {
              if(response.body.success){
                this.toastMsg='邮箱绑定成功'
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => {
                  this.toast = false;
                  self.$router.push({name:'设置首页'})
                }, 1000)
              }else{
                this.toastMsg=response.body.resultMsg;
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
                return false;
              }
            }).then(function (error) {
          })//推荐房源
        }
      },
      getCode(e){
        let self=this;
        if(self.email==''){
          this.toastMsg='请输入邮箱号码'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(self.email))){
          this.toastMsg='邮箱格式错误'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else{
          self.$http.post('/sms/sendCode.json', {
            destination:self.email,
            tplType:3,
            sendType:1
          }, {emulateJSON: true})
            .then(function (response) {
              if(response.body.success){
                self.toastMsg='验证码发送成功';
                self.toast = true
                if (self.toastTimer) clearTimeout(self.toastTimer)
                self.toastTimer = setTimeout(() => { self.toast = false }, 1000)
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
                this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
                return false;
              }
            }).then(function (error) {
          })
        }
      },//发送验证码
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
  }
</script>
