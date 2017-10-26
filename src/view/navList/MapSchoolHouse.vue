<template>
  <div class="mapHouse">
    <div class="mu-appbar mu-paper-1" v-if="!hideTitle">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right">
        <img src="../../assets/img/toList.png" @click="routerList()" />
      </div>
    </div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    <div class="screen" ><img src="../../assets/img/screen.png" @click="openScreenDialog()"/></div>
    <div @click="hideSwipe" id="map-container" v-show="flag"></div>
    <div @click.stop="hideSwipe" id="googleMap"></div>
    <mu-dialog dialogClass="cityLog3" :open="dialog" @close="handleClose" scrollable>
      <div class="mu-appbar mu-paper-1">
        <div @click="dialog=false" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>房源筛选</span></div>
        <div class="right"></div>
      </div>
      <div class="screen-row">
        <div class="title">上市时间</div>
        <div class="items choiceTime clearfix">
          <div v-for="(list,index) in timeList" class="item float-l" @click="choiceDate(list.index)" :class="{'active':tempData.dateType==list.index,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>
      <div class="screen-row">
        <div class="title">房屋类型</div>
        <div class="items choiceTime clearfix">
          <div v-for="(list,index) in sortList" class="item float-l" @click="choiceRoomType(list.index)" :class="{'active':tempData.buildingType==list.index,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>
      <div class="screen-row">
        <div class="title">卧室</div>
        <div class="items choiceRoom clearfix">
          <div v-for="(list,index) in roomList" class="item float-l" @click="choiceActive(list)" :class="{'active':list.active,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>
      <div class="screen-row">
        <div class="title">卫生间</div>
        <div class="items choiceType clearfix">
          <div v-for="(list,index) in wishList" class="item float-l" @click="choiceActive(list)" :class="{'active':list.active,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>
      <div class="screen-row">
        <div class="title">价格{{country=='us'?'(万美元)':'(万加元)'}}</div>
        <div class="items clearfix">
          <div v-for="(list,index) in moneyList" class="item float-l" @click="choiceActive(list)" :class="{'active':list.active,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>
      <div class="screen-row">
        <div class="title">房屋面积(平方英尺)</div>
        <div class="items clearfix">
          <div v-for="(list,index) in roomAreaList" class="item float-l" @click="choiceActive(list)" :class="{'active':list.active,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>
      <div class="screen-row">
        <div class="title">土地面积(平方英尺)</div>
        <div class="items clearfix">
          <div v-for="(list,index) in landAreaList" class="item float-l" @click="choiceActive(list)" :class="{'active':list.active,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>
      <div class="screen-row sort-row">
        <div class="title">排序</div>
        <div class="items clearfix">
          <div v-for="(list,index) in sorts" class="item float-l" @click="choiceSort(list)" :class="{'active':list.direction==tempData.direction&&list.sortField==tempData.sortField,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>
      <mu-raised-button @click="search" backgroundColor="#FB704C" class="demo-raised-button" fullWidth iconClass="icon iconfont icon-icon_shouye_fangdajing" label="确定" icon=" " primary/>
      <mu-raised-button @click="resetMore" backgroundColor="#fff" class="demo-raised-button" fullWidth label="重置" primary/>

    </mu-dialog>
    <mu-popover popoverClass="choiceActive money-box"  overlayOpacity="0.5" overlay="true" :trigger="trigger1" :open="open1" @close="handleClose1">
      <i class="icon iconfont icon-icon_shouye_youjiantou"></i>
      <div class="measure">
        <p>总价(万加元)：<span>{{sliderOption1.measureNum[0]}}-{{sliderOption1.measureNum[1]}}</span></p>
        <vue-slider v-bind="sliderOption1" ref="slider2" v-model="sliderOption1.measureNum"></vue-slider>
        <div class="text-box text-box1">
          <div>0</div>
          <div>300w</div>
          <div>600w</div>
          <div>1000w</div>
        </div>
        <mu-raised-button @click="moneyOther" label="确定" backgroundColor="#F14114" class="demo-raised-button" fullWidth/>
      </div>
    </mu-popover>
    <mu-popover popoverClass="choiceActive" overlayOpacity="0.5" overlay="true" :trigger="trigger2" :open="open2" @close="handleClose2">
      <ul class="sort-list">
        <i class="icon iconfont icon-icon_shouye_youjiantou"></i>
        <li class="active" @click="sortAdd(0,$event)">不限<i class="icon iconfont icon-icon_duihao"></i></li>
        <li v-for="list in sortList" @click="sortAdd(list.id,$event)">{{list.name}} <i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-popover>
    <mu-dialog  dialogClass="cityLog2" :open="open3" @close="closeDiage" scrollable>
      <div class="mu-appbar mu-paper-1">
        <div @click="hideMore" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>房源筛选</span></div>
        <div class="right"></div>
      </div>
      <div class="timer">
        <p>上市时间</p>
        <div class="choiceTime"><span v-for="list in choiceTime" :class="[list.id==1?'active':'']" @click="addMore(list.id,$event,'choiceTime')" v-text="list.text" :key="list.id"></span></div>
      </div>
      <div class="timer">
        <p>卧室</p>
        <div class="choiceRoom"><span v-for="list in choiceRoom" :class="[list.uid==''?'active':'']" @click="addMore(list.id,$event,'choiceRoom',list.uid)" v-text="list.text" :key="list.id"></span></div>
      </div>
      <div class="timer">
        <p>卫生间</p>
        <div class="choiceType"><span v-for="list in choiceType" :class="[list.uid==''?'active':'']" @click="addMore(list.id,$event,'choiceType',list.uid)" v-text="list.text" :key="list.id"></span></div>
      </div>
      <div class="measure">
        <p>房屋面积(平方英尺)：</p>
        <span v-if="sliderOption.measureNum[0]==sliderOption.min&&sliderOption.measureNum[1]==sliderOption.max">不限</span>
        <span v-else-if="sliderOption.measureNum[0]!=sliderOption.min&&sliderOption.measureNum[1]==sliderOption.max">{{sliderOption.measureNum[0]}}以上</span>
        <span v-else>{{sliderOption.measureNum[0]}}-{{sliderOption.measureNum[1]}}</span>
        <vue-slider v-bind="sliderOption" ref="slider1" v-model="sliderOption.measureNum"></vue-slider>
        <div class="text-box">
          <div>0</div>
          <div>1000sqft</div>
          <div>3000sqft</div>
          <div>5000sqft</div>
        </div>
      </div>
      <div class="measure">
        <p>土地面积(平方英尺)：</p>
        <span v-if="sliderOption2.LandArea[0]==sliderOption2.min&&sliderOption2.LandArea[1]==sliderOption2.max">不限</span>
        <span v-else-if="sliderOption2.LandArea[0]!=sliderOption2.min&&sliderOption2.LandArea[1]==sliderOption2.max">{{sliderOption2.LandArea[0]}}以上</span>
        <span v-else>{{sliderOption2.LandArea[0]}}-{{sliderOption2.LandArea[1]}}</span>
        <vue-slider v-bind="sliderOption2" ref="slider3" v-model="sliderOption2.LandArea"></vue-slider>
        <div class="text-box text-box1">
          <div>0</div>
          <div>13000</div>
          <div>25000</div>
          <div>45000</div>
        </div>
      </div>
      <!--<div class="timer">
        <p>排序：</p>
        <div class="choiceSort">
          <span v-for="list in sorts" :class="[list.id==0?'active':'']" :key="list.id" @click="addMore(list.id,$event,'choiceSort')" v-text="list.text"></span>
        </div>
      </div>-->
      <mu-raised-button @click="subMore"  backgroundColor="#FB704C" class="demo-raised-button" fullWidth iconClass="icon iconfont icon-icon_shouye_fangdajing" label="确定" icon=" " primary/>
      <mu-raised-button @click="resetMore"  backgroundColor="#fff" class="demo-raised-button" fullWidth label="重置"  primary/>
    </mu-dialog>
    <div class="swiper-bg ">
      <swiper v-if="swipeShow" class="school-swipe house-list" :options="swiperOption" ref="mySwiper1">
        <swiper-slide v-for="(list,index) in houseList" :key="list.id" class="toHere-bg">
          <div class="toHere" @click="toHere(list.latitude,list.longitude)"><img src="../../assets/img/toHere.png"></div>
          <div @click="routerHouseDetail(list.id,list.mslno)"  class="house-list-li ">
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
              <!--
                                <div @click.stop="shoucang(list.id,list)" class="shoucang"><i :class="['icon','iconfont',list.favorite?'icon-icon_yishoucangfangyuan':'icon-icon_shoucangfangyuan']"></i></div>
              -->
            </div>
          </div>
          <span class="index-num">{{index+1}}/{{houseList.length}}</span>
        </swiper-slide>
      </swiper>
    </div>

  </div>
