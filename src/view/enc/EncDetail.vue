<template>
  <div class="enc-detail">
    <div class="mu-appbar mu-paper-1" v-show="!hideTitle">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>百科详情</span></div>
      <div @click="shoucang(data.id,data)" class="right">
        <i :class="['icon','iconfont',data.favor?'icon-icon_yishoucangfangyuan':'icon-icon_shoucangfangyuan']"></i>
      </div>
    </div>
    <div class="top-container">
      <div class="title" v-text="data.title"></div>
      <div class="tips"><span class="left-color"></span><span class="left-title" v-text="data.source=='淘海房'?'淘海房整理':data.source"></span><span class="look"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i>{{data.viewcount==null?0:data.viewcount}}</span><div class="tip-box"><span class="small-tip" v-for="tip in detail" v-text="tip"></span></div></div>
      <div class="abstract" v-if="data.summary!==''">
        <span class="tip">摘要</span>
        <span class="content" v-text="data.summary"></span>
      </div>
    </div>
    <div class="center-container" v-html="data.content"></div>
    <div class="bottom-container" v-if="relevanceList!==null">
      <p>·相关百科·</p>
      <ul class="about-list">
        <li v-for="list in relevanceList" @click="routerThis(list.id)">
          <div class="p-box">
            <p class="title" v-text="list.title"></p>
            <p class="look"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i>{{list.viewcount==null?'0':list.viewcount}}</p>
          </div>
        </li>
      </ul>
    </div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" rel="style/less" type="text/less">
  @import "../../assets/css/mix.less";
  .enc-detail,.msg-detail{
    div.mu-appbar{
      height:44/@base;
      border-bottom:1px solid #ececec;
      background-color: #fff;
      font-size: 27/@base;
      div.left{
        i.icon{
          color:#565656;
        }
      }
      div.right{
        i.icon{
          font-size: 27/@base;
          color:#f14114;
        }
      }
    }
    div.top-container{
      padding:10/@base 20/@base;
      background-color: #fff;
      div.title{
        font-size: 20/@base;
        color: #4A4A4A;
        line-height: 31/@base;
        font-weight: bold;
        overflow: hidden;
        width:100%;
        margin-bottom:12/@base;
      }
      div.tips{
        margin-bottom:15/@base;
        span{
          vertical-align: middle;
        }
        span.left-color{
          background-color: #2889Ea;
          width:4/@base;
          height:11/@base;
          margin-right:4/@base;
          display: inline-block;
        }
        span.left-title{
          font-size: 14/@base;
          color: #4A4A4A;
          line-height: 26/@base;
          margin-right:10/@base;
        }
        span.small-tip{
          padding:0 6/@base;
          color:#4a4a4a;
          font-size: 12/@base;
          margin-right:10/@base;
          border:1px solid #ececec;
          margin-bottom:10/@base;
          display:inline-block;
        }
        span.look{
          font-size: 12/@base;
          color: #4A4A4A;
          float:right;
          vertical-align: middle;
          i.icon{
            color:#c2c2c2;
            font-size: 20/@base;
            vertical-align: middle;
            margin-right:4/@base;
          }
        }
      }
      div.abstract{
        position: relative;
        background-color:#f6f6f6;
        padding:14/@base 18/@base;
        span.tip{
          position: absolute;
          top:0;
          left:0;
          background-color: #2889Ea;
          color:#fff;
          font-size: 10/@base;
          line-height: 22/@base;
          border-radius: 0 0 6/@base 0;
          padding:0 6/@base;
          -webkit-transform-origin-x: 0;
          -webkit-transform: scale(0.8);

        }
        span.content{
          font-size: 14/@base;
          color: #6C6C6C;
          line-height: 24/@base;
        }
      }
    }
    div.center-container{
      background-color: #fff;
      padding:10/@base 20/@base;
      img{
        width: 100% !important;
        height:auto!important;
      }
    }
    div.bottom-container>p{
      border-bottom:1px solid #ececec;
    }
    div.bottom-container{
      padding:10/@base 10/@base;
      background-color: #fff;
      p{
        width:100%;
        text-align: center;
        font-size: 16/@base;
        color: #4A4A4A;
        padding:10/@base 0;
      }
      ul.about-list{
        li>div.p-box{
          display:box;
          display:-webkit-box;
          display:-moz-box;
        }
        li{
          width:100%;
          background-color: #fff;
          border-bottom:1px solid #ececec;
          padding:20/@base 0;
          div{
            p.title{
              font-size: 16/@base;
              color: #4A4A4A;
              line-height: 26/@base;
              box-flex:1;
              -moz-box-flex: 1;
              -webkit-box-flex: 1;
              text-align: left;
            }
            p.look{
              width:70/@base;
              color:#565656;
              font-size: 12/@base;
              text-align: center;
              i{
                color:#aaa;
                vertical-align: middle;
                margin-right:6/@base;
              }
            }
          }
        }
      }
    }
  }
