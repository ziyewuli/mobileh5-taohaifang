<template>

  <div class="screenIndex" >
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
      <div class="mu-appbar mu-paper-1">
        <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>房源筛选</span></div>
        <div class="right"></div>
      </div>
      <div class="first-row mls-row clearfix" >
        <input type="text" class="mls" placeholder="MLS编号可以准确查找房源" v-model="mlsNum">
      </div>
      <div class="first-row clearfix" @click="openCity">
        <span> 城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市</span>
        <div class="city-btn float-r">{{inData.chineselng||'请选择'}} <i class="icon iconfont icon-icon_xiaojiantouyou"></i></div>
      </div>
      <div class="screen-row">
        <div class="title">挂牌时间</div>
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
      <!--<div class="screen-row sort-row">
        <div class="title">排序</div>
        <div class="items clearfix">
          <div v-for="(list,index) in sorts" class="item float-l" @click="choiceSort(list)" :class="{'active':list.direction==tempData.direction&&list.sortField==tempData.sortField,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>-->
      <mu-raised-button @click="search" backgroundColor="#FB704C" class="demo-raised-button" fullWidth iconClass="icon iconfont icon-icon_shouye_fangdajing" label="确定" icon=" " primary/>
      <mu-raised-button @click="resetMore" backgroundColor="#fff" class="demo-raised-button" fullWidth label="重置" primary/>
    <mu-dialog dialogClass="cityLog cityLog1" :open="dialogCity" @close="closeDiage" scrollable>
      <div class="mu-appbar mu-paper-1">
        <div @click="openScreenDialog" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>城市</span></div>
        <div class="right"></div>
      </div>
      <ul class="city-list">
        <li @click="choiceCity('不限',null)" :class="{'active':tempData.city==null}">不限<i class="icon iconfont icon-icon_duihao"></i></li>
        <li v-for="list in cityData" :key="list.id" :class="{'active':tempData.city==list.englishlng}" @click="choiceCity(list.chineselng,list.englishlng)">{{list.chineselng}} <sub>{{list.englishlng}}</sub> <i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-dialog>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../assets/css/mix.less";

  ul.house-list .bottom-content img{
    width: 52/@base;
    height: 16/@base;
    vertical-align: sub;
  }
  .screenIndex{
    padding: 0 0 56px!important;
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
  div.detached{
    div.mu-appbar{
      height:44/@base;
      background: #fff;
      color:#565656;
      font-size: 27/@base;
      z-index: 2014123545;
      position: fixed;
      div.right{
        i.icon{
          font-size:37/@base;
        }
      }
    }
    div.top-img{
      width:100%;
      height:170/@base;
      img{
        width:100%;
        height:100%;
      }
    }
    div.top-content{
      width:100%;
      background: #fff;
      padding:10/@base 15/@base;
      position: relative;
      div.score{
        position: absolute;
        top:10/@base;
        right:15/@base;
        i.icon{
          color:#FF7F5F;
          font-size: 20/@base;
          margin-left:-4/@base;
        }
      }
      p.name{
        color:#4a4a4a;
        font-size: 16/@base;
        font-weight: bold;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      div.tip{
        margin:5/@base 0;
        span{
          color:#7F7F7F;
          font-size: 12/@base;
          margin-right:10/@base;
        }
        i.icon1{
          color:#D0011B;
        }
        i.icon2{
          color:#ABABAB;
        }

      }
      div.locataion{
        color:#9b9b9b;
        font-size: 12/@base;
        margin-top: -5/@base;
        i.icon{
          font-size: 20/@base;
          margin-left:-10/@base;
        }
      }
    }
    div.info-detail{
      background: #fff;
      padding:15/@base;
      margin-top:10/@base;
      li{
        line-height: 30/@base;
        .info-key{
          font-size: 12/@base;
          color:#9B9B9B;
          width: 100/@base;
          display: inline-block;
        }
        .info-value{
          font-size: 14/@base;
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
            background-image: url('../assets/img/tipbag.png');
            width:70/@base;
            height:30/@base;
            line-height:24/@base;
            text-align: center;
            background-size: 100% 100%;
            color:#fff;
            span{
              font-size:12/@base ;
              display: inline-block;
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
    .choice {
      position: fixed;
      top: 44/@base;
      display: box;
      display: -moz-box;
      display: -webkit-box;
      top: 44/@base;
      width: 100%;
      z-index: 999999999999;
      i.icon-icon_shouye_youjiantou{
        position: absolute;
        font-size: 30/@base;
        transform: rotate(-90deg);
        top:30/@base;
        color:#fff;
        left:40/@base;
      }
      button:nth-child(4) {
        i {
          font-size: 20/@base;
        }
      }
      button {
        display: block;
        box-shadow: none;
        width: 100%;
        background-color: #fff;
        margin: 0;
        font-size: 14px;
        color: #656565;
        box-flex: 1;
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
        border-radius: 0;
        min-width: auto;
        .mu-raised-button-label {
          padding: 0 !important;
        }
      }
    }
    .choice>button{
      div.mu-raised-button-wrapper{
        span.mu-raised-button-label{
          display: inline-block;
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
    i.icon-icon_shouye_youjiantou{
      position: absolute;
      color:#fff;
      transform: rotate(-90deg);
      font-size: 30/@base;
      top:-24/@base;
    }
  }
  div.screenIndex{
    width: 100% !important;
    height:100%;
    box-shadow: none!important;
    .first-row.mls-row{
      background: #F5EAEA;
      .mls{
        width:345/@base;
        height:34/@base;
        border:0;
        text-align: center;
        font-size: 12/@base;
        border-radius: 3/@base;
      }
    }
    .first-row{
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
      padding:10/@base 10/@base 0 15/@base;
      background: #fff;
      .title{
        height:35/@base;
        line-height: 35/@base;
      }
      .items{
        font-size: 12/@base;
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
          width:162/@base !important;
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
    button.mu-raised-button{
      position: fixed;
      height:50/@base;
      width:50%;
      right:0;
      z-index: 9;
      bottom:0;
    }
    button.mu-raised-button:nth-of-type(2){
      color:#4a4a4a;
      left:0;
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
  div.demo-popup-right{
    width: 100% !important;
    height:100%;
    box-shadow: none!important;
    background-color:#f6f6f6!important;
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
    span.mu-raised-button-label{
      padding-left:4/@base!important;
    }
    .mu-appbar{
      background: #fff;
      height:44/@base;
      box-shadow:none;
      border-bottom:1px solid #e9e9e9;
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
    ul.top-content{
      background: #fff;
      padding:0 15/@base;
      li:first-child{
        border-bottom:1px solid #e8e8e8;
      }
      li{
        font-size: 14/@base;
        color:#4a4a4a;
        padding:10/@base 0;
        i.icon{
          vertical-align: middle;
          color:#979797;
        }
      }
    }
    div.all-region{
      background: #fff;
      height:100%;
      padding:0 15/@base;
      margin-top:20/@base;
      p{
        color:#4a4a4a;
        font-size: 14/@base;
        padding:15/@base 0;
      }
      div.cityIcon{
        width:165/@base;
        height:70/@base;
        margin-bottom:15/@base;
      }
      div{
        img{
          width:100%;
          height:100%;
        }
      }
    }
  }
  .scroll-wrap{
    width: 270/@base;
    height: 50/@base;
    overflow: hidden;
  }

  .scroll-content{
    position: relative;
    transition: top 0.1s;

    li{
      line-height: 50/@base;
      text-align: left;
      nobr{
        display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
      }
    }
  }
  div.mu-buttom-item-wrapper{
    color: #4A4A4A;
  }
  div.mu-paper{
    width:100%;
    i.mu-bottom-item-icon{
      font-size: 24/@base;
    }
    span.mu-bottom-item-text{
      font-size: 12/@base;
    }
    button.mu-bottom-item-active{
      span.mu-bottom-item-text{
        font-size: 12/@base;
        color:#4A4A4A;
      }
      i.icon-icon_shouye_yixuan,i.icon-icon_jingxuan_yixuan,i.icon-icon_wenda_yixuan,i.icon-icon_wode_yixuan{
        color:#f14114;
      }
    }
  }
  div.cityChoiceDialog{
    width:295/@base;
    height:350/@base;
    background:#ebebeb;
    padding:30/@base 0;
    div.mu-dialog-body{
      p.cityTop{
        text-align: center;
        color:#39393a;
        font-size: 17/@base;
        margin-bottom:20/@base;
      }
      div.locationVan,div.locationTo{
        width:240/@base;
        background: #fff;
        border:1px solid #9b9b9b;
        margin:0 auto;
        height:70/@base;
        display:box;
        display:-webkit-box;
        display:-moz-box;
        line-height:70/@base;
        position: relative;
        i.icon-icon_xiaojiantouyou{
          position: absolute;
          font-size: 12/@base;
          right:10/@base;
        }
        div{
          box-flex:1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          text-align: center;
          p{
            line-height:17/@base;
            color:#4a4a4a;
          }
          p:first-child{
            margin-top:13/@base;
            margin-bottom:10/@base;
          }
          p:last-child{
            font-weight: bold;
          }
        }
      }
      div.locationVan{
        margin-top:30/@base;
        img{
          width:60/@base;
        }
      }
      div.locationTo{
        margin-top:30/@base;
        img{
          height:50/@base;
          margin-top:10/@base;
        }
      }
    }
  }
  .demo-popup-right{
    z-index: 9999999999 !important;
  }
  .mu-popup-right{
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color:#f6f6f6!important;

  }
  .cityLog1{
    div.mu-dialog-body{
      button.mu-raised-button{
        bottom: 0;
      }
      div.choiceType,div.choiceRoom{
        span{
          padding:4/@base 20/@base!important;
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
  .index{
    background: #f6f6f6;
    font-family: PingFangSC-Regular;
    .mint-swipe{
      height:140/@base;
      margin:15/@base 0;
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
    div.swipe-box-box1{
      padding-bottom:20/@base;
    }
    .swipe-box-box,.swipe-box-box1,.cuish{
      width:100%;
      background-color: #fff;
      padding:0 10/@base 0 10/@base;
      margin-top:10/@base;
    }
    .swipe-box-box>p,.swipe-box-box1>p,.cuish>p{
      width:100%;
      text-align: center;
      padding:16/@base 0;
      i.icon{
        vertical-align: middle;
        display: inline-block;
        margin-top:-2/@base;
      }
    }
    .index-ask{
      .swiper-slide{
        width:140/@base!important;
        height:140/@base;
        margin-right:10/@base;
        position: relative;
        img{
          height:100%;
          width:100%;
        }
        p{
          color:#fff;
          font-size: 16/@base;
          position: absolute;
          top:30%;
          padding:0 14/@base;
          text-align: center;
          width: 100%;
          word-break:break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp:2;
          overflow: hidden;
        }
      }
    }
    .swipe-box-box{
      padding-bottom:20/@base;
    }
    .index-t,.cuish{
      .swiper-slide{
        width:260/@base;
        height:130/@base;
        margin-right:10/@base;
        position: relative;
         border-radius: 6/@base;
        overflow: hidden;
        a{
          display:block;
          img{
            height:100%;
            width:100%;
          }
          p{
            position: absolute;
            bottom:0/@base;
            padding:6/@base;
            background-color: rgba(0,0,0,.3);
            color:#fff;
            font-size: 14/@base;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width:100%;
          }
        }
      }
    }
    .container{
    margin-top:10/@base;
    padding-bottom:80/@base;
    background: #fff;
    .container-title{
      height:50/@base;
      line-height: 50/@base;
      border-top: 1px solid #ddd ;
      border-bottom: 1px solid #ddd ;
      padding:0 15/@base;
      span{
        font-size: 16/@base;
        font-weight: bold;
      }
      .more{
        color:#656565;
        float:right;
        span{
          font-size: 12/@base;
          font-weight: normal;
        }
        i.iconfont{
          color:#656565;
          font-size: 12/@base;
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
              background-image: url('../assets/img/tipbag.png');
              width:70/@base;
              height:30/@base;
              line-height:24/@base;
              text-align: center;
              background-size: 100% 100%;
              color:#fff;
              span{
                font-size:12/@base ;
                display: inline-block;
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
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
      bottom:0;
      .swiper-pagination-bullet{
        width:5px;
        height:5px;
      }
    }
    .cuish{
      background: #fff;
      padding-bottom:20/@base;
      margin-top:10/@base;
      .cuish-list{
        div.swiper-slide{
          width:140/@base;
          height:auto;
          margin-right:10/@base;
          overflow: visible;
          div.left-img{
            width:100%;
            height:120/@base;
            position: relative;
            overflow: visible;
            div.small-tip{
              width:59/@base;
              height:24/@base;
              background-image: url('../assets/img/tipbag.png');
              background-size: 100% 100%;
              text-align: center;
              color:#fff;
              line-height:16/@base;
              span{
                font-size:12/@base ;
                display: inline-block;
              }
              position: absolute;
              top:6/@base;
              left:-4/@base;
            }
            p.room-num{
              position: absolute;
              bottom:0;
              width:100%;
              background:rgba(0,0,0,.5);
              color:#fff;
              font-size: 12/@base;
              text-align: center;
              padding:2/@base;
            }
            img{
              width:100%;
              height:100%;
            }
          }
          div.center-content{
            padding:10/@base 7/@base 0 7/@base;
            border-bottom:1px solid #ececec;
            border-left:1px solid #ececec;
            border-right:1px solid #ececec;
            div.right-cash{
              span.creat-time{
                font-size: 12/@base;
                color:#9b9b9b;
              }
              div.money{
                color:#f14114;
                font-size:12/@base;
                span{
                  font-size: 18/@base;
                }
              }
            }
          }
        }
      }
    }
    .news>ul.news-text{
      box-flex:1;
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      height:60/@base;
      margin-top:10/@base;
      li:nth-child(1){
        margin-bottom:6/@base;
      }
      li{
        list-style: inside;
        font-size: 14/@base;
        color: #4A4A4A;
        letter-spacing: -0.36px;
      }
    }
    .buy-house{
      background: #fff;
      margin-top:10/@base;
      .raiders{
        width:100%;
        background: #fff;
        overflow:hidden;
        padding:24/@base 31/@base 24/@base 0;
      li{
        float:left;
        text-align: center;
        width:25%;
      i{
        font-size: 30/@base;
        color:#4F9DEB;
      }
      p{
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: -0.35px;
      }
      }
      }


    }
    div.top{
    width:100%;
    padding:12/@base 10/@base;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: -0.35px;
    border-bottom:2px solid #f1f1f1;
  i{
    font-size: 20/@base;
    margin-right:8/@base;
    color:#4F9DEB;
  }
  }
    .news>i.news-icon{
      width:34/@base;
      height:39/@base;
      margin-right:13/@base;
      font-size: 46/@base;
      color:blue;
    }
    .news{
      width:100%;
      background: #fff;
      display:box;
      display:-webkit-box;
      display:-moz-box;
      padding:14/@base;
    }
    div.banner3{
      display:box;
      display:-webkit-box;
      display:-moz-box;
      div.small-right{
        box-flex:1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        width:100%;
        height:70/@base;
        border-left:2px solid #f5f5f5;
        div:first-child{
          border-bottom:2px solid #f5f5f5;
        }
        img{
          width:100%;
          vertical-align: bottom;
          height:100%;
        }
      }
      div.big-left{
        width:156/@base;
        height:150/@base;
        img{
          width:100%;
          height:100%;
        }
      }
    }
  }
    .top-container{
      position:relative;
      .search-box{
        background-color: #FC5F53;
        position: fixed;
        z-index: 99;
        width: 100%;
        top:0;
        padding:5/@base 0 7/@base 0;
        div{
          display:block;
          vertical-align: middle;
        }
        div.map{
          width:93/@base;
          color:#fff;
          font-size: 14/@base;
          text-align: center;
          i.icon{
            color:#fff;
            position: relative;
            top:2/@base;
            font-size: 19/@base;
          }
        }
        div.input{
          width:180/@base;
          border-radius: 2/@base;
          height:32/@base;
          line-height:32/@base;
          background: rgba(255,255,255,0.60);
          color:#656565;
          text-align: center;
          i.icon{
            color:#4a4a4a;
            font-size: 19/@base;
            margin-right:4/@base;
            vertical-align: middle;
          }
        }
        div.city{
          width:93/@base;
          color:#fff;
          font-size: 16/@base;
          padding-left:8/@base;
          i.icon{
            color:#fff;
            font-size: 17/@base;
            position: relative;
            top:2/@base;
          }
        }
      }
      .search-box2{
        height:115/@base;
        position: relative;
        width: 100%;
        top:0;
        padding:14/@base 0 0 0;
        background: url('../assets/img/top-bg.png');
        background-size: 100% 100%;
        div{
          display:block;
          vertical-align: middle;
        }
        div.map{
          width:93/@base;
          color:#fff;
          font-size: 14/@base;
          text-align: center;
          i.icon{
            color:#fff;
            position: relative;
            top:2/@base;
            font-size: 19/@base;
          }
        }
        div.input{
          width:345/@base;
          margin:27/@base 15/@base 0;
          border-radius: 2/@base;
          height:32/@base;
          line-height:32/@base;
          background: rgba(255,255,255,0.60);
          color:#656565;
          text-align: center;
          i.icon{
            color:#4a4a4a;
            font-size: 19/@base;
            margin-right:4/@base;
            vertical-align: middle;
          }
        }
        div.city{
          width:93/@base;
          color:#fff;
          font-size: 16/@base;
          padding-left:8/@base;
          i.icon{
            color:#fff;
            font-size: 17/@base;
            position: relative;
            top:2/@base;
          }
        }
      }
      .nav-container-bg{
        background: #fff;
        border-bottom: 1px solid #dddddd;
        .notice-container{
          border-top:1px solid #dddddd;
          margin:0 15/@base;
          height:50/@base;
          img{
            width:57/@base;
            margin:10/@base 0;
            vertical-align: middle;
          }
          span{
            letter-spacing: -0.35px;
            line-height: 22px;
            font-size: 14/@base;
            font-weight: bold;
          }
        }
      }
      .nav-container{
        width:100%;
        background: #fff;
        /*padding:14/@base 0;*/
        overflow:hidden;
        padding-bottom: 10/@base;
        li{
          float:left;
          width:25%;
          height:80/@base;
          padding-top:13/@base;
          text-align:center;
          i{
            font-size: 34/@base;
          }
          i.icon-icon-ershoufang{
            color:#FF724E  ;
          }
          i.icon-icon-zufang{
            color:#FFA30D  ;
          }
          i.icon-icon-xuequzhaofang{
            color:#13B76E  ;
          }
          i.icon-icon-zixun{
            color:#01A3B3;
          }
          i.icon-icon-maifang{
            color:#4590DA  ;
          }
          i.icon-icon-zhaojingjiren{
            color:#FF6CA8  ;
          }
          i.icon-icon-goufangbaike{
            color:#FF7056  ;
          }
          i.icon-icon-loushizoushi{
            color:#C79755;
          }
          p{
            font-size: 12/@base;
            color: #717171;
          }
        }
      }

      /*.search-location{
        display:box;
        display:-webkit-box;
        display:-moz-box;
        margin: 0 auto;
        background: rgba(255,255,255,.9);
        border-radius: 167.5/@base;
        width:335/@base;
        z-index: 999;
        padding:5/@base;
        left:40/@base;
      }
      .search-location>div.left-location{
        margin-left:20/@base;
      }
      .search-location>div.right-location{
        box-flex:1;
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
        span{
          position: relative;
          font-size: 14/@base;
          left:15/@base;
          color:#656565;
          top:2/@base;
        }
        i{
          position: relative;
          left:10/@base;
          top:1/@base;
          font-size: 12/@base;

        }
      }*/
      .swiper-pagination-bullet{
        background:#fff!important;
        opacity:1;
      }
      .swiper-pagination-bullet-active{
    width:20/@base;
    border-radius:10/@base;
    background:#fff;
  }
      .swiper-slide{
        height:220/@base;
        img{
          height:100%;
          vertical-align: bottom;
        }
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  import { Swipe, SwipeItem } from 'mint-ui';
  import vueSlider from 'vue-slider-component';
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {rxUtils} from '../assets/js/rxUtils'
  import Vuex from 'vuex';
  Vue.use(Vuex);
  const  vuex_store = new Vuex.Store({
    state:{
      user_name:"123"
    },
    mutations:{
      showUserName(state){
        alert(state.user_name);
      }
    }
  })
  export default{
    data(){
        return {
          country:null,
          menu:[],
          menuIcon:{'secondHouse':'icon-icon-ershoufang','rentHouse':'icon-icon-zufang','schoolHouse':'icon-icon-xuequzhaofang','consult':'icon-icon-zixun','saleHouse':'icon-icon-maifang','findAgent':'icon-icon-zhaojingjiren','knowledge':'icon-icon-goufangbaike','trend':'icon-icon-loushizoushi'},
          menuText:{'secondHouse':'二手房','rentHouse':'租房','schoolHouse':'学区找房','consult':'资讯','saleHouse':'卖房','findAgent':'找经纪人','knowledge':'购房百科','trend':'楼市走势'},
          inData:{
            chineselng:'',
            priceFilter:'',//价格  格式“0-500000,800000-1000000,2000000-0”
            roomAreaFilter:'',//房屋面积 格式：“0-500,800-1000,2000-0”
            landAreaFilter:'',//土地面积 格式：“0-1000,1000-2000,2000-0”
            code:'',
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
          chineselng:'',
          dialogCity:false,
          tempData:{
            sortField:null,
            direction:null,
            dateType:null,
            buildingType:null,
            city:null,
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
          sorts:[
            {text:'价格由高到低',id:1,uid:'1',sortField:1,direction:'DESC'},
            {text:'价格由低到高',id:2,uid:'2',sortField:1,direction:'ASC'},
            {text:'房屋面积由大到小',id:3,uid:'3',sortField:2,direction:'DESC'},
            {text:'房屋面积由小到大',id:4,uid:'4',sortField:2,direction:'ASC'},
          ],
          scroll:0,
          activeIndex: 0,
          duolunduoImg:require('../assets/img/duolunduos.png'),
          wengehuaImg:require('../assets/img/wengehuas.png'),
          duolunduoBig:require('../assets/img/duolunduoBig.png'),
          jiujinshanBig:require('../assets/img/jiujinshanBig.png'),
          luoshanjiBig:require('../assets/img/luoshanjiBig.png'),
          moerbenBig:require('../assets/img/moerbenBig.png'),
          niuyueBig:require('../assets/img/niuyueBig.png'),
          wengehuaBig:require('../assets/img/wengehuaBig.png'),
          xiniBig:require('../assets/img/xiniBig.png'),
          xiyatuBig:require('../assets/img/xiyatuBig.png'),
          cityChoice:false,
          centerBanner:[],
          toastMsg:'',
          toast:false,
          choiceTime:[
            {text:'不限',id:1,type:true},
            {text:'最近一周',id:2,type:false},
            {text:'一个月内',id:3,type:false},
            {text:'2个月内',id:4,type:false}
          ],
          choiceType:[
            {text:'不限',id:1,type:true,uid:''},
            {text:'独立屋',id:2,type:false,uid:'0'},
            {text:'排屋',id:3,type:false,uid:'1'},
            {text:'公寓',id:4,type:false,uid:'2'}
          ],
          choiceRoom:[
            {text:'全部',id:0,type:true,uid:''},
            {text:'1',id:1,type:false,uid:'1'},
            {text:'2',id:2,type:false,uid:'2'},
            {text:'3',id:3,type:false,uid:'3'},
            {text:'4',id:4,type:false,uid:'4'},
            {text:'5+',id:5,type:false,uid:'5'},
          ],
          choiceTimeText:'',
          choiceTypeText:'',
          choiceRoomText:'',
          sliderOption:{
            measureNum:[0,5000],
            width: "auto",// 组件宽度
            height: 10,// 组件高度
            direction: "horizontal",// 组件方向
            dotSize: 30,// 滑块大小
            eventType: "auto",// 事件类型
            min: 0,// 最小值
            max: 5000,// 最大值
            interval: 100,// 分段间隔
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
            height: 10,// 组件高度
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
              "border":"1px solid #f6a623"
            },// 滑块样式
            tooltipStyle: null,// 工具提示样式
            processStyle: {
              "backgroundColor":"#f6a623"
            },// 进度条样式
            piecewiseStyle: null,// 分割点的样式
          },
          banners:[
            {img:require('../assets/img/bannerbig.png'),id:1},
            {img:require('../assets/img/bannerbig.png'),id:2},
            {img:require('../assets/img/bannerbig.png'),id:3},
            {img:require('../assets/img/bannerbig.png'),id:4},
          ],
          navs:[
            {name:'独立屋',img:require('../assets/img/nav_Detache.png'),id:'0'},
            {name:'排屋',img:require('../assets/img/nav_townhouse.png'),id:'1'},
            {name:'公寓',img:require('../assets/img/nav_apartment.png'),id:'2'},
            {name:'地图找房',img:require('../assets/img/nav_location.png'),id:'3'},
            {name:'学区找房',img:require('../assets/img/nav_class.png'),id:'4'},
            {name:'资讯',img:require('../assets/img/nav_message.png'),id:'5'}
          ],
          news:[
            {text:'热点楼市定调 库存少成调控压力',id:1001},
            {text:'一个房产中介的2016：赚了500万',id:1002},
          ],
          banners2:[
            {img:require('../assets/img/1122.png'),id:1,text:'湖畔美景酒店式公寓前所未有的八大卖点'},
            {img:require('../assets/img/1122.png'),id:2,text:'湖畔美景酒店式公寓前所未有的八大卖点'},
            {img:require('../assets/img/1122.png'),id:3,text:'湖畔美景酒店式公寓前所未有的八大卖点'},
            {img:require('../assets/img/1122.png'),id:4,text:'湖畔美景酒店式公寓前所未有的八大卖点'},
          ],
          banners3:[
          ],
          rightPopup: false,
          activeTab:'mls',
          citys:[
            {name:'温哥华市',id:1001},
            {name:'安默尔',id:1002},
            {name:'三角洲',id:1003},
            {name:'蓝里市',id:1004},
            {name:'高贵林',id:1005},
            {name:'贝卡拉',id:1006},
            {name:'宝云岛',id:1007},
            {name:'本那比',id:1008},
          ],
          cityName:'温哥华',
          historyCitys:[
            {text:'BeverLy Hills'},
            {text:'Los Angeles'},
            {text:'Castleton Street'},
          ],
          data:{},
          housePhoto:'',
          dialog:false,
          mlsNum:'',
          cityData:[
          ],
          houseUrl:'',
          cityCode:'',
          region:'YVR',
          code:'ca0201',
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
          locationCity:'无法获取定位信息',
          imgUrl:'',
          hostPhoto:'',//头像
          hostRentHouse:'',//租房
          hostSchool:'',//学校
          hostHouse:'',//房子
          hostAsk:'',//问答
          bannerImg:'',//轮播
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
          return {
            // 所有配置均为可选（同Swiper配置）
            autoplay: false,
            direction : 'horizontal',
            grabCursor : true,
            setWrapperSize :true,
            autoHeight: true,
            loop:false,
            speed:500,
            autoplayDisableOnInteraction:false,
            paginationClickable :true,
            mousewheelControl : false,
            observeParents:true,
            debugger: false,
            slidesPerView: 'auto',
            onTransitionStart(swiper){
            },
          }
        }

      },
      swiperOption1:{
        type:Object,
        default: function () {
          return {
            // 所有配置均为可选（同Swiper配置）
            autoplay: false,
            direction : 'horizontal',
            grabCursor : true,
            setWrapperSize :true,
            autoHeight: true,
            loop:false,
            speed:500,
            autoplayDisableOnInteraction:false,
            paginationClickable :true,
            mousewheelControl : false,
            observeParents:true,
            debugger: false,
            slidesPerView: 'auto',
            onTransitionStart(swiper){
            },
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
    },//轮播组件传参
    store:vuex_store, //注入到vue
    mounted() {
        console.log(this.$store.state.user_name);
      this.$nextTick(function () {
        let self=this;
        scroll(0,0);
        // 监听这个dom的scroll事件
        window.addEventListener('scroll', () => {
          self.scroll=document.body.scrollTop;
        })
        document.title=this.$route.name;
        self.country=sessionStorage.getItem('country');
        self.region=sessionStorage.getItem('region');
        self.code=sessionStorage.getItem('code');
        /*
        * ca0101  多伦多地区
         ca0201  温哥华
        * */
        self.$http.get('/region/listCity.json?code='+sessionStorage.getItem('code'), {}, {emulateJSON: true})
          .then(function (response) {
              self.cityData=response.data.data;
          }).then(function (error) {
        });
      })
    },
    methods:{
      back(){
        this.$router.back()
      },
      //展示筛选页
      showHouse(){
        this.dialog=true;
      },
      //选择城市
      choiceCity(text,englishlng){
        this.inData.chineselng=text;
        this.tempData.city=englishlng;
        this.openScreenDialog();
      },
      //展示筛选页面
      openScreenDialog(){
        this.dialog=true;
        this.dialogCity=false;
      },
      //选择价格（多选）
      choiceMoney(obj){
        obj.active=!obj.active;
      },
      //选择上市时间--单选
      choiceDate(index){
        this.tempData.dateType=this.tempData.dateType==index?'':index;
      },
      //选择房屋类型--单选
      choiceRoomType(index){
        this.tempData.buildingType=this.tempData.buildingType==index?null:index;
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
        if(type==''||!type){
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
      //根据价格查询
      moneyAdd(){
        let self=this;
        console.log("点击价格查询");
        self.choiceBtn2='';
        self.inData.priceFilter='';
        for(var key in self.moneyList){
          if(self.moneyList[key].active){
            self.choiceBtn2+=self.moneyList[key].text+',';
            self.inData.priceFilter+=self.moneyList[key].data+',';
          }
        }
        self.choiceBtn2 = self.choiceBtn2.substring(0,self.choiceBtn2.length-1);
        self.inData.priceFilter = self.inData.priceFilter.substring(0,self.inData.priceFilter.length-1);
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true}).then(function (response) {
          this.open1 =false;
          this.$refs.button1.$el.style.color='#565656';
          if(response.body.data!==null){
            self.data=response.body.data;
          }else{self.data=null;}
        }).then(function (error) {
        })
      },
      //根据房屋面积查询
      roomAreaAdd(){
        let self=this;
        console.log("点击价格查询");
        self.choiceBtn='';
        self.inData.roomAreaFilter='';
        for(var key in self.roomAreaList){
          if(self.roomAreaList[key].active){
            self.choiceBtn+=self.roomAreaList[key].text+',';
            self.inData.roomAreaFilter+=self.roomAreaList[key].data+',';
          }
        }
        self.choiceBtn = self.choiceBtn.substring(0,self.choiceBtn.length-1);
        self.inData.roomAreaFilter = self.inData.roomAreaFilter.substring(0,self.inData.roomAreaFilter.length-1);
        console.log(self.choiceBtn);
        console.log(self.inData.roomAreaFilter);
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true}).then(function (response) {
          this.open =false;
          this.$refs.button.$el.style.color='#565656';
          if(response.body.data!==null){
            self.data=response.body.data;
          }else{self.data=null;}
        }).then(function (error) {
        })
      },
      //根据MLS进行查询
      searchByMls(){
        let self=this;
        self.$http.get('/residence/getByMls.json?mls='+self.mlsNum+"&region="+sessionStorage.getItem("code"), {}, {emulateJSON: true}).then(function (response) {
          this.dialog =false;
          if(response.body.data!==null){
            this.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:response.body.data.id},query:{region:sessionStorage.getItem('code')}})
          }else{
            self.showToast('没有该MLS编号的房源');
          }
        }).then(function (error) {})
      },
      //点击筛选页确定按钮进行查询
      search(){
        let self=this;
        if(self.mlsNum){
          _czc.push(['_trackEvent', '首页', 'HouseFilter','筛选确定mslno='+self.mlsNum]);
          self.searchByMls();
          return;
        }
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
        //排序字段
        //self.inData.sortField=self.tempData.sortField;
        //self.inData.direction=self.tempData.direction;
        self.inData.landAreaFilter = self.inData.landAreaFilter.substring(0,self.inData.landAreaFilter.length-1);
        console.log("土地面积："+self.inData.landAreaFilter);
        //区域 城市
        self.inData.region=self.region;
        self.inData.code=self.code;
        self.inData.city=self.tempData.city;

        console.log('筛选确定'+self.inData);
        //猜你喜欢 记录参数
        var authentication=rxUtils.sessionStorage.getItem('authentication');
        if(authentication){
          var guessData=self.inData;
          guessData.authentication=authentication;
          delete guessData.pageSize;
          delete guessData.currentPage;
          console.log(guessData);
          self.$http.post('/statistics/addResidence.json', guessData, {emulateJSON: true}).then(function (response) {
              console.log('记录猜你喜欢条件成功');
          })
        }
        _czc.push(['_trackEvent', '首页', 'HouseFilter','筛选确定'+JSON.stringify(self.inData)]);
        self.$router.push({name:'找房列表',query:self.inData});

        /*//查询接口

        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true}).then(function (response) {
          this.open3 =false;
          if(response.body.data!==null){
            self.data=response.body.data;
          }else{
            self.data=null;

          }
        }).then(function (error) {
        })*/
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
      closeChoice(){
        this.cityChoice = false
      },
      //动态菜单路由
      menuRouter(type){
          if(type=='secondHouse'){
            this.$router.push({name:'找房列表',query:{
              region:this.region,
              city:this.routerData.city,
              code:this.code
            }})
          }else if(type=='rentHouse'){

          }else if(type=='schoolHouse'){
            this.$router.push({name:'学区房',query:{
              region:this.region,
              city:this.routerData.city,
              code:this.code
            }})
          }else if(type=='consult'){
            this.$router.push({name:'资讯',query:{
              region:this.region,
              city:this.routerData.city,
              code:this.code
            }})
          }else if(type=='saleHouse'){

          }else if(type=='findAgent'){

          }else if(type=='knowledge'){
            this.$router.push({name:'百科',query:{
              region:this.region,
              city:this.routerData.city,
              code:this.code
            }})
          }else if(type=='trend'){

          }
      },
      routerNav(name){
          this.$router.push({name:name,query:{region:this.region,code:this.code}});
      },
      routerAskDetail(id){
          this.$router.push({name:'问答详情',params:{id:id}})
      },
      routerList(type){
        this.$router.push({name:'精选',query:{
          type:type,
        }})
      },
      routerList1(type){
        this.$router.push({name:'找房列表',query:{
          region:this.region,
          city:this.routerData.city,
          code:this.code
        }})
      },
      routerShool(){
        this.$router.push({name:'学区房',query:{
          region:this.region,
          city:this.routerData.city,
          code:this.code
        }})
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      routerInfoDetail(){
          this.$router.push({name:'资讯详情',params:{id:12312}})
      },
      openBig(){
        this.dialog = true;
        this.dialogCity=false;
      },
      openCity(){
        this.dialog = false;
        this.dialogCity=true;
      },
      closeDiage () {
        this.dialog = false;
        this.dialogCity=false;
      },
      routerDetail(id){
        this.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:id},query:{region:sessionStorage.getItem('code')}})
      },
      routerLink(id,num){
          if(id!=='地图找房'&&id!=='学区找房'&&id!=='资讯'){
            this.$router.push({name:'找房列表',params:{id:id,num:num}})
          }else if(id=='学区找房'){
              this.$router.push({name:'学区房'})
          }else if(id=='资讯'){
            this.$router.push({name:'资讯'})
          }else if(id=='地图找房'){
              this.$router.push({name:'地图找房',params:{id:id}})
          }
      },
      //导航跳转
//      scroll () {
//          if (document.getElementsByTagName('body')[0].scrollTop <= 300) {
//            document.getElementsByClassName('search-box')[0].style.background = 'rgba(246,246,246,' + document.getElementsByTagName('body')[0].scrollTop / 100 + ')';
//            if(document.getElementsByTagName('body')[0].scrollTop>=130){
//              document.getElementsByClassName('search-box')[0].style.top=0;
//            }else{
//              document.getElementsByClassName('search-box')[0].style.top='.724rem'
//            }
//          } else {
//            document.getElementsByClassName('search-box')[0].style.background = 'rgba(246,246,246,' + 1 + ')';
//          }
//      },//监听滚动条改变搜索框背景
//      emptySearch(){
//          this.historyCitys.splice(0,this.historyCitys.length)
//      },//清空历史搜索数据
      cityNameChange(name){
          let self=this;
          this.cityName=name;
          this.rightPopup=false;
          this.cityChoice=false;
          if(name=='多伦多'){
            this.region='YTO';
            this.code='ca0101'
            localStorage.setItem('location','多伦多')
          }else {
            this.region='YVR';
            this.code='ca0201'
            localStorage.setItem('location','温哥华')
          }
        self.$http.get('/residence/listRecommend.json?pageSize=10&currentPage=1&region='+self.region, {}, {emulateJSON: true})
          .then(function (response) {
            this.data=response.body.data;
          }).then(function (error) {
        })//推荐房源
      },//改变搜索框城市
      cityNameChange1(name){
        let self=this;
        this.cityName=name;
        this.cityChoice=false;
        if(name=='多伦多'){
          this.region='YTO';
          this.code='ca0101'
          localStorage.setItem('location','多伦多')
        }else {
          this.region='YVR';
          this.code='ca0201'
          localStorage.setItem('location','温哥华')
        }
        sessionStorage.setItem('region',self.region)
        sessionStorage.setItem('code',self.code)
        self.$http.get('/residence/listRecommend.json?pageSize=10&currentPage=1&region='+self.region, {}, {emulateJSON: true})
          .then(function (response) {
            this.data=response.body.data;
          }).then(function (error) {
        })//推荐房源
      },//改变搜索框城市
      open (type) {
        this.activeTab=type;
        this.rightPopup = true
      },//打开弹窗
      close () {
        this.rightPopup  = false
      },//关闭弹窗
      closeQuery(){
        this.rightPopup  = false
      },//关闭弹窗并传值
      locationChange (val) {
        this.activeTab = val
      },//根据不同的值来显示不同的tab内容区域
      addMore(id,e,type,uid){
        let self=this;
        let date=new Date();
        let newSecond=date.getTime();
        let year=date.getFullYear();
        let mouth=date.getMonth()+1;
        let data=date.getDate();
        let el=document.getElementsByClassName(type)[0].getElementsByTagName('span');
        if(type=='choiceTime'){
            if(id==1){
                this.routerData.startDate='';
                this.routerData.endDate='';
            }else if(id==2){
              let oldSecond=60*60*24*7*1000;
              let timer=new Date(newSecond-oldSecond);
              let newyear=timer.getFullYear();
              let newmouth=timer.getMonth()+1;
              let newdata=timer.getDate();
              this.routerData.starDate=newyear+'-'+newmouth+'-'+newdata;
              this.routerData.endDate=year+'-'+mouth+'-'+data;
            }else if(id==3){
              let oldSecond=60*60*24*28*1000;
              let timer=new Date(newSecond-oldSecond);
              let newyear=timer.getFullYear();
              let newmouth=timer.getMonth()+1;
              let newdata=timer.getDate();
              this.routerData.starDate=newyear+'-'+newmouth+'-'+newdata;
              this.routerData.endDate=year+'-'+mouth+'-'+data;
            }else {
              let oldSecond=60*60*24*59*1000;
              let timer=new Date(newSecond-oldSecond);
              let newyear=timer.getFullYear();
              let newmouth=timer.getMonth()+1;
              let newdata=timer.getDate();
              this.routerData.starDate=newyear+'-'+newmouth+'-'+newdata;
              this.routerData.endDate=year+'-'+mouth+'-'+data;
            }
          for(let i=0;i<el.length;i++){
            el[i].className='';
          }
          e.target.className='active';
        }else if(type=='choiceType') {
          if(id==1){
            for(let i=0;i<el.length;i++){
              el[i].className='';
            }
            e.target.className='active';
            this.routerData.buildingType='';
            self.temArr.splice(0,self.temArr.length)
          }else {
            el[0].className='';
            if(e.target.className==''){
              e.target.className='active';
              if(id==2){
                self.temArr.push('0')
              }else if(id==3){
                self.temArr.push('1')
              }else{
                self.temArr.push('2')
              }
            }else{
              if(self.temArr.length>1){
                e.target.className='';
                console.log(self.temArr.indexOf(uid))
                if(self.temArr.indexOf(uid)>-1){
                  self.temArr.splice(self.temArr.indexOf(uid),1)
                }
              }
            }
            console.log(self.temArr)
            this.routerData.buildingType=self.temArr.join(',');
          }
        }else if(type=='choiceRoom') {
            if(id==0){
              for(let i=0;i<el.length;i++){
                el[i].className='';
              }
              e.target.className='active';
              this.routerData.beds='';
              self.temArr1.splice(0,self.temArr1.length)
            }else {
              el[0].className='';
              if(e.target.className==''){
                e.target.className='active';
                if(id==1){
                  this.temArr1.push('1');
//                this.routerData.beds=1;
                }else if(id==2){
                  this.temArr1.push('2');
//                this.routerData.beds=2;
                }else if(id==3){
                  this.temArr1.push('3');
//                this.routerData.beds=3;
                }else if(id==4){
                  this.temArr1.push('4');
//                this.routerData.beds=4;
                }else if(id==5){
                  this.temArr1.push('5');
//                this.routerData.beds=5;
                }
              }else{
                if(self.temArr1.length>1){
                  e.target.className='';
                  if(self.temArr1.indexOf(uid)>-1){
                    self.temArr1.splice(self.temArr1.indexOf(uid),1)
                  }
                }
              }
              this.routerData.beds=self.temArr1.join(',');
              console.log(this.routerData.beds)
            }
        }
      },
      cityNameChange(name){
          let self=this;
        this.cityName=name;
        if(name=='多伦多'){
          this.code='ca0101';
          this.region='YTO'
          localStorage.setItem('location','多伦多')
        }else {
          this.code='ca0201';
          this.region='YVR'
          localStorage.setItem('location','温哥华')
        }
        self.$http.get('/region/listCity.json?code='+self.code, {}, {emulateJSON: true})
          .then(function (response) {
            self.cityData=response.body.data;
          }).then(function (error) {
        })
        self.$http.get('/residence/listRecommend.json?pageSize=10&currentPage=1&region='+self.region, {}, {emulateJSON: true})
          .then(function (response) {
            this.data=response.body.data;
          }).then(function (error) {
        })//推荐房源
        this.rightPopup  = false;
      },
      subMore(){
        let self=this;
        if(this.mlsNum!==''){
          self.$http.get('/residence/getDetail.json?mls='+this.mlsNum, {}, {emulateJSON: true})
            .then(function (response) {
              if(response.body.data!==null){
                    self.$router.push({name:'房源详情',params:{id:self.mlsNum}})
              }else{
                this.toastMsg='没有该MLS编号的房源';
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
              }
            }).then(function (error) {
          })
        }else{
          this.routerData.minArea=this.sliderOption.measureNum[0];
          if(this.sliderOption.measureNum[1]==5000){
            this.routerData.maxArea='';
          }else{
            this.routerData.maxArea=this.sliderOption.measureNum[1];
          }
          this.routerData.minPrice=this.sliderOption1.measureNum[0];
          if(this.sliderOption1.measureNum[1]==1000){
            this.routerData.maxPrice=''
          }else{
            this.routerData.maxPrice=this.sliderOption1.measureNum[1]*1000;
          }
          this.$router.push({name:'找房列表',query:{
              starDate:this.routerData.starDate,
              endDate:this.routerData.endDate,
              buildingType:this.routerData.buildingType,
              beds:this.routerData.beds,
              minArea:this.routerData.minArea,
              maxArea:this.routerData.maxArea,
              minPrice:this.routerData.minPrice*10000,
              maxPrice:this.routerData.maxPrice,
              region:this.region,
              city:this.routerData.city,
              code:this.code,
              direction:'',
              sortField:'',
              baths:'',
              minLandArea:'',
              maxLandArea:''
            }})
        }
      },
      resetMore(){
        this.sliderOption.measureNum=[0,5000]
        this.sliderOption1.measureNum=[0,1000]
        this.routerData.starDate='',
        this.routerData.endDate='',
        this.routerData.buildingType='',
        this.routerData.beds='',
        this.routerData.minArea='',
        this.routerData.maxArea='',
        this.routerData.minPrice='',
        this.routerData.maxPrice='',
        this.region='',
        this.routerData.city='',
        this.code='',
        this.city='请选择'
        let el=document.getElementsByClassName('choiceRoom')[0].getElementsByTagName('span');
        let el1=document.getElementsByClassName('choiceType')[0].getElementsByTagName('span');
        let el2=document.getElementsByClassName('choiceTime')[0].getElementsByTagName('span');
        for(let i=0;i<el.length;i++){
            el[i].className='';
        }
        el[0].className='active';
        for(let i=0;i<el1.length;i++){
          el1[i].className='';
        }
        el1[0].className='active';
        for(let i=0;i<el2.length;i++){
          el2[i].className='';
        }
        el2[0].className='active';
        this.temArr1.splice(0,this.temArr1.length)
        this.temArr.splice(0,this.temArr.length)
      },
      hideMore(){
        this.sliderOption.measureNum=[0,5000]
        this.sliderOption1.measureNum=[0,1000]
        this.routerData.starDate='',
          this.routerData.endDate='',
          this.routerData.buildingType='',
          this.routerData.beds='',
          this.routerData.minArea='',
          this.routerData.maxArea='',
          this.routerData.minPrice='',
          this.routerData.maxPrice='',
          this.region='',
          this.routerData.city='',
          this.code='',
          this.city='请选择'
        let el=document.getElementsByClassName('choiceRoom')[0].getElementsByTagName('span');
        let el1=document.getElementsByClassName('choiceType')[0].getElementsByTagName('span');
        let el2=document.getElementsByClassName('choiceTime')[0].getElementsByTagName('span');
        for(let i=0;i<el.length;i++){
          el[i].className='';
        }
        el[0].className='active';
        for(let i=0;i<el1.length;i++){
          el1[i].className='';
        }
        el1[0].className='active';
        for(let i=0;i<el2.length;i++){
          el2[i].className='';
        }
        el2[0].className='active';
        this.temArr1.splice(0,this.temArr1.length)
        this.temArr.splice(0,this.temArr.length)
        this.dialog=false;
      },
      location(){
        let self=this;
        function getLocation(){
          if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition);
          }else{
            alert("Geolocation is not supported by this browser.")
          }
        }
        function showPosition(position){
            let location= {
              lat:position.coords.latitude,
              lon:position.coords.longitude
            }
          self.$http.get('http://maps.google.cn/maps/api/geocode/json?latlng='+location.lat+','+location.lon+"&language=CN", {}, {emulateJSON: true})
            .then(function (response) {
                self.locationCity=response.body.results[0].address_components[2].long_name;
            }).then(function (error) {
          })
        }
        getLocation();
      },
      routerMap(){
        this.$router.push({name:'地图找房',query:{
          region:this.region,
          city:this.routerData.city,
          code:this.code
        }})
      }
    },
    watch: {
      topPopup (val) {
        if (val) {
          setTimeout(() => {
            this.topPopup = false
          }, 2000)
        }
      },
      sliderOption:{
        deep:true,//还可以加一个deep，表示跟踪所有对象下的属性。
        handler:function(oldNum,newNum){
          if(this.sliderOption.measureNum[1]>1000&&this.sliderOption.measureNum[1]<3000){
            this.sliderOption.interval=200;
          }else if(this.sliderOption.measureNum[1]>3000){
            this.sliderOption.interval=500;
          }else if(this.sliderOption.measureNum[1]<1000){
            this.sliderOption.interval=100;
          }
        }
      },
      sliderOption1:{
        deep:true,//还可以加一个deep，表示跟踪所有对象下的属性。
        handler:function(oldNum,newNum){
          if(this.sliderOption1.measureNum[1]>200&&this.sliderOption1.measureNum[1]<500){
            this.sliderOption1.interval=20;
          }else if(this.sliderOption1.measureNum[1]>500){
            this.sliderOption1.interval=50;
          }else if(this.sliderOption1.measureNum[1]<200){
            this.sliderOption1.interval=5;
          }
        }
      }
    },
    components: {
      swiper,
      swiperSlide,
      vueSlider
    }
  }
</script>
   
