<template>
  <div class="msg-detail">
    <div class="mu-appbar mu-paper-1" v-show="!hideTitle">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>资讯详情</span></div>
      <div class="right">
        <i @click="shoucang(data.id,data)" :class="['icon','iconfont',data.favor?'icon-icon_yishoucangfangyuan':'icon-icon_shoucangfangyuan']"></i>
      </div>
    </div>
    <div class="top-container">
      <div class="title" v-text="data.title"></div>
      <div class="tips"><span class="left-title" v-text="data.source"></span><span class="timer" v-if="data.createdAt" v-text="timer(data.createdAt)"></span><span class="look"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i>{{data.viewcount}}</span></div>
      <div class="abstract" v-if="data.summary!==''">
        <span class="tip">摘要</span>
        <span class="content" v-text="data.summary"></span>
      </div>
    </div>
    <div class="center-container" v-html="data.content">
    </div>
    <div v-if="relevanceList!==null" class="bottom-container">
      <p>· 相关资讯 ·</p>
      <ul class="about-list">
        <li @click="routerThis(list.id)" v-for="list in relevanceList">
          <div class="left-content">
            <div class="title-text" v-text="list.title"></div>
            <div class="bottom-text">
              <span class="name" v-text="list.source"></span>
              <span class="time" v-text="time(list.createdAt)"></span>
              <span class="num"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i>{{list.viewcount}}</span>
            </div>
          </div>
          <div class="right-img"><img :src="imgUrl+list.imgUrl" alt=""></div>
        </li>
      </ul>
    </div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  @media screen and (min-width: 370px) {
    span.name{
      margin-right:20/@base;
    }
    span.time{
      margin-right:10/@base;
    }
  }
  .msg-detail{
    div.right{
      i.icon{
        font-size: 27/@base;
        color: #f14114;
      }
      i.icon-icon_wendaxiangqing_fenxiang{
        font-size: 40/@base!important;
        margin-top:-4/@base;
        margin-right:-10/@base;
      }
    }
    div.top-container{
      div.tips{
        span.timer{
          font-size: 12/@base;
          color: #4A4A4A;
          line-height: 26/@base;
          margin-left:17/@base;
        }
      }
    }
    div.center-container{
      img{
        width: 100% !important;
      }
    }
    div.bottom-container{
      ul.about-list{
        li{
          display:box;
          display:-webkit-box;
          display:-moz-box;
          padding:10/@base 0;
          div.left-content{
            box-flex:1;
            -moz-box-flex: 1;
            -webkit-box-flex: 1;
            margin-right:15/@base;
            div.title-text{
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            div.bottom-text{
              margin-top:20/@base;
              span{
                vertical-align: middle;
              }
              span.name{
                font-size: 12/@base;
                color: #9B9B9B;
              }
              span.time{
                font-size: 12/@base;
                color: #9B9B9B;
              }
              span.num{
                font-size: 12/@base;
                color: #656565;
                float:right;
                i.icon{
                  margin-right:4/@base;
                  vertical-align: middle;
                }
              }
            }
          }
          div.right-img{
            width:100/@base;
            height:80/@base;
            img{
              width:100%;
              height:100%;
            }
          }
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
//  import '../../assets/js/wx'
  export default{
    data(){
      return{
        isApp:false,
        hideTitle:false,
        imgUrl:'',
        data:{},
        time:function(time){
          let date=new Date(time);
          let year=date.getFullYear();
          let month=date.getMonth()+1;
          let day=date.getDate();
          if(month<10){
            var newMonth='0'+month;
          }else{
            var newMonth=month;
          }
          if(day<10){
            var newDay='0'+day;
          }else{
            var newDay=day;
          }
          return year+'-'+newMonth+'-'+newDay;
        },
        relevance:'',
        relevanceList:'',
        lastId:'',
        toast:false,
        toastMsg:''
      }
    },
    mounted(){
      this.$nextTick(function (){
        let self = this;
        self.imgUrl=rxUtils.encImg;
        document.title=this.$route.name;
        //获取APP标识
        self.isApp = self.$route.query.isApp?self.$route.query.isApp:false;
        self.hideTitle = self.$route.query.hideTitle?self.$route.query.hideTitle:false;
        new Promise(function(){
          self.$http.get('/info/getDetail.json?id='+self.$route.params.id, {}, {emulateJSON: true})
            .then(function (response) {
              self.data=response.body.data;
              /*self.$http.get('/wx/getSignature.json?url='+encodeURIComponent(window.location.href.split('#')[0]), {}, {emulateJSON: true})
                .then(function (response) {
                  wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId:'wx58472d4ac16c8e60', // 必填，公众号的唯一标识
                    timestamp: response.body.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: response.body.data.noncestr, // 必填，生成签名的随机串
                    signature: response.body.data.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline','onMenuShareQQ','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  });
                  wx.ready(function(){
                    wx.onMenuShareTimeline({
                      title: self.data.title, // 分享标题
                      link:'http://m.taohaifang.com/share/msg/?id='+self.$route.params.id, // 分享链接
                      imgUrl: document.getElementsByClassName('center-container')[0].getElementsByTagName('img').length>0?document.getElementsByClassName('center-container')[0].getElementsByTagName('img')[0].src+rxUtils.wxRules:'http://m.taohaifang.com/share/logo.png', // 分享图标
                      success: function () {
                        // 用户确认分享后执行的回调函数
                        alert('分享成功')
                      },
                      cancel: function () {
                        // 用户取消分享后执行的回调函数
                      }
                    });
                    wx.onMenuShareAppMessage({
                      title: self.data.title, // 分享标题
                      desc:document.getElementsByClassName('center-container')[0].getElementsByTagName('p')[0].innerText,
                      link:'http://m.taohaifang.com/share/msg/?id='+self.$route.params.id, // 分享链接
                      imgUrl: document.getElementsByClassName('center-container')[0].getElementsByTagName('img').length>0?document.getElementsByClassName('center-container')[0].getElementsByTagName('img')[0].src+rxUtils.wxRules:'http://m.taohaifang.com/share/logo.png', // 分享图标
                      type: '', // 分享类型,music、video或link，不填默认为link
                      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                      success: function () {
                        // 用户确认分享后执行的回调函数
                      },
                      cancel: function () {
                        // 用户取消分享后执行的回调函数
                      }
                    });
                    wx.onMenuShareQQ({
                      title:  self.data.title, // 分享标题
                      desc: document.getElementsByClassName('center-container')[0].getElementsByTagName('p')[0].innerText, // 分享描述
                      link: 'http://m.taohaifang.com/share/msg/?id='+self.$route.params.id, // 分享链接
                      imgUrl: document.getElementsByClassName('center-container')[0].getElementsByTagName('img').length>0?document.getElementsByClassName('center-container')[0].getElementsByTagName('img')[0].src+rxUtils.wxRules:'http://m.taohaifang.com/share/logo.png', // 分享图标
                      success: function () {
                        // 用户确认分享后执行的回调函数
                      },
                      cancel: function () {
                        // 用户取消分享后执行的回调函数
                      }
                    });
                  });
                }).then(function (error) {
              })*/
              self.relevance=response.body.data?response.body.data.relevance:null;
              return new Promise(function(){
                self.$http.get('/info/listRelevance.json?id='+self.$route.params.id, {}, {emulateJSON: true})
                  .then(function (response) {
                    console.log(response.body.data)
                    self.relevanceList=response.body.data;
                  }).then(function (error) {
                })
              })
            }).then(function (error) {
          })
        })
      })
    },
    methods:{
      back(){
        let self=this;
        new Promise(function(){
          self.$router.back();
          self.$http.get('/info/getDetail.json?id='+self.lastId, {}, {emulateJSON: true})
            .then(function (response) {
              self.data=response.body.data;
              self.relevance=response.body.data?response.body.data.relevance:null;
              return new Promise(function(){
                  if(self.relavance!==null){
                    self.$http.get('/info/listRelevance.json?id='+self.$route.params.id, {}, {emulateJSON: true})
                      .then(function (response) {
                        console.log(response.body)
                        self.relevanceList=response.body.data;
                      }).then(function (error) {
                    })
                  }
              })
            }).then(function (error) {
          })
        })
        window.scrollTo(0,0)
      },
      timer(time){
        let date=new Date(time);
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        let hour=date.getHours();
        let minutes=date.getMinutes();
        let seconds=date.getSeconds();
        if(month<10){
          var newMonth='0'+month;
        }else{
          var newMonth=month;
        }
        if(day<10){
          var newDay='0'+day;
        }else{
          var newDay=day;
        }
        if(hour<10){
          var newHour='0'+hour;
        }else{
          var newHour=hour;
        }
        if(minutes<10){
          var newMinutes='0'+minutes;
        }else{
          var newMinutes=minutes;
        }
        if(seconds<10){
          var newSeconds='0'+seconds;
        }else{
          var newSeconds=seconds;
        }
        return year+'-'+newMonth+'-'+newDay+' '+newHour+':'+newMinutes+':'+newSeconds;
      },
      routerThis(id){
        let self=this;
        self.lastId=self.$route.params.id;
        if(this.isApp){
          this.$router.push({name:'资讯详情',params:{id:id,isApp:this.isApp,hideTitle:this.hideTitle}})
        }else{
          this.$router.push({name:'资讯详情',params:{id:id}})
        }
        new Promise(function(){
          self.$http.get('/info/getDetail.json?id='+self.$route.params.id, {}, {emulateJSON: true})
            .then(function (response) {
              self.data=response.body.data;
              self.relevance=response.body.data?response.body.data.relevance:null;
              return new Promise(function(){
                self.$http.get('/info/listRelevance.json?id='+self.$route.params.id, {}, {emulateJSON: true})
                  .then(function (response) {
                    console.log(response.body.data)
                    self.relevanceList=response.body.data;
                  }).then(function (error) {
                })
              })
            }).then(function (error) {
          })
        })
        window.scrollTo(0,0)
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
            self.$http.post('/info/doFavor.json', {
              id:id,region:sessionStorage.getItem("code")
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  _czc.push(['_trackEvent', '资讯详情', 'LikeItem','取消收藏资讯title='+self.data.source+'&id='+id]);
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
            self.$http.post('/info/doFavor.json', {
              id:id,region:sessionStorage.getItem("code")
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  _czc.push(['_trackEvent', '资讯详情', 'LikeItem','收藏资讯title='+self.data.source+'&id='+id]);
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
      fenxiang(){

      }
    },
  }
</script>
