<template>
  <div class="askTag-index clearMargin">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>#{{title}}#</span></div>
      <div class="right">
      </div>
    </div>
    <div class="MT44"></div>
    <div class="sort clearfix ">
      <div class="float-l">筛选</div>
      <div class="float-r">
        <mu-tabs :value="activeTab" @change="handleTabChange">
          <mu-tab value="hot" title="热度"/>
          <mu-tab value="new" title="最新"/>
        </mu-tabs>
      </div>
    </div>

    <mt-loadmore v-if="activeTab=='hot'&&datas!==null" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="ask-list">
       <li v-for="list in datas" :key="list.id" @click.stop="routerDetail(list.id)">
        <div class="list-top">
          <img  src="../../assets/img/ask2.png">
          <span class="ask-title bold" v-html="list.title.replace(title, '<span class=\'highlight\' >'+title+'</span>')"></span>
          <img v-if="list.images!==null&&list.images!==''" src="../../assets/img/hasPic.png">
        </div>
         <div class="top-user" v-if="list.answer">
           <div class="user-left">
             <img src="../../assets/img/morenuser.png" alt="">
             <span v-text="list.answer.nikeName+' 的回答'"></span>
           </div>
         </div>
        <div class="remark" v-if="list.answer">
          <span  v-text="list.answer.content.length>70?list.answer.content.substring(0,70)+'...':list.answer.content"></span>
        </div>
        <div class="list-bottom clearfix">
          <span class="ask-time" v-text="'提问于'+list.dateFmt"></span>
          <span class="answer float-r" ><span class="c-000">{{list.answerNum}}</span>回答</span>
          <span class="answer float-r" ><span class="c-000">{{list.viewCount}}</span>浏览&nbsp;&nbsp;</span>
        </div>
        <!--<button class="answer-btn" @click.stop="routerAns(list.id)">回答</button>-->
      </li>
      </ul>
    </mt-loadmore>
    <mt-loadmore  v-if="activeTab=='new'&&datas1!==null" :top-method="loadTop1" :bottom-method="loadBottom1" :bottom-all-loaded="allLoaded1" ref="loadmore1">
      <ul class="new-list">
        <li v-for="list in datas1" :key="list.id" @click.stop="routerDetail(list.id)">
          <div class="list-top">
            <img  src="../../assets/img/ask2.png">
            <span class="ask-title bold" v-html="list.title.replace(title, '<span class=\'highlight\' >'+title+'</span>')"></span>
            <img v-if="list.images!==null&&list.images!==''" src="../../assets/img/hasPic.png">
          </div>
          <div class="top-user" v-if="list.answer">
            <div class="user-left">
              <img src="../../assets/img/morenuser.png" alt="">
              <span v-text="list.answer.nikeName+' 的回答'"></span>
            </div>
          </div>
          <div class="remark" v-if="list.answer">
            <span  v-text="list.answer.content.length>70?list.answer.content.substring(0,70)+'...':list.answer.content"></span>
          </div>
          <div class="list-bottom clearfix">
            <span class="ask-time" v-text="'提问于'+list.dateFmt"></span>
            <span class="answer float-r" ><span class="c-000">{{list.answerNum}}</span>回答</span>
            <span class="answer float-r" ><span class="c-000">{{list.viewCount}}</span>浏览&nbsp;&nbsp;</span>
          </div>
        </li>
      </ul>
    </mt-loadmore>
    <div  style="color:#4a4a4a;font-size: 16px;width:100%;text-align: center;margin-top:40px;" v-if="activeTab=='hot'&&datas==null">暂无热门问题</div>
    <div style="color:#4a4a4a;font-size: 16px;width:100%;text-align: center;margin-top:40px;" v-if="activeTab=='new'&&datas1==null" >暂无最新问题</div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  div.mu-paper{
    width:100%;
    i.mu-bottom-item-icon{
      font-size: 24/@base;
    }
    span.mu-bottom-item-text{
      font-size: 15/@base;
    }
    button.mu-bottom-item-active{
      span.mu-bottom-item-text{
        color:#f14114;
      }
      i.icon-icon_shouye_yixuan,i.icon-icon_jingxuan_yixuan,i.icon-icon_wenda_yixuan,i.icon-icon_wode_yixuan{
        color:#f14114;
      }
    }
  }
  .askTag-index{
    color:#f6f6f6;
    span.mint-loadmore-text{
      color:#000;
    }
    div.mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#000;
      font-size: 27/@base;
      position: fixed;
    }
    div.banner-bg{
      height:160/@base;
      background-color: #0F8DED;
      div.top-img{
        position: relative;
        width:100%;
        height:100%;
        img{
          width:100%;
          height:100%;
          vertical-align: bottom;
        }
      }
    }
    div.tags-bg{
      height:130/@base;
      background-color: #fff;
      padding:10/@base;
      border-bottom: 1px solid #ececec;
      .tags-title{
        height:30/@base;
        line-height:30/@base;
        font-size: 14/@base;
        color: #656565;
        padding:0 5/@base;
        .more{
          color:#656565;
          img{
            width: 18/@base;
            height: 18/@base;
            vertical-align: middle;
          }
          span{
            font-size: 12/@base;
            font-weight: normal;
          }
        }
      }
      .tags-content{
        color: #656565;
        .tag{
          border: 1px solid #C2C2C2;
          padding:0 8/@base;
          margin:7/@base 5/@base;
        }
      }
    }
    div.sort{
      width:100%;
      line-height:40/@base;
      font-size: 14px;
      color: #656565;
      padding-left:15/@base;
      background-color: #fff;
      z-index: 999;
      border-top: 1px solid #ececec;
      border-bottom: 1px solid #ececec;
      div.mu-tabs{
        background-color: #fff;
        height:40/@base;
        width:120/@base;
        button{
          height:20/@base;
          padding:0;
          min-height:20/@base;
          font-size: 14/@base;
          color: #9B9B9B;
        }
        button:nth-child(1){
          border-right: 1px solid #9B9B9B;
          font-size: 14/@base;
          color: #9B9B9B;
        }
        button.mu-tab-active{
          color: #F14114;
        }
        span.mu-tab-link-highlight{
          background-color: #fff;
        }
      }
    }

    ul.ask-list,ul.new-list{
      li{
        position: relative;
        padding:20/@base 15/@base 20/@base 30/@base;
        background-color: #fff;
        border-bottom:1px solid #ececec;
        div.list-top{
          position: relative;
          img:first-child{
            width:25/@base;
            height:20/@base;
            vertical-align: middle;
            position: absolute;
            left:-30/@base;
            top:3/@base;
          }
          img{
            width:16/@base;
            height:16/@base;
            vertical-align: middle;
          }
          span.ask-title{
            font-size: 18/@base;
            color: #1E1E1E;
            line-height: 26/@base;
            vertical-align: middle;
            .highlight{
              font-size: 18/@base;
              color: #FF690C;
            }
          }
        }
        div.top-user{
          padding-top:10/@base;
          overflow: hidden;
          div.user-left{
            img{
              width:20/@base;
              height:20/@base;
              border-radius: 50%;
              vertical-align: middle;
            }
            span{
              font-size: 14/@base;
              color: #656565;
              vertical-align: middle;
            }
          }
        }
        div.remark{
          padding:15/@base 0;
          max-height:96/@base;
          overflow: hidden;
          img{
            width:16/@base;
            height:16/@base;
            vertical-align: middle;
          }
          span{
            font-size: 14/@base;
            color: #656565;
            line-height: 22/@base;
          }
        }
        div.tips{
          padding-top: 5/@base;
          span{
            display:inline-block;
            width:52/@base;
            text-align: center;
            font-size: 12/@base;
            color: #81a1c6;
            background-color: #ebf0f5;
            margin-right:10/@base;
          }
          span:nth-child(2n){
            border-left:1px solid #ececec;
            border-right:1px solid #ececec;
          }
        }
        div.list-bottom{
          padding-top: 5/@base;
          i.icon-icon_wenda_yixuan{
            color:#c2c2c2;
            font-size: 14/@base;
          }
          span{
            font-size: 12/@base;
            color: #9B9B9B;
          }
          >span:first-child{
            margin-right:22/@base;
          }
        }
        button.answer-btn{
          width:76/@base;
          text-align: center;
          height:26/@base;
          line-height:26/@base;
          border:1px solid rgba(241,65,20,0.53);
          border-radius: 13/@base;
          position: absolute;
          right:20/@base;
          bottom:20/@base;
          background-color: #fff;
          font-size: 14/@base;
          color: #F14114;
        }
        div.img-list{
          img{
            width:110/@base;
            height:80/@base;
          }
          img:nth-child(2){
            margin:0 2/@base;
          }
        }
      }
    }
    a.question-btn{
      width:52/@base;
      height:52/@base;
      background-color:  rgba(241,65,20,0.70);
      color:#fff;
      font-size: 14/@base;
      line-height: 16/@base;
      display:block;
      position: fixed;
      border:4/@base solid rgba(255,139,109,0.60);
      border-radius: 50%;
      bottom:98/@base;
      right:20/@base;
      text-align: center;
      span{
        padding-top:6/@base;
        display: block;
      }
    }
    button.mu-bottom-item-active{
      span.mu-bottom-item-text{
        color:#f14114;
      }
      i.icon-icon_shouye_yixuan,i.icon-icon_jingxuan_yixuan,i.icon-icon_wenda_yixuan,i.icon-icon_wode_yixuan{
        color:#f14114;
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  import { Loadmore } from 'mint-ui';
  import {rxUtils} from '../../assets/js/rxUtils'
  Vue.component(Loadmore.name, Loadmore);
  export default{
    data(){
          return {
            title:'',
            activeTab:'hot',
            pageSize:10,
            currentPage:1,
            pageSize1:10,
            currentPage1:1,
            datas:[],
            allLoaded:false,
            allLoaded1:false,
            datas1:[],
            imgUrl:'',
            toast:false,
            toastMsg:''
          }
      },
    mounted(){
        let self=this;
        document.title=self.$route.name;
        self.title=self.$route.query.name;
        self.$nextTick(function () {
          self.imgUrl=rxUtils.hostAsk;
          self.$http.get('/question/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&region='+self.$route.query.code+'&sortBy=1&label='+self.title, {}, {emulateJSON: true})
            .then(function (response) {
                console.log(response)
                self.datas=response.data.data;
            }).then(function (error) {
          })
          self.$http.get('/question/search.json?pageSize='+self.pageSize1+'&currentPage='+self.currentPage1+'&region='+self.$route.query.code+'&sortBy=2&label='+self.title, {}, {emulateJSON: true})
            .then(function (response) {
              self.datas1=response.data.data;
            }).then(function (error) {
          })
        })
      },
    methods:{
      routerNav(name){
        if(name=='首页'){
          _czc.push(['_trackEvent', '首页', 'GotoHome','回到首页']);
        }else if(name=='精选'){
          _czc.push(['_trackEvent', '首页', 'GotoFeatured','精选']);
        }else if(name=='问答列表'){
          _czc.push(['_trackEvent', '首页', 'GotoQuestion','问答']);
        }else if(name=='个人中心'){
          _czc.push(['_trackEvent', '首页', 'GotoUserCenter','我的']);
        }
        if(name=='首页'){
          this.$router.push({name:name});
        }else{
          this.$router.push({name:name,query:{region:this.$route.query.region,code:this.$route.query.code}});
        }
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      routerQuestion(){
        let self=this;
        let authentication = rxUtils.sessionStorage.getItem("authentication")?rxUtils.sessionStorage.getItem("authentication"):null;
        if(authentication){
          self.$router.push({name:'问答',query:{region:this.$route.query.region,code:this.$route.query.code}})
        }else{
          this.toastMsg='请先登录'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.toast = false;
            this.$router.push({name:'登录首页'})
          }, 2000)
        }
      },
      routerDetail(id){
          this.$router.push({name:'问答详情',params:{id:id},query:{region:this.$route.query.region,code:this.$route.query.code}})
      },
      routerAns(id){
          let self=this;
        self.$http.post('/user/myInfo.json', {
        }, {emulateJSON: true})
          .then(function (response) {
            if(response.data.code==405){
              self.toastMsg='请先登录';
              self.toast = true
              if (self.toastTimer) clearTimeout(self.toastTimer)
              self.toastTimer = setTimeout(() => { self.toast = false;self.$router.push({name:'登录首页'})
              },1000)
            }else{
              self.$router.push({name:'回答',params:{id:id},query:{region:this.$route.query.region,code:this.$route.query.code}})
            }
          }).then(function (error) {
        })
      },
      back(){
          this.$router.back();
      },
      handleTabChange(val){
          this.activeTab=val;
          console.log("this.activeTab:"+this.activeTab);
      },
      loadTop() {
        let self=this;
        self.currentPage=1;
        setTimeout(function(){
            self.$http.get('/question/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&region='+self.$route.query.code+'&sortBy=1&label='+self.title, {}, {emulateJSON: true})
              .then(function (response) {
                self.datas=response.data.data;
                self.$refs.loadmore.onTopLoaded();
              }).then(function (error) {
            })
          },2000)
      },
      loadTop1() {
        let self=this;
        self.currentPage1=1;
        setTimeout(function(){
          self.$http.get('/question/search.json?pageSize='+self.pageSize1+'&currentPage='+self.currentPage1+'&region='+self.$route.query.code+'&sortBy=2&label='+self.title, {}, {emulateJSON: true})
            .then(function (response) {
              self.datas1=response.data.data;
              self.$refs.loadmore1.onTopLoaded();
            }).then(function (error) {
          })
        },2000)
      },
      loadBottom() {
        let self=this;
        self.currentPage=self.currentPage+1;
        setTimeout(function(){
          self.$http.get('/question/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&region='+self.$route.query.code+'&sortBy=1&label='+self.title, {}, {emulateJSON: true})
            .then(function (response) {
              if(response.data.data!==null){
                for(let i=0;i<response.data.data.length;i++){
                  self.datas.push(response.data.data[i])
                }
                self.allLoaded = false;// 若数据已全部获取完毕
              }else{
                self.allLoaded = true;// 若数据已全部获取完毕
              }
              self.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        },2000)
      },
      loadBottom1() {
        let self=this;
        self.currentPage1=self.currentPage1+1;
        setTimeout(function(){
          self.$http.get('/question/search.json?pageSize='+self.pageSize1+'&currentPage='+self.currentPage1+'&region='+self.$route.query.code+'&sortBy=2&label='+self.title, {}, {emulateJSON: true})
            .then(function (response) {
              if(response.data.data!==null){
                for(let i=0;i<response.data.data.length;i++){
                  self.datas1.push(response.data.data[i])
                }
                self.allLoaded1 = false;// 若数据已全部获取完毕
              }else{
                self.allLoaded1 = true;// 若数据已全部获取完毕
              }
              self.$refs.loadmore1.onBottomLoaded();
            }).then(function (error) {
          })
        },2000)
      }
    },
  }
</script>
