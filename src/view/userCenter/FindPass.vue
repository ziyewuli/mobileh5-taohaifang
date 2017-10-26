<template>
  <div class="find-pass" @click.stop="picker=false">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right"></div>
    </div>
    <mu-tabs :value="findType" @change="handleTabChange">
      <mu-tab value="phoneFind" title="手机找回"/>
      <mu-tab value="mailFind" title="邮箱找回"/>
    </mu-tabs>
    <ul class="findList">
      <li v-if="findType=='phoneFind'"><i class="icon iconfont icon-denglu-shoujihaoma"></i>
        <span class="chainaPhone" @click.stop="picker=!picker">{{countNum}}</span>
        <input v-model="phone" type="text" maxlength="11" placeholder="请输入手机号">
        <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="phone" @click="phone=''">
      </li>
      <li v-else><i class="icon iconfont icon-denglu-youxiang"></i>
        <input v-model="mail" type="email" placeholder="请输入邮箱地址">
        <img  class="clearBtn ML10" src="../../assets/img/clear.png" v-if="mail" @click="mail=''">
      </li>
    </ul>
    <mu-raised-button @click="next" label="下一步" class="next-tep"/>
    <mu-picker v-show="picker" :slots="countSlots" :visible-item-count="5" @change="countChange" :values="number"/>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  .find-pass{
    background-color: #f6f6f6;
    img.clearBtn{
      position: absolute;
      right:15/@base;
      top:120/@base;
    }
    div.mu-toast{
      bottom:60%!important;
    }
    button.next-tep{
      background-color: #fb704c;
      color:#fff;
      width:305/@base;
      display: block;
      margin:20/@base auto;
    }
    div.mu-picker{
      position: fixed;
      bottom:0;
    }
    .findList{
      li{
        padding:20/@base 24/@base;
        background-color: #fff;
        font-size: 14/@base;
        color:#4a4a4a;
        i{
          color:#f14114;
          font-size: 24/@base;
        }
        span{
          position: relative;
          top:-4/@base;
          padding-right:10/@base;
          border-right:1px solid #ddd;
          height:14/@base;
          line-height: 14/@base;
          display:inline-block;
        }
        input{
          outline: none;
          border:none;
          position: relative;
          top:-4/@base;
          padding-left:10/@base;
          width:86%;
        }
      }
    }
    .mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#4a4a4a;
    }
    .mu-tabs{
      background-color: #f6f6f6;
      button{
        color:#9b9b9b;
      }
      button.mu-tab-active{
        color:#f14114;
      }
    }
    .mu-tab-link-highlight{
      background-color: #f14114;
    }
  }
</style>
<script>
  export default{
      data(){
          return{
            toast:false,
            toastMsg:'',
            topTitle:'找回密码',
            findType:'phoneFind',
            number:['+86 中国'],
            countNum:'+86',
            picker:false,
            countSlots: [
              {
                width: '100%',
                textAlign: 'center',
                values: ['+86 中国','+1 加拿大/美国']
              },
            ],
            phone:'',
            mail:''
          }
      },
    mounted(){
      document.title=this.$route.name;
    },
    methods:{
      back(){
            this.$router.back();
        },
      countChange (value, index) {
        this.number[0]=value;
        if(value=='+86 中国'){
          this.countNum='+86'
        }else{
          this.countNum='+1'
        }
        console.log(this.countNum)
      },//改变国家时区赋值
      handleTabChange (val) {
        this.findType = val
      },//改变tab
      next(){
        let self=this;
        let reg = /^1[0-9]{10}$/;
        if(this.findType=='phoneFind'){
          if(this.phone==''){
            this.toastMsg='手机号码不能为空';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
          }else if(!reg.test(this.phone)){
            this.toastMsg='手机号码格式有误';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
          }else{
            self.$http.post('/sms/sendCode.json', {
              destination:self.phone,
              tplType:4,
              sendType:0
            }, {emulateJSON: true})
              .then(function (response) {
                  if(response.body.success){
                    this.toastMsg='发送成功';
                    this.toast = true
                    if (this.toastTimer) clearTimeout(this.toastTimer)
                    this.toastTimer = setTimeout(() => { this.toast = false;this.$router.push({name:'手机找回密码',params:{type:this.phone}})
                    },1000)
                  }else{
                    this.toastMsg=response.body.resultMsg;
                    this.toast = true
                    if (this.toastTimer) clearTimeout(this.toastTimer)
                    this.toastTimer = setTimeout(() => { this.toast = false },1000)
                  }
              }).then(function (error) {
            })
          }
        }else{
          if(this.mail==''){
            this.toastMsg='邮箱地址不能为空';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
          }else if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.mail))){
            this.toastMsg='邮箱地址格式有误';
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false },1000)
          }else{
            self.$http.post('/sms/sendCode.json', {
              destination:self.mail,
              tplType:4,
              sendType:1
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  this.toastMsg='发送成功';
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => { this.toast = false;this.$router.push({name:'邮箱找回密码',params:{type:this.mail}})
                  },1000)
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
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
  }
</script>