</style>
<script>
  import {rxUtils} from '../../assets/js/rxUtils'
  export default{
    data(){
        return {
          isApp:false,
          hideTitle:false,
          data:'',
          relevance:'',
          relevanceList:'',
          detail:"",
          toast:false,
          toastMsg:''
        }
    },
    mounted(){
      this.$nextTick(function (){
        let self=this;
        document.title=this.$route.name;
        //获取APP标识
        self.isApp = self.$route.query.isApp?self.$route.query.isApp:false;
        self.hideTitle = self.$route.query.hideTitle?self.$route.query.hideTitle:false;
        self.$http.get('/baike/getDetail.json?id='+self.$route.params.id, {}, {emulateJSON: true})
          .then(function (response) {
            self.data=response.body.data;
            self.relevance=response.body.data.relevance;
            self.detail=response.body.data.keywords.split(',')
            self.$http.get('/baike/listRelevance.json?id='+self.$route.params.id, {}, {emulateJSON: true})
              .then(function (response) {
                  self.relevanceList=response.body.data;
              }).then(function (error) {
            })
          }).then(function (error) {
        })
      })
    },
    methods:{
      back(){
          this.$router.go(-1);
          //this.$router.replace({name:'资讯',query:{type:'baike'}})
      },
      routerThis(id){
        let self=this;
        if(this.isApp){
          this.$router.push({name:'百科详情',params:{id:id,isApp:this.isApp,hideTitle:this.hideTitle}})
        }else{
          this.$router.push({name:'百科详情',params:{id:id}})
        }
        self.$http.get('/baike/getDetail.json?id='+self.$route.params.id, {}, {emulateJSON: true})
          .then(function (response) {
            self.data=response.body.data;
            self.relevance=response.body.data.relevance;
            self.detail=response.body.data.keywords.split(',')
            self.$http.get('/baike/listRelevance.json?id='+self.$route.params.id, {}, {emulateJSON: true})
              .then(function (response) {
                self.relevanceList=response.body.data;
              }).then(function (error) {
            })
          }).then(function (error) {
        })
      },
      shoucang(id,type){
        let self=this;
        if(!rxUtils.sessionStorage.getItem("authentication")){
          this.toastMsg='请先登录'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.toast = false;
            this.$router.push({name:'登录首页'})
          }, 1000)
        }else{
          if(type.favor){
            self.$http.post('/baike/doFavor.json', {
              id:id,region:sessionStorage.getItem("code")
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  _czc.push(['_trackEvent', '百科详情', 'LikeItem','取消收藏百科title='+self.data.source+'&id='+id]);
                  this.toastMsg='取消收藏成功'
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                    type.favor=!type.favor;
                  }, 1000)
                }else{
                  this.toastMsg=response.body.resultMsg;
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                  }, 1000)
                }
              }).then(function (error) {
            })
          }else{
            self.$http.post('/baike/doFavor.json', {
              id:id,region:sessionStorage.getItem("code")
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  _czc.push(['_trackEvent', '百科详情', 'LikeItem','取消收藏百科title='+self.data.source+'&id='+id]);
                  this.toastMsg='收藏成功'
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                    type.favor=!type.favor;
                  }, 1000)
                }else{
                  this.toastMsg=response.body.resultMsg;
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                  }, 1000)
                }
              }).then(function (error) {
            })
          }
        }
      },//收藏
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },//闲时候隐藏toast
    }
  }
</script>
