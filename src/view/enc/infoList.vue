<template>
  <div class="message-enc">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span >资讯</span></div>
      <div class="right"></div>
    </div>
    <div  class="message-content">
      <div class="tabs">
        <span @click="tabChange('房产在线',$event)" class="active">房产在线</span><span @click="tabChange('楼市分析',$event)" >楼市分析</span><span @click="tabChange('热推房源',$event)" >热推房源</span><span @click="tabChange('移民留学',$event)" >移民留学</span><span @click="tabChange('海外生活',$event)" >海外生活</span><span @click="tabChange('名家专栏',$event)" >名家专栏</span>
      </div>
      <div class="tab-content">
        <mt-swipe :auto="3000">
          <mt-swipe-item  v-for="recommend in recommendList" :key="recommend.id">
            <div v-if="recommend!==''" @click="routerDetail(recommend.id,1)" class="top-img">
              <img :src="imgUrl+recommend.imgUrl" alt="">
              <div class="top-title-bg">
                <span class="top-title" v-text="recommend.title"></span>
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul class="center-list">
            <li v-if="type1.length>0" @click="routerDetail(list.id)" v-for="list in type1" class="clearfix">
              <div class="right-content float-l">
                <p v-text="list.title"></p>
                <div class="tips clearfix">
                  <span :class="[list.source=='淘海房'?'yc':'gray','float-l']" v-text="list.source=='淘海房'?'淘海房原创':list.source"></span>
                  <span class="time float-l" v-text="timer(list.createdAt)"></span>
                  <span class="look-num float-r"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i>{{list.viewcount}}</span>
                </div>

              </div>
              <div class="right-img float-r"><img :src="imgUrl+list.imgUrl"></div>
            </li>
            <li v-else>暂无更多数据...</li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
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
    height:40/@base;
    overflow-x:scroll;
    white-space:nowrap;
    span {
      width: 90/@base;
      height: 40/@base;
      line-height: 40/@base;
      text-align: center;
      font-size: 14/@base;
      color:#4a4a4a;
      display:inline-block;
    }
    span.active{
      color:#f14114;
      border-bottom:2px solid #f14114;
    }
  }
  .mint-swipe{
    height:160/@base;
    .mint-swipe-indicator{
      background-color: #fff;
      opacity:1;
      width:4/@base;
      height:4/@base;
    }
    .mint-swipe-indicator.is-active{
      background-color: #fff;
      width:8/@base;
      border-radius: 4/@base;
      opacity: 1;
    }
  }
  .mint-swipe-item{
    img{
      width:100%;
      height:100%;
    }
  }
</style>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix.less";
  .message-content{
    padding-top:44/@base;
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
          width:375/@base;
          height:160/@base;
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
              border:0;
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
        div.right-img{
          width:96/@base;
          height:80/@base;
          img{
            width:96/@base;
            height:80/@base;
          }
        }
      }
    }
  }
</style>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  .enc-index{
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
      position: absolute;
      top:44/@base;
      bottom:0;
      ul.sub-list{
        display:block;
        width:100/@base;
        position: fixed!important;
        top:44/@base!important;
        bottom:0;
        li.active{
          background-color: #fff;
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
        margin-left:100/@base;
        padding:0 15/@base 18/@base;
        min-height:100%;
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
            width:100%;
            overflow: hidden;
            span{
              padding:0 6/@base;
              color:#f14114;
              border:1px solid #f14114;
              margin-right:14/@base;
              margin-bottom:10/@base;
              word-break: break-all;
              display:inline-block;
              font-size: 12/@base;
            }
          }
        }
      }
    }
  }
</style>
<script>
  import {rxUtils} from '../../assets/js/rxUtils'
  import Vue from 'vue'
  import { Swipe, SwipeItem,Loadmore } from 'mint-ui';
  import vueSlider from 'vue-slider-component';
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data(){
          return {
            allLoaded:false,
            type:1,
            topTitle:'资讯指南',
            activeTab:'房产在线',
            pageSize:10,
            currentPage:1,
            type1:[],
            imgUrl:'',
            recommend:'',
            recommendList:[],
            subList:[
              {text:'房产术语',id:1},
              {text:'购房须知',id:2},
              {text:'买房攻略',id:3},
            ],
            baikeList:[],
            listType:1
          }
      },
    mounted(){
      this.$nextTick(function (){
        let self = this;
        self.imgUrl=rxUtils.encImg;
        document.title=this.$route.name;
        self.$http.get('/info/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+self.type+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
              console.log(response.body.data)
            self.type1=response.body.data;
          }).then(function (error) {
        })
        self.$http.get('/info/listRecommend.json?type=1&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            self.recommendList=response.body.data;
            self.recommend=response.body.data[0];
            console.log(response.body.data)
          }).then(function (error) {
        })
        /*self.$http.get('/baike/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type=1', {}, {emulateJSON: true})
          .then(function (response) {
            console.log(response.body.data)
            self.baikeList=response.body.data
          }).then(function (error) {
        })*/
      })
    },
    methods:{
      timer(val){
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
      loadTop(){
        let self = this;
        self.currentPage=1;
        self.$http.get('/info/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+self.type+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            self.type1=response.body.data;
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
        self.$http.get('/info/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+self.type+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            if(response.body.data){
              var type1=self.type1;
              self.type1 = type1.concat(response.body.data);
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
      tabChange (val,e) {
          let self=this;
          _czc.push(['_trackEvent', '资讯', 'NewsNavigationBar','资讯顶部的导航条title='+val]);
          let el=document.getElementsByClassName('tabs')[0].getElementsByTagName('span');
          for(let i=0;i<el.length;i++){
              el[i].className='';
          }
        e.target.className='active';
        if(val=='房产在线'){
            var type=1;
        }else if(val=='楼市分析'){
            var type=2;
        }else if(val=='热推房源'){
            var type=3;
        }else if(val=='移民留学'){
            var type=4;
        }else if(val=='海外生活'){
            var type=5;
        }else if(val=='名家专栏'){
            var type=6;
        }
        self.type=type;
        self.currentPage=1;
        self.$http.get('/info/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+type+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            self.type1=response.body.data;
            if(response.body.success){
              this.activeTab = val
              self.allLoaded=false;
            }
          }).then(function (error) {
        })
        self.$http.get('/info/listRecommend.json?type='+type+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            self.recommendList=response.body.data;
            self.recommend='';
            self.recommend=response.body.data[0];
          }).then(function (error) {
        })
      },
      routerDetail(id,type){
          if(type==1){
            _czc.push(['_trackEvent', '资讯', 'NewsBannerClick','轮播图点击id='+id]);
          }else{
            _czc.push(['_trackEvent', '资讯', 'NewsDetail','资讯详情id='+id]);
          }
          this.$router.push({name:'资讯详情',params:{id:id}})
      },
      routerEncDetail(id){
        this.$router.push({name:'百科详情',params:{id:id}})
      },
      getList(id){
        let self=this;
        this.listType=id;
        self.$http.get('/baike/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+id+'&region='+self.$route.query.code, {}, {emulateJSON: true})
          .then(function (response) {
            console.log(response.body.data)
            self.baikeList=response.body.data
          }).then(function (error) {
        })
      }
    },
    components: {
      swiper,
      swiperSlide,
      vueSlider
    }
  }
</script>
                              
