<template v-if="renderFlag">
  <div class="collection">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>我的收藏</span></div>
      <div class="right"></div>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="house" title="房源"/>
      <mu-tab value="info" title="资讯"/>
      <mu-tab value="enc"  title="百科"/>
      <mu-tab value="ask"  title="问答"/>
    </mu-tabs>
    <swipeout v-if="activeTab=='house'">
      <!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">-->
        <swipeout-item :threshold=".5" class="houseClass"  v-for="list in data" :key="list.id"  transition-mode="follow" ref="swipeoutItem">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick(list.id,'residence')" type="warn">删除</swipeout-button>
          </div>
          <div slot="content" @click="routerHouseDetail(list.id)" class="demo-content vux-1px-t house-list-li">
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
          </div>

        </swipeout-item>
      <!--</mt-loadmore>-->
    </swipeout>
    <swipeout v-if="activeTab=='info'">
      <!--<mt-loadmore :top-method="loadTop1" :bottom-method="loadBottom1" :bottom-all-loaded="allLoaded1" ref="loadmore">-->
        <swipeout-item :threshold=".5" class="infoClass"  v-for="list in type1" :key="list.id"  transition-mode="follow" ref="swipeoutItem">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick(list.id,'info')" type="warn">删除</swipeout-button>
          </div>
          <div slot="content" @click="routerInfoDetail(list.id)" class="demo-content vux-1px-t clearfix">
            <div class="right-content float-l">
              <p v-text="list.title"></p>
              <div class="tips clearfix">
                <span :class="[list.source=='淘海房'?'yc':'gray','float-l']" v-text="list.source=='淘海房'?'淘海房原创':list.source"></span>
                <span class="time float-l" v-text="timer(list.createdAt)"></span>
                <span class="look-num float-r"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i>{{list.viewcount}}</span>
              </div>
            </div>
            <div class="right-img float-l"><img :src="msgUrl+list.imgUrl" alt=""></div>
          </div>
        </swipeout-item>
      <!--</mt-loadmore>-->
    </swipeout>
    <swipeout v-if="activeTab=='enc'">
      <!--<mt-loadmore :top-method="loadTop2" :bottom-method="loadBottom2" :bottom-all-loaded="allLoaded2" ref="loadmore">-->
        <swipeout-item :threshold=".5" class="encClass" v-for="list in baikeList" :key="list.id"  transition-mode="follow" ref="swipeoutItem">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick(list.id,'baike')" type="warn">删除</swipeout-button>
          </div>
          <div slot="content" @click="routerDetailBaike(list.id)" class="demo-content vux-1px-t">
            <p class="title-text"  v-text="list.title"></p>
            <div class="tips clearfix">
              <span v-if="list.keywords!==''" v-for="list in list.keywords.split(',')" class="float-l" v-text="list"></span>
              <span class="look-num float-r"><i class="icon iconfont icon-icon_remenzixun_liulanliang"></i>{{list.viewcount}}</span>
            </div>
          </div>
        </swipeout-item>
      <!--</mt-loadmore>-->
    </swipeout>
    <swipeout v-if="activeTab=='ask'">
      <!--<mt-loadmore :top-method="loadTop3" :bottom-method="loadBottom3" :bottom-all-loaded="allLoaded3" ref="loadmore">-->
        <swipeout-item v-for="list in datas" :key="list.id" ref="swipeoutItem" transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick(list.id,'question')" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" @click="routerDetailAsk(list.id)" class="demo-content vux-1px-t">
          <div class="list-top">
            <img  src="../../assets/img/ask.png">
            <span class="ask-title bold" v-text="list.title"></span>
            <img v-if="list.images!==null&&list.images!==''" src="../../assets/img/hasPic.png">
          </div>
          <div class="remark" v-if="list.answer">
            <img  src="../../assets/img/answer.png">
            <span  v-text="list.answer.content.length>70?list.answer.content.substring(0,70)+'...':list.answer.content"></span>
          </div>
          <div class="list-bottom clearfix">
            <span class="ask-time" v-text="'提问于'+list.dateFmt"></span>
            <span class="answer float-r" >查看{{list.answerNum}}个回答</span>
          </div>
          <!--<div class="list-top">
            <i class="icon iconfont icon-icon_tiwen"></i>
            <span class="ask-title" v-text="list.title"></span>
          </div>
          <div v-if="list.images!==null&&list.images!==''" class="img-list">
            <img v-for="img in list.images" :src="askUrl+img" alt="">
          </div>
          <div class="tips" v-if="list.labels.length"><span v-for="tip in list.labels" v-text="tip"></span></div>
          <div class="list-bottom"><span class="ask-time" v-text="list.dateFmt"></span><i
            class="icon iconfont icon-icon_wenda_yixuan"></i> <span class="answer" v-text="list.answerNum"></span></div>-->
        </div>
      </swipeout-item>
      <!--</mt-loadmore>-->
    </swipeout>
    <div v-if="activeTab=='house'&&data==null" class="no-more">
      <router-link :to="{path:'/detached'}">
        <img src="../../assets/img/shoucangno.png" alt="">
        <p>暂无收藏</p>
        <button>去逛逛</button>
      </router-link>
    </div>
    <div v-if="activeTab=='info'&&type1==null" class="no-more">
      <div @click="toInfo">
        <a>
        <img src="../../assets/img/shoucangno.png" alt="">
        <p>暂无收藏</p>
        <button>去逛逛</button>
        </a>
      </div>
    </div>
    <div v-if="activeTab=='enc'&&baikeList==null" class="no-more">
      <div @click="toEnc">
        <a>
        <img src="../../assets/img/shoucangno.png" alt="">
        <p>暂无收藏</p>
        <button>去逛逛</button>
        </a>
      </div>
    </div>
    <div v-if="activeTab=='ask'&&datas==null" class="no-more">
      <router-link :to="{path:'/ask'}">
        <img src="../../assets/img/shoucangno.png" alt="">
        <p>暂无收藏</p>
        <button>去逛逛</button>
      </router-link>
    </div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  div.collection{
    div.no-more{
      position: absolute;
      padding: 0;
      top:68/@base;
      bottom:0;
      left:0;
      right:0;
      background-color: #fff;
      a{
        display:block;
        img{
          width:100/@base;
          height:100/@base;
          display:block;
          margin:86/@base auto 7/@base auto;
        }
        p{
          color:#cfcfcf;
          font-size: 22/@base;
          width:100% ;
          height:22/@base;
          text-align: center;
          margin-bottom:100/@base;
        }
        button{
          width:255/@base;
          background-color: #f14114;
          color:#fff;
          border:none;
          font-size: 16/@base;
          text-align: center;
          line-height:40/@base;
          height:40/@base;
          margin:0 auto;
          border-radius:4/@base;
          display:block;
        }
      }
    }
    div.mu-appbar{
      height:44/@base;
      background:#fff;
      color:#4a4a4a;
      font-size: 27/@base;
    }
    div.mu-tabs{
      background-color:#f5f5f5;
      height:44/@base;
      button{
        color:#9b9b9b;
      }
      button.mu-tab-active{
        color:#f14114;
      }
      span.mu-tab-link-highlight{
        background-color: #F14114;
      }
    }
    div.houseClass {
      background-color: #fbfbfb;
      div.demo-content{
        width: 100%;
        position: relative;
        background-color: #fff;
        display:box;
        display:-webkit-box;
        display:-moz-box;
        img {
          width: 100%;
          vertical-align: bottom;
        }
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
          img{
            width: 52/@base;
            height: 16/@base;
            vertical-align:middle;
          }
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
    div.infoClass{
      div.vux-swipeout-content{
        div.demo-content{
          padding:0;
          div.right-img{
            width:96/@base;
            height:80/@base;
            img{
              width:96/@base;
              height:80/@base;
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
        }
      }
    }
    div.encClass{
      .vux-swipeout-content{
        .demo-content{
          .title-text{
            font-size: 16/@base;
            color: #1E1E1E;
            line-height: 24/@base;
            padding:10/@base;
          }
          .tips{
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
    ul.sub-sub-list{
      display:block;
      background-color: #fff;
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
    div.vux-swipeout-item,ul.new-list{
      div.vux-swipeout-content{
        position: relative;
        padding:14/@base;
        background-color: #fff;
        border-bottom:1px solid #ececec;
        div.list-top{
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
          span:first-child{
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
  }
</style>
<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
  import {rxUtils} from '../../assets/js/rxUtils'
  export default{
    data(){
        return {
          isRefresh:false,
          renderFlag:true,
          activeTab:'house',
          allLoaded:false,
          allLoaded1:false,
          allLoaded2:false,
          allLoaded3:false,
          data:{},
          housePage:1,
          infoPage:1,
          baikePage:1,
          questionPage:1,
          timer:function(val){
            let date=new Date(val);
            let year=date.getFullYear();
            let mouth=date.getMonth()+1;
            let data=date.getDate();
            return year+'-'+mouth+'-'+data
          },
          toast:false,
          toastMsg:'',
          type1:{},
          baikeList:{},
          datas:{},
          houseUrl:'',
          imgAdd:'',
          msgUrl:'',
          askUrl:'',
          disabled: false
        }
    },
    mounted(){
      this.$nextTick(function () {

      })
    },
    beforeRouteEnter (to, from, next) {
        console.log(from.fullPath);
      if(from.fullPath.indexOf("/my")>=0||from.fullPath=='/') {  //返回个人中心
        next(vm => {
          vm.$nextTick(function () {
            vm.mountedFunc();
          })
        })
      }else{
        next();
      }
    },
    /*beforeRouteLeave(to,from,next){
      if(to.fullPath.indexOf("/my")>=0){  //返回个人中心
        this.renderFlag=false;
        //this.$route.meta.keepAlive=false;
        console.log("即将到首页，keepAlive缓存改为："+this.$route.meta.keepAlive);
      }else{
        this.renderFlag=true;
        //this.$route.meta.keepAlive=true;
        console.log("即将到其他，keepAlive缓存改为："+this.$route.meta.keepAlive);
      }
      console.log("当前缓存状态："+this.$route.meta.keepAlive);
      next();
    },*/
    methods:{
      toEnc(){
        this.$router.push({name:'百科',query:{
          region:sessionStorage.getItem('region'),
          code:sessionStorage.getItem('code')
        }})
      },
      toInfo(){
        this.$router.push({name:'资讯',query:{
          region:sessionStorage.getItem('region'),
          code:sessionStorage.getItem('code')
        }})
      },

      mountedFunc(){
        let self=this;
        self.activeTab=self.$route.params.type;
        self.houseUrl=rxUtils.hostHouse;
        self.imgAdd=rxUtils.hostHouse;
        self.msgUrl=rxUtils.listImg;
        self.askUrl=rxUtils.hostAsk;
        document.title=this.$route.name;
        self.$http.get('/residence/listFavors.json?pageSize=10&currentPage='+self.housePage, {'params':{region:sessionStorage.getItem("code")}}, {emulateJSON: true})
          .then(function (response) {
            self.data=response.body.data;
          }).then(function (error) {
        })//房源
        self.$http.get('/info/listFavors.json?pageSize=10&currentPage='+self.infoPage, {'params':{region:sessionStorage.getItem("code")}}, {emulateJSON: true})
          .then(function (response) {
            self.type1=response.body.data;
          }).then(function (error) {
        })//资讯
        self.$http.get('/baike/listFavors.json?pageSize=10&currentPage='+self.baikePage, {'params':{region:sessionStorage.getItem("code")}}, {emulateJSON: true})
          .then(function (response) {
            self.baikeList=response.body.data;
          }).then(function (error) {
        })//百科
        self.$http.get('/question/listFavors.json?pageSize=10&currentPage='+self.questionPage, {'params':{region:sessionStorage.getItem("code")}}, {emulateJSON: true})
          .then(function (response) {
            self.datas=response.body.data;
          }).then(function (error) {
        })//问答
      },
      routerHouseDetail(id){
        this.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:id},query:{region:sessionStorage.getItem('code')}})
      },
      routerInfoDetail(id){
        this.$router.push({name:'资讯详情',params:{id:id}})
      },
      routerDetailBaike(id){
        this.$router.push({name:'百科详情',params:{id:id}})
      },
      routerDetailAsk(id){
        this.$router.push({name:'问答详情',params:{id:id}})
      },
      onButtonClick (id,type) {
        let self=this;
        if(type!=='question'){
          var inData={
            id:id
          }
        }else{
          var inData={
            questionId:id
          }
        }
        inData.region=sessionStorage.getItem('code');
        self.$http.post('/'+type+'/doFavor.json', inData, {emulateJSON: true})
          .then(function (response) {
              if(response.body.success){
                this.toastMsg='删除成功'
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => {
                  this.toast = false;
                  self.$http.get('/'+type+'/listFavors.json?pageSize=10&currentPage=1', {}, {emulateJSON: true})
                    .then(function (response) {
                      if(type=='question'){
                          self.datas=response.body.data;
                      }else if(type=='baike'){
                        self.baikeList=response.body.data;
                      }else if(type=='info'){
                        self.type1=response.body.data;
                      }else{
                        self.data=response.body.data;
                      }
                    }).then(function (error) {
                  })
                }, 500)
              }
          }).then(function (error) {
        })//取消收藏
      },
      handleEvents (type) {
        console.log('event: ', type)
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },//闲时候隐藏toast
      back(){
          this.$router.back();
      },//返回上一页
      handleTabChange (val) {
        this.activeTab = val
      },//tab改变值
      loadTop() {
        setTimeout(() => {
          let self=this;
          this.housePage=1;
          self.$http.get('/residence/listFavors.json?pageSize=10&currentPage='+self.housePage, {}, {emulateJSON: true})
            .then(function (response) {
              self.data=response.body.data;
              this.$refs.loadmore.onTopLoaded();
            }).then(function (error) {

          })
        }, 2000)
      },//下拉刷新房源
      loadBottom() {
        this.allLoaded = true;// 若数据已全部获取完毕
        let self=this;
        self.housePage=self.housePage+1;
        setTimeout(() => {
          self.$http.post('/residence/listFavors.json?pageSize=10&currentPage='+self.housePage,{}, {emulateJSON: true})
            .then(function (response) {
              if(response.body.data!==null){
                for(let i=0;i<response.body.data.length;i++){
                  self.data.push(response.body.data[i])
                }
                this.allLoaded=false;
              }
              this.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        }, 2000)
      },//上拉加载房源
      loadTop1(){
        setTimeout(() => {
          let self=this;
          this.infoPage=1;
          self.$http.get('/info/listFavors.json?pageSize=10&currentPage='+self.housePage, {}, {emulateJSON: true})
            .then(function (response) {
              self.type1=response.body.data;
              this.$refs.loadmore.onTopLoaded();
            }).then(function (error) {

          })
        }, 2000)
      },//下拉刷新资讯
      loadBottom1(){
        this.allLoaded1 = true;// 若数据已全部获取完毕
        let self=this;
        self.infoPage=self.infoPage+1;
        setTimeout(() => {
          self.$http.post('/info/listFavors.json?pageSize=10&currentPage='+self.infoPage,{}, {emulateJSON: true})
            .then(function (response) {
              if(response.body.data!==null){
                for(let i=0;i<response.body.data.length;i++){
                  self.type1.push(response.body.data[i])
                }
                this.allLoaded1=false;
              }
              this.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        }, 2000)
      },//上拉加载资讯
      loadTop2(){
        setTimeout(() => {
          let self=this;
          this.baikePage=1;
          self.$http.get('/baike/listFavors.json?pageSize=10&currentPage='+self.baikePage, {}, {emulateJSON: true})
            .then(function (response) {
              self.baikeList=response.body.data;
              this.$refs.loadmore.onTopLoaded();
            }).then(function (error) {
          })//百科
        }, 2000)
      },//下拉刷新百科
      loadBottom2(){
        this.allLoaded2 = true;// 若数据已全部获取完毕
        let self=this;
        self.baikePage=self.baikePage+1;
        setTimeout(() => {
          self.$http.post('/baike/listFavors.json?pageSize=10&currentPage='+self.baikePage,{}, {emulateJSON: true})
            .then(function (response) {
              if(response.body.data!==null){
                for(let i=0;i<response.body.data.length;i++){
                  self.baikeList.push(response.body.data[i])
                }
                this.allLoaded2=false;
              }
              this.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        }, 2000)
      },//上拉加载百科
      loadTop3(){
        setTimeout(() => {
          let self=this;
          this.questionPage=1;
          self.$http.get('/question/listFavors.json?pageSize=10&currentPage='+self.questionPage, {}, {emulateJSON: true})
            .then(function (response) {
              self.datas=response.body.data;
              this.$refs.loadmore.onTopLoaded();
            }).then(function (error) {
          })//问答
        }, 2000)
      },//下拉刷新问答
      loadBottom3(){
        this.allLoaded3 = true;// 若数据已全部获取完毕
        let self=this;
        self.questionPage=self.questionPage+1;
        setTimeout(() => {
          self.$http.post('/baike/listFavors.json?pageSize=10&currentPage='+self.questionPage,{}, {emulateJSON: true})
            .then(function (response) {
              if(response.body.data!==null){
                for(let i=0;i<response.body.data.length;i++){
                  self.datas.push(response.body.data[i])
                }
                this.allLoaded3=false;
              }
              this.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        }, 2000)
      }//上拉加载问答
    },
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XButton
    },
  }
</script>
