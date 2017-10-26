<template>
  <div class="choice-index">
    <div class="mu-appbar mu-paper-1">
      <div class="left"></div>
      <div class="mu-appbar-title">
        <span @click="tabChange('house')" :class="[type=='house'?'active':'']">房源</span>
        <span @click="tabChange('message')" :class="[type=='message'?'active':'']">资讯</span>
        <span @click="tabChange('enc')" :class="[type=='enc'?'active':'']">百科</span>
      </div>
      <div class="right"></div>
    </div>
    <div v-if="type=='house'">
      <mt-loadmore v-if="data!==null"  :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" class="houseList-more">
        <ul class="house-list" >
          <li v-for="list in data" @click="routerHouseDetail(list.id)">
            <div class="top-img">
              <img v-if="list.imageslocal" :src="imgAdd+JSON.parse(list.imageslocal).contentslide[0].big" alt="">
              <img v-else-if="list.images&&list.images.length>0&&!list.imageslocal" :src="imgAdd+list.images[0]" alt="">
              <img v-else src="../../assets/img/moren.png" alt="">
              <div v-if="list.marketTime"  class="createdDay-bg" >  {{list.marketTime}}</div>
            </div>
            <div class="bottom-content">
              <h3>
                <span v-if="list.buildingType=='House'">{{list.beds}}卧{{list.baths}}卫·独立屋</span>
                <span v-if="list.buildingType=='Row / Townhouse'">{{list.beds}}卧{{list.baths}}卫·排屋</span>
                <span v-if="list.buildingType=='Apartment'">{{list.beds}}卧{{list.baths}}卫·公寓</span>
              </h3>
              <p class="region" :class="{'LH39':!list.interiorfloorspace||!list.builtIn}">{{list.cityZH}}&nbsp;{{list.city}}</p>
              <p class="builtIn" v-if="list.interiorfloorspace">{{'房屋面积'+list.interiorfloorspace+'平方英尺'}}</p>
              <p class="builtIn" v-if="list.builtIn">{{list.builtIn+'年建造'}}</p>
              <p class="builtIn" v-if="!list.interiorfloorspace&&!list.builtIn">{{timer(list.createdAt)+'上市'}}</p>
              <div class="money-time">
                <p class="money">${{(list.price/10000).toFixed(2)}}万</p>
                <p class="time" v-if="list.interiorfloorspace||list.builtIn">{{timer(list.createdAt)}}上市</p>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <div v-else class="no-more" >
        <img src="../../assets/img/noData.png"/>
        <p>暂无数据</p>
        <p>更换条件试试</p>
      </div>
    </div>

    <div v-if="type=='message'" class="enc-list">
      <div v-if="type1!==null" @click="routerDetail(recommend.id)" class="top-img">
        <img :src="topImg+recommend.imgUrl" alt="">
        <div class="top-title-bg">
          <span class="top-title" v-text="recommend.title"></span>
        </div>
      </div>
      <div v-if="type1!==null" class="tab-content">
        <mt-loadmore :top-method="loadTopMsg" :bottom-method="loadBottomMsg" :bottom-all-loaded="allLoadedMsg" ref="loadmore1">
          <ul class="center-list ">
            <li @click="routerDetail(list.id)" v-for="list in type1" class="clearfix">
              <div class="right-content float-l">
                <p v-text="list.title"></p>
                <div class="tips clearfix">
                  <span :class="[list.source=='淘海房'?'yc':'gray','float-l']" v-text="list.source=='淘海房'?'淘海房原创':list.source"></span>
                  <span class="time float-l" v-text="timer(list.createdAt)"></span>
                  <span class="look-num float-r"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i>{{list.viewcount}}</span>
                </div>

              </div>
              <div class="right-img float-r"><img :src="topImg+list.imgUrl"></div>
              <!--<div style="background: #f28787;" v-if="list.type==1" class="left-img">房产<br>在线</div>
              <div style="background:#A0C565;"  v-if="list.type==2" class="left-img">楼市<br>分析</div>
              <div style="background: #709cdf;"  v-if="list.type==3" class="left-img">热推<br>房源</div>
              <div style="background: #709cdf;"  v-if="list.type==4" class="left-img">移民<br>留学</div>
              <div style="background:#A0C565;" v-if="list.type==5" class="left-img">海外<br>生活</div>
              <div style="background: #f28787;" v-if="list.type==6" class="left-img">名家<br>专栏</div>-->
            </li>
          </ul>
        </mt-loadmore>
      </div>
      <div v-else class="no-more" >
        <img src="../../assets/img/noData.png"/>
        <p>暂无数据</p>
        <p>更换条件试试</p>
      </div>
    </div>
    <div v-if="type=='enc'" class="msg-list">
      <div v-if="type2!==null&&type2.length>0" @click="routerDetailEnc(recommendEnc.id)" class="top-img top-img2">
        <img :src="topImg+recommendEnc.imgUrl" alt="">
        <div class="top-title-bg2 ">
          <span class="">-&nbsp;{{{1:'房产术语',2:'购房须知',3:'买房攻略'}[recommendEnc.type]}}&nbsp;-</span><br>
          <span class="top-title" v-text="recommendEnc.title"></span><br>
          <span class="tips"><span v-for="list in recommendEnc.keywords.split(',')" class="" v-text="list"></span></span>
        </div>
      </div>
      <div v-if="type2!==null&&type2.length>0" class="tab-content">
        <mt-loadmore :top-method="loadTopEnc" :bottom-method="loadBottomEnc" :bottom-all-loaded="allLoadedEnc" ref="loadmore2">
          <ul class="center-list ">
          <li @click="routerDetailEnc(list.id)" v-for="list in type2" class="clearfix">
            <div  class="left-img float-l">
              <img v-if="list.type==1" src="../../assets/img/fcsy.png">
              <img v-if="list.type==2" src="../../assets/img/gfxz.png">
              <img v-if="list.type==3" src="../../assets/img/mfgl.png">
            </div>
            <div class="right-content float-r">
              <p v-text="list.title"></p>
              <div class="tips clearfix">
                <span v-for="list in list.keywords.split(',')" class="float-l" v-text="list"></span>
                <span class="look-num float-r"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i>{{list.viewcount}}</span>
              </div>
            </div>
          </li>
        </ul>
        </mt-loadmore>
      </div>
      <div v-else class="no-more" >
        <img src="../../assets/img/noData.png"/>
        <p>暂无数据</p>
        <p>更换条件试试</p>
      </div>
    </div>
    <div class="bottom-bg"></div>

    <div class="mu-paper mu-paper-round mu-paper-1" style="display: block;position: fixed;bottom:0;z-index: 999999999999999;">
      <div tabindex="0" class="mu-bottom-nav"
           style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none; display: flex;">
        <div class="mu-bottom-nav-shift-wrapper">
          <button @click="routerNav('首页')" type="button" tabindex="0" class="mu-buttom-item"
                  style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
            <div class="mu-buttom-item-wrapper">
              <div class="mu-ripple-wrapper"></div>
              <i class="mu-bottom-item-icon mu-icon material-icons icon iconfont icon-icon_shouye"> </i> <span
              class="mu-bottom-item-text">首页</span></div>
          </button>
          <button @click="routerNav('精选')" type="button" tabindex="0" class="mu-buttom-item mu-bottom-item-active"
                  style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
            <div class="mu-buttom-item-wrapper">
              <div class="mu-ripple-wrapper"></div>
              <i class="mu-bottom-item-icon mu-icon material-icons icon iconfont icon-icon_jingxuan_yixuan"> </i> <span
              class="mu-bottom-item-text">精选</span></div>
          </button>
          <button @click="routerNav('问答列表')" type="button" tabindex="0" class="mu-buttom-item"
                  style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
            <div class="mu-buttom-item-wrapper">
              <div class="mu-ripple-wrapper"></div>
              <i class="mu-bottom-item-icon mu-icon material-icons icon iconfont icon-icon_wenda"> </i> <span
              class="mu-bottom-item-text">问答</span></div>
          </button>
          <button @click="routerNav('个人中心')" type="button" tabindex="0" class="mu-buttom-item"
                  style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
            <div class="mu-buttom-item-wrapper">
              <div class="mu-ripple-wrapper"></div>
              <i class="mu-bottom-item-icon mu-icon material-icons icon iconfont icon-icon_wode"> </i> <span
              class="mu-bottom-item-text">我的</span></div>
          </button>
        </div>
      </div>
    </div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  ul.house-list .bottom-content img{
    width: 52/@base;
    height: 16/@base;
    vertical-align: sub;
  }
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
  .choice-index{
    div.enc-list{
      ul.center-list{
        li{
          div.right-content{
            div.tips{
              span{
                border: none;
              }
            }
          }
        }
      }
    }
    div.msg-list,div.enc-list{
      div.top-img{
        padding-top:44/@base;
        height:200/@base;
        img{
          width:100%;
          height:100%;
        }
      }
      div.top-img2{
        height:174/@base;
      }
      div.right-img{
        width:96/@base;
        height:80/@base;
        img{
          width:96/@base;
          height:80/@base;
        }
      }
    }
    div.msg-list{
      ul.center-list{
        li{
          div.left-img{
            width:85/@base;
            padding:10/@base 10/@base 0 0 ;
            border-radius: 0;
            img{
              width:50/@base;
              height:50/@base;
            }
          }
          div.right-content{
            width:250/@base;
          }
        }
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
    div.tab-content{
      min-height:100%-110/@base;
    }
    div.mu-appbar{
      height:44/@base;
      top: 0;
      font-size: 27/@base;
      background: #fff;
      color:#9b9b9b;
      box-shadow: none;
      border-bottom:1px solid #ececec;
      position: fixed;
      div.mu-appbar-title{
        span:nth-child(2){
          display:inline-block;
          margin:0 20/@base;
        }
        span.active{
          color:#1E1E1E;
        }
      }
    }
    ul.house-list {
      background-color: #fbfbfb;
      min-height: 640/@base;
      li {
        padding: 15/@base 10/@base;
        width: 100%;
        position: relative;
        background-color: #fff;
        border-bottom:1px solid #ececec;
        display:box;
        display:-webkit-box;
        display:-moz-box;
        div.top-img {
          width:80/@base;
          position: relative;
          height:80/@base;
          img {
            width: 100%;
            height: 100%;
            vertical-align: bottom;
          }
          div.top-small-tip{
            position: absolute;
            left:-4/@base;
            top:0;
            background-image: url('../../assets/img/tipbag.png');
            width:70/@base;
            height:30/@base;
            line-height:24/@base;
            text-align: center;
            background-size: 100% 100%;
            color:#fff;
            span{
              font-size:12/@base ;
              -webkit-transform-origin-x: 0;
              display: inline-block;
              -webkit-transform: scale(0.80);
            }
          }
        }
        div.bottom-content {
          width: 100%;
          box-flex:1;
          -moz-box-flex: 1;
          -webkit-box-flex: 1;
          margin-left:10/@base;
          position: relative;
          line-height: 28/@base;
          span{
            font-size: 16/@base;
            color:#4a4a4a;
          }
          div.shoucang{
            position: absolute;
            right:0;
            top:-10/@base;
            i.icon{
              font-size: 26/@base;
              color:#ff7f5f;
            }
          }
          p.region,p.interiorfloorspace,p.builtIn{
            font-size: 12/@base;
            color:#656565;
            -webkit-transform-origin-x: 0;
            -webkit-transform: scale(0.90);
            margin-top:-2/@base;
          }
          div.money-time{
            position:absolute;
            right:5/@base;
            bottom:28/@base;
            p.money{
              font-size:18/@base;
              font-weight: bold;
              text-align: center;
            }
          }
        }
      }
    }
    div.no-more{
      width:100%;
      font-size: 17/@base;
      text-align: center;
      padding:240/@base 0;
      color:#656565;
      background: #f5f5f5;
      p{
        color:#9B9B9B;
        font-size: 20/@base;
      }
      p:last-child{
        color:#9B9B9B;
        font-size: 14/@base;
      }

    }
    div.top-img{
      position: relative;
      img{
        width:100%;
        vertical-align: bottom;
      }
      div.top-title-bg{
        position: absolute;
        bottom:0;
        width:375/@base;
        background: rgba(0,0,0,.5);
        span.top-title{
          height:70/@base;
          font-size: 16/@base;
          color: #FFFFFF;
          padding:4/@base 10/@base;
          margin-left:15/@base;
          display: table-cell;
          vertical-align: middle;
          width:100%;
        }
      }
      div.top-title-bg2{
        position: absolute;
        top:59/@base;
        width: 315/@base;
        text-align: center;
        margin:0 30/@base;
        color: #FFFFFF;
        span.top-title{
          font-size: 20/@base;
        }
        span.tips{
          span{
            border:1px solid #ececec;
            font-size: 12/@base;
            color:#fff;
            margin-right:10/@base;
            padding:0 6/@base;
          }
        }
      }
    }
    ul.center-list{
      background: #fff;
      li{
        padding:13/@base 13/@base;
        border-bottom:1px solid #ececec;
        div.left-img{
          width:64/@base;
          height:64/@base;
          border-radius:50%;
          overflow: hidden;
          font-size: 16/@base;
          color:#fff;
          text-align: center;
          line-height:16/@base;
          padding-top:18/@base;
          img{
            width:100%;
            height:100%;
          }
        }
        div.right-content{
          position: relative;
          margin-right:10/@base;
          width:240/@base;
          p{
            font-size: 16/@base;
            color: #4A4A4A;
            line-height: 24/@base;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          div.tips{
            font-size: 12/@base;
            margin-top:10/@base;
            span.yc{
              color: #f14114;
            }
            span.gray{
              color:#9b9b9b;
            }
            span.time{
              margin-left:10/@base;
              color: #9B9B9B;
            }
            span.look{
              float:right;
              color:#565656;
              i.icon{
                font-size: 16/@base;
                vertical-align: middle;
                color:#c2c2c2;
                margin-right:4/@base;
              }
            }
            span{
              border:1px solid #ececec;
              font-size: 12/@base;
              color:#9b9b9b;
              margin-right:10/@base;
              padding:0 4/@base;
            }
            span.look-num{
              color:#c2c2c2;
              font-size: 12/@base;
              padding:0;
              border:0;
              margin-top:-3/@base;
              i{
                vertical-align: middle;
                margin-right:4/@base;
                font-size: 19/@base;
              }
            }
          }

        }
      }
    }
    div.houseList-more{
      margin-top:44/@base;
    }
    div.mint-loadmore{
      padding-bottom: 50px
    }
  }
</style>
<script>
  import Vue from 'vue'
  import { Loadmore } from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  import {rxUtils} from '../../assets/js/rxUtils'
    export default{
      data(){
          return{
            hostHouse:'',
            imgAdd:'',
            type:'house',
            topTitle:'资讯指南',
            pageSize:10,
            currentPage:1,
            pageSizeMsg:10,
            currentPageMsg:1,
            pageSizeEnc:10,
            currentPageEnc:1,
            imgUrl:'',
            data:'',
            allLoaded:false,
            allLoadedMsg:false,
            allLoadedEnc:false,
            type1:[],
            type2:[],
            recommend:{},
            recommendEnc:{},
            topImg:'',
            toastMsg:'',
            toast:false
          }
      },
    mounted(){
      this.$nextTick(function (){
        let self=this;
        document.title=self.$route.name;
        self.imgUrl=rxUtils.hostHouse;
        self.imgAdd=rxUtils.hostHouse;
        self.hostHouse=rxUtils.hostHouse;
        self.topImg=rxUtils.encImg;
        if(self.$route.query.type!==undefined){
          self.type=self.$route.query.type;
        }
        self.$http.post('/residence/search.json?currentPage='+self.currentPage+'&pageSize='+self.pageSize+'&region='+self.$route.query.region, {}, {emulateJSON: true})
          .then(function (response) {
            self.data=response.data.data;
          }).then(function (error) {
        })
        self.$http.post('/info/listHots.json?currentPage='+self.currentPageMsg+'&pageSize='+self.pageSizeMsg+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            self.type1=response.data.data;
          }).then(function (error) {
        })
        self.$http.get('/info/listRecommend.json?region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            self.recommend=response.data.data[0];
          }).then(function (error) {
        })
        self.$http.get('/baike/listHots.json?pageSize='+self.pageSizeEnc+'&currentPage='+self.currentPageEnc+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            if(response.body.data!==null){
              self.recommendEnc=response.body.data[0]
              let arr1=response.body.data;
              arr1.shift();
              self.type2=arr1;
              if(self.type2.length<4){
                //self.allLoadedEnc=true;
              }
            }
          }).then(function (error) {
        })
      })
    },
      beforeRouteLeave(to,from,next){
        if(to.fullPath == "/"){  //返回首页时，清除页面缓存
          //this.$destroy();
          this.$route.meta.keepAlive=false;
        }else{
          this.$route.meta.keepAlive=true;
        }
        console.log("当前缓存状态："+this.$route.meta.keepAlive);
        next();
      },
    methods:{
      timer:function(val){
        let date=new Date(val);
        let year=date.getFullYear();
        let mouth=date.getMonth()+1;
        let data=date.getDate();
        if(mouth<10){
          var newMouth='0'+mouth
        }else{
          var newMouth=mouth
        }
        if(data<10){
          var newData='0'+data;
        }else{
          var newData=data;
        }
        return year+'-'+newMouth+'-'+newData
      },
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
      },//闲时候隐藏toast
      shoucang(id,type){
        let self=this;
        self.$http.post('/user/myInfo.json', {
        }, {emulateJSON: true})
          .then(function (response) {
            if(response.data.code==405){
              self.toastMsg='请先登录'
              self.toast = true
              if (self.toastTimer) clearTimeout(self.toastTimer)
              self.toastTimer = setTimeout(() => {
                self.toast = false;
                self.$router.push({name:'登录首页'})
              }, 1000)
            }else{
              if(type.favorite){
                self.$http.post('/residence/doFavor.json', {
                  id:id,region:sessionStorage.getItem("code")
                }, {emulateJSON: true})
                  .then(function (response) {
                    if(response.data.success){
                      self.toastMsg='取消收藏成功'
                      self.toast = true
                      if (self.toastTimer) clearTimeout(self.toastTimer)
                      self.toastTimer = setTimeout(() => {
                        self.toast = false;
                        type.favorite=!type.favorite;
                      }, 1000)
                    }else{
                      self.toastMsg=response.data.resultMsg;
                      self.toast = true
                      if (self.toastTimer) clearTimeout(self.toastTimer)
                      self.toastTimer = setTimeout(() => {
                        self.toast = false;
                      }, 1000)
                    }
                  }).then(function (error) {
                })
              }else{
                self.$http.post('/residence/doFavor.json', {
                  id:id,region:sessionStorage.getItem("code")
                }, {emulateJSON: true})
                  .then(function (response) {
                    if(response.data.success){
                      self.toastMsg='收藏成功'
                      self.toast = true
                      if (self.toastTimer) clearTimeout(self.toastTimer)
                      self.toastTimer = setTimeout(() => {
                        self.toast = false;
                        type.favorite=!type.favorite;
                      }, 1000)
                    }else{
                      self.toastMsg=response.data.resultMsg;
                      self.toast = true
                      if (self.toastTimer) clearTimeout(self.toastTimer)
                      self.toastTimer = setTimeout(() => {
                        self.toast = false;
                      }, 1000)
                    }
                  }).then(function (error) {
                })
              }
            }
          }).then(function (error) {
        })
      },
      tabChange(type){
          this.type=type;
      },
      loadTop() {
        setTimeout(() => {
          let self=this;
          self.currentPageMsg=1;
          self.$http.post('/residence/search.json?currentPage='+self.currentPageMsg+'&pageSize='+self.pageSizeMsg+'&region='+self.$route.query.region, {}, {emulateJSON: true})
            .then(function (response) {
              self.data=response.data.data;
              self.$refs.loadmore.onTopLoaded();
              self.allLoaded=false;
            }).then(function (error) {
          })
        }, 2000)
      },
      loadTopEnc(){
        let self=this;
        self.currentPageEnc = 1;
        setTimeout(function(){
          self.$http.get('/baike/listHots.json?pageSize='+self.pageSizeEnc+'&currentPage='+self.currentPageEnc+'&region='+self.$route.query.code, {}, {emulateJSON: true})
            .then(function (response) {
              if(response.data.data!==null){
                self.recommendEnc=response.body.data[0]
                let arr1=response.body.data;
                arr1.shift();
                self.type2=arr1;
                console.log('self.type2=arr1');
                if(self.type2.length<4){
                  //self.allLoadedEnc=true;
                }
                console.log('self.$refs.loadmore2.onTopLoaded();');
                self.$refs.loadmore2.onTopLoaded();
              }
            }).then(function (error) {
          })
        },2000)
      },
      loadTopMsg(){
        let self = this;
        self.currentPage = 1;
        setTimeout(function () {
          self.$http.post('/info/listHots.json?currentPage=' + self.currentPage + '&pageSize=' + self.pageSizeMsg+'&region='+self.$route.query.code, {}, {emulateJSON: true})
            .then(function (response) {
              if(response.data.data!==null) {
                self.type1 = response.data.data;
              }
              self.allLoadedMsg=false;
              self.$refs.loadmore1.onTopLoaded();
            }).then(function (error) {
          })
        }, 2000)
      },
      loadBottom() {
        this.allLoaded = true;// 若数据已全部获取完毕
        let self=this;
        self.currentPage=self.currentPage+1;
        console.log("房源下一页");
        setTimeout(() => {
          self.$http.post('/residence/search.json?currentPage='+self.currentPage+'&pageSize='+self.pageSize+'&region='+self.$route.query.region, {}, {emulateJSON: true})
            .then(function (response) {
              if(response.data.data!=null) {
                for (let i = 0; i < response.data.data.length; i++) {
                  self.data.push(response.data.data[i])
                }
                self.allLoaded=false;
              }
              self.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        }, 2000)
      },
      loadBottomEnc() {
        let self=this;
        console.log("百科下一页");
        this.allLoadedEnc = true;
        self.currentPageEnc=self.currentPageEnc+1;
        setTimeout(function(){
          self.$http.get('/baike/listHots.json?pageSize='+self.pageSizeEnc+'&currentPage='+self.currentPageEnc+'&region='+self.$route.query.code, {}, {emulateJSON: true})
            .then(function (response) {
              if(response.data.data!=null){
                for(let i=0;i<response.data.data.length;i++){
                  self.type2.push(response.data.data[i])
                }
                //self.recommendEnc=response.data.data[0]
                self.allLoadedEnc=false;
              }
                self.$refs.loadmore2.onBottomLoaded();
            }).then(function (error) {
          })
        },2000)
      },
      loadBottomMsg(){
        let self = this;
        console.log("资讯下一页");
        self.currentPageMsg=self.currentPageMsg+1;
        setTimeout(function () {
          self.$http.post('/info/listHots.json?currentPage=' + self.currentPageMsg + '&pageSize=' + self.pageSizeMsg+'&region='+self.$route.query.code, {}, {emulateJSON: true})
            .then(function (response) {
              if(response.data.data!==null){
                for(let i=0;i<response.data.data.length;i++){
                    self.type1.push(response.data.data[i])
                }
                self.allLoadedMsg=false;
              }else{
                self.allLoadedMsg=true;
              }
              self.$refs.loadmore1.onBottomLoaded();
            }).then(function (error) {
          })
        }, 2000)
      },
      routerDetail(id){
        this.$router.push({name:'资讯详情',params:{id:id}})
      },
      routerHouseDetail(id){
        this.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:id},query:{region:sessionStorage.getItem('code')}})
      },
      routerDetailEnc(id){
        this.$router.push({name:'百科详情',params:{id:id}})
      }
    }
  }
</script>
