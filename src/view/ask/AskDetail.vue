<template>
  <div class="ask-detail">
    <div class="mu-appbar mu-paper-1" v-show="!hideTitle">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span><span style="color:#f14114;" v-text="data.nickName"></span>的提问</span></div>
      <div class="right">
        <i @click="favor" :class="['icon','iconfont',data.favor?'icon-icon_yishoucangfangyuan':'icon-icon_shoucangfangyuan']"></i>
      </div>
    </div>
    <div class="ask-content">
      <p class="ask-title bold" v-text="data.title"></p>
      <p class="ask-tip" v-text="data.remark"></p>
      <div class="ask-img">
        <div v-for="img in data.images"><img @click="swiperDialog=true" :src="imgUrl+img" alt=""></div>
      </div>
      <div class="ask-tips"><span v-for="tip in data.labels" v-text="tip"></span></div>
      <div class="ask-user"><span v-text="data.nickName"></span>提问于<span v-text="data.dateFmt"></span>
      </div>
    </div>
    <mu-dialog dialogClass="swiper-class" @click="swiperDialog=false" :open="swiperDialog" title="" @close="swiperDialog=false">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="img in data.images" :key="img"><img @click="swiperDialog=true" :src="imgUrl+img" alt=""></swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <span class="close-swiper" @click="swiperDialog=false">关闭</span>
    </mu-dialog>
    <p class="answerNum" v-if="answers!=null">全部回答({{data.answerNum}})</p>
    <p class="no-more" v-if="answers==null">
      <img src="../../assets/img/no-answer.png">
    </p>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
      <ul class="ask-answer-list">
          <li v-for="list in answers">
            <div class="top-user">
              <div class="user-left">
                <img v-if="list.userPhoto==''||list.userPhoto==null" src="../../assets/img/morenuser.png" alt="">
                <img v-else-if="list.userPhoto.indexOf('http')==-1" :src="userImg+list.userPhoto" alt="">
                <img v-else :src="list.userPhoto" alt="">
                <span v-text="list.nikeName"></span>
              </div>
              <div class="user-right"><span>回答数{{list.userTotalAnswer}}</span> / <span>收到赞{{list.userTotalLikes}}</span></div>
            </div>
            <div class="center-content" v-text="list.content"></div>
            <div class="content-img">
              <div v-for="img in list.images"><img :src="imgUrl+img" alt=""></div>
            </div>
            <div class="bottom-content">
              <div class="time" v-text="timer(list.createdAt)"></div>
              <div class="like-box">
                <span @click="like(list)"><i :class="['icon','iconfont','icon-icon_wendaxiangqing_dianzan',{'yellow':list.likeStatus==1}]"></i><span v-text="list.good"></span></span>
<!--
                <span @click="noLike(list)"><i :class="['icon','iconfont','icon-icon_wendaxiangqing_dianzan-copy',{'yellow':list.likeStatus==2}]"></i><span v-text="list.bad"></span></span>
