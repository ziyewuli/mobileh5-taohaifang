<template>
  <div class="question">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>我要回答</span></div>
      <div class="right" @click="subAnswer()">
        <div class="action">
          <img  src="../../assets/img/submit.png"><span>提交</span>
        </div>
      </div>
    </div>
    <div class="title-box">
      <i class="icon iconfont icon icon-icon_tiwen"></i>
      <div>{{titleText}}</div>
    </div>
    <div class="in-content">
      <textarea v-model="contentText"  placeholder="请输入您的答案(800字以内)"></textarea>
      <div class="content-num">（{{contentText.length}}/800）</div>
    </div>
    <div class="in-img">
      <p class="img-top">请上传PNG、JPG格式图片，最多3张</p>
      <ul class="img-list clearfix">
        <li v-for="(img, index) in imgs" >
          <!--<img :src="img" alt="" @click="deleteImg(index)">-->
          <img :src="img" alt="" >
          <img class="deleteBtn" src="../../assets/img/deleteBtn.png" @click="deleteImg(index)">
        </li>
        <li v-if="imgs.length<3" class="file-in">
          <i class="icon iconfont icon-icon_huida_shangchuanzhaopian"></i>
          <input id="file" type="file" accept="image/jpg, image/jpeg, image/png">
        </li>
      </ul>
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    </div>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  div.question{
    .title-box{
      display:box;
      display:-webkit-box;
      display:-moz-box;
      background-color: #fff;
      padding:20/@base;
      margin-bottom:10/@base;
      div{
        box-flex:1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        font-size: 16/@base;
        color: #4A4A4A;
      }
      i.icon{
        font-size: 20/@base;
        color:#f14114;
        margin-right:10/@base;
      }
    }
    li.file-in{
      display: inline-block;
      width:82/@base;
      height:82/@base;
      position: relative;
      border:1px solid #2889Ea;
      border-radius: 6/@base;
      i.icon{
        left:10/@base;
        top:0/@base;
      }
      input[type=file]{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        opacity: 0;
        width:82/@base;
        height:82/@base;
      }
    }
    div.el-upload--picture-card{
      width:84/@base;
      height:84/@base;
    }
    i.icon-wode-guanyuwomen{
      position: relative;
      top:-40/@base;
      font-size: 60/@base;
    }
    .el-upload-list--picture-card .el-upload-list__item{
      width:84/@base;
      height:84/@base;
      margin-right:20/@base;
    }
    .mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#565656;
      font-size: 27/@base;
      border-bottom:1px solid #ececec;
      div.right{
        div.action{
          width:74/@base;
          line-height:44/@base;
          color:#f14114;
          font-size: 26/@base;
          text-align: center;
          img{
            width:16/@base;
            height:16/@base;
            vertical-align: middle;
          }
          span{
            font-size: 16/@base;
            color: #1E1E1E;
            vertical-align: middle;
          }
        }
      }
      div.mu-appbar-title{
        span{
          margin-left:30/@base;
        }
      }
    }
    div.in-title{
      position: relative;
      margin-bottom:10/@base;
      textarea{
        min-width: 100%;
        max-width: 100%;
        min-height: 90/@base;
        max-height: 90/@base;
        resize: none;
        background-color: #fff;
        font-size: 14/@base;
        border:none;
        padding:10/@base 15/@base;
        outline:none;
      }
      div.title-num{
        font-size: 12/@base;
        position: absolute;
        right:8/@base;
        bottom:8/@base;
        color: #656565;
      }
    }
    div.in-content{
      position: relative;
      textarea{
        min-width:100%;
        max-width: 100%;
        min-height:280/@base;
        max-height:280/@base;
        resize: none;
        border:none;
        outline: none;
        font-size: 14/@base;
        padding:10/@base 15/@base 20/@base;
        background-color: #fff;
        color: #656565;
      }
      div.content-num{
        position: absolute;
        right:8/@base;
        bottom:8/@base;
        font-size: 12/@base;
        color: #656565;
      }
    }
    div.in-img{
      padding:15/@base 20/@base;
      background-color: #fff;
      overflow: hidden;
      p.img-top{
        font-size: 14/@base;
        color: #9B9B9B;
      }
      ul.img-list{
        padding-top:20/@base;
        padding-bottom:20/@base;
        li:nth-child(2){
          margin:0 40/@base;
        }
        li{
          float:left;
          width:84/@base;
          height:84/@base;
          position: relative;
          img{
            width:100%;
            height:100%;
          }
          img.deleteBtn{
            width: 18/@base;
            height: 18/@base;
            position: absolute;
            right: -9/@base;
            top: -9/@base;
          }
        }
        li.file-in{
          position: relative;
          border:1px solid #ececec!important;
          i.icon-icon_huida_shangchuanzhaopian{
            position: absolute;
            font-size: 40/@base;
            top:12/@base;
            left:20/@base;
          }
        }
      }
    }
  }
</style>
<script>
  export default{
    data(){
      return {
        titleText:'在国内购买海外房产和在国外买价格一样吗？',
        contentText:'',
        contentNum:0,
        dialogImageUrl: '',
        dialogVisible: false,
        showOr:true,
        toastMsg:'',
        toast:false,
        imgs:[],
        id:''
      }
    },
    mounted(){
      let self=this;
      document.title=self.$route.name;
      document.querySelector('#file').addEventListener('change', function () {
        require('lrz/dist/lrz.bundle.js')
        let image = new Image();
        var src = window.URL.createObjectURL(document.querySelector('#file').files[0]);
        image.src=src;
        lrz(this.files[0],{width:800,height:600})
          .then(function (rst) {
            // 处理成功会执行
            self.imgs.push(rst.base64);
            console.log(self.imgs)
          })
          .catch(function (err) {
            // 处理失败会执行
          })
          .always(function () {
            // 不管是成功失败，都会执行
            console.log('sshn')
          });
      });
      this.$nextTick(function () {
        self.id=self.$route.params.id;
        self.$http.post('/question/getDetail.json', {
          id:self.id
        }, {emulateJSON: true})
          .then(function (response) {
              self.titleText=response.data.data.title;
          }).then(function (error) {
        })
      })
    },
    methods:{
      deleteImg(index){
        let self=this;
        console.log("即将删除第"+index+"个元素");
        self.imgs.splice(index,1);
      },
      back(){
        this.$router.back();
      },
      contentChange(){
        if(this.contentText.length>800){
          this.contentText=this.contentText.substring(0,800)
        }
        this.contentNum=this.contentText.length;
      },
      handleRemove(file, fileList) {
        this.fileList=fileList;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      successUp(response, file, fileList){
        this.fileList=fileList;
      },
      beforeUp(file){
        if(this.fileList.length>=4){
          console.log(this.fileList)
          this.toastMsg='最多可上传3张图片'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false; }, 2000)
          return false
        }else{}
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      subAnswer(){
          let self=this;
          if(self.contentText==''){
            this.toastMsg='回答内容不能为空'
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false; }, 1000)
          }else{
            self.$http.post('/question/answer.json', {
              questionId: self.id,
              content:self.contentText,
              images:self.imgs
            }, {emulateJSON: false})
              .then(function (response) {
                console.log(response.data)
                if(response.data.success){
                  self.toastMsg='提交成功'
                  self.toast = true
                  if (self.toastTimer) clearTimeout(self.toastTimer)
                  self.toastTimer = setTimeout(() => { self.toast = false;self.$router.back(2) }, 1000)
                }
              }).then(function (error) {
            })
          }
      }
    },
  }
</script>
