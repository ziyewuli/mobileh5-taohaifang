<template>
  <div class="mapHouseSingle">
    <div class="mu-appbar mu-paper-1" v-show="!hideTitle">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
    </div>
    <div id="googleMap"></div>
    <div class="swiper-bg ">
      <div v-if="swipeShow" class="address-box toHere-bg" >
        <div class="toHere" @click="toHere(latitude,longitude)"><img src="../../assets/img/toHere.png"></div>
        <p class="address-title"><i class="icon iconfont icon-icon-fangyuanjulix"></i>地址</p>
        <p class="address">{{address}}</p>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/less" type="text/less" lang="less">
  @import "../../assets/css/mix";
  div#googleMap{
    height:100%;
    width:100%;
  }
  .mapHouseSingle .mu-appbar{
    position: fixed;
  }
  div.swiper-bg{
    position: fixed;
    bottom:30/@base;
    width: 100%;
    .address-box{
      width:355/@base;
      height:114/@base;
      background: #fff;
      margin:0 auto;
      p.address-title{
        height:43/@base;
        line-height:43/@base;
        border-bottom: 1px solid #DCDCDC;
        color:#7F7F7F;
        padding:0 20/@base;
        font-size: 14/@base;
      }
      p.address{
        padding:5/@base 20/@base;
        height:70/@base;
        display: table-cell;
        vertical-align: middle;
        line-height:30/@base;
        font-size: 14/@base;
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  import myPosition from '../../assets/img/myPosition.png'
  export default{
    data(){
      return {
        hideTitle:false,
        topTitle:'房源地图',
        latitude:'',
        longitude:'',
        swipeShow:true,
        address:''
      }
    },
    methods:{
      toHere(latitude,longitude){
        var googleUrl="http://www.google.cn/maps/dir//"+latitude+","+longitude+"/@"+latitude+","+longitude+"?hl=zh-CN";
        console.log(googleUrl);
        window.open(googleUrl);
      },
      //绘制地图
      drawMap(latitude,longitude) {
        var self = this;
        var latitude = latitude;
        var longitude = longitude;
        console.log("地图中心点坐标");
        console.log(latitude,longitude);
        var myCenter=new google.maps.LatLng(latitude,longitude);
        var el = document.getElementById("googleMap");
        var mapProp = {
          center:myCenter,
          zoom:13,
          mapTypeId:google.maps.MapTypeId.ROADMAP,
          disableDefaultUI:true
        };
        var googleMap=new google.maps.Map(el,mapProp);
        self.drawMarker(latitude,longitude,googleMap);
        return googleMap;
      },
      //描点
      drawMarker(latitude,longitude,map) {
        var self = this;
        var pic=myPosition;
        var coordinates=new google.maps.LatLng(latitude,longitude);
        var marker=new google.maps.Marker({
          position:coordinates,
          icon:pic
        });
        marker.setMap(map);
        marker.addListener('click', function(e) {
          self.swipeShow=true;
        });
        return marker;
      },
      back(){
        this.$router.back()
      },
    },
    mounted(){
      this.$nextTick(function () {
        let self=this;
        document.getElementById('googleMap').style.height=window.innerHeight+'px';
        document.title=this.$route.name;
        this.topTitle=this.$route.name;
        console.log(self.hideTitle);
        self.hideTitle = self.$route.query.hideTitle?self.$route.query.hideTitle:false;
        self.swipeShow = self.$route.query.swipeShow?self.$route.query.swipeShow:false;
        self.latitude =self.$route.query.latitude;
        self.longitude =self.$route.query.longitude;
        self.address =self.$route.query.address;
        self.drawMap(self.latitude,self.longitude);
      })
    }
  }
</script>
