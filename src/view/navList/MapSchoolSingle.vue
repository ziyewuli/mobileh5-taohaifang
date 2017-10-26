<template>
  <div class="mapHouse">
    <div class="mu-appbar mu-paper-1" v-if="!hideTitle">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <!--<div class="right">
        <img src="../../assets/img/toList.png" @click="routerList()" />
      </div>-->
    </div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    <div class="screen" ><img src="../../assets/img/showSchoolHouse.png" @click="toMapSchoolHouse()"/></div>
    <div  id="googleMap"></div>
    <div class="swiper-bg ">
      <div v-if="swipeShow" class="address-box toHere-bg" >
        <div class="toHere" @click="toHere(school.latitude,school.longitude)"><img src="../../assets/img/toHere.png"></div>
          <p class="address-title"><i class="icon iconfont icon-icon-fangyuanjulix"></i>地址</p>
        <p class="address">{{school.address}}</p>
      </div>
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
  div#googleMap{
    height:100%;
    width:100%;
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
      return{
        region:null,
        isApp:false,
        hideTitle:false,
        school:'',
        schoolId:'',
        googleMap:'',
        swipeShow:true,
        topTitle:'',
        toast:'',
      }
    },
    methods:{
      toHere(latitude,longitude){
        var googleUrl="http://www.google.cn/maps/dir//"+latitude+","+longitude+"/@"+latitude+","+longitude+"?hl=zh-CN";
        console.log(googleUrl);
        window.open(googleUrl);
      },
      //跳转学区找房页面
      toMapSchoolHouse(){
        let self = this;
        if (self.isApp){
          this.setupWebViewJavascriptBridge(function(bridge) {
            //alert("即将传参给客户端，schoolId："+self.schoolId);
            bridge.callHandler('toSchoolHouse',self.schoolId,function(resp){

            });
          })
        }else{
          this.$router.push({name:'学区找房',query:{schoolId:self.schoolId,region:self.region}})
        }

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
      routerList(){
        var self = this;
        self.inData.minLatitude='';
        self.inData.maxLatitude='';
        self.inData.minLongitude='';
        self.inData.maxLongitude='';
        this.$router.push({name:'学校详情',params:{id:self.inData.schoolId},query:self.inData})
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },//闲时候隐藏toast
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
    mounted(){
      this.$nextTick(function () {
        let self=this;
        document.title=this.$route.name;
        self.houseImg=rxUtils.hostHouse;
        this.topTitle=this.$route.name;
        self.schoolId = self.$route.query.schoolId;
        self.region = self.$route.query.region;
        self.imgUrl=rxUtils.hostSchool;
        //获取APP标识
        self.isApp = self.$route.query.isApp?self.$route.query.isApp:false;
        self.hideTitle = self.$route.query.hideTitle?self.$route.query.hideTitle:false;
        if (self.isApp){
          this.setupWebViewJavascriptBridge(function(bridge) {
            if(self.isApp!='IOS'){
              //init代码，IOS不能执行  安卓必须要执行
              bridge.init(function(message, responseCallback) {
                responseCallback(data);
              });
            }
          })
        }
        //学校详情
        self.$http.get('/school/getDetail.json?id='+self.schoolId, {'params':{region:self.region}}, {emulateJSON: true})
          .then(function (response) {
            document.getElementById('googleMap').style.height=window.innerHeight+'px';
            self.school=response.body.data;
            self.googleMap = self.drawMap(self.school.latitude,self.school.longitude);
            var schoolMarker = self.drawSchool(self.school,self.googleMap);
            schoolMarker.addListener('click', function(e) {
                self.swipeShow = true;
            });
            console.log(self.googleMap);
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