-->
              </div>
            </div>
          </li>
          <li v-if="answers&&answers.length>=10" class="look-more" @click="loadBottom" v-text="moreText"></li>
        </ul>
      <ul v-if="relatesList!==null" class="list-relates">
        <li>相关问答</li>
        <li v-for="qs in relatesList" @click="routerDetail(qs.id)">
          <div class="title" v-text="qs.title"></div>
          <div class="num"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i><span v-text="qs.answerNum"></span></div>
        </li>
      </ul>
    <div class="answer-btn-bg" @click="routerAnswer(data.id)" v-show="!isApp">
      <div class="answer-btn">
        <img src="../../assets/img/answerBtn.png">
        <span>回答</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  .ask-detail{
    ul.list-relates{
      padding:0 15/@base;
      background-color: #fff;
      margin-top:10/@base;
      li:first-child{
        font-size: 14/@base;
        color: #656565;
        padding:12/@base 0;
      }
      li{
        display:box;
        display:-webkit-box;
        display:-moz-box;
        border-bottom:1px solid #eee;
        div{
          padding:28/@base 0;
        }
        div.title{
          font-size: 16/@base;
          color: #4A4A4A;
          line-height: 24px;
          box-flex:1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          margin-right:38/@base;
        }
        div.num{
          margin-right:10/@base;
          i,span{
            vertical-align: middle;
          }
          i.icon{
            margin-right:6/@base;
            display: inline-block;
            margin-top:-4/@base;
          }
          font-size: 12/@base;
          color: #9B9B9B;
        }
      }
    }
    .mu-appbar{
      background-color: #fff;
      height:44/@base;
      color:#565656;
      font-size: 27/@base;
      border-bottom:1px solid #ececec;
      div.right{
        i.icon{
          color:#F14114;
        }
        i.icon-icon_shoucangfangyuan,i.icon-icon_yishoucangfangyuan {
          font-size: 27/@base;
          position: relative;
          top:2/@base;
          margin-right:10/@base;
          color:#F14114;
        }
        i.icon-fenxiang{
          font-size: 24/@base;
        }
      }
      div.mu-appbar-title>span{
        margin-left:30/@base;
      }
    }
    p.answerNum{
      width:100%;
      margin:15/@base auto;
      font-size: 12px;
      color: #9B9B9B;
      text-align: center;
    }
    p.no-more{
      width:126/@base;
      height:126/@base;
      margin:100/@base auto;
      text-align: center;
      color:#565656;
      img{
        width:126/@base;
        height:126/@base;
      }
    }
    div.ask-content{
      background-color: #fff;
      padding:15/@base 20/@base;
      p.ask-title{
        font-size: 18/@base;
        color: #1E1E1E;
        line-height: 26/@base;
        vertical-align: middle;
      }
      p.ask-tip{
        padding:15/@base 0;
        font-size: 14/@base;
        color: #4A4A4A;
        line-height: 24/@base;
      }
      div.ask-img{
        display:box;
        display:-webkit-box;
        display:-moz-box;
        margin-top:10/@base;
        div{
          display:block;
          width:60/@base;
          height:60/@base;
          margin-right:20/@base;
          img{
            width:100%;
            height:100%;
          }
        }
      }
      div.ask-tips{
        margin-top:10/@base;
        span{
          background: #EBEBEB;
          border-radius: 1px;
          display:inline-block;
          text-align: center;
          font-size: 12/@base;
          color: #9B9B9B;
          line-height:12/@base;
          padding:2/@base 5/@base;
          margin-right:10/@base;
        }
      }
      div.ask-user{
        margin-top:10/@base;
        color: #9B9B9B;
        span{
          font-size: 12/@base;
          color: #9B9B9B;
          i.icon{
            font-size: 14/@base;
          }
        }
      }
    }
    ul.ask-answer-list{
      margin-top:10/@base;
      margin-bottom:50/@base;
      li.look-more{
        padding:10/@base 0;
        background-color: #ececec;
        color:#565656;
        text-align: center;
      }
      li{
        padding:20/@base;
        background-color: #fff;
        border-bottom:1px solid #ececec;
        div.content-img{
          display:box;
          display:-webkit-box;
          display:-moz-box;
          margin:10/@base 0 0 0 ;
        }
        div.content-img>div{
          margin-right:4/@base;
          width:33%;
          img{
            width:100%;
            height:80/@base;
          }
        }
        div.top-user{
          overflow: hidden;
          div.user-left{
            float:left;
            img{
              width:20/@base;
              height:20/@base;
              border-radius: 50%;
              vertical-align: middle;
              margin-right:10/@base;
            }
            span{
              font-size: 14/@base;
              color: #9B9B9B;
              vertical-align: middle;
            }
          }
          div.user-right{
            margin-top:5/@base;
            float:right;
            font-size: 12/@base;
            color: #9B9B9B;
            span{
              font-size: 12/@base;
            }
          }
        }
        div.center-content{
          font-size: 16/@base;
          color: #4A4A4A;
          line-height: 26/@base;
          margin-top:20/@base;
          word-break:break-all;
        }
        div.bottom-content{
          overflow: hidden;
          margin-top:20/@base;
          div.time{
            font-size: 12/@base;
            float:left;
            color: #9B9B9B;
          }
          div.like-box>span:first-child{
            margin-right:20/@base;
          }
          div.like-box{
            float:right;
            font-size: 12/@base;
            color: #9B9B9B;
            position: relative;
            top:-5/@base;
            i{
              vertical-align: middle;
              margin-right:5/@base;
            }
            i.yellow{
              color:#F6A623!important;
            }
            span{
              vertical-align: middle;
            }
          }
        }
      }
    }
    div.answer-btn-bg{
      border-top: 1px solid #ececec;
      width:100%;
      height:50/@base;
      text-align: center;
      background: rgba(255,255,255,0.90);
      font-size: 14/@base;
      position: fixed;
      bottom:0;
      .answer-btn{
        background: #F14114;
        border-radius: 100/@base;
        height:34/@base;
        width:320/@base;
        margin:8/@base auto;
        img{
          width:20/@base;
          height:20/@base;
          vertical-align: middle;
        }
        span{
          line-height:34/@base;
          font-size: 14px;
          color: #FFFFFF;
          vertical-align: middle;
        }

      }
    }
  }
  div.swiper-class{
    width: 100%;
    height: 100%;
    background-color: #000;
    .mu-dialog-body{
      padding:0;
      height:100%;
      width:100%;
      .close-swiper{
        color:#fff;
        font-size: 16/@base;
        position: absolute;
        right:20/@base;
        top:20/@base;
      }
    }
    .swiper-container{
      top:30%;
      overflow: initial;
    }
    .swiper-container-autoheight .swiper-wrapper{
      height:200/@base!important;
      .swiper-slide{
        height:100%;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .swiper-pagination{
      width:60/@base;
      font-size: 12/@base;
      color: #FFFFFF;
      height:16/@base;
      line-height:16/@base;
      background-color: rgba(0,0,0,.4);
      border-radius: 8/@base;
      left:43%;
      top:-140/@base;
    }
  }
</style>
<script>
  import Vue from 'vue'
  import {rxUtils} from '../../assets/js/rxUtils'
  import { Loadmore } from 'mint-ui';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  Vue.component(Loadmore.name, Loadmore);
  export default{
    data(){
          return {
            isApp:false,
            hideTitle:false,
            swiperDialog:false,
            toast:false,
            toastMsg:'',
            relatesList:[],
            allLoaded:false,
            id:'',
            data:{},
            imgUrl:'',
            answers:[],
            currentPage:1,
            timer:function(val){
              let date=new Date(val);
              let year=date.getFullYear();
              let mouth=date.getMonth()+1;
              let data=date.getDate();
              let hours=date.getHours();
              let minute=date.getMinutes();
              let seconds=date.getSeconds();
              return year+'-'+mouth+'-'+data+' '+hours+':'+minute+':'+seconds
            },
            moreText:'点击查看更多>>',
            userImg:''
          }
      },
    props:{
      swiperOption:{
        type:Object,
        default: function () {
          let self=this;
          return {
            // 所有配置均为可选（同Swiper配置）
            autoplay: 3000,
            direction : 'horizontal',
            grabCursor : true,
            setWrapperSize :true,
            autoHeight: true,
            loop:true,
            speed:500,
            paginationType: 'fraction',
            autoplayDisableOnInteraction:false,
            pagination : '.swiper-pagination',
            paginationClickable :true,
            mousewheelControl : false,
            observeParents:true,
            debugger: true,
            initialSlide:0,
            // swiper callbacks
            // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
            onSlideChangeEnd: function(swiper){
//              self.initialSlide=swiper.activeIndex;
            }
            // more Swiper config ...
            // ...
          }
        }

      }
    },
    mounted(){
      let self=this;
      this.$nextTick(function (){
        this.id=this.$route.params.id;
        this.imgUrl=rxUtils.hostAsk;
        this.userImg=rxUtils.hostPhoto;
        document.title=this.$route.name;
        //获取APP标识
        self.isApp = self.$route.query.isApp?self.$route.query.isApp:false;
        self.hideTitle = self.$route.query.hideTitle?self.$route.query.hideTitle:false;

        self.$http.post('/question/getDetail.json', {
          id:self.id
        }, {emulateJSON: true})
          .then(function (response) {
            self.data=response.body.data;
          }).then(function (error) {
        })
        self.$http.post('/question/listRelates.json?region='+self.$route.query.code, {
          questionId:self.id
        }, {emulateJSON: true})
          .then(function (response) {
            self.relatesList=response.data.data;
          }).then(function (error) {
        })
        self.$http.get('/question/listAnswers.json?questionId='+self.id+'&pageSize=10&currentPage='+self.currentPage, {}, {emulateJSON: true})
          .then(function (response) {
            console.log(response.data.data)
            self.answers=response.data.data;
          }).then(function (error) {
        })
      })
    },
    methods:{
      favor(){
        let self=this;
        if(self.data.favor){
          self.$http.post('/question/doFavor.json', {
            questionId:self.id,region:sessionStorage.getItem("code")
          }, {emulateJSON: true})
            .then(function (response) {
              if(response.body.code!==405){
                if(response.data.success){
                  self.data.favor=false;
                  self.toastMsg='取消收藏成功'
                  self.toast = true
                  if (self.toastTimer) clearTimeout(self.toastTimer)
                  self.toastTimer = setTimeout(() => { self.toast = false }, 1000)
                }
              }else{
                self.toastMsg='请先登录！'
                self.toast = true
                if (self.toastTimer) clearTimeout(self.toastTimer)
                self.toastTimer = setTimeout(() => {
                  self.toast = false;
                  self.$router.push({name:'登录首页'})
                }, 1000)
              }
            }).then(function (error) {
          })
        }else{
          self.$http.post('/question/doFavor.json', {
            questionId:self.id,region:sessionStorage.getItem("code")
          }, {emulateJSON: true})
            .then(function (response) {
              if(response.body.code!==405){
                if(response.body.success){
                  self.data.favor=true;
                  self.toastMsg='收藏成功'
                  self.toast = true
                  if (self.toastTimer) clearTimeout(self.toastTimer)
                  self.toastTimer = setTimeout(() => { self.toast = false }, 1000)
                }
              }else{
                self.toastMsg='请先登录！'
                self.toast = true
                if (self.toastTimer) clearTimeout(self.toastTimer)
                self.toastTimer = setTimeout(() => {
                  self.toast = false;
                  self.$router.push({name:'登录首页'})
                }, 1000)
              }
            }).then(function (error) {
          })
        }

      },//分享
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },//隐藏toast
      loadTop(){
        let self=this;
        self.currentPage=1;
        setTimeout(function(){
          self.$http.get('/question/listAnswers.json?questionId='+self.id+'&pageSize=10&currentPage='+self.currentPage, {}, {emulateJSON: true})
            .then(function (response) {
              console.log(response.body.data)
              self.answers=response.body.data;
              self.$refs.loadmore.onTopLoaded();
            }).then(function (error) {
          })
        },2000)
      },//下拉刷新
      loadBottom(){
        let self=this;
        self.currentPage=self.currentPage+1;
        self.$http.get('/question/listAnswers.json?questionId='+self.id+'&pageSize=10&currentPage='+self.currentPage, {}, {emulateJSON: true})
          .then(function (response) {
            if(response.body.data!==null){
              for(let i=0;i<response.body.data.length;i++){
                self.answers.push(response.body.data[i])
              }
            }else{
              self.moreText='没有更多了...'
            }
          }).then(function (error) {
        })
//        this.$refs.loadmore.onBottomLoaded();
      },//上拉加载
      back(){
          this.$router.back();
      },//返回上一页
      like(data){
        let self=this;
        if(data.likeStatus==0) {
          self.$http.post('/question/doLike.json', {
            answerId: data.id,
            status: 1
          }, {emulateJSON: true})
            .then(function (response) {
              if(response.body.code!==405){
                if (response.body.success) {
                  data.good += 1;
                  data.likeStatus = 1;
                }
              }else{
                self.toastMsg='请先登录！'
                self.toast = true
                if (self.toastTimer) clearTimeout(self.toastTimer)
                self.toastTimer = setTimeout(() => {
                  self.toast = false;
                  self.$router.push({name:'登录首页'})
                }, 1000)
              }
            }).then(function (error) {
          })
        }else if(data.likeStatus==1){
          self.toastMsg='您已经点过赞了哦！'
          self.toast = true
          if (self.toastTimer) clearTimeout(self.toastTimer)
          self.toastTimer = setTimeout(() => { self.toast = false }, 1000)
        }else{
          self.toastMsg='不能再点赞了哦！'
          self.toast = true
          if (self.toastTimer) clearTimeout(self.toastTimer)
          self.toastTimer = setTimeout(() => { self.toast = false }, 1000)
        }
      },//点赞
      noLike(data){
        let self=this;
        if(data.likeStatus==0){
          self.$http.post('/question/doLike.json', {
            answerId:data.id,
            status:2
          }, {emulateJSON: true})
            .then(function (response) {
              if(response.body.code!==405){
                if(response.data.success){
                  data.bad+=1;
                  data.likeStatus=2;
                }
              }else{
                self.toastMsg='请先登录！'
                self.toast = true
                if (self.toastTimer) clearTimeout(self.toastTimer)
                self.toastTimer = setTimeout(() => {
                    self.toast = false;
                    self.$router.push({name:'登录首页'})
                }, 1000)
              }
            }).then(function (error) {
          })
        }else if(data.likeStatus==2){
          self.toastMsg='您已经踩过了哦！'
          self.toast = true
          if (self.toastTimer) clearTimeout(self.toastTimer)
          self.toastTimer = setTimeout(() => { self.toast = false }, 1000)
        }else{
          self.toastMsg='不能再踩了哦！'
          self.toast = true
          if (self.toastTimer) clearTimeout(self.toastTimer)
          self.toastTimer = setTimeout(() => { self.toast = false }, 1000)
        }
      },//点踩
      routerAnswer(id){
        let authentication = rxUtils.sessionStorage.getItem("authentication")?rxUtils.sessionStorage.getItem("authentication"):null;
        if(authentication){
          this.$router.push({name:'回答',params:{id:id}})
        }else{
          this.toastMsg='请先登录'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.toast = false;
            this.$router.push({name:'登录首页'})
          }, 2000)
        }
      },//跳转回答页面
      routerDetail(id){
        if(this.isApp){
          this.$router.push({name:'问答详情',params:{id:id,isApp:this.isApp,hideTitle:this.hideTitle}})
        }else{
          this.$router.push({name:'问答详情',params:{id:id}})
        }
        this.$router.go(0)
      }//跳转问答详情
    },
    components: {
      swiper,
      swiperSlide,
    }
  }
</script>
