<template>
  <div class="my-center">
    <div class="top-content">
      <div v-if="!token" class="user-img"><img src="../assets/img/morenNoLogin.png" alt=""></div>
      <div v-else class="user-img user-token">
        <img v-if="data.photo&&data.photo.indexOf('http')>-1" :src="data.photo==null||data.photo==''?normalHeader:data.photo" alt="">
        <img v-else :src="data.photo==null||data.photo==''?normalHeader:imgUrl+data.photo" alt="">
      </div>
      <span v-if="!token" @click="routerReg">登录/注册</span>
      <div class="user-info" v-else>
        <p :class="{'name-middle':!data.email&&!data.phone}" v-text="data.name"></p>
        <p v-if="data.email" v-text="data.email"></p>
        <p v-else-if="data.phone" v-text="data.phone"></p>
      </div>
      <!--<div class="icon" @click="router('消息')">
        <img src="../assets/img/icon-icon_xiaoxitixing.svg">
      </div>-->
    </div>
    <div class="fov-content clearfix">
      <div class="fov float-l">
        <i class="icon iconfont icon-icon-shoucangx"></i>
      </div>
      <div class="fov-list float-l clearfix">
        <div class="float-l" @click="routerFavoList('house')">
          <p v-text="faData.countResidence==undefined?'—':faData.countResidence>99?'99+':faData.countResidence"></p>
          <p>房源</p>
        </div>
        <div class="float-l" @click="routerFavoList('info')">
          <p v-text="faData.countInfo==undefined?'—':faData.countInfo>99?'99+':faData.countInfo"></p>
          <p>资讯</p>
        </div>
        <div class="float-l" @click="routerFavoList('enc')">
          <p v-text="faData.countBaike==undefined?'—':faData.countBaike>99?'99+':faData.countBaike"></p>
          <p>百科</p>
        </div>
        <div class="float-l" @click="routerFavoList('ask')">
          <p v-text="faData.countWd==undefined?'—':faData.countWd>99?'99+':faData.countWd"></p>
          <p>问答</p>
        </div>
      </div>
    </div>

    <ul class="menu-list">
      <li @click="router('看房记录','follow')">
        <div><i class="icon iconfont icon-icon_gerenzhongxin_fangyuanliulanjilux"></i>房源浏览记录</div>
      </li>
      <li @click="router('我的问答','look')">
        <div>
          <i class="icon iconfont icon-icon_gerenzhongxin_wodehuida"></i>我的问答
        </div>
      </li>
      <li>
        <router-link to="calculator">
          <div>
            <i class="icon iconfont icon-icon_gerenzhongxin_fangdaijisuanqi"></i>房贷计算器
          </div>
        </router-link>
      </li>
    </ul>
    <ul class="menu-list ">
      <li @click="router('设置首页')">
        <div>
          <i class="icon iconfont icon-icon_gerenzhongxin_zhanghushezhi"></i>账户设置
        </div>
      </li>
      <li @click="router('关于我们','rent')">
        <div>
          <i class="icon iconfont icon-icon_gerenzhongxin_guanyuwomen"></i>关于我们
        </div>
      </li>
    </ul>
    <div class="mu-paper mu-paper-round mu-paper-1" style="display: block;position: fixed;bottom:0;z-index: 999999999999999;">
      <div tabindex="0" class="mu-bottom-nav"
           style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none; display: flex;">
        <div class="mu-bottom-nav-shift-wrapper">
          <button  @click="routerNav('首页')" type="button" tabindex="0" class="mu-buttom-item"
                  style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
            <div class="mu-buttom-item-wrapper">
              <div class="mu-ripple-wrapper"></div>
              <i class="mu-bottom-item-icon mu-icon material-icons icon iconfont icon-icon_shouye"> </i> <span
              class="mu-bottom-item-text">首页</span></div>
          </button>
          <button  @click="routerNav('精选')" type="button" tabindex="0" class="mu-buttom-item"
                  style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
            <div class="mu-buttom-item-wrapper">
              <div class="mu-ripple-wrapper"></div>
              <i class="mu-bottom-item-icon mu-icon material-icons icon iconfont icon-icon_jingxuan"> </i> <span
              class="mu-bottom-item-text">精选</span></div>
          </button>
          <button  @click="routerNav('问答列表')" type="button" tabindex="0" class="mu-buttom-item"
                  style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
            <div class="mu-buttom-item-wrapper">
              <div class="mu-ripple-wrapper"></div>
              <i class="mu-bottom-item-icon mu-icon material-icons icon iconfont icon-icon_wenda"> </i> <span
              class="mu-bottom-item-text">问答</span></div>
          </button>
          <button  @click="routerNav('个人中心')" type="button" tabindex="0" class="mu-buttom-item mu-bottom-item-active"
                  style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
            <div class="mu-buttom-item-wrapper">
              <div class="mu-ripple-wrapper"></div>
              <i class="mu-bottom-item-icon mu-icon material-icons icon iconfont icon-icon_wode_yixuan"> </i> <span
              class="mu-bottom-item-text">我的</span></div>
          </button>
        </div>
      </div>
    </div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../assets/css/mix.less";
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
  .my-center{
    button.mu-bottom-item-active{
      span.mu-bottom-item-text{
        color:#f14114;
      }
      i.icon-icon_shouye_yixuan,i.icon-icon_jingxuan_yixuan,i.icon-icon_wenda_yixuan,i.icon-icon_wode_yixuan{
        color:#f14114;
      }
    }
    padding-bottom:60/@base;
    .menu-list>li>a{
      display: block;
      color: #4A4A4A;
    }
    .menu-list{
      margin-top:15/@base;
      width: 100%;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      li {
        background: #fff;
        width: 100% -11 / @base;
        padding: 0 20/@base;
        div{
          height:50/@base;
          border-bottom: 1px solid #ddd;
          padding:11/@base 0;
          font-size: 16/@base;
          color: #4A4A4A;
          i:nth-child(1) {
            color: #aaa;
            font-size: 20 / @base;
            vertical-align: middle;
            margin-right: 15 / @base;
            position: relative;
            top:-1px;
          }
          span{
            font-size: 14/@base;
            float:right;
            color: #9B9B9B;
            margin-top:6/@base;
          }
          i.icon-icon_gerenzhongxin_fangyuanliulanjilux{
            color:#A86BDF;
          }
          i.icon-icon_gerenzhongxin_wodehuida{
            color:#E95FA5;
          }
          i.icon-icon_gerenzhongxin_fangdaijisuanqi{
            color:#FC6A45;
          }
          i.icon-icon_gerenzhongxin_zhanghushezhi{
            color:#78B831 ;
          }
          i.icon-icon_gerenzhongxin_guanyuwomen{
            color:#DACF40;
          }
        }
      }
      li:last-child div{
        border-bottom: 0;
      }
    }
    .top-content{
      .user-token{
        background: rgba(255,255,255,1);
        border-radius:50%;
      }
      width:100%;
      height:140/@base;
      background: #fff;
      position:relative;
      div.icon{
        position: absolute;
        width:55/@base;
        height:30/@base;
        line-height: 30/@base;
        top:20/@base;
        right:0;
        background: #F2E6E6;
        border-radius: 19px 0 0 19px;
        padding:0 10/@base;
        .icon-icon_xiaoxitixing{
          color:#FF7F5F;
          font-size: 28/@base;
        }
      }

      div.user-img{
        position: absolute;
        left:15/@base;
        top:54/@base;
        width:60/@base;
        height:60/@base;
        img{
          width:100%;
          height:100%;
          border-radius: 50%;
        }
      }
      span{
        background: #F14114;
        text-align: center;
        color:#fff;
        font-size: 14/@base;
        display:block;
        width:130/@base;
        height:32/@base;
        line-height:32/@base;
        position: absolute;
        top:75/@base;
        left:112/@base;
        border-radius: 4/@base;
      }
      div.user-info{
        top:54/@base;
        left:95/@base;
        position: absolute;
        p:first-child{
          color:#1E1E1E;
          font-size: 20/@base;
          font-weight: bold;
        }
        p:nth-child(2){
          color:#1E1E1E;
          font-size: 16/@base;
          margin-top:8/@base;
        }
        p.name-middle{
          margin-top:21/@base;
        }
      }
    }
    div.fov-content{
      padding-left:15/@base;
      height:70/@base;
      background:#fff;
      border-bottom: 1px solid #ddd;
      div.fov{
        i.icon-icon-shoucangx{
          color:#F14114;
          font-size: 38/@base;
        }
      }
      div.fov-list{
        width:320/@base;
        position: relative;
        div:not(:first-child):after{
          content: ' ';
          border-right:1px solid #ececec;
          position: absolute;
          height:20/@base;
          top:18/@base;
        }
        /*div:nth-child(2){
          border-left:1px solid #ececec;
          border-right:1px solid #ececec;
        }
        div:nth-child(3){
          border-right:1px solid #ececec;
        }*/
        div{
          width:25%;
          p{
            text-align: center;
          }
          p:first-child{
            color:#4a4a4a;
            font-size: 20/@base;
            font-weight: bold;
          }
          p:last-child{
            color:#656565;
            font-size: 14/@base;
          }
        }
        div.tips{
          background:#ff7f5f;
          color:#fff;
          text-align: center;
          height:22/@base;
          line-height:22/@base;
          width:100/@base;
          position: absolute;
          top:0;
          left:0;
          border-radius: 0 0 11/@base 0;
          span{
            font-size: 12px;
            -webkit-transform-origin-x: 0;
            -webkit-transform: scale(0.9);
            display: block;
          }
        }
      }
    }

  }
