<template>
  <div class="schoolHouse">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>学校列表</span></div>
      <div class="right">
        <img src="../../assets/img/toMap.png" @click="routerMap()" />
        <!--<i @click="routerMap" class="icon iconfont icon-icon_ditu"></i>-->
      </div>
    </div>
    <div class="choice">
      <i v-if="open" class="icon iconfont icon-icon_shouye_youjiantou"></i>
      <mu-raised-button  ref="button" @click="toggle()" :label="chineselng||'城市选择'" icon=" " :iconClass="[{'icon-icon_esf_xiala_':open,'icon-icon_esf_xiala':!open},'icon iconfont']" labelPosition="before" class="button-city" secondary/>
      <mu-raised-button  ref="button1" @click="toggle1" :label="{'1':'公立','0':'私立',null:'学校类型'}[schoolData.type]" icon=" " :iconClass="[{'icon-icon_esf_xiala_':open1,'icon-icon_esf_xiala':!open1},'icon iconfont']"  labelPosition="before" secondary/>
      <mu-raised-button  ref="button2" @click="toggle2" :label="{'2':'高中','1':'中学','0':'小学',null:'年级选择'}[schoolData.grade]" icon=" " :iconClass="[{'icon-icon_esf_xiala_':open2,'icon-icon_esf_xiala':!open2},'icon iconfont']" labelPosition="before" secondary/>
    </div>
    <div  v-if="marquee" class="tips none">
      <span style="color:#ff7f5f;display: inline-block;">温馨提示:</span><marquee style="">私立学校没有学区只提供附近区域内房源，公立提供学区内房源，但最终以教育局公布为准，仅此参考</marquee>
      <i v-if="marquee" class="deleteMarquee icon iconfont icon-icon_cha" @click="deleteMarquee"></i>
    </div>
    <mt-loadmore v-if="noMore" :class="['school-list',!marquee?'':'margin']" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul :class="['school-list',marquee?'':'margin']">
        <li v-for="list in schoolList" :key="list.id" @click="routerSchool(list.id)">
          <div class="school-top">
            <div class="school-img">
              <img v-if="list.photo==null||list.photo==''" src="../../assets/img/school-s.png" alt="">
              <img v-else :src="imgUrl+list.photo" alt="">
              <!--<i class="score-num">999</i>-->
            </div>
            <div class="school-content">
              <p class="school-name"><nobr>{{list.name}}</nobr></p>
              <p class="school-addr">{{list.cityZH}}&nbsp; <span class="grade" :class="list.grade=='Elementary'?'Elementary':list.grade=='High'?'High':'Secondary'">{{list.type=='Public'?'公立':'私立'}}{{list.grade=='Elementary'?'小学':list.grade=='High'?'高中':'中学'}}</span> </p>
              <!--
                            <p class="score"><span>本年度排名:{{list.frank}}</span><i v-for="icon in parseInt(list.rating/2)" class="icon iconfont icon-icon_wendaxiangqing_yishoucang"></i><i v-for="icon in Math.round(5-(list.rating/2))" class="icon iconfont icon-icon_wendaxiangqing_weishoucang"></i></p>
              -->
              <p class="house-num">{{country=='us'?'该学校附近二手房源：':list.type=='Public'?'该学区内房源：':'3公里内房源：'}}{{list.houseCount==null?'0':list.houseCount}}套</p>
            </div>
            <div class="school-score">
              <p class="score"><span>{{list.frank?list.frank:list.rankingofall?list.rankingofall:'--'}}</span></p>
              <p class=""><span>年度排名</span></p>

            </div>
          </div>
          <!--<div class="school-top">
            <div class="school-img">
              <img v-if="list.photo==null||list.photo==''" src="../../assets/img/moren.png" alt="">
              <img v-else :src="imgUrl+list.photo" alt="">
              &lt;!&ndash;<i class="score-num">999</i>&ndash;&gt;
            </div>
            <div class="school-content">
              <p class="school-name">{{list.name}}</p>
              <p class="school-addr"><i class="icon iconfont icon-dingwei"></i>{{list.grade=='Elementary'?'初中':'高中'}} <span v-if="list.type!='Public'" style="color:#ff7f5f;">私立</span><span v-else>公立</span> {{list.region=='YVR'?'温哥华':'多伦多'}} {{list.address.split(',')[1]}}</p>
              <p class="score"><span>本年度排名:{{list.frank}}</span><i v-for="icon in parseInt(list.rating/2)" class="icon iconfont icon-icon_wendaxiangqing_yishoucang"></i><i v-for="icon in Math.round(5-(list.rating/2))" class="icon iconfont icon-icon_wendaxiangqing_weishoucang"></i></p>
              <p class="house-num">该学区内房源<span>({{list.houseCount==null?'0':list.houseCount}})</span>套</p>
            </div>
          </div>-->
          <!--<div class="school-bottom">-->
            <!--<div>-->
              <!--<p>排名</p>-->
              <!--<p>{{list.frank}}</p>-->
            <!--</div>-->
            <!--<div>-->
              <!--<p>类型</p>-->
              <!--<p>{{list.type=='Private'?'私立':'公立'}}</p>-->
            <!--</div>-->
            <!--<div>-->
              <!--<p>年级</p>-->
              <!--<p>{{list.grade=='Elementary'?'初中':'高中'}}</p>-->
            <!--</div>-->
            <!--<div>-->
              <!--<p>城市</p>-->
              <!--<p>{{list.region=='YVR'?'温哥华':'多伦多'}}</p>-->
            <!--</div>-->
          <!--</div>-->
        </li>
      </ul>
    </mt-loadmore>
    <div v-else class="no-more">
      <img src="../../assets/img/noData.png"/>
      <p>暂无数据</p>
      <p>更换条件试试</p>
    </div>
    <mu-popover overlay="true" overlayOpacity="0.5" popoverClass="choiceActive city-box" :trigger="trigger" :open="open" @close="handleClose">
      <ul class="subTab">
        <li @click="regionAdd($event,null,'城市选择')"  :class="{'active':schoolData.city==null}">不限 <i class="icon iconfont icon-icon_duihao"></i></li>
        <li v-for="list in adds" :class="{'active':schoolData.city==list.englishlng}" @click="regionAdd($event,list.code,list.chineselng,list.englishlng)">{{list.chineselng}}&nbsp;&nbsp;<span class="c-9B9B9B">{{list.englishlng}}</span> <i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-popover>
    <mu-popover overlay="true" overlayOpacity="0.5" popoverClass="choiceActive" :trigger="trigger1" :open="open1" @close="handleClose1">
      <i class="icon iconfont icon-icon_shouye_youjiantou money-sanjiao"></i>
      <ul class="money-list">
        <li @click="choiceMoney(null,$event,'学校类型')" :class="{'active':schoolData.type==null}">不限 <i class="icon iconfont icon-icon_duihao"></i></li>
        <li @click="choiceMoney(1,$event,'公立')" :class="{'active':schoolData.type==1}">公立 &nbsp;&nbsp;<span class="c-9B9B9B">Public</span><i class="icon iconfont icon-icon_duihao"></i></li>
        <li @click="choiceMoney(0,$event,'私立')" :class="{'active':schoolData.type==0}">私立 &nbsp;&nbsp;<span class="c-9B9B9B">Private</span><i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-popover>
    <mu-popover overlay="true" overlayOpacity="0.5" popoverClass="choiceActive" :trigger="trigger2" :open="open2" @close="handleClose2">
      <i class="icon iconfont icon-icon_shouye_youjiantou sort-sanjiao"></i>
      <ul class="sort-list">
        <li @click="sortAdd(null,$event,'年级选择')" :class="{'active':schoolData.grade==null}">不限 <i class="icon iconfont icon-icon_duihao"></i></li>
        <li @click="sortAdd(0,$event,'小学')"  :class="{'active':schoolData.grade==0}">小学 &nbsp;&nbsp;<span class="c-9B9B9B">Elementary school</span><i class="icon iconfont icon-icon_duihao"></i></li>
        <li @click="sortAdd(1,$event,'中学')"  :class="{'active':schoolData.grade==1}">中学 &nbsp;&nbsp;<span class="c-9B9B9B">Secondary school</span><i class="icon iconfont icon-icon_duihao"></i></li>
        <li @click="sortAdd(2,$event,'高中')" v-if="country=='us'"  :class="{'active':schoolData.grade==2}">高中 &nbsp;&nbsp;<span class="c-9B9B9B">High school</span><i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-popover>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { rxUtils } from '../../assets/js/rxUtils'
  import { Loadmore,MessageBox } from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  export default{
    data(){
          return {
            country:null,
            chineselng:null,
            noMore:true,
            allLoaded:false,
            marquee:true,
            trigger: null,
            english:false,
            open: false,
            open1: false,
            open2: false,
            open3: false,
            trigger: null,
            trigger1: null,
            trigger2: null,
            trigger3: null,
            adds:[
              {name:'阿伯兹福德',id:1},
              {name:'安摩尔',id:2},
              {name:'本拿比',id:3},
              {name:'贝尔卡拉',id:4},
              {name:'宝云岛',id:5},
              {name:'不列颠比奇',id:6},
              {name:'高贵林',id:7},
            ],
            add1:[
              {chineselng:'1公里',code:1},
              {chineselng:'3公里',code:3},
              {chineselng:'5公里',code:5},
              {chineselng:'10公里',code:10}
            ],
            region:'YVR',
            city:'ca0201',
            schoolList:[],
            schoolData:{
              pageSize:10,
              currentPage:1,
              buildingType:'',//0:独立屋 1:排屋 2:公寓
              region:'',//区域  YVR:温哥华 YTO:多伦多
              city:null,
              minLatitude:'',//纬度
              maxLatitude:'',//纬度
              minLongitude:'',//经度
              maxLongitude:"",//经度
              grade:null,//0:小学1:中学
              type:null
            },
            imgUrl:''
          }
      },
    mounted(){
      let self=this;
      self.country=sessionStorage.getItem('country');
      if(!localStorage.getItem("showTip")&&self.country=='ca'){
        MessageBox.alert('私立学校没有学区，只提供3公里内房源，更多信息可查看房产百科', '温馨提示');
        localStorage.setItem("showTip",true)
      }
      self.imgUrl=rxUtils.hostSchool;
      document.title=this.$route.name;
      self.code=self.$route.query.code?self.$route.query.code:self.code;
      self.chineselng=self.$route.query.chineselng?self.$route.query.chineselng:self.chineselng;
      self.schoolData.region=self.$route.query.region?self.$route.query.region:self.schoolData.region;
      self.schoolData.city=self.$route.query.city?self.$route.query.city:self.schoolData.city;
      self.schoolData.minLatitude=self.$route.query.minLatitude?self.$route.query.minLatitude:self.schoolData.minLatitude;
      self.schoolData.maxLatitude=self.$route.query.maxLatitude?self.$route.query.maxLatitude:self.schoolData.maxLatitude;
      self.schoolData.minLongitude=self.$route.query.minLongitude?self.$route.query.minLongitude:self.schoolData.minLongitude;
      self.schoolData.maxLongitude=self.$route.query.maxLongitude?self.$route.query.maxLongitude:self.schoolData.maxLongitude;
      self.schoolData.grade=self.$route.query.grade>=0?self.$route.query.grade:self.schoolData.grade;
      self.schoolData.type=self.$route.query.type>=0?self.$route.query.type:self.schoolData.type;

      console.log("刚进入列表页，获取url上参数");
      console.log(self.schoolData);
      this.trigger = this.$refs.button.$el;
      this.trigger1 = this.$refs.button1.$el;
      this.trigger2 = this.$refs.button2.$el;
//      this.trigger3 = this.$refs.button3.$el;
      self.$http.get('/region/listCity.json?code='+self.code, {}, {emulateJSON: true})
        .then(function (response) {
          self.adds=response.body.data;
        }).then(function (error) {
      })//首次进入 页面获取城市信息
      self.$http.post('/school/search.json', this.schoolData, {emulateJSON: true})
        .then(function (response) {
          self.schoolList=response.body.data;
          if(self.schoolList==null||self.schoolList.length==0){
            self.noMore=false;
          }else{
            self.noMore=true;
          }
        }).then(function (error) {
      })//首次获取列表
    },
    beforeRouteLeave(to,from,next){
      if(to.fullPath == "/"||to.fullPath.indexOf('/mapSchool')>-1){  //返回首页时，清除页面缓存
        this.$destroy();
        this.$route.meta.keepAlive=false;
      }else{
        this.$route.meta.keepAlive=true;
      }
      console.log("当前缓存状态："+this.$route.meta.keepAlive);
      next();
    },
    methods:{
      clearArea(){
        let self=this;
        self.schoolData.minLatitude='';
        self.schoolData.maxLatitude='';
        self.schoolData.minLongitude='';
        self.schoolData.maxLongitude='';
      },
      routerSchool(id){
          this.$router.push({name:'学校详情',params:{id:id},query:{region:this.schoolData.region}})
      },
      loadBottom() {
        let self =this;
        this.allLoaded = true;
        this.schoolData.currentPage=this.schoolData.currentPage+1;
        setTimeout(function(){
          self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
            .then(function (response) {
              for(let i=0;i<response.body.data.length;i++){
                  self.schoolList.push(response.body.data[i])
              }
              self.allLoaded = false;
              self.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        },2000)

      },
      loadTop() {
          let self=this;
          this.schoolData.currentPage=1;
          setTimeout(function(){
            self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
              .then(function (response) {
                self.schoolList=response.body.data;
                self.$refs.loadmore.onTopLoaded();
              }).then(function (error) {
            })
          },2000)
      },
      routerMap(){//region=YVR&city=&regionCode=ca0201
        var self = this;
        _czc.push(['_trackEvent', '学区找房', 'SchoolSwitchMap','切换地图']);
        this.$router.push({name:'学区地图',query:{region:self.schoolData.region,city:self.schoolData.city,grade:self.schoolData.grade,type:self.schoolData.type,code:self.code,chineselng:self.chineselng}})
      },
      deleteMarquee(){
          this.marquee=false;
          document.getElementsByClassName('mint-loadmore-top')[0].style.marginTop='1rem'
      },//删除文字滚动
      /*筛选框的弹出逻辑开始*/
      toggle () {
        this.open = !this.open;
        _czc.push(['_trackEvent', '学区找房', 'SchoolAreaButton','学校区域选择按钮']);
        this.$refs.button.$el.style.color='#f14114';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#656565';
      },
      toggle1 () {
        this.open1 = !this.open1;
        _czc.push(['_trackEvent', '学区找房', 'SchoolTypeButton','学校类型选择按钮']);
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#f14114';
        this.$refs.button2.$el.style.color='#656565';
      },
      toggle2 () {
        this.open2 = !this.open2;
        _czc.push(['_trackEvent', '学区找房', 'SchoolGradeButton','学校年级选择按钮']);
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#f14114';
      },
      handleClose (e) {
        this.open = false
        this.$refs.button.$el.style.color='#656565';
      },
      handleClose1 (e) {
        this.open1 = false
        this.$refs.button1.$el.style.color='#656565';
      },
      handleClose2 (e) {
        this.open2 = false
        this.$refs.button2.$el.style.color='#656565';
      },
      /*筛选框的弹出逻辑结束*/
      /*区域选择开始*/
      regionAdd(e,id,chineselng,city){//id为code，city为英文名
        let self=this;
        let el=document.getElementsByClassName('subTab')[0].getElementsByTagName('li');
        self.schoolData.city=city?city:'';
        self.clearArea();
        self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
          .then(function (response) {
            this.open=false;
            self.chineselng=chineselng?chineselng:null;
            this.$refs.button.$el.style.color='#565656';
            self.schoolList=response.body.data;
            if(self.schoolList==null||self.schoolList.length==0){
                self.noMore=false;
            }else{
                self.noMore=true;
            }
          }).then(function (error) {
        })
      },//选择小区域
      /*区域选择结束*/
      //选择类型,
      choiceMoney(id,e){
        let el=document.getElementsByClassName('money-list')[0].getElementsByTagName('li');
        let self=this;
        self.schoolData.type=id;
        self.clearArea();
        self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
          .then(function (response) {
            self.open1=false;
            self.$refs.button1.$el.style.color='#565656';
            self.schoolList=response.body.data;
            if(self.schoolList==null||self.schoolList.length==0){
              self.noMore=false;
            }else{
              self.noMore=true;
            }
          }).then(function (error) {
        })
      },
      //年级选择
      sortAdd(id,e){
        let el=document.getElementsByClassName('sort-list')[0].getElementsByTagName('li');
        let self=this;
        self.schoolData.grade=id;
        self.clearArea();
        self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
          .then(function (response) {
            self.schoolList=response.body.data;
            self.open2=false;
            self.$refs.button2.$el.style.color='#565656';
            if(self.schoolList==null||self.schoolList.length==0){
              self.noMore=false;
            }else{
              self.noMore=true;
            }
          }).then(function (error) {
        })
      },//年级选择逻辑
      back(){
          this.$router.back()
      },
      setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
          callback(WebViewJavascriptBridge)
        } else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
              callback(WebViewJavascriptBridge)
            },
            false
          );
        }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix.less";
  .schoolHouse .mu-appbar .right img{
    width:24/@base;
    height:24/@base;
  }
  .v-modal{
    z-index: 999999998 !important;
  }
  .mint-msgbox-wrapper{
    z-index: 999999999 !important;
  }
  .mu-popover {
    display: box;
    display: -webkit-box;
    display: -moz-box;
    div.timer, div.room-num, div.wish-num, div.measure-num {
      width: 100%;
      p {
        padding: 0 20/@base 0 18/@base;
        font-size: 14/@base;
        color: #9B9B9B;
      }
      ul {
        padding: 0 30/@base 0 20/@base;
        overflow: hidden;
        li {
          float: left;
          width: 70/@base;
          height: 32/@base;
          line-height: 32/@base;
          background-color: #F2F2F2;
          font-size: 12px;
          color: #4A4A4A;
          text-align: center;
          margin-left: 14/@base;
          margin-bottom: 10/@base;
          -webkit-border-radius:;
          -moz-border-radius:;
          border-radius: 2px;
        }
        li.active {
          border: 1px solid #f14114;
          color: #f14114;
          background-color: #fff;
        }
        li:first-child {
          margin-left: 0;
        }
        li:nth-child(5n) {
          margin-left: 0;
        }
      }
    }
    ul.sort-list {
      width: 100%;
      padding-bottom: 20/@base;
      li {
        padding: 14/@base 0 14/@base 20/@base;
        font-size: 14/@base;
        color: #656565;
        i {
          float: right;
          margin-right: 30/@base;
          color: #f14114;
          display: none;
        }
        i.icon-duihao{
          font-size: 17/@base;
        }
      }
      li.active {
        background-color: #fbfbfb;
        color: #f14114;
        i {
          display: block;
          font-size: 16/@base;
        }
      }
    }
    input.money-text {
      width: 100/@base;
      padding: 3/@base 0;
      text-align: center;
      font-size: 14/@base;
      outline: none;
    }
    button.money-active {
      background-color: #f14114;
      color: #fff;
      width: 55/@base;
      text-align: center;
      border: none;
      border-radius: 2px;
      padding: 5/@base 4/@base;
      margin-left: 10/@base;
    }
    ul.money-list {
      width: 100%-20/@base;
      li {
        font-size: 14px;
        color: #656565;
        width: 100%;
        padding: 12/@base 0 12/@base 20/@base;
        i {
          color: #f14114;
          float: right;
          margin-right: 20/@base;
          display: none;
        }
        i.icon-duihao{
          font-size: 17/@base;
        }
      }
      li.active {
        background-color: #fbfbfb;
        color: #f14114;
        i {
          font-size: 12/@base;
          display: block;
        }
      }
    }
    ul.tab, ul.subTab {
      display: block;
      padding-top: 10/@base;
      li {
        padding: 10/@base  0;
      }
    }
    ul.subTab {
      box-flex: 1;
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      li {
        font-size: 14/@base;
        color: #656565;
        padding-left: 20/@base;
        i {
          float: right;
          color: #f14114;
          margin-right: 18/@base;
          font-size: 12 @base;
          display: none;
        }
        i.icon-duihao{
          font-size: 17/@base;
        }
      }
      li.active {
        background: #fbfbfb;
        color: #f14114;
        i {
          display: block;
          font-size: 17/@base;
        }
      }
    }
    ul.tab {
      width: 80/@base;
      text-align: center;
      background-color: #fbfbfb;
      border-right: 1px solid #ececec;
      height: 100%;
      position: fixed;
      max-height: 400/@base;
      li {
        font-size: 14/@base;
        color: #656565;
      }
      li.active {
        color: #f14114;
        i {
          display: block;
          color: #f14114;
        }
      }
    }
  }
  ul.sort-list{
    i.icon-icon_shouye_youjiantou{
      left:120/@base;
    }
  }
  ul.money-list{
    i.icon-icon_shouye_youjiantou{
      left:214/@base;
    }
    li.active{
      i.icon-icon_duihao{
        font-size: 16/@base!important;
      }
    }
  }
  .choiceActive {
    width:360/@base;
    left: 7/@base !important;
    top:100/@base!important;
    z-index: 99999999 !important;
    max-height: 500/@base!important;
    i.icon-icon_shouye_youjiantou{
      position: absolute;
      color:#fff;
      transform: rotate(-90deg);
      font-size: 30/@base;
      top:-24/@base;
    }
  }
  div.no-more{
    width:100%;
    font-size: 17/@base;
    text-align: center;
    padding:250/@base 0;
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
  i.money-sanjiao{
    left:168/@base;
  }
  i.sort-sanjiao{
    right:36/@base;
  }
  div.mu-overlay{
    top:44/@base;
  }
  .city-box{
    overflow: auto;
    min-height: 400/@base;
  }
  .schoolHouse{
  background-color:#fbfbfb;
    .mint-loadmore-top{
      margin-top:28/@base;
    }
  .school-list{
      background-color:#fbfbfb;
      li{
        background-color: #fff;
        padding:20/@base 10/@base 5/@base 10/@base;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        div.school-bottom{
          width:100%;
          display:box;
          display:-webkit-box;
          display:-moz-box;
          padding-top:10/@base;
        }
        div.school-bottom>div{
          box-flex:1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          width:100%;

          p{
            width:100%;
            text-align: center;
          }
          p:first-child{
            font-size: 12/@base;
            color: #9B9B9B;
          }
          p:last-child{
            font-size: 14/@base;
            color: #4A4A4A;
          }
        }
        div.school-top{
          display:box;
          display:-webkit-box;
          display:-moz-box;
          padding-bottom:15/@base;
          p.score{
            span{
              color:#9b9b9b;
              vertical-align: middle;
              margin-right:4/@base;
            }
            i.icon{
              vertical-align: middle;
            }
          }
          div.school-score{
            width:90/@base;
            text-align: right;
            padding:25/@base 0 10/@base;
            color:#9b9b9b;
            span{
              font-size: 12/@base;
            }
            p.score{
              span{
                font-size: 20/@base;
                color:#000;
              }
            }
          }
          div.school-content{
            box-flex:1;
            -moz-box-flex: 1;
            -webkit-box-flex: 1;
            width:100%;
            width:160/@base;
            line-height: 27/@base;
            p.school-name{
              font-size: 16/@base;
              color: #4A4A4A;
            }
            p.school-addr{
              font-size: 12/@base;
              color: #9B9B9B;
              i{
                vertical-align: middle;
              }
              .grade.Elementary{
                color:#fff;
                font-size: 12/@base;
                background:#B1D788;
              }
              .grade.Secondary{
                color:#fff;
                font-size: 12/@base;
                background:#FFCABC;
              }
              .grade.High{
                color:#fff;
                font-size: 12/@base;
                background:#58ACFF;
              }
            }
            p.house-num{
              font-size: 12/@base;
            }
          }
          div.school-img{
            width:80/@base;
            height:80/@base;
            position:relative;
            margin-right:10/@base;
            img{
              width:100%;
              height:100%;
            }
            i.score-num{
              position: absolute;
              top:-2/@base;
              left:5/@base;
              color:#fff;;
              font-size:12/@base;
              width:28/@base;
              height:24/@base;
              line-height:28/@base;
              text-align: center;
              background-image:url('../../assets/img/paiming-bg.png');
              background-size:100% 100%;
              span{
                position: absolute;
                top:30/@base;
                color:#fff;
                font-size: 14/@base;
                left:12/@base;
              }
            }
          }
        }
      }
    }

    div.tips{
      margin-top:100/@base;
      border-bottom:1px solid #ececec;
      background-color: #fff;
      position: relative;
      height:40/@base;
      line-height:40/@base;
      padding-left:16/@base;
      span{
        width:70/@base;
        display:inline-block;
      }
      marquee{
        display: inline-block;
        font-size: 12px;
        color: #4A4A4A;
        padding:4px 0;
        position: absolute;
        top:-5/@base;
      }
      i.icon{
        top:0;
      }
    }
    i.deleteMarquee{
      position: absolute;
      top: 86/@base;
      right: 0;
      box-shadow: 0 0 black;
      padding: 0 10px;
      background: rgba(239, 206, 185,0);
      font-size: 27/@base;
    }
    .mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#4a4a4a;
      border-bottom: 0;
      position:fixed;
      top:0;
      i.icon{
        font-size: 26/@base;
      }
      i.icon-back{
        font-size: 17/@base!important;
      }
      i.icon-llhomesearch{
        font-size: 20/@base;
        vertical-align: middle;
        margin-top:-4/@base;
      }
      i.icon-fanyi2,i.icon-fanyi-ying,i.icon-llhomesearch{
        margin-right:16/@base;
      }
    }
    .choice{
      display:box;
      display:-webkit-box;
      display:-moz-box;
      position:fixed;
      top:44/@base;
      width:100%;
      z-index:99999999;
      border-bottom:1px solid #ddd;
      i.icon-icon_shouye_youjiantou{
        position: absolute;
        font-size: 30/@base;
        transform: rotate(-90deg);
        top:30/@base;
        color:#fff;
        left:50/@base;
      }
      button{
        width:100%;
        display:block;
        box-flex:1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        min-width: auto;
        border-radius: 0;
        border: none;
        box-shadow: none;
        background-color:#fff;
        font-size: 14/@base;
        color: #656565;
        div.mu-raised-button-wrapper{
          span.mu-raised-button-label{
            height: 20/@base;
            line-height: 20/@base;
          }
        }
      }
    }
    ul.margin{
      margin-top:0;
    }
    div.right{
      i.icon{
        font-size: 27/@base!important;
      }
    }
  }
</style>
