<template>
  <div class="schoolHouse">
    <div class="mu-appbar mu-paper-1" v-if="!hideTitle">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>学校地图</span></div>
      <div class="right">
        <img src="../../assets/img/toList.png" @click="toList()" />
        <!--<i @click="routerMap" class="icon iconfont icon-icon_ditu"></i>-->
      </div>
    </div>
    <div class="choice none">
      <i v-if="open" class="icon iconfont icon-icon_shouye_youjiantou"></i>
      <mu-raised-button  ref="button" @click="toggle()" label="区域" labelPosition="before" secondary/>
      <mu-raised-button  ref="button1" @click="toggle1" label="类型" labelPosition="before" secondary/>
      <mu-raised-button  ref="button2" @click="toggle2" label="年级" labelPosition="before" secondary/>
    </div>
    <div class="screen" ><img src="../../assets/img/screen.png" @click="openScreenDialog()"/></div>
    <div @click.stop="hideSwipe" id="map-container" class="" v-if="flag"></div>
    <div @click.stop="hideSwipe" id="googleMap"></div>
    <mu-dialog dialogClass="screen-dialog mapSchool-screen dialog" :open="dialog" @close="hideMore" scrollable>
      <div class="mu-appbar mu-paper-1">
        <div @click="hideMore" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>学校筛选</span></div>
        <div class="right"></div>
      </div>
      <div class="first-row clearfix" @click="openCity">
        <span> 城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市</span>
        <div class="city-btn float-r">{{chineselng||'请选择'}} <i class="icon iconfont icon-icon_xiaojiantouyou"></i></div>
      </div>
      <div class="screen-row clearfix" >
        <div class="title">学校类型</div>
        <div class="items clearfix">
          <div class="item float-l" @click="choiceType(1)" :class="{'active':schoolData.type==1}">公立</div>
          <div class="item float-l " @click="choiceType(0)" :class="{'active':schoolData.type==0}">私立</div>
        </div>
      </div>
      <div class="screen-row clearfix" >
        <div class="title">年级选择</div>
        <div class="items clearfix">
          <div class="item float-l" @click="choiceGrade(0)" :class="{'active':schoolData.grade==0}">小学</div>
          <div class="item float-l " @click="choiceGrade(1)" :class="{'active':schoolData.grade==1}">中学</div>
          <div class="item float-l " v-if="country=='us'" @click="choiceGrade(2)" :class="{'active':schoolData.grade==2}">高中</div>
        </div>
      </div>
      <div class="screen-row clearfix" >
        <div class="title">学校排名</div>
        <div class="items clearfix">
          <div class="item float-l" @click="choiceRank(10)" :class="{'active':schoolData.rank==10}">前10</div>
          <div class="item float-l" @click="choiceRank(20)" :class="{'active':schoolData.rank==20}">前20</div>
          <div class="item float-l" @click="choiceRank(50)" :class="{'active':schoolData.rank==50}">前50</div>
          <div class="item float-l" @click="choiceRank(80)" :class="{'active':schoolData.rank==80}">前80</div>
        </div>
      </div>
      <mu-raised-button @click="subMore" backgroundColor="#FB704C" class="demo-raised-button" fullWidth iconClass="icon iconfont icon-icon_shouye_fangdajing" label="确定" icon=" " primary/>
      <mu-raised-button @click="resetMore" backgroundColor="#fff" class="demo-raised-button" fullWidth  label="重置" icon=" " primary/>
    </mu-dialog>
    <mu-dialog dialogClass="dialog cityLog1" :open="dialogCity" @close="openScreenDialog" scrollable>
      <div class="mu-appbar mu-paper-1">
        <div @click="openScreenDialog" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>城市</span></div>
        <div class="right"></div>
      </div>
      <ul class="city-list">
        <li @click="choiceCity('不限',null)" :class="{'active':schoolData.city==null}">不限<i class="icon iconfont icon-icon_duihao"></i></li>
        <li v-for="list in adds" :key="list.id" :class="{'active':schoolData.city==list.englishlng}" @click="choiceCity(list.chineselng,list.englishlng)">{{list.chineselng}} <sub>{{list.englishlng}}</sub> <i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-dialog>
    <!--<mu-popover overlay="true" overlayOpacity="0.5" popoverClass="choiceActive city-box" :trigger="trigger" :open="open" @close="handleClose">
      <ul class="subTab">
        <li class="active" @click="regionAdd('',$event)" >不限 <i class="icon iconfont icon-icon_duihao"></i></li>
        <li v-for="list in adds"  @click="regionAdd(list.code,$event)">{{list.chineselng}} <i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-popover>
    <mu-popover overlay="true" overlayOpacity="0.5" popoverClass="choiceActive" :trigger="trigger1" :open="open1" @close="handleClose1">
      <i class="icon iconfont icon-icon_shouye_youjiantou money-sanjiao"></i>
      <ul class="money-list">
        <li class="active" @click="choiceMoney('',$event)">不限 <i class="icon iconfont icon-icon_duihao"></i></li>
        <li @click="choiceMoney(1,$event)">公立 <i class="icon iconfont icon-icon_duihao"></i></li>
        <li @click="choiceMoney(0,$event)">私立 <i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-popover>
    <mu-popover overlay="true" overlayOpacity="0.5" popoverClass="choiceActive" :trigger="trigger2" :open="open2" @close="handleClose2">
      <i class="icon iconfont icon-icon_shouye_youjiantou sort-sanjiao"></i>
      <ul class="sort-list">
        <li class="active" @click="sortAdd('',$event)">不限 <i class="icon iconfont icon-icon_duihao"></i></li>
        <li @click="sortAdd(0,$event)">小学 <i class="icon iconfont icon-icon_duihao"></i></li>
        <li @click="sortAdd(1,$event)">中学 <i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-popover>-->
    <mu-toast v-show="toast" :message="toastMsg" @close="hideToast"/>
    <div class="swiper-bg">
      <swiper v-if="swipeShow" class="school-swipe" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(list,index) in schoolList" :key="list.id" class="toHere-bg">
          <div class="toHere" @click="toHere(list.latitude,list.longitude)"><img src="../../assets/img/toHere.png"></div>
          <div @click="routerSchool(list.id)" class="school-top ">
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
              <p class="house-num">{{list.type=='Public'?'该学区内房源：':'3公里内房源：'}}{{list.houseCount==null?'0':list.houseCount}}套</p>
            </div>
            <div class="school-score">
              <p class="score"><span>{{list.frank?list.frank:list.ranking}}</span></p>
              <p class=""><span>年度排名</span></p>

            </div>
          </div>
          <span class="index-num" >{{index+1}}/{{schoolList.length}}</span>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
  import { rxUtils } from '../../assets/js/rxUtils'
  import prativeSecondary from '../../assets/img/prativeSecondary.png'
  import prativeElementary from '../../assets/img/prativeElementary.png'
  import publicSecondary from '../../assets/img/publicSecondary.png'
  import publicElementary from '../../assets/img/publicElementary.png'
  import prativeHigh from '../../assets/img/prativeHigh.png'
  import publicHigh from '../../assets/img/publicHigh.png'
  import mapboxgl from 'mapbox-gl';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default{
    data(){
      return {
        country:null,
        isApp:false,
        hideTitle:false,
        maxZoom:9,
        minZoom:7,
        chineselng:null,
        latitude:{
          'YVR':49.24591,
          'YTO':43.744575
        },
        longitude:{
          'YVR':-123.11906,
          'YTO':-79.558225
        },
        city:'请选择',
        code:'',
        dialog:false,
        dialogCity:false,
        first:true,
        stopPropagation:false,
        flag:true,
        toast:false,
        toastMsg:'',
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
        ],
        region:'YVR',
        schoolList:[],
        totalResults:0,
        infowindowList:[],
        schoolData:{
          pageSize:80,
          currentPage:1,
          buildingType:'',//0:独立屋 1:排屋 2:公寓
          region:'',//区域  YVR:温哥华 YTO:多伦多
          city:null,
          minLatitude:'',//纬度
          maxLatitude:'',//纬度
          minLongitude:'',//经度
          maxLongitude:"",//经度
          grade:null,//0:小学1:中学
          type:null,
          rank:null
        },
        imgUrl:'',
        geojson:{
          type: "FeatureCollection",
          features: [],
          list:[]
        },
        map:'',
        markers:[],
        googleMap:null,
        elementaryIndependent:require('../../assets/img/icon_xiaoxue_sili@2x.png'),//私立小学
        elementaryPublic:require('../../assets/img/icon_xiaoxue_gongli@2x.png'),//公立小学
        secondaryPublic:require('../../assets/img/icon_zhongxue_gongli@2x.png'),//公立中学
        secondaryIndependent:require('../../assets/img/icon_zhongxue_sili@2x.png'),//私立中学
        highPublic:require('../../assets/img/icon_zhongxue_gongli@2x.png'),//公立高中
        highIndependent:require('../../assets/img/icon_zhongxue_sili@2x.png'),//私立高中
        popups:[],
        swipeShow:false,
        index:0
      }
    },
    props:{
      imgAffix:{
        type:Object,
        default: function () {
          return {
            prefix:'',
            suffix:{
              png:'?x-oss-process=image/format,png/interlace,1/quality,q_80',
              jpg:'?x-oss-process=image/format,jpg/interlace,1/quality,q_80'
            }
          }
        }
      },
      list:{
        type:Array,
        default:function () {
          return [];
        }
      },
      swiperOption:{
        type:Object,
        default: function () {
            let self=this;
          return {
            // 所有配置均为可选（同Swiper配置）
            autoplay: false,
            direction : 'horizontal',
            grabCursor : true,
            setWrapperSize :true,
            autoHeight: true,
            loop:false,
            speed:500,
            initialSlide:self.index,
            autoplayDisableOnInteraction:false,
            paginationClickable :true,
            mousewheelControl : false,
            observeParents:true,
            debugger: true,
            onTransitionStart(swiper){
            },
            onSlideChangeEnd(swiper){
              console.log("点击第"+swiper.activeIndex+"套房源");
              console.log("当前坐标"+self.geojson.list[swiper.activeIndex].coordinates+"");
              if(!self.isApp) {
                var infowindow = new google.maps.InfoWindow({
                  content:self.geojson.list[swiper.activeIndex].description
                });
                if(self.infowindowList.length>0){
                  for(let j=0;j<self.infowindowList.length;j++){
                    self.infowindowList[j].close();
                    self.markers[j].setZIndex(j);
                  }
                }
                setTimeout(function() {
                  infowindow.open(self.googleMap,self.markers[swiper.activeIndex]);
                  self.infowindowList.push(infowindow);
                },0)
              }
              self.markers[swiper.activeIndex].setZIndex(999);
            }
          }
        }

      },
      namespace:{
        type:String,
        default:'mySwiperA'
      },
      type:{
        type:String,
        default:"link"
      },
    },
    mounted(){
      let self=this;
      document.getElementById('map-container').style.height=window.innerHeight+'px';
      document.getElementById('googleMap').style.height=window.innerHeight+'px';
      self.imgUrl=rxUtils.hostSchool;
      document.title=this.$route.name;
      self.country=sessionStorage.getItem('country');
      //获取APP标识
      self.isApp = self.$route.query.isApp?self.$route.query.isApp:false;
      self.hideTitle = self.$route.query.hideTitle?self.$route.query.hideTitle:false;
      //首次进入时，若URL上有参数，则先取参数
      self.code=self.$route.query.code?self.$route.query.code:self.code;
      self.chineselng=self.$route.query.chineselng?self.$route.query.chineselng:self.chineselng;
      self.schoolData.region=self.$route.query.region?self.$route.query.region:self.schoolData.region;
      self.schoolData.city=self.$route.query.city?self.$route.query.city:self.schoolData.city;
      self.schoolData.grade=self.$route.query.grade>=0?self.$route.query.grade:self.schoolData.grade;
      self.schoolData.type=self.$route.query.type>=0?self.$route.query.type:self.schoolData.type;
      this.trigger = this.$refs.button.$el;
      this.trigger1 = this.$refs.button1.$el;
      this.trigger2 = this.$refs.button2.$el;
//      this.trigger3 = this.$refs.button3.$el;
      //首次进入 页面获取城市信息
      self.$http.get('/region/listCity.json?code='+this.code, {}, {emulateJSON: true})
        .then(function (response) {
          self.adds=response.body.data;
        }).then(function (error) {
      })
      //首次进入页面，搜索
      self.$http.post('/school/search.json', this.schoolData, {emulateJSON: true})
        .then(function (response) {
          self.totalResults=response.body.totalResults;
          self.showResult();
          if(response.body.data!==null){
            self.schoolList=response.body.data;
            self.showMap();
            console.log(self.googleMap);
            self.flag=false;//隐藏mapbox地图
          }else{
            self.drawMap();
          }
        }).then(function (error) {
      })

      if (self.isApp){
        this.setupWebViewJavascriptBridge(function(bridge) {
          if(self.isApp!='IOS'){
            //init代码，IOS不能执行  安卓必须要执行
            bridge.init(function(message, responseCallback) {
              responseCallback(data);
            });
          }
          //注册方法 供客户端调用
          bridge.registerHandler("updateSchoolMap",function(data,responseCallback){
            //查询接口
            data=self.isApp=='IOS'?data:JSON.parse(data);
            self.schoolData=data;
            self.$http.post('/school/search.json', data, {emulateJSON: true})
              .then(function (response) {
                self.totalResults=response.body.totalResults;
                self.showResult();
                if(response.body.data.length>0){
                  self.schoolList=response.body.data;
                  console.log('准备绘制筛选后的点');
                  self.drawMarkers();
                  self.moveCenter();
                  var zoom =data.city?9:7;
                  self.setZoom(zoom);
                }else{
                  self.clearMarkers();
                }

              }).then(function (error) {
            })
            })
          bridge.registerHandler("getSearchData",function(data,responseCallback){
            responseCallback(self.schoolData);
          });
        })
      }
    },
    methods:{
      toList(){
        var self = this;
        console.log('即将跳转列表页面');
        console.log(self.schoolData.city);
        this.$router.push({name:'学区房',query:{region:self.schoolData.region,city:self.schoolData.city,grade:self.schoolData.grade,type:self.schoolData.type,code:self.code,chineselng:self.chineselng,minLatitude:self.schoolData.minLatitude,maxLatitude:self.schoolData.maxLatitude,minLongitude:self.schoolData.minLongitude,maxLongitude:self.schoolData.maxLongitude}})
      },
      choiceCity(text,englishlng){
        this.chineselng=text;
        this.schoolData.city=englishlng;
        this.openScreenDialog();
      },
      choiceType(type){//1公立  0私立
        var self = this;
        if(self.schoolData.type==type){
          self.schoolData.type=null;
        }else{
          self.schoolData.type=type
        }
      },
      choiceGrade(grade){//1中学  0小学
        var self = this;
        if(self.schoolData.grade==grade){
          self.schoolData.grade=null;
        }else{
          self.schoolData.grade=grade
        }
      },
      choiceRank(rank){//排名
        var self = this;
        if(self.schoolData.rank==rank){
          self.schoolData.rank=null;
        }else{
          self.schoolData.rank=rank;
        }
      },
      openScreenDialog(){
        let self = this;
        if (self.isApp){
          this.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler('toSchoolScreen',null,function(resp){

              }
            );
          })
        }else{
          this.dialog=true;
          this.dialogCity=false;
        }
      },
      openCity(){
        this.dialog = false;
        this.dialogCity=true;
      },
      hideMore(){
        this.dialog = false;
        console.log('关闭筛选事件');
      },
      resetMore(){
        this.schoolData.grade=null;
        this.schoolData.type=null;
        this.schoolData.city=null;
        this.schoolData.rank=null;
        this.chineselng='请选择';
        console.log('重置按钮事件');
      },
      subMore(){
        var self = this;
        self.schoolData.minLatitude='';
        self.schoolData.maxLatitude='';
        self.schoolData.minLongitude='';
        self.schoolData.maxLongitude='';
        console.log(self.schoolData);
        self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
          .then(function (response) {
            self.totalResults=response.body.totalResults;
            self.showResult();
            if(response.body.data.length>0){
              self.schoolList=response.body.data;
              console.log('准备绘制筛选后的点');
              self.drawMarkers();
            }else{
              self.clearMarkers();
            }
            self.moveCenter();
            if(self.schoolData.city){
              self.setZoom(self.maxZoom);
            }else{
              self.setZoom(self.minZoom);
            }
            self.dialog = false;
          }).then(function (error) {
        })
        console.log('查询按钮事件');
      },

      showMap() {
        var self = this;
        self.googleMap = self.drawMap();
        console.log(self.googleMap.getDiv());
        google.maps.event.addListener(self.googleMap, 'dragend', function (e) {
          self.onTouchEnd();
        });
        self.drawMarkers();

      },
      setZoom(zoom){
        var self = this;
        self.googleMap.setZoom(zoom);
      },
      //绘制地图
      drawMap() {
        var self = this;
        var latitude = self.schoolList.length>0?self.schoolList[0].latitude:self.latitude[self.schoolData.region];
        var longitude = self.schoolList.length>0?self.schoolList[0].longitude:self.longitude[self.schoolData.region];
        console.log("地图中心点坐标");
        console.log(latitude,longitude);
        var myCenter=new google.maps.LatLng(latitude,longitude);
        var el = document.getElementById("googleMap");
        var mapProp = {
          center:myCenter,
          zoom:this.schoolData.city?this.maxZoom:this.minZoom,
          mapTypeId:google.maps.MapTypeId.ROADMAP,
          disableDefaultUI:true
        };
        return new google.maps.Map(el,mapProp);
      },
      //闭包循环绘制描点
      moveCenter(){
        var self = this;
        var myCenter=new google.maps.LatLng(self.schoolList[0].latitude,self.schoolList[0].longitude);
        self.googleMap.setCenter(myCenter);
      },
      drawMarkers(){
        var self = this;
        self.getMarkersList();
        if(self.markers.length>0){
          console.log("当前地图上有"+self.markers.length+"个点，已清除");
          self.clearMarkers();
        }
        console.log("即将绘制"+self.geojson.list.length+"个点，其数据如下");
        console.log(self.geojson.list);
        for(var i=0;i<self.geojson.list.length;i++){
          (function(i){
            var marker = self.drawMarker(self.geojson.list[i],self.googleMap);
            marker.setZIndex(i);
            self.drawInfo(self.geojson.list[i],i,marker);
          })(i)
        }
        console.log("已经绘制"+self.geojson.list.length+"个点");
      },
      //处理描点数据
      getMarkersList(){
        var self = this;
        if(self.geojson.list.length){
          self.geojson.list=[];
        }
        console.log("schoolList");
        console.log(self.schoolList);
        for(var i=0;i<self.schoolList.length;i++){
          var school = self.schoolList[i];
          var type=school.type=="Public"?'公立':'私立';
          var str = school.type=="Public"?'查看学区内房源':'查看3公里内房源'
          var obj ={
            'description':'<div class="infoWindow"><h3>'+school.name+'</h3>'+'<p >'+type+'&nbsp;&nbsp;&nbsp;<a class="toHouseList" href="#/mapSchoolHouse?schoolId='+school.id+'">'+str+school.houseCount+'套&gt;</a></p></div>',
            "coordinates": [school.latitude, school.longitude],
            'type':school.type,
            'grade':school.grade
          }
          self.geojson.list.push(obj);
        }
      },
      //描点
      drawMarker(obj,map) {
        var self = this;
        var pic=null;
        if(obj.grade=='Elementary'){
          pic= obj.type=='Public'?publicElementary:prativeElementary;
        }else if(obj.grade=='High'){
          pic= obj.type=='Public'?publicHigh:prativeHigh;
        }else{
          pic= obj.type=='Public'?publicSecondary:prativeSecondary;
        }
        var coordinates=new google.maps.LatLng(obj.coordinates[0],obj.coordinates[1]);
        var marker=new google.maps.Marker({
          position:coordinates,
          icon:pic
        });
        marker.setMap(map);
        self.markers.push(marker);
        return marker;
      },
      //清除描点
      clearMarkers(){
        var self = this;
        for(let i=0;i<self.markers.length;i++){
          self.markers[i].setMap(null);
        }
        console.log(""+self.markers.length+"个点，已清除");
        self.markers=[];
      },
      //绘制弹窗信息
      drawInfo(obj,i,marker) {
        var self = this;
        var infowindow = new google.maps.InfoWindow({
          content:obj.description,
          disableAutoPan:true
        });
        marker.addListener('click', function(e) {
          console.log("点击第"+i+"套房源");
          console.log("当前坐标"+obj.coordinates+"");
          if(!self.isApp){
            if(self.infowindowList.length>0){
              for(let j=0;j<self.infowindowList.length;j++){
                self.infowindowList[j].close();
                marker.setZIndex(j);
              }
            }
            console.log(infowindow);
            console.log(infowindow.position);
            console.log(infowindow.content);
            infowindow.open(self.googleMap,marker);
            self.infowindowList.push(infowindow);
            marker.setZIndex(999);
          }
          self.showSwipe(i);
        });
      },
      //移动地图触发事件
      onTouchEnd(){
        var self = this;
        /*console.log("self.first:"+self.first);
        if(self.first){
          self.first=false;
          return;
        }
        console.log("self.first==self.googleMap.getBounds():");*/

        self.schoolData.minLatitude = self.googleMap.getBounds().f.b;
        self.schoolData.maxLatitude = self.googleMap.getBounds().f.f;
        self.schoolData.minLongitude = self.googleMap.getBounds().b.b;
        self.schoolData.maxLongitude = self.googleMap.getBounds().b.f;
        self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
          .then(function (response) {
            self.totalResults=response.body.totalResults;
            self.showResult();
            if(response.body.data!==null) {
              self.schoolList = response.body.data;
              console.log("移动地图请求得到的新数据");
              console.log(self.schoolList);
              //self.showMap();
              self.drawMarkers();
            }
          })

        console.log(self.schoolData.minLatitude);
        console.log(self.schoolData.maxLatitude);
        console.log(self.schoolData.minLongitude);
        console.log(self.schoolData.maxLongitude);
      },
      //展示搜索结果
      showResult(){
        var self = this;
        var toastMsg='';
        if(self.totalResults>=80){
          toastMsg="为您选出"+self.totalResults+"所学校，显示80所"
        }else if(self.totalResults==0){
          toastMsg="暂时没有找到符合的学校"
        }else{
          toastMsg="已为您选出"+self.totalResults+"所学校"
        }
        console.log(toastMsg);
        self.showToast(toastMsg);
        self.swipeShow=false;
      },
      //展示toast公用方法
      showToast(toastMsg){
        var self = this;
        self.toastMsg=toastMsg;
        console.log('self.toastMsg');
        console.log(self.toastMsg);
        this.toast = true;
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 3000)
      },
      //闲时候隐藏toast
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      //切换底部滑动组件
      showSwipe(i) {
        var self = this;
        self.index=i;
        console.log(self.index);
        if(i>=0){
          self.swipeShow=false;
          setTimeout(function(){
            self.swipeShow=true;
          },1)
          setTimeout(function(){
            self.$refs.mySwiper.swiper.slideTo(i, 10, false)
          },1)
        }
      },
      toHere(latitude,longitude){
        var googleUrl="http://www.google.cn/maps/dir//"+latitude+","+longitude+"/@"+latitude+","+longitude+"?hl=zh-CN";
        console.log(googleUrl);
        window.open(googleUrl);
      },
      routerSchool(id){
        let self = this;
        if (self.isApp){
          this.setupWebViewJavascriptBridge(function(bridge) {
            /*//注册方法 供客户端调用
             bridge.registerHandler("toHouseDetail",function(data,responseCallback){
             responseCallback({mls:id});
             });*/
            bridge.callHandler('toSchoolDetail',id,function(resp){
              }
            );
          })
        }else{
          this.$router.push({name:'学校详情',params:{id:id},query:{region:self.schoolData.region}})
        }

      },
      hideSwipe(){
        this.swipeShow=false;
      },
      /*onTouchEnd(){
        let self=this;
        if(self.first._sw.lat==self.map.getBounds()._sw.lat&&self.first._sw.lng==self.map.getBounds()._sw.lng&&self.first._ne.lat==self.map.getBounds()._ne.lat&&self.first._ne.lng==self.map.getBounds()._ne.lng){

        }else {
          this.schoolData.currentPage = 1;
          self.schoolData.minLatitude = self.map.getBounds()._sw.lat;
          self.schoolData.maxLatitude = self.map.getBounds()._ne.lat;
          self.schoolData.minLongitude = self.map.getBounds()._sw.lng;
          self.schoolData.maxLongitude = self.map.getBounds()._ne.lng;
          self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
            .then(function (response) {
              this.geojson.features.splice(0, this.geojson.features.length);
              let length = response.body.data.length;
              self.schoolList=response.body.data;
              for (let i = 0; i < self.markers.length; i++) {
                self.markers[i].remove();
              }
              for(let i=0;i<length;i++){
                if(response.body.data[i].type=="Public"){
                  var type='公立';
                }else{
                  var type='私立';
                }
                self.geojson.features.push({
                  "type": "Feature",
                  "properties": {
                    "message": "Foo",
                    "iconSize": [20, 20],
                    'description':'<h3>'+response.body.data[i].name+'</h3>'+'<p>'+type+'</p>',
                    'className':'icon iconfont icon-icon_shouye_dingweidian green-color'
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [
                      response.body.data[i].longitude,
                      response.body.data[i].latitude
                    ]
                  }
                })
              }
              for (let i = 0; i < self.geojson.features.length; i++) {
                (function (a) {
                  var el = document.createElement('div');
                  el.className = 'mapboxgl-marker';
                  if (response.body.data[a].type == 'Public' && response.body.data[a].grade == 'Secondary') {
                    el.style.backgroundImage = 'url("' + self.secondaryPublic + '")'
                  } else if (response.body.data[a].type == 'Public' && response.body.data[a].grade == 'Independent') {
                    el.style.backgroundImage = 'url("' + self.elementaryPublic + '")'
                  } else if (response.body.data[a].type == 'Public' && response.body.data[a].grade == 'Elementary') {
                    el.style.backgroundImage = 'url("' + self.elementaryPublic + '")'
                  } else if (response.body.data[a].type !== 'Public' && response.body.data[a].grade == 'Elementary') {
                    el.style.backgroundImage = 'url("' + self.elementaryIndependent + '")'
                  } else if (response.body.data[a].type !== 'Public' && response.body.data[a].grade == 'Secondary') {
                    el.style.backgroundImage = 'url("' + self.secondaryIndependent + '")'
                  }
                  el.style.width = self.geojson.features[a].properties.iconSize[0] + 'px';
                  el.style.height = self.geojson.features[a].properties.iconSize[1] + 'px';
                  el.style.backgroundSize = '100% 100%';
                  el.addEventListener('touchstart', function(e) {
                    event.stopPropagation();
                    event.preventDefault()
                    self.index=a;
                    console.log(self.index)
                    self.swipeShow=false;
                    setTimeout(function(){
                      self.swipeShow=true;
                    },1)
                    setTimeout(function(){
                      self.$refs.mySwiper.swiper.slideTo(a, 10, false)
                    },1)
                    if(self.popups.length>0){
                      for(let i=0;i<self.popups.length;i++){
                        self.popups[i].remove();
                      }
                    }
                    var popup =  new mapboxgl.Popup()
                      .setLngLat(self.geojson.features[i].geometry.coordinates)
                      .setHTML(self.geojson.features[i].properties.description)
                      .addTo(self.map);
                    self.popups.push(popup)
                  });
                  self.marker = new mapboxgl.Marker(el, {offset: [-self.geojson.features[a].properties.iconSize[0] / 2, -self.geojson.features[a].properties.iconSize[1] / 2]})
                    .setLngLat(self.geojson.features[a].geometry.coordinates)
                    .addTo(self.map);
                  self.markers.push(self.marker)
                })(i)
              }
            }).then(function (error) {
          })
        }
      },*/
      /*筛选框的弹出逻辑开始*/
      toggle () {
        this.open = !this.open;
        this.$refs.button.$el.style.color='#f14114';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#656565';
      },
      toggle1 () {
        this.open1 = !this.open1;
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#f14114';
        this.$refs.button2.$el.style.color='#656565';
      },
      toggle2 () {
        this.open2 = !this.open2;
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
      choiceMoney(id,e){
        let el=document.getElementsByClassName('money-list')[0].getElementsByTagName('li');
        let self=this;
        self.schoolData.type=id;
        self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
          .then(function (response) {
            if(response.body.data.length>0){
              self.schoolList=response.body.data;
              self.totalResults=response.body.totalResults;
              self.drawMarkers();
            }else{
              self.clearMarkers();
            }
          }).then(function (error) {
        })
      },
      //选择年级
      sortAdd(id,e){
        let el=document.getElementsByClassName('sort-list')[0].getElementsByTagName('li');
        let self=this;
        self.schoolData.grade=id;
        self.$http.post('/school/search.json', self.schoolData, {emulateJSON: true})
          .then(function (response) {
            if(response.body.data.length>0){
              self.schoolList=response.body.data;
              self.totalResults=response.body.totalResults;
              self.drawMarkers();
            }else{
              self.clearMarkers();
            }
            for(let i=0;i<el.length;i++){
              el[i].className='';
            }
            e.target.className='active'
            self.open2=false;
            self.$refs.button2.$el.style.color='#565656';
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
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix.less";
  .screen{
    width: 48/@base;
    height: 48/@base;
    position: fixed;
    right:15/@base;
    top:170/@base;
    z-index: 999999;
    img{
      width: 48/@base;
      height: 48/@base;
    }
  }
  .screen-dialog.mapSchool-screen{
    div.mu-dialog-body{
      .first-row{
        margin-top:44/@base;
        position: relative;
        display: box;
        display: -webkit-box;
        display: -moz-box;
        padding: 15/@base;
        background: #fff;
        border-bottom: 1px solid #ececec;
        div.city-btn{
          position: absolute;
          right:20/@base;
          top: 15/@base;
          i.icon{
            vertical-align: middle;
          }
        }
      }
      .screen-row{
        height:100/@base;
        padding:15/@base 10/@base 15/@base 15/@base;
        background: #fff;
        .title{
          height:35/@base;
          line-height: 35/@base;
        }
        .items{
          .item:last-child{
            margin-right:0;
          }
          .item{
            width:78/@base;
            height:28/@base;
            text-align: center;
            background: #F2F2F2;
            color:#4A4A4A;
            margin-right:10/@base;
            height:28/@base;
            line-height: 28/@base;
            border:1px solid #F2F2F2;
          }
          .item.active{
            background: #fff;
            color:#F14114;
            border:1px solid #F14114;
          }

        }
      }
      button.mu-raised-button{
        position: fixed;
        height:50/@base;
        width:50%;
        bottom: 0;
        right:0;
        z-index: 9;
        border-radius: 0;
      }
      button.mu-raised-button:last-child{
        color:#4a4a4a;
        left:0;
      }
    }
  }
  .schoolHouse .mu-appbar .right img{
    width:24/@base;
    height:24/@base;
  }
  div.mu-dialog-wrapper{
    .dialog{
      width: 100% !important;
      height:100%;
      box-shadow: none!important;
      .mu-dialog-body {
        padding: 0 0 20px 0 !important;
        background: #fff;
        height: 100%;
        max-height: 100% !important;
        position: relative;
        div.mu-appbar{
          position: fixed;
          top:0;
          div.mu-appbar-title span{
            margin-right:30/@base;
          }
          .left{
            i{
              color:#4A4A4A;
              font-size: 17/@base;
            }
          }
        }
      }
    }

    .cityLog1{
      width: 100% !important;
      height:100%;
      box-shadow: none!important;
      div.mu-dialog-body{
        padding:0 0 20px 0!important;
        background: #f5f5f5;
        max-height:100%!important;
        div.mls-num:nth-child(2){
          margin-top:44/@base;
        }
        div.measure:nth-child(8){
          margin-bottom:40/@base;
        }
        div.mu-appbar{
          position: fixed;
          top:0;
        }
        button.mu-raised-button{
          position: fixed;
          height:50/@base;
          width:50%;
          right:0;
          z-index: 9;
          border-radius: 0;
        }
        button.mu-raised-button:last-child{
          color:#4a4a4a;
          left:0;
        }
      }
      div.mu-appbar{
        background: #fafafa;
        color:#565656;
        font-size: 27/@base;
        height:44/@base;
        box-shadow: none;
        border-bottom:1px solid #ececec;
        width:100%;
        div.mu-appbar-title{
          span{
            margin-right:30/@base;
          }
        }
      }
      div.mls-num{
        position: relative;
        display:box;
        display:-webkit-box;
        display:-moz-box;
        padding:20/@base;
        background: #fff;
        border-bottom:1px solid #ececec;
        div.city-btn{
          position: absolute;
          right:20/@base;
          line-height:32/@base;
          i.icon{
            vertical-align: middle;
          }
        }
        span{
          display: block;
          width:58/@base;
          font-size: 14/@base;
          color:#656565;
          margin-right:19/@base;
          height:34/@base;
          line-height:34/@base;
        }
        input{
          display: block;
          box-flex:1;
          -moz-box-flex: 1;
          -webkit-box-flex: 1;
          border:none;
          height:34/@base;
          background: #f0f0f0;
          border-radius: 6/@base;
        }
      }
      div.timer{
        background: #fff;
        padding:20/@base;
        border-bottom:1px solid #ececec;
        p{
          font-size: 14/@base;
          color:#656565;
          margin-bottom:20/@base;
        }
        div.choiceTime,div.choiceType,div.choiceRoom{
          height:30/@base;
          span:nth-child(2n){
            border-left:0;
            border-right:0;
          }
          span:nth-child(4){
            border-right:1px solid #f6a623;
          }
          span:nth-child(5){
            border-left:none;
          }
          span:nth-child(6){
            border-right:1px solid #f6a623;
          }
          span{
            position: relative;
            padding:4/@base 16/@base;
            background: #fff;
            border:1px solid #f6a623;
            min-width: 38/@base;
          }
          span.active{
            background: #f6a623;
            border:1px solid #f6a623;
            color:#fff;
            font-size: 14/@base;
          }
        }
      }
      div.measure{
        background: #fff;
        position: relative;
        padding:20/@base;
        border-bottom:1px solid #ececec;
        p{
          font-size: 14/@base;
          color:#656565;
          margin-bottom:20/@base;
        }
        span{
          position: absolute;
          color:#f6a623;
          font-size: 16/@base;
          top:20/@base;
          right:20/@base;
        }
        div.text-box1{
          div:nth-child(3){
          }
        }
        div.text-box{
          display:box;
          display:-webkit-box;
          display:-moz-box;
          margin-top:-20/@base;
          div:first-child{
            text-align: left;
          }
          div{
            text-align: center;
            box-flex:1;
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            color:#565656;
            font-size: 12/@base;
          }
        }
      }
      i.mu-icon{
        font-size: 18/@base;
      }
      span.mu-raised-button-label{
        padding-left:4/@base!important;
      }
      ul.city-list{
        background: #fff;
        position: relative;
        top:44/@base;
        li.active{
          color:#ea2912;
          i.icon{
            display:inline-block;
          }
          sub{
            color:#f14114;
          }
        }
        li{
          padding:20/@base 15/@base;
          color:#565656;
          border-bottom:1px solid #ececec;
          font-size: 14/@base;
          sub{
            font-size: 10/@base;
            position: relative;
            top:0;
          }
          i{
            display:none;
            vertical-align: middle;
            float:right;
            margin-top:-4/@base;
          }
        }
      }
    }
  }
  .infoWindow{
    h3{
      font-size: 14/@base;
    }
    p{
      font-size: 12/@base;
      a{
        font-size: 12/@base;
        color:#F14114;
      }
    }

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
  div.mapboxgl-popup-content{
    padding:10/@base 20/@base;
    button.mapboxgl-popup-close-button{
      right:4/@base;
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
    z-index: 9999999999999999999 !important;
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
    margin-top:20/@base;
    color:#656565;
    background: #f5f5f5;
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
    overflow: hidden;
    height:100%;
    div.swiper-slide{
      padding:20/@base 10/@base;
      background-color: #fff;
      /*box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);*/
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
      span.index-num{
        position: absolute;
        bottom:10/@base;
        right:15/@base;
        text-align:center;
        height:16/@base;
        line-height:16/@base;
        border-radius: 8/@base;
        background-color: gray;
        font-size: 12/@base;
        color:#fff;
        padding:0 5/@base;
      }
    }

    div.swiper-bg{
      position: fixed;
      bottom:30/@base;
      width: 100%;
      div.swiper-container{
        width: 375/@base;
        background: #fff;
        border:1px solid #ececec ;
        overflow: visible;
      }
    }
    div.mapboxgl-control-container{
      display:none;
    }
    div#map-container{
      height:100%;
      width:100%;
    }
    div#googleMap{
      height:100%;
      width:100%;
    }

    div.tips{
      margin-top:80/@base;
      border-bottom:1px solid #ececec;
      background-color: #fff;
      position: relative;
      height:40/@base;
      line-height:40/@base;
      margin-left:16/@base;
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
      border-bottom:1px solid #ddd;
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
      z-index:99999999999;
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
      }
    }
    ul.margin{
      margin-top:0;
    }
    div.right{
      i.icon{
        font-size: 37/@base!important;
      }
    }
  }
</style>
