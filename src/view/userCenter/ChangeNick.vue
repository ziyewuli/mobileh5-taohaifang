<template>
  <div class="change-nick">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>昵称</span></div>
      <div class="right"></div>
    </div>
    <input type="text" v-model="nickName" maxlength="16">
    <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="nickName" @click="nickName=''">
    <mu-raised-button @click="submit" label="完成" fullWidth/>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  div.change-nick{
    background: #f5f5f5;
    div.mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#4a4a4a;
      font-size: 27/@base;
      box-shadow: none;
      border-bottom:1px solid #ececec;
      margin-bottom:10/@base;
    }
    button.mu-raised-button{
      width:90%;
      background-color: #f14114;
      color:#fff;
      margin:30/@base auto;
      display:block;
    }
    input{
      padding:22/@base 16/@base;
      font-size: 14/@base;
      background-color: #fff;
      color:#4a4a4a;
      width:100%-32/@base;
      border:none;
      outline: none;
    }
  }
  .change-nick img.clearBtn{
    position: absolute;
    right:15/@base;
    top:77/@base;
  }
</style>
<script>
  export default{
    data(){
      return{
        toast:false,
        toastMsg:'',
        nickName:'',
        text:''
      }
    },
    mounted(){
      let self=this;
      this.$nextTick(function () {
        self.$http.post('/user/myInfo.json', {
        }, {emulateJSON: true})
          .then(function (response) {
            self.nickName=response.body.data.user.name;
          }).then(function (error) {
        })
        document.title=this.$route.name;
      })
    },
    methods:{
      back(){
        this.$router.back();
      },
      submit(){
        let self=this;
        if(self.nickName==''){
          this.toastMsg='请输入昵称'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else if(self.nickName.length>16){
          this.toastMsg='请输入2-16个字符之间的用户昵称'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else if(self.nickName.length<2){
          this.toastMsg='请输入2-16个字符之间的用户昵称'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
          return false;
        }else{
          self.$http.post('/user/editBaseInfo.json', {
              name:self.nickName
          }, {emulateJSON: true})
            .then(function (response) {
              if(response.body.success){
                this.toastMsg='昵称修改成功'
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