</style>
<script>
  import Vue from 'vue'
  import { CellSwipe } from 'mint-ui';
  Vue.component(CellSwipe.name, CellSwipe);
  import {rxUtils} from '../assets/js/rxUtils'
  export default{
      data(){
        return {
          token:false,
          data:{},
          normalHeader:require('../assets/img/morenNoLogin.png'),
          toast:false,
          toastMsg:'',
          faData:{},
          imgUrl:''
        }
      },
      mounted(){
        let self=this;
        document.title=this.$route.name;
        self.imgUrl=rxUtils.hostPhoto;
        if(rxUtils.sessionStorage.getItem("authentication")){
          this.token=true;
        }else{
          this.token=false;
        }
        this.$nextTick(function () {
          self.$http.post('/user/myInfo.json', {
            region:sessionStorage.getItem('code')
          }, {emulateJSON: true})
            .then(function (response) {
                if(response.body.code==405){
                    this.token=false;
                }else{
                    this.token=true;
                    self.data=response.body.data?response.body.data.user:null;
                    self.faData=response.body.data;
                }
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
              var region = this.$route.query.region?this.$route.query.region:sessionStorage.getItem('region');
              var code = this.$route.query.code?this.$route.query.code:sessionStorage.getItem('code');
            this.$router.push({name:name,query:{region:region,code:code}});
          }
        },
        hideToast () {
          this.toast = false
          if (this.toastTimer) clearTimeout(this.toastTimer)
        },
        routerFavoList(type){
          if(this.token){
            if(type=='house'){
              _czc.push(['_trackEvent', '我的', 'UserLikeHouses','收藏房源']);
            }else if(type=='info'){
              _czc.push(['_trackEvent', '我的', 'UserLikeNews','收藏资讯']);
            }else if(type=='enc'){
              _czc.push(['_trackEvent', '我的', 'UserLikeWiki','收藏百科']);
            }else if(type=='ask'){
              _czc.push(['_trackEvent', '我的', 'UserLikeQuestions','收藏问答']);
            }
            var region = this.$route.query.region?this.$route.query.region:sessionStorage.getItem('region');
            var code = this.$route.query.code?this.$route.query.code:sessionStorage.getItem('code');
            this.$router.push({name:'收藏列表',params:{type:type},query:{region:region,code:code}})
          }else{
            this.toastMsg='请先登录'
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => {
              this.toast = false;
              this.$router.push({name:'登录首页'})
            }, 1000)
          }
        },
        router(name,type){
            if(!this.token){
              if(name=='计算器'){
                _czc.push(['_trackEvent', '我的', 'CaculatorInUser','房贷计算器']);
                this.$router.push({name:name,params:{type:type}})
              }else if(name=='关于我们'){
                _czc.push(['_trackEvent', '我的', 'AboutUS','关于我们']);
                this.$router.push({name:name,params:{type:type}})
              }else{
                this.toastMsg='请先登录'
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => {
                  this.toast = false;
                  this.$router.push({name:'登录首页'})
                }, 1000)
              }
            }else{
              if(name=='看房记录'){
                _czc.push(['_trackEvent', '我的', 'UserHouseHistory','房源浏览记录']);
              }else if(name=='我的问答'){
                _czc.push(['_trackEvent', '我的', 'MyQuestions','我的问答']);
              }else if(name=='设置首页'){
                _czc.push(['_trackEvent', '我的', 'AccountSettings','账户设置']);
              }
              this.$router.push({name:name})
            }
        },
        routerReg(){
            _czc.push(['_trackEvent', '我的', 'LoginRegister','登录注册']);
            this.$router.push({name:'登录首页',query:{type:'login'}})
        }
      }
  }
</script>
