<template>
  <div class="message-enc clearMargin">
    <div class="mu-appbar mu-paper-1 fixed">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span >百科</span></div>
      <div class="right"></div>
    </div>
    <div class="MT44"></div>
    <div class="banner-bg" v-if="bannerList&&bannerList.length>0">
      <mt-swipe :auto="300000">
        <mt-swipe-item  v-for="banner in bannerList" :key="banner.bkId">
          <div  class="top-img top-img2" @click="routerEncDetail(banner.id)">
            <img src="http://images.taohaifang.com/upload/baike/20170901161603540.png" alt="">
            <div class="top-title-bg2 ">
              <span class="">-&nbsp;{{{1:'房产术语',2:'购房须知',3:'买房攻略'}[banner.type]}}&nbsp;-</span><br>
              <span class="top-title" v-text="banner.title.length>28?banner.title.substring(0,28)+'...':banner.title"></span><br>
              <span class="tips"><span v-for="list in banner.keywords.split(',')" class="" v-text="list"></span></span>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="enc-type-bg clearfix" >
      <div class="host enc-type float-l" v-for="item in typeList" @click="listCategory(item.code)">
        <div class="enc-type-icon"><img :src="item.code==parentCode?item.iconActive:item.icon"></div>
        <p class="text-center " :class="item.code==parentCode?item.color:''">{{item.name}}</p>
      </div>
    </div>
    <div  class="enc-index">
      <div class="list-box clearfix">
        <ul class="sub-list float-l">
          <li v-for="(list,index) in subList" @click="getList(list.code,index)" :class="[listType==list.code?'active':'']" v-text="list.text"></li>
        </ul>

        <ul class="sub-sub-list float-l">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <li v-for="list in baikeList" @click="routerEncDetail(list.id)">
              <p class="title-text" v-text="list.title"></p>
              <div class="tips" v-if="list.keywords!==''"><span v-for="list in list.keywords.split(',')" v-text="list"></span></div>
            </li>
          </mt-loadmore>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  div.message-enc{
    .banner-bg{
      height:130/@base;
      div.top-img{
        position: relative;
        height:200/@base;
        img{
          width:100%;
          height:100%;
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
          top:15/@base;
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
      div.top-img2{
        height:130/@base;
      }
    }
    .enc-type-bg{
      height:90/@base;
      background-color: #fff;
      border-bottom: 1px solid #dcdcdc;
      .enc-type{
        width:93/@base;
        padding:13/@base 0;
        .enc-type-icon{
          width:40/@base;
          height:40/@base;
          margin:0 auto;
          img{
            width:40/@base;
            height:40/@base;
          }
        }
        p{
          line-height: 24/@base;
          font-size: 12/@base;
          color: #9B9B9B;
        }
      }
    }
    .enc-index{
      div.message-enc>div.mu-appbar{
        height:44/@base;
        background: #fff;
        color:#565656;
        font-size: 27/@base;
        box-shadow: none;
        border-bottom:1px solid #ececec;
        position: fixed;
        z-index: 9;
        div.mu-appbar-title{
          span{
            font-size:16/@base ;
          }
        }
      }
      div.tabs{
        overflow-x:scroll;
        white-space:nowrap;
        span {
          width: 90/@base;
          height: 44/@base;
          line-height: 44/@base;
          text-align: center;
          font-size: 16/@base;
          color:#4a4a4a;
          display:inline-block;
        }
        span.active{
          color:#f14114;
          border-bottom:2px solid #f14114;
        }
      }
      .message-content{
        padding-top:54/@base;
        .mu-appbar{
          height:44/@base;
          font-size: 27/@base;
          background-color:#fff;
          color:#fff;
          border-bottom:1px solid #ececec;
          box-shadow: none;
          .mu-appbar-title{
            line-height:44/@base;
            span{
              margin-right:20/@base;
              font-size: 17/@base;
            }
          }
        }
        .mu-tabs{
          background-color:#f5f5f5;
          height:40/@base;
          button.mu-tab-active{
            div.mu-tab-text{
              color:#f14114;
            }
          }
          button{
            div.mu-tab-text{
              color:#4a4a4a;
              font-size: 16/@base;
            }
          }
          span.mu-tab-link-highlight{
            background-color: #f14114;
          }
        }
        div.tab-content{
          div.top-img{
            position: relative;
            img{
              width:100%;
              vertical-align: bottom;
            }
            span.top-title{
              font-size: 16/@base;
              position: absolute;
              bottom:0;
              left:10/@base;
              color: #FFFFFF;
              background: rgba(0,0,0,.5);
              padding:4/@base 10/@base;
              margin-left:-10/@base;
              display: block;
              width:100%;
            }
          }
        }
        ul.center-list{
          li{
            display:box;
            display:-webkit-box;
            display:-moz-box;
            padding:15/@base 13/@base;
            border-bottom:1px solid #ececec;
            div.left-img{
              width:96/@base;
              height:80/@base;
              img{
                width:100%;
                height:100%;
              }
            }
            div.right-content{
              box-flex:1;
              -webkit-box-flex: 1;
              -moz-box-flex: 1;
              height:80/@base;
              position: relative;
              margin-left:10/@base;
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
                margin-top:32/@base;
                position: absolute;
                bottom:0;
                left:0;
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
              }
            }
          }
        }
      }
      .mu-appbar{
        height:44/@base;
        background-color: #fff;
        border-bottom:1px solid #ececec;
        font-size: 27/@base;
        div.left{
          i.icon{
            color:#565656;
          }
        }
      }
      .list-box{
        width:100%;
        ul.sub-list{
          display:block;
          width:100/@base;
          top:174/@base!important;
          bottom:0;
          li.active{
            background-color: #fff;
            font-size: 16/@base;
            color: #1E1E1E;
          }
          li{
            font-size: 16/@base;
            color: #4A4A4A;
            line-height: 31/@base;
            padding:8/@base 17/@base;
            background-color: #f5f5f5;
          }
        }
        ul.sub-sub-list{
          display:block;
          background-color: #fff;
          width:275/@base;
          padding:0 15/@base 0;
          min-height:400/@base;
          li{
            border-bottom:1px solid #ececec;
            padding:15/@base 0;
            p{
              font-size: 16/@base;
              font-family: '微软雅黑';
              color: #4A4A4A;
              margin-bottom:14/@base;
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
    }
  }

</style>
<script>
  import Vue from 'vue'
  import { Loadmore } from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  import {rxUtils} from '../../assets/js/rxUtils'
  import { Swipe, SwipeItem } from 'mint-ui';
  import vueSlider from 'vue-slider-component';
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data(){
          return {
            parentCode:1100,
            typeList:[
              {name:'热门百科',code:1100,icon:require('../../assets/img/enc1.png'),iconActive:require('../../assets/img/enc1-active.png'),color:'c-488A00'},
              {name:'城市概况',code:1200,icon:require('../../assets/img/enc2.png'),iconActive:require('../../assets/img/enc2-active.png'),color:'c-FF3554'},
              {name:'购房准备',code:1300,icon:require('../../assets/img/enc3.png'),iconActive:require('../../assets/img/enc3-active.png'),color:'c-2889EA'},
              {name:'交易环节',code:1400,icon:require('../../assets/img/enc4.png'),iconActive:require('../../assets/img/enc4-active.png'),color:'c-FF690C'}
            ],
            enc1:require('../../assets/img/enc1.png'),
            type:1,
            allLoaded:false,
            topTitle:'资讯指南',
            activeTab:'ONLINE',
            pageSize:10,
            currentPage:1,
            type1:[],
            imgUrl:'',
            timer:function(time){
                let date=new Date(time);
                let year=date.getFullYear();
                let month=date.getMonth()+1;
                let day=date.getDate();
                if(month<10){
                    var newMouth='0'+month
                }
                if(day<10){
                    var newDay='0'+day;
                }
                return year+'-'+newMouth+'-'+newDay;
            },
            recommend:'',
            subList:[],
            baikeList:[],
            bannerList:[],
            listType:1101
          }
      },
    mounted(){
      this.$nextTick(function (){
        let self = this;
        self.imgUrl=rxUtils.encImg;
        document.title=this.$route.name;
        self.listBanners();
        self.listCategory();
        //self.getList(self.listType);
      })
    },
    methods:{
      listBanners(){
        let self = this;
        self.$http.get('/baike/listBanners.json?pageSize=10&currentPage=1&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            if(response.body.data){
              self.bannerList=response.body.data;
              console.log(self.bannerList);
            }
          })
      },
      listCategory(parentCode){
        let self = this;
        self.parentCode = parentCode?parentCode:self.parentCode;
        self.$http.get('/baike/listCategory.json?parent=' + self.parentCode, {}, {emulateJSON: true})
          .then(function (response) {
              if(response.body.data){
                self.subList=response.body.data;
                self.getList(self.subList[0].code);
              }
        })
      },
      getList(id,index){
        let self=this;
        console.log(index);
        _czc.push(['_trackEvent', '百科列表', 'WikiNavigationBar','百科左侧的导航条index='+index]);
        self.listType=id;
        self.currentPage=1;
        self.allLoaded=false;
        self.$http.get('/baike/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+self.listType+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            console.log(response.body.data)
            self.baikeList=response.body.data
          }).then(function (error) {
        })
      },
      loadTop(){
        let self = this;
        self.currentPage=1;
        self.$http.get('/baike/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+self.listType+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            self.baikeList=response.body.data;
            if(response.body.success){
              self.$refs.loadmore.onTopLoaded();
            }
          }).then(function (error) {
        })
      },
      loadBottom(){
        let self = this;
        self.currentPage +=1;
        self.allLoaded=true;
        self.$http.get('/baike/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+self.listType+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            if(response.body.data){
              self.baikeList = self.baikeList.concat(response.body.data);
              console.log(self.type1);
              self.allLoaded=false;
            }
            self.$refs.loadmore.onBottomLoaded();
          }).then(function (error) {
        })
      },
      back(){
          this.$router.back();
      },
      routerDetail(id){
          this.$router.push({name:'资讯详情',params:{id:id}})
      },
      routerEncDetail(id){
        _czc.push(['_trackEvent', '百科列表', 'WikiDetail','百科详情id='+id]);
        this.$router.push({name:'百科详情',params:{id:id}})
      },
      choiceType(item){
        let self=this;
        self.parentCode=item.code;
        /*for(true){
          self.typeList
        }*/

      }

    },
    components: {
      swiper,
      swiperSlide,
      vueSlider
    }
  }
</script>
