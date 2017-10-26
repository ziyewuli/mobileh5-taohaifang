<template>
  <div class="setting-index">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right"></div>
    </div>
    <ul class="setting-list">
      <li @click="photoUp=true">
        <a>
          <span class="left-text">头像</span>
          <i class="icon iconfont icon-icon_xiaojiantouyou"></i>
          <img v-if="data.photo==null||data.photo==''" src="../../assets/img/morenuser.png" alt="" class="user-header">
          <img v-else :src="String(data.photo).indexOf('http')<0?imgUrl+data.photo:data.photo" alt="" class="user-header">
        </a>
      </li>
      <li @click="routerNick"><a><span class="left-text">昵称</span><i class="icon iconfont icon-icon_xiaojiantouyou"></i><span class="right-text" v-text="data.name"></span></a></li>
      <li @click="routerPhone"><a><span class="left-text">手机号码</span><i class="icon iconfont icon-icon_xiaojiantouyou"></i><span class="right-text" v-text="data.phone"></span></a></li>
      <li @click="routerEmail"><a><span class="left-text">邮箱</span><i class="icon iconfont icon-icon_xiaojiantouyou"></i><span class="right-text" v-text="data.email"></span></a></li>
      <li v-if="data.phone||data.email">
        <router-link v-if="data.existPwd" to="editorPass"><span class="left-text">修改密码</span><i class="icon iconfont icon-icon_xiaojiantouyou"></i></router-link>
        <router-link v-else to="addPass"><span class="left-text">设置密码</span><i class="icon iconfont icon-icon_xiaojiantouyou"></i></router-link>
      </li>
    </ul>
    <mu-raised-button @click="loginOut" label="退出账号" class="demo-raised-button" fullWidth/>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    <vue-core-image-upload
      class="btn btn-primary"
      @imageuploaded="imageuploaded"
      :max-file-size="2048000"
      text=" "
      inputOfFile="file"
      cropRatio="1:1"
      compress="50"
      crop="local"
      @imagechanged="imageChange"
      :isXhr="true"
      resize="local"
      :headers="{'authentication': authentication}"
      :cropBtn="{'ok':'完成','cancel':'退出'}"
      url="/user/uploadPhoto.json" >
    </vue-core-image-upload>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  .setting-index{
    background-color: #f6f6f6;
    div.g-core-image-upload-btn{
      position: absolute;
      top:54/@base;
      left:50/@base;
      width:100%;
      height:62/@base;
    }
    .g-core-image-corp-container .image-aside{
      top:50/@base;
    }
    .g-resize-bar{
      bottom:50/@base!important;
    }
    .image-mask .mask{
      background-color: #000;
    }
    .g-core-image-corp-container{
      background: #000;
    }
    .info-aside>.btn-groups:nth-child(2){
      display:none;
    }
    .g-core-image-corp-container .info-aside{
      bottom:0;
      top:auto;
      background-color: #000;
      button.btn-upload{
        float:right;
        margin-left:0;
        background: none;
        border:none;
      }
      button.btn-cancel{
        float:left;
        margin-left:0;
        background: none;
        color:#fff;
        border:none;
      }
    }
    button.mu-raised-button-full{
      width:90%;
      position: absolute;
      bottom:30/@base;
      left:5%;
      color:#fff;
      background-color: #f14114;
    }
    ul.setting-list{
      margin-top:10/@base;
      li:nth-child(2),li:nth-child(4){
        margin-bottom:10/@base;
      }
      li{
        border-bottom:1px solid #ececec;
        padding:20/@base 16/@base;
        background-color: #fff;
        a{
          display: block;
          span.left-text{
            font-size: 14/@base;
            color: #656565;
          }
          img.user-header{
            width:42/@base;
            height:42/@base;
            border-radius: 50%;
            float:right;
            position: relative;
            top:-12/@base;
          }
          span.right-text{
            float:right;
            font-size: 14/@base;
            color: #656565;
          }
          i.icon{
            float:right;
            font-size: 10/@base;
            color:#656565;
            margin-top:2/@base;
            margin-right:-10/@base;
            margin-left:10/@base;
          }
        }
      }
    }
    .mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#4a4a4a;
      box-shadow: none;
      border-bottom:1px solid #ececec;
    }
  }
</style>
<script>
  import VueCoreImageUpload from 'vue-core-image-upload'
  import {rxUtils} from '../../assets/js/rxUtils'
  export default{
    data(){
      return{
        authentication:'',
        maxw:600,
        maxh:600,
        photoUp:false,
        topTitle:'账户设置',
        dialog:false,
        toast:false,
        toastMsg:'',
        imgUrl:'',
        data:{},
        faData:{},
        src: '',
        newData:''
      }
    },
    mounted(){
      let self=this;
      if(rxUtils.sessionStorage.getItem("authentication")){
        this.authentication=rxUtils.sessionStorage.getItem("authentication");
      }
      document.title=this.$route.name;
      self.imgUrl=rxUtils.hostPhoto;
      self.newData=new Date().getTime();
      console.log(self.newData)
      this.$nextTick(function () {
        self.$http.post('/user/detail.json', {
        }, {emulateJSON: true})
          .then(function (response) {
            if(response.body.code==900){
              this.token=false;
            }else{
              this.token=true;
              self.data=response.body.data;
            }
          }).then(function (error) {
        })
      })
    },
    methods:{
      back(){
        this.$router.back();
      },
      loginOut(){
        let self=this;
        self.$http.post('/sso/j_spring_security_logout.json', {}, {emulateJSON: true})
          .then(function (response) {
            if(response.body.success){
              _czc.push(['_trackEvent', '账户设置', 'Logout','退出账号']);
              this.toastMsg='退出成功'
              this.toast = true
              sessionStorage.removeItem("authentication");
              if (this.toastTimer) clearTimeout(this.toastTimer)
              this.toastTimer = setTimeout(() => {this.toast = false;self.$router.push({name:'首页'})}, 1000)
            }else{
              this.toastMsg=response.body.resultMsg;
              this.toast = true
              if (this.toastTimer) clearTimeout(this.toastTimer)
              this.toastTimer = setTimeout(() => {this.toast = false;}, 1000)
            }
          }).then(function (error) {
        })//房源
      },
      close () {
        this.dialog = false
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      routerEmail(){
        if(this.data.email==''||this.data.email==null){
          this.$router.push({name:'绑定邮箱'})
        }else{
          this.$router.push({name:'修改邮箱'})
        }
        _czc.push(['_trackEvent', '账户设置', 'EmailAddress','邮箱']);
      },
      routerNick(){
        _czc.push(['_trackEvent', '账户设置', 'NickName','昵称']);
        this.$router.push({name:'修改昵称'})
      },
      routerPhone(){
        if(this.data.phone==null){
          this.$router.push({name:'绑定手机'})
        }else{
          this.$router.push({name:'修改手机'})
        }
        _czc.push(['_trackEvent', '账户设置', 'PhoneNumber','手机号码']);
      },
      imageuploaded(res) {
        console.log(res)
        if (res.success) {
          _czc.push(['_trackEvent', '账户设置', 'ProfileImage','上传头像']);
          this.data.photo = res.data;
        }else{
          this.toastMsg=res.resultMsg;
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {this.toast = false;}, 1000)
        }
      },
      imageChange(){
          console.log('123123');
        var file = document.getElementsByClassName("g-core-upload-input-3117")[0].files[0];
        var reader = new FileReader();
        //将文件以Data URL形式读入页面
        reader.readAsDataURL(file);
        reader.onload=function(e){
          console.log(this.result)
        }
      },
      errorHandle(err) {

      }
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload,
    },
  }
</script>