</template>
<style scoped lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  div.cityLog div.mu-dialog-body button.mu-raised-button{
    color:#fff;
  }
  div.cityLog div.mu-dialog-body>div.timer:nth-child(7){
    margin-bottom:50/@base;
  }
</style>
<style rel="stylesheet/less" type="text/less" lang="less">
  @import "../../assets/css/mix";
  .mapHouse .mu-appbar .right img{
    width:24/@base;
    height:24/@base;
  }
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
  .house-list-li  .bottom-content img{
    width: 52/@base;
    height: 16/@base;
    vertical-align: sub;
  }
  .mapHouse{
    .screen-dialog{
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
            font-size: 12/@base;
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
  }
  div#googleMap{
    height:100%;
    width:100%;
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
  div.cityLog3{
    width: 100% !important;
    height:100%;
    box-shadow: none!important;
    .screen-row{
      padding:10/@base 10/@base 0 15/@base;
      background: #fff;
      .title{
        height:35/@base;
        line-height: 35/@base;
      }
      .items{
        .item.last{
          margin-right:0;
        }
        .item{
          width:78/@base;
          height:28/@base;
          font-size: 12/@base;
          text-align: center;
          background: #F2F2F2;
          color:#4A4A4A;
          margin-right:10/@base;
          margin-bottom:10/@base;
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
    .screen-row.sort-row{
      .items{
        font-size: 12/@base;
        .item.last{
          margin-right:0;
        }
        .item{
          width:162/@base;
        }
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
    div.mu-dialog-body{
      padding:0 0 56px 0!important;
      max-height:100%!important;
      button.mu-raised-button{
        position: fixed;
        height:50/@base;
        width:50%;
        right:0;
        z-index: 9;
        bottom:0;
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

    i.mu-icon{
      font-size: 18/@base;
    }
    span.mu-raised-button-label{
      padding-left:4/@base!important;
    }
    ul.city-list{
      background: #fff;
      li.active{
        color:#ea2912;
        i.icon{
          display:inline-block;
        }
      }
      li{
        padding:20/@base 15/@base;
        color:#565656;
        border-bottom:1px solid #ececec;
        font-size: 14/@base;
        i{
          display:none;
          vertical-align: middle;
          float:right;
          margin-top:-4/@base;
        }
      }
    }
  }
  .house-list {
    background-color: #fbfbfb;
    .house-list-li {
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
  div.mu-dialog-wrapper{
    z-index: 9999999999!important;
  }
  .mu-overlay{
    top:44/@base;
  }
  .cityLog2{
    div.timer:nth-child(7){
      margin-bottom:50/@base;
    }
    div.timer{
      div.choiceSort{
        span{
          display: inline-block;
          width:160/@base;
          height:34/@base;
          line-height:34/@base;
          color:#4a4a4a;
          background: #fff;
          border:1px solid #ececec;
          font-size: 14/@base;
          text-align: center;
          margin-bottom:10/@base;
        }
        span.active{
          border:1px solid #f6a623;
          color:#fff;
          background: #f6a623;
        }
        span:nth-child(2n){
          margin-left:15/@base;
        }
      }
    }
  }
  .cityLog2{
    width: 100% !important;
    height:100%;
    div.mu-dialog-body{
      background: #f5f5f5;
      max-height:100%!important;
      padding:0;
      button.mu-raised-button:last-child{
        left:0;
        color:#4a4a4a!important;
      }
      button.mu-raised-button{
        position: fixed;
        height:50/@base;
        right:0;
        z-index: 9;
        width:50%;
        color:#fff;
        bottom:0;
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
      div.choiceType,div.choiceRoom{
        span{
          padding:4/@base 20/@base!important;
        }
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
      li.active{
        color:#ea2912;
        i.icon{
          display:inline-block;
        }
      }
      li{
        padding:20/@base 15/@base;
        color:#565656;
        border-bottom:1px solid #ececec;
        font-size: 14/@base;
        i{
          display:none;
          vertical-align: middle;
          float:right;
          margin-top:-4/@base;
        }
      }
    }
  }
  div.mapHouse{
    div.mu-appbar{
      position: fixed;
      top:0;
    }
    div.choice{
      button:nth-child(4){
        span.mu-raised-button-label{
          padding-left:20/@base;
        }
      }
    }
    div.mint-swipe{
      position: absolute;
      bottom:0;
      height:160/@base;
      width:100%;
      div.mint-swipe-indicators{
        display:none;
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
      button:nth-child(2){
        span.mu-raised-button-label{
          border-left:1px solid #ececec;
          border-right:1px solid #ececec;
        }
      }
      button:nth-child(3){
        span.mu-raised-button-label{
          border-right:1px solid #ececec;
        }
      }
      i.icon-icon_shouye_youjiantou{
        position: absolute;
        font-size: 30/@base;
        transform: rotate(-90deg);
        top:30/@base;
        color:#fff;
        left:50/@base;
      }
      button:nth-child(4){
        div.mu-raised-button-wrapper{
          span.mu-raised-button-label{
            padding-left:10/@base;
            padding-right:0/@base;
            vertical-align: middle;
          }
          i.icon{
            vertical-align: middle;
            margin-top:-2/@base;
          }
        }
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
          padding-right:0;
          span.mu-raised-button-label{
            height: 20/@base;
            line-height: 20/@base;
            padding: 0 30/@base;
          }
        }
      }
    }
    div.swiper-container{
      div.swiper-wrapper{
        div.swiper-slide{
          div.list-box{
            background: #fff;
            padding:13/@base 15/@base;
            display:box;
            display:-webkit-box;
            display:-moz-box;
            border-radius: 8/@base;
            div.left-img{
              width:112/@base;
              height:84/@base;
              position: relative;
              span.tip{
                position: absolute;
                display:block;
                background-image: url('../../assets/img/tipbag.png');
                width:65/@base;
                height:26/@base;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                text-align: center;
                line-height:18/@base;
                top:-6/@base;
                left:-20/@base;
                span{
                  font-size: 12/@base;
                  -webkit-transform-origin-x: 0;
                  -webkit-transform: scale(0.90);
                  display: block;
                  color:#fff;
                  margin-left:4/@base;
                }
              }
              img{
                width:100%;
                height:100%;
              }
            }
            div.right-content{
              box-fle:1;
              -moz-box-flex: 1;
              -webkit-box-flex: 1;
              margin-left:10/@base;
              h3.title{
                font-size: 16/@base;
                color:#4a4a4a;
                font-weight: bold;
              }
              p.creat-time{
                span{
                  font-size: 12/@base;
                  color:#565656;
                  float:right;
                }
              }
              p.mianji{
                margin:2/@base 0;
              }
              p.addr{
                width:120/@base!important;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              p.addr,p.mianji,p.creat-time{
                font-size: 12/@base;
                color:#656565;
                width:auto;
              }
              div.money{
                color:#f14114;
                font-size: 16/@base;
                position: absolute;
                top:50/@base;
                right:25/@base;
                span{
                  font-size: 12/@base;
                }
              }
              i.icon{
                position: absolute;
                top:20/@base;
                right:25/@base;
                font-size: 27/@base;
                color:#f14114;
              }
            }
          }
          span.index-num{
            position: absolute;
            bottom:20/@base;
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
      }
    }
  }
  div.money-box{
    i.icon-icon_shouye_youjiantou{
      right:120/@base;
    }
    div.measure{
      width:100%;
      padding:20/@base;
      p{
        span{
          float:right;
        }
      }
      div.vue-slider-wrap{
        margin-top:30/@base;
      }
      div.text-box{
        display:box;
        display:-webkit-box;
        display:-moz-box;
        margin-top:-20/@base;
        margin-bottom:36/@base;
        div{
          box-flex:1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          text-align: right;
        }
        div:first-child{
          text-align: left;
        }
        div:nth-child(2){
          margin-right:10/@base;
        }
        div:nth-child(3){
          margin-right:20/@base;
        }
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
          margin-right: 20/@base;
          color: #f14114;
          font-size: 12/@base;
          display: none;
        }
        i.icon-duihao{
          font-size: 26/@base;
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
  .choiceActive {
    width:360/@base;
    left: 7/@base !important;
    top:100/@base!important;
    z-index: 9999999999999999999 !important;
    max-height: 500/@base!important;
    overflow: auto;
    i.icon-icon_shouye_youjiantou{
      position: absolute;
      color:#fff;
      transform: rotate(-90deg);
      font-size: 30/@base;
      top:-24/@base;
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
  }
  .active {
    font-size: 14px;
    color: #f14114;
  }
  #map-container{
    height:100%;
  }
  .red-color{
    color:#f14114;
  }
  .green-color{
    color:green;
  }
  .mapboxgl-control-container{
    display:none;
  }
</style>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Vue from 'vue'
  import { rxUtils } from '../../assets/js/rxUtils'
  import vueSlider from 'vue-slider-component';
  import mapboxgl from 'mapbox-gl';
  import prativeSecondary from '../../assets/img/prativeSecondary.png'
  import prativeElementary from '../../assets/img/prativeElementary.png'
  import publicSecondary from '../../assets/img/publicSecondary.png'
  import publicElementary from '../../assets/img/publicElementary.png'
  import prativeHigh from '../../assets/img/prativeHigh.png'
  import publicHigh from '../../assets/img/publicHigh.png'
  import mapHouse from '../../assets/img/mapHouse.png'
  import mapHouseActive from '../../assets/img/mapHouseActive.png'
  export default{
    data(){
      return {
        country:null,
        hideTitle:false,
        tempData:{
          sortField:null,
          direction:null,
          dateType:null,
          buildingType:null,
          beds:null
        },
        dialog:false,
        moneyList:[
          {text:'50以下',id:1,data:'0-500000',active:false},
          {text:'50-80',id:2,data:'500000-800000',active:false},
          {text:'80-100',id:3,data:'800000-1000000',active:false},
          {text:'100-150',id:4,data:'1000000-1500000',active:false},
          {text:'150-200',id:5,data:'1500000-2000000',active:false},
          {text:'200-300',id:6,data:'2000000-3000000',active:false},
          {text:'300-500',id:7,data:'3000000-5000000',active:false},
          {text:'500以上',id:8,data:'5000000-0',active:false}
        ],
        roomAreaList:[
          {text:'500以下',id:1,data:'0-500',active:false},
          {text:'500-800',id:2,data:'500-800',active:false},
          {text:'800-1000',id:3,data:'800-1000',active:false},
          {text:'1000-1500',id:4,data:'1000-1500',active:false},
          {text:'1500-2000',id:5,data:'1500-2000',active:false},
          {text:'2000-3000',id:6,data:'2000-3000',active:false},
          {text:'3000-5000',id:7,data:'3000-5000',active:false},
          {text:'5000以上',id:8,data:'5000-0',active:false}
        ],
        landAreaList:[
          {text:'1000以下',id:1,data:'0-1000',active:false},
          {text:'1000-2000',id:2,data:'1000-2000',active:false},
          {text:'2000-3000',id:3,data:'2000-3000',active:false},
          {text:'3000-5000',id:4,data:'3000-5000',active:false},
          {text:'5000-1万',id:5,data:'5000-10000',active:false},
          {text:'1万-2万',id:6,data:'10000-20000',active:false},
          {text:'2万-3万',id:7,data:'20000-30000',active:false},
          {text:'3万以上',id:8,data:'30000-0',active:false}
        ],
        sorts:[
          {text:'价格由高到低',id:1,uid:'1',sortField:1,direction:'DESC'},
          {text:'价格由低到高',id:2,uid:'2',sortField:1,direction:'ASC'},
          {text:'房屋面积由大到小',id:3,uid:'3',sortField:2,direction:'DESC'},
          {text:'房屋面积由小到大',id:4,uid:'4',sortField:2,direction:'ASC'},
        ],
        sortList:[
          {text:'独立屋',id:0,index:0},
          {text:'排屋',id:1,index:1},
          {text:'公寓',id:2,index:2},
        ],
        timeList:[
          {text:'最近一周',id:2,index:1},
          {text:'一个月内',id:3,index:2},
          {text:'2个月内',id:4,index:3}
        ],
        roomList:[
          {text:'1',id:1,data:'1',index:1,active:false},
          {text:'2',id:2,data:'2',index:2,active:false},
          {text:'3',id:3,data:'3',index:3,active:false},
          {text:'4',id:4,data:'4',index:4,active:false},
          {text:'5以上',id:5,data:'5',index:5,active:false},
        ],
        wishList:[
          {text:'1',id:1,data:'1',index:0,active:false},
          {text:'2',id:2,data:'2',index:1,active:false},
          {text:'3',id:3,data:'3',index:2,active:false},
          {text:'4',id:4,data:'4',index:3,active:false},
          {text:'5以上',id:5,data:'5',index:4,active:false},
        ],
        houseImg:'',
        imgAdd:'',
        school:'',
        houseList:[],
        totalResults:0,
        infowindowList:[],
        latitude:{
          'YVR':49.24591,
          'YTO':43.744575
        },
        longitude:{
          'YVR':-123.11906,
          'YTO':-79.558225
        },
        flag:false,
        index:'0',
        toast:false,
        toastMsg:'',
        topTitle:'',
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
        swipeShow:false,
        add1:[
          {chineselng:'1公里',code:1},
          {chineselng:'3公里',code:3},
          {chineselng:'5公里',code:5},
          {chineselng:'10公里',code:10}
        ],
        tabList:[
          {name:'温哥华',id:'YVR',code:'ca0201'},
          {name:'多伦多',id:'YTO',code:'ca0101'},
          {name:'附近',id:'3',code:''},
        ],
        region:'',
        money:'',
        topMoney:'',
        lastMoney:'',
        sort:'',
        roomNum:'',
        time:'',
        wishNum:'',
        measureNum:'',
        data:[],
        inData:{
          priceFilter:'',//价格  格式“0-500000,800000-1000000,2000000-0”
          roomAreaFilter:'',//房屋面积 格式：“0-500,800-1000,2000-0”
          landAreaFilter:'',//土地面积 格式：“0-1000,1000-2000,2000-0”
          schoolId:'',//学校ID
          dateType:null,
          pageSize:80,
          currentPage:1,
          buildingType:'',//0:独立屋 1:排屋 2:公寓
          region:'',//区域 YVR:温哥华 YTO:多伦多
          city:'',
          minLatitude:'',//最低纬度
          maxLatitude:'',//最高纬度
          minLongitude:'',//最低经度
          maxLongitude:'',//最高经度
          direction:'',//ASC,DESC
          sortField:'',//排序字段0:默认 1:总价 2:面积
          startDate:'',//挂牌开始时间
          endDate:'',//挂牌结束时间
          beds:'',//卧室数量
          baths:'',//卫生间数量
        },
        timer:function(val){
          let date=new Date(val);
          let year=date.getFullYear();
          let mouth=date.getMonth()+1;
          let data=date.getDate();
          return year+'-'+mouth+'-'+data
        },
        allLoaded:false,
        regionCode:'YVR',
        cityCode:'ca0201',
        cityType:'',
        lon:'',
        lat:'',
        choiceTime:[
          {text:'不限',id:1},
          {text:'最近一周',id:2},
          {text:'一个月内',id:3},
          {text:'2个月内',id:4}
        ],
        choiceType:[
          {text:'不限',id:0,uid:''},
          {text:'1',id:1,uid:'1'},
          {text:'2',id:2,uid:'2'},
          {text:'3',id:3,uid:'3'},
          {text:'4',id:4,uid:'4'},
          {text:'5+',id:5,uid:'5'}
        ],
        choiceRoom:[
          {text:'不限',id:0,uid:''},
          {text:'1',id:1,uid:'1'},
          {text:'2',id:2,uid:'2'},
          {text:'3',id:3,uid:'3'},
          {text:'4',id:4,uid:'4'},
          {text:'5+',id:5,uid:'5'},
        ],
        choiceTimeText:'',
        choiceTypeText:'',
        choiceRoomText:'',
        routerData:{
          starDate:'',
          endDate:'',
          buildingType:'',
          beds:'',
          minArea:'',
          maxArea:'',
          minPrice:'',
          maxPrice:'',
          region:'',
          city:''
        },
        sliderOption:{
          measureNum:[0,5000],
          width: "auto",// 组件宽度
          height: 10,// 组件高度
          direction: "horizontal",// 组件方向
          dotSize: 30,// 滑块大小
          eventType: "auto",// 事件类型
          min: 0,// 最小值
          max: 5000,// 最大值
          interval: 10,// 分段间隔
          disabled: false,// 是否不可用
          show: true,// 是否显示组件
          realTime: true,// 是否实时计算组件布局
          tooltip: false,// 是否显示工具提示
          clickable: true,// 是否可点击的
          tooltipDir: "top",// 工具提示方向
          piecewise: false,// 是否显示分段样式
          lazy: false,// 是否在拖拽结束后同步值
          piecewiseLabel:true,
          reverse: false,// 是否反向组件
          speed: 1,// 动画速度
          formatter: null,// 格式化tooltip的值
          bgStyle: {
            "backgroundColor":"#ececec"
          },// 组件背景样式
          sliderStyle: {
            "border":"1px solid #f6a623"
          },// 滑块样式
          tooltipStyle: null,// 工具提示样式
          processStyle: {
            "backgroundColor":"#f6a623"
          },// 进度条样式
          piecewiseStyle: null,// 分割点的样式
        },
        sliderOption2:{
          LandArea:[0,45000],
          width: "auto",// 组件宽度
          height: 10,// 组件高度
          direction: "horizontal",// 组件方向
          dotSize: 30,// 滑块大小
          eventType: "auto",// 事件类型
          min: 0,// 最小值
          max: 45000,// 最大值
          interval: 10,// 分段间隔
          disabled: false,// 是否不可用
          show: true,// 是否显示组件
          realTime: true,// 是否实时计算组件布局
          tooltip: false,// 是否显示工具提示
          clickable: true,// 是否可点击的
          tooltipDir: "top",// 工具提示方向
          piecewise: false,// 是否显示分段样式
          lazy: false,// 是否在拖拽结束后同步值
          piecewiseLabel:true,
          reverse: false,// 是否反向组件
          speed: 1,// 动画速度
          formatter: null,// 格式化tooltip的值
          bgStyle: {
            "backgroundColor":"#ececec"
          },// 组件背景样式
          sliderStyle: {
            "border":"1px solid #f6a623"
          },// 滑块样式
          tooltipStyle: null,// 工具提示样式
          processStyle: {
            "backgroundColor":"#f6a623"
          },// 进度条样式
          piecewiseStyle: null,// 分割点的样式
        },
        sliderOption1:{
          measureNum:[0,1000],
          width: "auto",// 组件宽度
          height: 4,// 组件高度
          direction: "horizontal",// 组件方向
          dotSize: 30,// 滑块大小
          eventType: "auto",// 事件类型
          min: 0,// 最小值
          max: 1000,// 最大值
          interval: 10,// 分段间隔
          disabled: false,// 是否不可用
          show: true,// 是否显示组件
          realTime: true,// 是否实时计算组件布局
          tooltip: false,// 是否显示工具提示
          clickable: true,// 是否可点击的
          tooltipDir: "top",// 工具提示方向
          piecewise: false,// 是否显示分段样式
          lazy: false,// 是否在拖拽结束后同步值
          piecewiseLabel:true,
          reverse: false,// 是否反向组件
          speed: 1,// 动画速度
          formatter: null,// 格式化tooltip的值
          bgStyle: {
            "backgroundColor":"#ececec"
          },// 组件背景样式
          sliderStyle: {
            "border":"2px solid #f14114"
          },// 滑块样式
          tooltipStyle: null,// 工具提示样式
          processStyle: {
            "backgroundColor":"#f14114"
          },// 进度条样式
          piecewiseStyle: null,// 分割点的样式
        },
        imgUrl:'',
        map:'',
        geojson:{
          type: "FeatureCollection",
          features: [],
            list:[]
         },
        marker:'',
        markers:[],
        googleMap:null,
        first:{},
        listData:[],
        redImg:require('../../assets/img/redd.png'),
        greenImg:require('../../assets/img/greend.png'),
        temArr:[],
        temArr1:[]
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
              if(self.markers.length>0){
                for(let j=0;j<self.markers.length;j++){
                  self.markers[j].setIcon(mapHouse);
                  self.markers[j].setZIndex(j);
                }
              }
              self.markers[swiper.activeIndex].setIcon(mapHouseActive);
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
    methods:{
      //选择上市时间--单选
      choiceDate(index){
        this.tempData.dateType=this.tempData.dateType==index?'':index;
      },
      //点击筛选页确定按钮进行查询
      search(){
        let self=this;
        console.log("点击筛选页确定按钮进行查询");
        //根据上市时间，获取起止时间
        self.getTime(self.tempData.dateType);
        self.inData.dateType = self.tempData.dateType;
        //房屋类型
        self.inData.buildingType = self.tempData.buildingType;
        console.log("房屋类型："+self.inData.buildingType);
        //卧室数量
        self.inData.beds='';
        for(var key in self.roomList){
          if(self.roomList[key].active){
            self.inData.beds+=self.roomList[key].data+',';
          }
        }
        self.inData.beds = self.inData.beds.substring(0,self.inData.beds.length-1);
        console.log("卧室数量："+self.inData.beds);
        //卫生间数量
        self.inData.baths='';
        for(var key in self.wishList){
          if(self.wishList[key].active){
            self.inData.baths+=self.wishList[key].data+',';
          }
        }
        self.inData.baths = self.inData.baths.substring(0,self.inData.baths.length-1);
        console.log("卫生间数量："+self.inData.baths);
        //房屋价格
        self.inData.priceFilter='';
        for(var key in self.moneyList){
          if(self.moneyList[key].active){
            self.inData.priceFilter+=self.moneyList[key].data+',';
          }
        }
        self.inData.priceFilter = self.inData.priceFilter.substring(0,self.inData.priceFilter.length-1);
        console.log("房屋价格："+self.inData.priceFilter);
        //房屋面积
        self.inData.roomAreaFilter='';
        for(var key in self.roomAreaList){
          if(self.roomAreaList[key].active){
            self.inData.roomAreaFilter+=self.roomAreaList[key].data+',';
          }
        }
        self.inData.roomAreaFilter = self.inData.roomAreaFilter.substring(0,self.inData.roomAreaFilter.length-1);
        console.log("房屋面积："+self.inData.roomAreaFilter);
        //土地面积
        self.inData.landAreaFilter='';
        for(var key in self.landAreaList){
          if(self.landAreaList[key].active){
            self.inData.landAreaFilter+=self.landAreaList[key].data+',';
          }
        }
        self.inData.landAreaFilter = self.inData.landAreaFilter.substring(0,self.inData.landAreaFilter.length-1);
        console.log("土地面积："+self.inData.landAreaFilter);
        //排序字段
        self.inData.sortField=self.tempData.sortField;
        self.inData.direction=self.tempData.direction;
        //查询接口
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true}).then(function (response) {
          this.dialog =false;
          self.totalResults=response.body.totalResults;
          self.showResult();
          if(response.body.data!==null) {
            self.houseList = response.body.data;
            console.log(self.houseList);
            //self.showHouseList();
            self.drawMarkers();
          }else{
            self.clearMarkers();
          }
        }).then(function (error) {
        })
      },
      //选择房屋类型--单选
      choiceRoomType(index){
        this.tempData.buildingType=this.tempData.buildingType==index?'':index;
      },
      //选择卧室数量--单选
      choiceRoomNum(index){
        this.tempData.beds=this.tempData.beds==index?'':index;
      },
      //选择排序--单选
      choiceSort(obj){
        if(this.tempData.sortField==obj.sortField&&this.tempData.direction==obj.direction){
          this.tempData.sortField = 0;
          this.tempData.direction = '';
        }else{
          this.tempData.sortField = obj.sortField;
          this.tempData.direction = obj.direction;
        }
      },
      //多选按钮 选中效果互斥
      choiceActive(obj){
        obj.active=!obj.active;
      },
      //根据上市时间，获取起止时间
      getTime(type){
        let date=new Date();
        let newSecond=date.getTime();
        let year=date.getFullYear();
        let mouth=date.getMonth()+1;
        let data=date.getDate();
        if(type==''){
          this.inData.startDate='';
          this.inData.endDate='';
        }else if(type==1){
          let oldSecond=60*60*24*7*1000;
          let timer=new Date(newSecond-oldSecond);
          let newyear=timer.getFullYear();
          let newmouth=timer.getMonth()+1;
          let newdata=timer.getDate();
          this.inData.startDate=newyear+'-'+newmouth+'-'+newdata;
          this.inData.endDate=year+'-'+mouth+'-'+data;
        }else if(type==2){
          let oldSecond=60*60*24*28*1000;
          let timer=new Date(newSecond-oldSecond);
          let newyear=timer.getFullYear();
          let newmouth=timer.getMonth()+1;
          let newdata=timer.getDate();
          this.inData.startDate=newyear+'-'+newmouth+'-'+newdata;
          this.inData.endDate=year+'-'+mouth+'-'+data;
        }else if(type==3){
          let oldSecond=60*60*24*59*1000;
          let timer=new Date(newSecond-oldSecond);
          let newyear=timer.getFullYear();
          let newmouth=timer.getMonth()+1;
          let newdata=timer.getDate();
          this.inData.startDate=newyear+'-'+newmouth+'-'+newdata;
          this.inData.endDate=year+'-'+mouth+'-'+data;
        }
        console.log('上市时间起止时间为：'+this.inData.startDate+"------"+this.inData.endDate);
      },
      //展示筛选页面
      openScreenDialog(){
        let self = this;
        if (self.isApp){
          this.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler('toScreen',null,function(resp){

              }
            );
          })
        }else{
          this.dialog=true;
        }
      },
      //展示房源数据
      showHouseList() {
        var self = this;
        //self.googleMap = self.drawMap();
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
      drawMap(latitude,longitude) {
        var self = this;
        var latitude = latitude?latitude:self.latitude[self.inData.region];
        var longitude = longitude?longitude:self.longitude[self.inData.region];
        console.log("地图中心点坐标");
        console.log(latitude,longitude);
        var myCenter=new google.maps.LatLng(latitude,longitude);
        var el = document.getElementById("googleMap");
        var mapProp = {
          center:myCenter,
          zoom:12,
          mapTypeId:google.maps.MapTypeId.ROADMAP,
          disableDefaultUI:true
        };
        return new google.maps.Map(el,mapProp);
      },
      //绘制学校图标
      drawSchool(obj,map){
        console.log("即将绘制学校图标");
        var pic = null;
        if(obj.grade=='Elementary'){
          pic= obj.type=='Public'?publicElementary:prativeElementary;
        }else if(obj.grade=='High'){
          pic= obj.type=='Public'?publicHigh:prativeHigh;
        }else{
          pic= obj.type=='Public'?publicSecondary:prativeSecondary;
        }
        var coordinates=new google.maps.LatLng(obj.latitude,obj.longitude);
        var marker=new google.maps.Marker({
          position:coordinates,
          icon:pic
        });
        marker.setMap(map);
        return marker;
      },
      //闭包循环绘制描点
      moveCenter(){
        var self = this;
        var myCenter=new google.maps.LatLng(self.houseList[0].latitude,self.houseList[0].longitude);
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
            //绑定事件
            self.clickMarker(self.geojson.list[i],i,marker);
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
        console.log("houseList");
        console.log(self.houseList);

        for(var i=0;i<self.houseList.length;i++){
          var house = self.houseList[i];
          var type=house.type=="Public"?'公立':'私立';
          var str = house.type=="Public"?'查看学区内房源':'查看3公里内房源'
          var obj ={
            /*
             'description':'<div class="infoWindow"><h3>'+house.name+'</h3>'+'<p >'+type+'&nbsp;&nbsp;&nbsp;<a class="toHouseList" href="#/schoolDetail/'+house.id+'">'+str+house.houseCount+'套&gt;</a></p></div>',
             */
            "description":'这里是弹窗的内容',
            "coordinates": [house.latitude, house.longitude],
            'type':house.type,
            'grade':house.grade
          }
          self.geojson.list.push(obj);
        }
        console.log(self.geojson.list);
      },
      //描点
      drawMarker(obj,map) {
        var self = this;
        var pic=mapHouse;
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
      //给房源绑定点击事件
      clickMarker(obj,i,marker){
        var self = this;
        marker.addListener('click', function(e) {
          console.log("点击第"+i+"套房源");
          console.log("当前坐标"+obj.coordinates+"");
          if(self.markers.length>0){
            for(let j=0;j<self.markers.length;j++){
              self.markers[j].setIcon(mapHouse);
              marker.setZIndex(j);
            }
          }
          marker.setIcon(mapHouseActive);
          marker.setZIndex(999);
          self.showSwipe(i);
        });
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
          if(self.infowindowList.length>0){
            for(let j=0;j<self.infowindowList.length;j++){
              self.infowindowList[j].close();
            }
          }
          console.log(infowindow);
          console.log(infowindow.position);
          console.log(infowindow.content);
          infowindow.open(self.googleMap,marker);
          self.infowindowList.push(infowindow);
          self.showSwipe(i);
        });
      },
      //移动地图触发事件
      onTouchEnd(){
        var self = this;

        self.inData.minLatitude = self.googleMap.getBounds().f.b;
        self.inData.maxLatitude = self.googleMap.getBounds().f.f;
        self.inData.minLongitude = self.googleMap.getBounds().b.b;
        self.inData.maxLongitude = self.googleMap.getBounds().b.f;
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
          .then(function (response) {
            self.totalResults=response.body.totalResults;
            self.showResult();
            if(response.body.data!==null) {
              self.houseList = response.body.data;
              console.log("移动地图请求得到的新数据");
              console.log(self.houseList);
              //self.showHouseList();
              self.drawMarkers();
            }else{
              self.clearMarkers();
            }
          })

        console.log(self.inData.minLatitude);
        console.log(self.inData.maxLatitude);
        console.log(self.inData.minLongitude);
        console.log(self.inData.maxLongitude);
      },
      //展示搜索结果
      showResult(){
        var self = this;
        var toastMsg='';
        if(self.totalResults>=80){
          toastMsg="为您选出"+self.totalResults+"套房源，显示80套"
        }else if(self.totalResults==0){
          toastMsg="暂时没有找到符合的房源"
        }else{
          toastMsg="已为您选出"+self.totalResults+"套房源"
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
            self.$refs.mySwiper1.swiper.slideTo(i, 10, false)
          },1)
        }
      },
      hideSwipe(){
        let self=this;
        let el=document.getElementsByClassName('mapboxgl-marker');
        for(let i=0;i<el.length;i++){
          el[i].style.backgroundImage="url('"+self.redImg+"')"
        }
        self.swipeShow=false;
      },
      closeDiage () {
        this.dialog = false;
        this.dialogCity=false;
      },
      routerList(){
        var self = this;
        self.inData.minLatitude='';
        self.inData.maxLatitude='';
        self.inData.minLongitude='';
        self.inData.maxLongitude='';
        this.$router.push({name:'学校详情',params:{id:self.inData.schoolId},query:self.inData})
      },
      /*筛选框的弹出逻辑开始*/
      toggle () {
        this.open = !this.open;
        this.$refs.button.$el.style.color='#f14114';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#656565';
        this.$refs.button3.$el.style.color='#656565';
      },
      toggle1 () {
        let self=this;
        this.open1 = !this.open1;
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#f14114';
        this.$refs.button2.$el.style.color='#656565';
        this.$refs.button3.$el.style.color='#656565';
        setTimeout(function(){
          self.$refs.slider2.refresh()
        },200)
      },
      toggle2 () {
        let self=this;
        this.open2 = !this.open2;
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#f14114';
        this.$refs.button3.$el.style.color='#656565';
      },
      toggle3 () {
        let self=this;
        this.open3 = !this.open3;
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#656565';
        this.$refs.button3.$el.style.color='#f14114';
        setTimeout(function(){
          self.$refs.slider1.refresh()
          self.$refs.slider3.refresh()
        },200)
      },
      handleClose (e) {
        this.open = false
        this.$refs.button.$el.style.color='#656565';
        let el=this.$refs.button.$el;
        el.childNodes[0].getElementsByTagName('i')[0].className ='mu-icon material-icons icon iconfont icon-sanjiao';
      },
      handleClose1 (e) {
        this.open1 = false
        this.$refs.button1.$el.style.color='#656565';
      },
      handleClose2 (e) {
        this.open2 = false
        this.$refs.button2.$el.style.color='#656565';
      },
      handleClose3 (e) {
        this.open3 = false
        this.$refs.button3.$el.style.color='#656565';
      },
      /*筛选框的弹出逻辑结束*/
      /*筛选按钮逻辑开始*/
      moneyOther(){
        let self=this;
        if(self.sliderOption1.measureNum[1]==0){
          self.inData.maxPrice='';
        }else{
          self.inData.maxPrice=self.sliderOption1.measureNum[1];
        }
        self.inData.minPrice=self.sliderOption1.measureNum[0];
        self.inData.minLatitude='';
        self.inData.maxLatitude='';
        self.inData.minLongitude='';
        self.inData.maxLongitude='';
        this.inData.currentPage=1;
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
          .then(function (response) {
            for(let i=0;i<self.markers.length;i++){
              self.markers[i].remove();
            }
            self.geojson.features.splice(0,self.geojson.features.length)
            if(response.body.data!==null){
              self.houseList=response.body.data;
              let length=response.body.data.length;
              let numAll=String(response.body.totalResults);
              let num=response.body.totalResults<40?String(response.body.totalResults):'40';
              self.toastMsg='该区域内房源数量为'+numAll+'套，展示'+num+'套'
              this.toast = true
              if (this.toastTimer) clearTimeout(this.toastTimer)
              this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
              let moneyArr=[]
              for(let i=0;i<length;i++){
                moneyArr.push({
                  "type": "Feature",
                  "properties": {
                    "message": "Foo",
                    "iconSize": [30, 30],
                    'className':'icon iconfont icon-icon_shouye_dingweidian green-color'
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [
                      response.body.data[i].latitude,
                      response.body.data[i].longitude
                    ]
                  }
                })
              }
              self.geojson.features=moneyArr;
              for(let i=0;i<self.geojson.features.length;i++){
                (function(a){
                  var el = document.createElement('div');
                  el.className = 'mapboxgl-marker';
                  el.style.backgroundImage='url("'+self.redImg+'")'
                  el.style.width=self.geojson.features[a].properties.iconSize[0]+'px';
                  el.style.height=self.geojson.features[a].properties.iconSize[1]+'px';
                  el.style.backgroundSize='100% 100%';
                  el.addEventListener('touchstart', function(e) {
                    event.stopPropagation();
                    event.preventDefault()
                    let icon=document.getElementsByClassName('mapboxgl-marker');
                    for(let i=0;i<icon.length;i++){
                      icon[i].style.backgroundImage='url("'+self.redImg+'")'
                    }
                    self.index=a;
                    self.swipeShow=false;
                    setTimeout(function(){
                      self.swipeShow=true;
                    },1)
                    setTimeout(function(){
                      self.$refs.mySwiper1.swiper.slideTo(a, 10, false)
                    },1)
                    el.style.backgroundImage='url("'+self.greenImg+'")'
                  });
                  self.marker=new mapboxgl.Marker(el, {offset: [-self.geojson.features[a].properties.iconSize[0] / 2, -self.geojson.features[a].properties.iconSize[1] / 2]})
                    .setLngLat([self.geojson.features[a].geometry.coordinates[1],self.geojson.features[a].geometry.coordinates[0]])
                    .addTo(self.map);
                  self.markers.push(self.marker)
                })(i)
              }
              self.map.flyTo({center:[response.body.data[0].longitude,response.body.data[0].latitude]})
            }else{
              self.toastMsg='该区域内房源数量为0套，展示0套'
              this.toast = true
              if (this.toastTimer) clearTimeout(this.toastTimer)
              this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
            }
            this.open1=false;
            this.$refs.button1.$el.style.color='#656565';
          }).then(function (error) {
        })
      },//手动输入价格
      sortAdd(id,e){
        let el=document.getElementsByClassName('sort-list')[0].getElementsByTagName('li');
        let self=this;
        if(id==0){
          this.inData.buildingType='';
        }else if(id==1){
          this.inData.buildingType=0;
        }else if(id==2){
          this.inData.buildingType=1;
        }else if(id==3){
          this.inData.buildingType=2;
        }
        this.inData.currentPage=0;

        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
          .then(function (response) {
            for(let i=0;i<self.markers.length;i++){
              self.markers[i].remove();
            }
            self.geojson.features.splice(0,self.geojson.features.length)
            if(response.body.data!==null){
              self.houseList=response.body.data;
              let length=response.body.data.length;
              let numAll=String(response.body.totalResults);
              let num=response.body.totalResults<40?String(response.body.totalResults):'40';
              self.toastMsg='该区域内房源数量为'+numAll+'套，展示'+num+'套'
              this.toast = true
              if (this.toastTimer) clearTimeout(this.toastTimer)
              this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
              let moneyArr=[]
              for(let i=0;i<length;i++){
                moneyArr.push({
                  "type": "Feature",
                  "properties": {
                    "message": "Foo",
                    "iconSize": [30, 30],
                    'className':'icon iconfont icon-icon_shouye_dingweidian green-color'
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [
                      response.body.data[i].latitude,
                      response.body.data[i].longitude
                    ]
                  }
                })
              }
              self.geojson.features=moneyArr;
              for(let i=0;i<self.geojson.features.length;i++){
                (function(a){
                  var el = document.createElement('div');
                  el.className = 'mapboxgl-marker';
                  el.style.backgroundImage='url("'+self.redImg+'")'
                  el.style.width=self.geojson.features[a].properties.iconSize[0]+'px';
                  el.style.height=self.geojson.features[a].properties.iconSize[1]+'px';
                  el.style.backgroundSize='100% 100%';
                  el.addEventListener('touchstart', function(e) {
                    event.stopPropagation();
                    event.preventDefault()
                    let icon=document.getElementsByClassName('mapboxgl-marker');
                    for(let i=0;i<icon.length;i++){
                      icon[i].style.backgroundImage='url("'+self.redImg+'")'
                    }
                    self.index=a;
                    self.swipeShow=false;
                    setTimeout(function(){
                      self.swipeShow=true;
                    },1)
                    setTimeout(function(){
                      self.$refs.mySwiper1.swiper.slideTo(a, 10, false)
                    },1)
                    el.style.backgroundImage='url("'+self.greenImg+'")'
                  });
                  self.marker=new mapboxgl.Marker(el, {offset: [-self.geojson.features[a].properties.iconSize[0] / 2, -self.geojson.features[a].properties.iconSize[1] / 2]})
                    .setLngLat([self.geojson.features[a].geometry.coordinates[1],self.geojson.features[a].geometry.coordinates[0]])
                    .addTo(self.map);
                  self.markers.push(self.marker)
                })(i)
              }
              self.map.flyTo({center:[response.body.data[0].longitude,response.body.data[0].latitude]})
            }else{
              self.toastMsg='该区域内房源数量为0套，展示0套'
              this.toast = true
              if (this.toastTimer) clearTimeout(this.toastTimer)
              this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
            }
            for(let i=0;i<el.length;i++){
              el[i].className='';
            }
            e.target.className='active';
            this.open2 =false;
            this.$refs.button2.$el.style.color='#565656';
          }).then(function (error) {
        })
      },//排序选择逻辑
      addMore(id,e,type,uid){
        let self=this;
        let date=new Date();
        let newSecond=date.getTime();
        let year=date.getFullYear();
        let mouth=date.getMonth()+1;
        let data=date.getDate();
        let el=document.getElementsByClassName(type)[0].getElementsByTagName('span');
        if(type=='choiceTime'){
          for(let i=0;i<el.length;i++){
            el[i].className='';
          }
          e.target.className='active';
          if(id==1){
            this.inData.startDate='';
            this.inData.endDate='';
          }else if(id==2){
            let oldSecond=60*60*24*7*1000;
            let timer=new Date(newSecond-oldSecond);
            let newyear=timer.getFullYear();
            let newmouth=timer.getMonth()+1;
            let newdata=timer.getDate();
            this.inData.startDate=newyear+'-'+newmouth+'-'+newdata;
            this.inData.endDate=year+'-'+mouth+'-'+data;
          }else if(id==3){
            let oldSecond=60*60*24*28*1000;
            let timer=new Date(newSecond-oldSecond);
            let newyear=timer.getFullYear();
            let newmouth=timer.getMonth()+1;
            let newdata=timer.getDate();
            this.inData.startDate=newyear+'-'+newmouth+'-'+newdata;
            this.inData.endDate=year+'-'+mouth+'-'+data;
          }else {
            let oldSecond=60*60*24*59*1000;
            let timer=new Date(newSecond-oldSecond);
            let newyear=timer.getFullYear();
            let newmouth=timer.getMonth()+1;
            let newdata=timer.getDate();
            this.inData.startDate=newyear+'-'+newmouth+'-'+newdata;
            this.inData.endDate=year+'-'+mouth+'-'+data;
          }
        }else if(type=='choiceType') {
          if(id==0){
            for(let i=0;i<el.length;i++){
              el[i].className='';
            }
            e.target.className='active';
            this.inData.baths='';
            this.temArr.splice(0,this.temArr.length)
          }else {
            el[0].className='';
            if(e.target.className==''){
              e.target.className='active';
              if(id==1){
                self.temArr.push('1')
              }else if(id==2){
                self.temArr.push('2')
              }else if(id==3){
                self.temArr.push('3')
              }else if(id==4){
                self.temArr.push('4')
              } else if(id==5){
                self.temArr.push('5')
              }
            }else{
              if(self.temArr.length>1){
                e.target.className='';
                if(self.temArr.indexOf(uid)>-1){
                  self.temArr.splice(self.temArr.indexOf(uid),1)
                }
              }
            }
            this.inData.baths=self.temArr.join(',');
            console.log(this.inData.baths)
          }
        }else if(type=='choiceRoom') {
          if(id==0){
            for(let i=0;i<el.length;i++){
              el[i].className='';
            }
            e.target.className='active';
            this.inData.beds='';
            this.temArr1.splice(0,this.temArr1.length)
          }else {
            el[0].className='';
            if(e.target.className==''){
              e.target.className='active';
              if(id==1){
                this.temArr1.push('1');
              }else if(id==2){
                this.temArr1.push('2');
              }else if(id==3){
                this.temArr1.push('3');
              }else if(id==4){
                this.temArr1.push('4');
              }else if(id==5){
                this.temArr1.push('5');
              }
            }else{
              if(self.temArr1.length>1){
                e.target.className='';
                if(self.temArr1.indexOf(uid)>-1){
                  self.temArr1.splice(self.temArr1.indexOf(uid),1)
                }
              }
            }
            this.inData.beds=self.temArr1.join(',');
          }
        }else if(type=='choiceSort'){
          for(let i=0;i<el.length;i++){
            el[i].className='';
          }
          e.target.className='active';
          if(id==0){
            this.inData.direction='DESC';
            this.inData.sortField=0;
          }else if(id==1){
            this.inData.direction='DESC';
            this.inData.sortField=1;
          }else if(id==2){
            this.inData.direction='ASC';
            this.inData.sortField=1;
          }else if(id==3){
            this.inData.direction='DESC';
            this.inData.sortField=2;
          }else if(id==4){
            this.inData.direction='ASC';
            this.inData.sortField=2;
          }
        }
      },//更多筛选逻辑
      /*筛选按钮逻辑结束*/
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },//闲时候隐藏toast
      back(){
        this.$router.back()
      },
      subMore(){
        let self=this;
        this.inData.minArea=this.sliderOption.measureNum[0];
        this.inData.minPrice=this.sliderOption1.measureNum[0];
        this.inData.minLandArea=this.sliderOption2.LandArea[0];
        if(this.inData.maxPrice==0){
          this.inData.maxPrice='';
        }else if(this.sliderOption1.measureNum[1]==1000){
          this.inData.maxPrice='';
        }else{
          this.inData.maxPrice=this.sliderOption1.measureNum[1];
        }
        if(this.sliderOption.measureNum[1]==0){
          this.inData.maxArea=''
        }else if(this.sliderOption.measureNum[1]==5000){
          this.inData.maxArea=''
        }else{
          this.inData.maxArea=this.sliderOption.measureNum[1];
        }
        this.inData.currentPage=1;
        if(this.sliderOption2.LandArea[1]==0){
          this.inData.maxLandArea='';
        }else if(this.sliderOption2.LandArea[1]==45000){
          this.inData.maxLandArea='';
        }else{
          this.inData.maxLandArea=this.sliderOption2.LandArea[1];
        }
        if(this.inData.maxArea==0){
          this.inData.maxArea='';
        }else if(this.inData.maxArea==5000){
          this.inData.maxArea='';
        }else{
          this.inData.maxArea=this.sliderOption.measureNum[1];
        }
        this.inData.currentPage=1;
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
          .then(function (response) {
            for(let i=0;i<self.markers.length;i++){
              self.markers[i].remove();
            }
            self.houseList=response.body.data;
            self.geojson.features.splice(0,self.geojson.features.length)
            if(response.body.data!==null){
              let length=response.body.data.length;
              let numAll=String(response.body.totalResults);
              let num=response.body.totalResults<40?String(response.body.totalResults):'40';
              self.toastMsg='该区域内房源数量为'+numAll+'套，展示'+num+'套'
              this.toast = true
              if (this.toastTimer) clearTimeout(this.toastTimer)
              this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
              let moneyArr=[]
              for(let i=0;i<length;i++){
                moneyArr.push({
                  "type": "Feature",
                  "properties": {
                    "message": "Foo",
                    "iconSize": [30, 30],
                    'className':'icon iconfont icon-icon_shouye_dingweidian green-color'
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [
                      response.body.data[i].latitude,
                      response.body.data[i].longitude
                    ]
                  }
                })
              }
              self.geojson.features=moneyArr;
              for(let i=0;i<self.geojson.features.length;i++){
                (function(a){
                  var el = document.createElement('div');
                  el.className = 'mapboxgl-marker';
                  el.style.backgroundImage='url("'+self.redImg+'")'
                  el.style.width=self.geojson.features[a].properties.iconSize[0]+'px';
                  el.style.height=self.geojson.features[a].properties.iconSize[1]+'px';
                  el.style.backgroundSize='100% 100%';
                  el.addEventListener('touchstart', function(e) {
                    event.stopPropagation();
                    event.preventDefault()
                    let icon=document.getElementsByClassName('mapboxgl-marker');
                    for(let i=0;i<icon.length;i++){
                      icon[i].style.backgroundImage='url("'+self.redImg+'")'
                    }
                    self.index=a;
                    self.swipeShow=false;
                    setTimeout(function(){
                      self.swipeShow=true;
                    },1)
                    setTimeout(function(){
                      self.$refs.mySwiper1.swiper.slideTo(a, 10, false)
                    },1)
                    el.style.backgroundImage='url("'+self.greenImg+'")'
                  });
                  self.marker=new mapboxgl.Marker(el, {offset: [-self.geojson.features[a].properties.iconSize[0] / 2, -self.geojson.features[a].properties.iconSize[1] / 2]})
                    .setLngLat([self.geojson.features[a].geometry.coordinates[1],self.geojson.features[a].geometry.coordinates[0]])
                    .addTo(self.map);
                  self.markers.push(self.marker)
                })(i)
              }
              self.open3=false;
              self.map.flyTo({center:[response.body.data[0].longitude,response.body.data[0].latitude]})
            }else{
              self.toastMsg='该区域内房源数量为0套，展示0套'
              this.toast = true
              if (this.toastTimer) clearTimeout(this.toastTimer)
              this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
            }
            this.open3=false;
            this.$refs.button3.$el.style.color='#656565';
          }).then(function (error) {
        })
      },
      /*筛选按钮逻辑结束*/
      back(){
        this.$router.back()
      },
      toHere(latitude,longitude){
        var googleUrl="http://www.google.cn/maps/dir//"+latitude+","+longitude+"/@"+latitude+","+longitude+"?hl=zh-CN";
        console.log(googleUrl);
        window.open(googleUrl);
      },
      routerHouseDetail(id,mslno){
        let self = this;
        if (self.isApp){
          this.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler('toHouseDetail',mslno,function(resp){
            });
          })
          this.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler('toHouseDetail1',id,function(resp){});
          })
        }else{
          this.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:id},query:{region:sessionStorage.getItem('code')}})
        }
      },
      resetMore(){
        var self = this;
        self.inData={};
        self.tempData=
          {
            sortField:null,
            direction:null,
            dateType:null,
            buildingType:null,
            beds:null
        },
        self.inData.pageSize = 10;
        self.inData.currentPage = 1;
        self.inData.region = self.$route.query.region;
        self.inData.schoolId = self.$route.query.schoolId;
        for(var key2 in self.moneyList){
          self.moneyList[key2].active=false;
        }
        for(var key2 in self.roomAreaList){
          self.roomAreaList[key2].active=false;
        }
        for(var key2 in self.landAreaList){
          self.landAreaList[key2].active=false;
        }
        for(var key2 in self.wishList){
          self.wishList[key2].active=false;
        }
      },
      hideMore(){
        this.temArr=this.temArr.splice(0,this.temArr.length);
        this.temArr1=this.temArr1.splice(0,this.temArr1.length);
        let el=document.getElementsByClassName('choiceTime')[0].getElementsByTagName('span');
        let el1=document.getElementsByClassName('choiceRoom')[0].getElementsByTagName('span');
        let el2=document.getElementsByClassName('choiceType')[0].getElementsByTagName('span');
        let el3=document.getElementsByClassName('choiceSort')[0].getElementsByTagName('span');
        for(let i=0;i<el.length;i++){
          el[i].className='';
        }
        console.log(el[0])
        el[0].className='active';
        for(let i=0;i<el1.length;i++){
          el1[i].className='';
        }
        el1[0].className='active';
        for(let i=0;i<el2.length;i++){
          el2[i].className='';
        }
        el2[0].className='active';
        for(let i=0;i<el3.length;i++){
          el3[i].className='';
        }
        el3[0].className='active';
        this.inData.startDate='';
        this.inData.endDate='';
        this.inData.beds='';
        this.inData.baths='';
        this.sliderOption.measureNum=[0,5000];
        this.sliderOption2.LandArea=[0,45000];
        this.inData.minArea='';
        this.inData.maxArea='';
        this.inData.minLandArea='';
        this.inData.maxLandArea='';
        this.inData.sortField='';
        this.inData.direction='';
        this.open3=false;
        this.$refs.button3.$el.style.color='#656565';
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
    mounted(){
      this.$nextTick(function () {
        let self=this;
        document.title=this.$route.name;
        self.houseImg=rxUtils.hostHouse;
        self.imgAdd=rxUtils.hostHouse;
        self.country=sessionStorage.getItem('country');
        this.topTitle=this.$route.name;
        if(self.$route.query){
          self.inData = self.$route.query;
          self.inData.pageSize = 80;
          self.inData.currentPage = 1;
          //获取APP标识
          self.isApp = self.$route.query.isApp?self.$route.query.isApp:false;
          self.hideTitle = self.$route.query.hideTitle?self.$route.query.hideTitle:false;
          //根据筛选条件，将已选择的条件，展示到筛选页中
          self.tempData.direction = self.inData.direction?self.inData.direction:null;
          self.tempData.sortField = self.inData.sortField?self.inData.sortField:null;
          self.tempData.dateType = self.inData.dateType?self.inData.dateType:null;
          self.tempData.buildingType = self.inData.buildingType?self.inData.buildingType:null;
          if(self.inData.beds){
            var bedsArray= self.inData.beds.split(',');
            for(var key in bedsArray){
              for(var key2 in self.roomList){
                if(bedsArray[key]==self.roomList[key2].data){
                  self.roomList[key2].active=true;
                }
              }
            }
          }
          if(self.inData.baths){
            var bathsArray= self.inData.baths.split(',');
            for(var key in bathsArray){
              for(var key2 in self.wishList){
                if(bathsArray[key]==self.wishList[key2].data){
                    self.wishList[key2].active=true;
                  }
              }
            }
          }
          if(self.inData.landAreaFilter){
            var landAreaArray= self.inData.landAreaFilter.split(',');
            for(var key in landAreaArray){
              for(var key2 in self.landAreaList){
                if(landAreaArray[key]==self.landAreaList[key2].data){
                    self.landAreaList[key2].active=true;
                  }
              }
            }
          }
          if(self.inData.priceFilter){
            var priceArray= self.inData.priceFilter.split(',');
            for(var key in priceArray){
              for(var key2 in self.moneyList){
                if(priceArray[key]==self.moneyList[key2].data){
                    self.moneyList[key2].active=true;
                  }
              }
            }
          }
          if(self.inData.roomAreaFilter){
            var roomAreaArray= self.inData.roomAreaFilter.split(',');
            for(var key in roomAreaArray){
              for(var key2 in self.roomAreaList){
                if(roomAreaArray[key]==self.roomAreaList[key2].data){
                    self.roomAreaList[key2].active=true;
                  }
              }
            }
          }
          console.log(self.inData);
          console.log(self.tempData);
        }
        if (self.isApp){
          this.setupWebViewJavascriptBridge(function(bridge) {
            if(self.isApp!='IOS'){
              //init代码，IOS不能执行  安卓必须要执行
              bridge.init(function(message, responseCallback) {
                responseCallback(data);
              });
            }
            //注册方法 供客户端调用
            //alert("setupWebViewJavascriptBridge内部");
            bridge.registerHandler("updateMap",function(data,responseCallback){
              //查询接口
              data=self.isApp=='IOS'?data:JSON.parse(data);
              self.inData=data;
              //查询接口
              self.$http.post('/residence/search.json', self.inData, {emulateJSON: true}).then(function (response) {
                this.dialog =false;
                self.totalResults=response.body.totalResults;
                self.showResult();
                if(response.body.data!==null) {
                  self.houseList = response.body.data;
                  console.log(self.houseList);
                  self.drawMarkers();
                }else{
                  self.clearMarkers();
                }
              }).then(function (error) {
              })
              //responseCallback(data);
            });
            bridge.registerHandler("getSearchData",function(data,responseCallback){
              responseCallback(self.inData);
            });
          })
        }
        //首次进入 页面获取城市信息
        self.$http.get('/region/listCity.json?code='+self.inData.code, {}, {emulateJSON: true})
          .then(function (response) {
            self.adds=response.body.data;
          }).then(function (error) {
        })
        self.imgUrl=rxUtils.hostSchool;
        //学校详情
        self.$http.get('/school/getDetail.json?id='+self.inData.schoolId, {'params':{region:self.inData.region}}, {emulateJSON: true})
          .then(function (response) {
            document.getElementById('googleMap').style.height=window.innerHeight+'px';
            self.school=response.body.data;
            self.title=self.school.name+'学区房源';
            document.title=self.school.name+'学区房源';
            self.googleMap = self.drawMap(self.school.latitude,self.school.longitude);
            self.drawSchool(self.school,self.googleMap);
            console.log(self.googleMap);
            //查询周边房源
            self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
              .then(function (response) {
                self.totalResults=response.body.totalResults;
                self.showResult();
                if(response.body.data!==null){
                  self.houseList=response.body.data;
                  self.showHouseList();
                }
                /*if(response.body.data!==null){
                 self.houseList=response.body.data;
                 let length=response.body.data.length;
                 for(let i=0;i<length;i++){
                 self.geojson.features.push({
                 "type": "Feature",
                 "properties": {
                 "message": "Foo",
                 "iconSize": [30, 30],
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

                 /!*mapboxgl.accessToken = 'pk.eyJ1Ijoiamlhbmdsb25nZmVpIiwiYSI6ImNpcGhpbDQ2YTAwMmZ2bWt3azlpOWR1d3gifQ.NS9649ZqejM_AV39PaIhKg';
                 const map = new mapboxgl.Map({
                 container: 'map-container',
                 style: 'mapbox://styles/mapbox/streets-v9',
                 zoom:10,
                 center:[response.body.data[0].longitude,
                 response.body.data[0].latitude]
                 });
                 this.map=map;
                 for(let i=0;i<self.geojson.features.length;i++){
                 (function(a){
                 var el = document.createElement('div');
                 el.className = 'mapboxgl-marker';
                 el.style.backgroundImage='url("'+self.redImg+'")'
                 el.style.width=self.geojson.features[a].properties.iconSize[0]+'px';
                 el.style.height=self.geojson.features[a].properties.iconSize[1]+'px';
                 el.style.backgroundSize='100% 100%';
                 el.addEventListener('touchstart', function(e) {
                 event.stopPropagation();
                 event.preventDefault()
                 let icon=document.getElementsByClassName('mapboxgl-marker');
                 for(let i=0;i<icon.length;i++){
                 icon[i].style.backgroundImage='url("'+self.redImg+'")'
                 }
                 self.index=a;
                 self.swipeShow=false;
                 setTimeout(function(){
                 self.swipeShow=true;
                 },1)
                 setTimeout(function(){
                 self.$refs.mySwiper1.swiper.slideTo(a, 10, false)
                 },1)
                 el.style.backgroundImage='url("'+self.greenImg+'")'
                 });
                 self.marker=new mapboxgl.Marker(el, {offset: [-self.geojson.features[a].properties.iconSize[0] / 2, -self.geojson.features[a].properties.iconSize[1] / 2]})
                 .setLngLat(self.geojson.features[a].geometry.coordinates)
                 .addTo(self.map);
                 self.markers.push(self.marker)
                 })(i)
                 }
                 self.first=self.map.getBounds();
                 const ele = map.getCanvasContainer();
                 ele.addEventListener('touchend', self.onTouchEnd, true);
                 let numAll=String(response.body.totalResults);
                 let num=response.body.totalResults<40?String(response.body.totalResults):'40';
                 self.toastMsg='该区域内房源数量为'+numAll+'套，展示'+num+'套'
                 self.toast = true
                 if (this.toastTimer) clearTimeout(this.toastTimer)
                 self.toastTimer = setTimeout(() => { this.toast = false }, 500)
                 }else{
                 if(self.$route.query.ergion=='YVR'){
                 var nomalLat=[49.2963634,-123.0873791]
                 }else{
                 var nomalLat=[43.6951874,-79.4347493]
                 }
                 mapboxgl.accessToken = 'pk.eyJ1Ijoiamlhbmdsb25nZmVpIiwiYSI6ImNpcGhpbDQ2YTAwMmZ2bWt3azlpOWR1d3gifQ.NS9649ZqejM_AV39PaIhKg';
                 const map = new mapboxgl.Map({
                 container: 'map-container',
                 style: 'mapbox://styles/mapbox/streets-v9',
                 zoom:10,
                 center:nomalLat
                 });
                 this.map=map;
                 self.toastMsg='该区域内房源数量为0套，展示0套'
                 self.toast = true
                 if (this.toastTimer) clearTimeout(this.toastTimer)
                 self.toastTimer = setTimeout(() => { this.toast = false }, 500)*!/
                 }*/
              }).then(function (error) {
            })
          }).then(function (error) {
        })
      })
    },
    components: {
      vueSlider,
      swiper,
      swiperSlide
    }
  }
</script>
