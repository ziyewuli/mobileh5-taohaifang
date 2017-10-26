<template>
  <div class="editor-pass">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>修改密码</span></div>
      <div class="right"></div>
    </div>
    <ul class="pass-list">
      <li>
        <span>当前密码：</span>
        <input v-if="!oldEye" type="password" v-model="oldPass" placeholder="请输入淘海房原密码" maxlength="20">
        <input v-else type="text" v-model="oldPass" placeholder="请输入淘海房原密码" maxlength="20">
        <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="oldPass" @click="oldPass=''">
        <span  class="clearBtn ML10" v-else></span>
        <img  class="icon_kejian ML10 " src="../../assets/img/icon_kejian.png"  @click="oldEye=!oldEye" v-if="oldEye">
        <img  class="icon_bukejian ML10 " src="../../assets/img/icon_bukejian.png"  @click="oldEye=!oldEye" v-else>
      </li>
      <li>
        <span>新密码：</span>
        <input v-if="!newEye" type="password" v-model="newPass" placeholder="6-20个数字、字母或特殊符号" maxlength="20">
        <input v-else type="text" v-model="newPass" placeholder="6-20个数字、字母或特殊符号" maxlength="20">
        <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="newPass" @click="newPass=''">
        <span  class="clearBtn ML10" v-else></span>
        <img  class="icon_kejian ML10 " src="../../assets/img/icon_kejian.png"  @click="newEye=!newEye" v-if="newEye">
        <img  class="icon_bukejian ML10 " src="../../assets/img/icon_bukejian.png"  @click="newEye=!newEye" v-else>
      </li>
      <li>
        <span>确认新密码：</span>
        <input v-if="!newEye1" type="password" v-model="newPassAgain" placeholder="请再次输入新密码" maxlength="20">
        <input v-else type="text" v-model="newPassAgain" placeholder="请再次输入新密码" maxlength="20">
        <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="newPassAgain" @click="newPassAgain=''">
        <span  class="clearBtn ML10" v-else></span>
        <img  class="icon_kejian ML10 " src="../../assets/img/icon_kejian.png"  @click="newEye1=!newEye1" v-if="newEye1">
        <img  class="icon_bukejian ML10 " src="../../assets/img/icon_bukejian.png"  @click="newEye1=!newEye1" v-else>
      </li>
    </ul>
    <mu-raised-button @click="submit" label="确认修改" class="demo-raised-button" fullWidth/>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  div.editor-pass{
    div.mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#4a4a4a;
      font-size: 27/@base;
      box-shadow: none;
      border-bottom:1px solid #ececec;
      margin-bottom:10/@base;
    }
    ul.pass-list{
      li{
        padding:20/@base 16/@base;
        font-size: 14/@base;
        background-color: #fff;
        border-bottom:1px solid #ececec;
        span{
          color:#4a4a4a;
          width: 90/@base;
          display: inline-block;
        }
        input{
          border:none;
          width:185/@base;
          outline: none;
        }
        i.icon{
          font-size: 17/@base;
          color:#ddd;
          float:right;
          margin-right:10/@base;
        }
      }
    }
    button.mu-raised-button-full{
      width:90%;
      display: block;
      margin:30/@base auto;
      background-color: #f14114;
      color:#fff;
    }
  }
</style>
<script>
  export default{
    data(){
        return {
          oldPass:'',
          newPass:'',
          newPassAgain:'',
          oldEye:false,
          newEye:false,
          newEye1:false,
          toast:false,
          toastMsg:''
        }
    },
    mounted(){
      document.title=this.$route.name;
    },
    methods:{
      back(){
          this.$router.back();
      },
      submit(){
          let self=this;
          let pwdReg=/^[\x21-\x7E]{6,20}$/;
          if(self.oldPass==''){
            self.toastMsg='请输入原密码';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
            return false;
          }else if(!pwdReg.test(this.oldPass)){
            this.toastMsg='请输入由数字、字母特殊符号组成的原密码(6-20个字符';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else if(self.newPass==''){
            self.toastMsg='请输入新密码';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
            return false;
          }else if(self.newPassAgain==''){
            self.toastMsg='请再次输入新密码'
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
            return false;
          }else if(self.newPass!==self.newPassAgain){
            self.toastMsg='两次密码输入不一致'
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
            return false;
          }else if(!pwdReg.test(this.newPass)){
            this.toastMsg='请输入由数字、字母特殊符号组成的新密码(6-20个字符)';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
            return false;
          }else{
            self.$http.post('/user/changePwd.json', {
              newPwd:self.newPassAgain,
              oldPwd:self.oldPass
            }, {emulateJSON: true})
              .then(function (response) {
                  if(response.body.success){
                    self.toastMsg='修改成功'
                    this.toast = true
                    if (this.toastTimer) clearTimeout(this.toastTimer)
                    this.toastTimer = setTimeout(() => {
                        this.toast = false;
                        this.$router.push({name:'设置首页'})
                    }, 1000)
                  }else{
                    self.toastMsg=response.body.resultMsg;
                    this.toast = true
                    if (this.toastTimer) clearTimeout(this.toastTimer)
                    this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
                  }
              }).then(function (error) {
            })
          }
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
  }
</script>
