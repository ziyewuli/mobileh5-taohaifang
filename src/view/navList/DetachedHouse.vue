<template>
  <div class="detached">
    <div  style="z-index: 899999999999" class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>二手房</span></div>
      <div class="right">
        <img src="../../assets/img/toMap.png" @click="routerMap()" />
      </div>
    </div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    <div class="choice">
      <mu-raised-button  ref="button" @click="toggle()" :label="inData.chineselng||'城市选择'" icon=" " :iconClass="[{'icon-icon_esf_xiala_':open,'icon-icon_esf_xiala':!open},'icon iconfont']" labelPosition="before" secondary/>
      <mu-raised-button  ref="button2" @click="toggle2" :label="choiceBtn1||'房屋类型'" icon=" " :iconClass="[{'icon-icon_esf_xiala_':open2,'icon-icon_esf_xiala':!open2},'icon iconfont']" labelPosition="before" secondary/>
      <mu-raised-button  ref="button1" @click="toggle1" :label="choiceBtn2||'价格选择'" icon=" " :iconClass="[{'icon-icon_esf_xiala_':open1,'icon-icon_esf_xiala':!open1},'icon iconfont']" labelPosition="before" secondary/>
      <mu-raised-button  ref="button3" @click="toggle3" :label="'更多'" icon=" " iconClass="icon iconfont icon-icon_gengduo" labelPosition="before" secondary/>
      <!--<mu-raised-button  ref="button" @click="toggle()" :label="chineselng||'城市选择'" labelPosition="before" secondary/>
      <mu-raised-button  ref="button2" @click="toggle2" :label="houseType|| '房屋类型'" labelPosition="before" secondary/>
      <mu-raised-button  ref="button1" @click="toggle1" label="价格选择" labelPosition="before" secondary/>
      <mu-raised-button  ref="button3" @click="toggle3" label="更多" labelPosition="before" icon=" " iconClass="icon iconfont icon-icon_gengduo" secondary/>
  -->  </div>
    <div class="">
      <mt-loadmore v-if="data!==null" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="house-list" >
          <li v-for="list in data" @click="routerDetail(list.id)">
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
          </li>
        </ul>
      </mt-loadmore>
      <div v-else class="no-more" >
        <img src="../../assets/img/noData.png"/>
        <p>暂无数据</p>
        <p>更换条件试试</p>
      </div>
    </div>
    <mu-popover popoverClass="choiceActive schoolType city-box"  overlayOpacity="0.5" overlay="true" :trigger="trigger" :open="open" @close="handleClose">
      <i class="icon iconfont icon-icon_shouye_youjiantou"></i>
      <ul class="subTab">
        <li @click="regionAdd($event,null,'城市选择')"  :class="{'active':inData.city==null}">不限 <i class="icon iconfont icon-icon_duihao"></i></li>
        <li v-for="list in adds" :class="{'active':inData.city==list.englishlng}" @click="regionAdd($event,list.code,list.chineselng,list.englishlng)">{{list.chineselng}}&nbsp;&nbsp;<span class="c-9B9B9B">{{list.englishlng}}</span> <i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-popover>
    <mu-popover popoverClass="choiceActive schoolType" overlayOpacity="0.5" overlay="true" :trigger="trigger2" :open="open2" @close="handleClose2">
      <ul class="sort-list">
        <i class="icon iconfont icon-icon_shouye_youjiantou"></i>
        <li v-for="list in sortList" :class="[list.id==inData.buildingType?'active':'']" @click="sortAdd(list.id,$event,list.text)">{{list.text}}&nbsp;&nbsp;<span class="c-9B9B9B">{{list.englishlng}}</span> <i class="icon iconfont icon-icon_duihao"></i></li>
      </ul>
    </mu-popover>
    <mu-popover popoverClass="choiceActive money-box checkbox-li schoolType"  overlayOpacity="0.5" overlay="true" :trigger="trigger1" :open="open1" @close="handleClose1">
      <i class="icon iconfont icon-icon_shouye_youjiantou"></i>
      <ul class="subTab">
        <li @click="noMoneySearch()" :class="{'active':priceUnlimited}">不限<i class="icon iconfont icon-icon_duihao"></i></li>
        <li v-for="list in moneyList"  @click="choiceMoney(list)" :class="{'active':list.active}">{{list.text}}
          <div class="checkbox-bg float-r MR15">
            <img src="../../assets/img/selected.png">
          </div>
        </li>
        <li>
          <mu-raised-button @click="moneyAdd()" label="确定" backgroundColor="#F14114" class="demo-raised-button choiceButton"/>
        </li>
      </ul>
    </mu-popover>
    <mu-dialog dialogClass="screen-dialog  cityLog3" :open="open3" @close="closeDiage" scrollable>
      <div class="mu-appbar mu-paper-1">
        <div @click="open3=false" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>房源筛选</span></div>
        <div class="right"></div>
      </div>
      <!--<div class="first-row mls-row clearfix" >
        <input type="text" class="mls" placeholder="MLS编号可以准确查找房源" v-model="mlsNum">
      </div>-->
      <!--<div class="first-row clearfix" @click="openCity">
        <span> 城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市</span>
        <div class="city-btn float-r">{{chineselng||'请选择'}} <i class="icon iconfont icon-icon_xiaojiantouyou"></i></div>
      </div>-->
      <div class="screen-row">
        <div class="title">上市时间</div>
        <div class="items choiceTime clearfix">
          <div v-for="(list,index) in timeList" class="item float-l" @click="choiceDate(list.index)" :class="{'active':tempData.dateType==list.index,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>
<!--      <div class="screen-row">
        <div class="title">房屋类型</div>
        <div class="items choiceTime clearfix">
          <div v-for="(list,index) in sortList" class="item float-l" @click="choiceRoomType(list.index)" :class="{'active':tempData.buildingType==list.index,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>-->
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
      <!--<div class="screen-row">
        <div class="title">价格</div>
        <div class="items clearfix">
          <div v-for="(list,index) in moneyList" class="item float-l" @click="choiceActive(list)" :class="{'active':list.active,'last':(index+1)%4==0}" v-text="list.text" :key="list.id"></div>
        </div>
      </div>-->
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
    <!--<mu-dialog dialogClass="cityLog ershou" :open="open3" @close="closeDiage" scrollable>
      <div class="mu-appbar mu-paper-1">
        <div @click="hideMore" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>房源筛选</span></div>
        <div class="right"></div>
      </div>
      <div class="timer">
        <p>上市时间</p>
        <div class="choiceTime"><span v-for="list in choiceTime" :class="[list.uid==0?'active':'']" @click="addMore(list.id,$event,'choiceTime')" v-text="list.text" :key="list.id"></span></div>
      </div>
      <div class="timer">
        <p>卧室</p>
        <div class="choiceRoom"><span v-for="list in choiceRoom" :class="[list.uid==0?'active':'']" @click="addMore(list.id,$event,'choiceRoom',list.uid)" v-text="list.text" :key="list.id"></span></div>
      </div>
      <div class="timer">
        <p>卫生间</p>
        <div class="choiceType"><span v-for="list in choiceType" :class="[list.uid==0?'active':'']" @click="addMore(list.id,$event,'choiceType',list.uid)" v-text="list.text" :key="list.id"></span></div>
      </div>
      <div class="measure">
        <p>房屋面积(平方英尺)：</p>
        <span>{{sliderOption.measureNum[0]}}-{{sliderOption.measureNum[1]}}</span>
        <vue-slider v-bind="sliderOption" ref="slider1" v-model="sliderOption.measureNum"></vue-slider>
        <div class="text-box">
          <div>0</div>
          <div>1000</div>
          <div>3000</div>
          <div>5000</div>
        </div>
      </div>
      <div class="measure">
        <p>土地面积(平方英尺)：</p>
        <span>{{sliderOption1.measureNum[0]}}-{{sliderOption1.measureNum[1]}}</span>
        <vue-slider v-bind="sliderOption1" ref="slider2" v-model="sliderOption1.measureNum"></vue-slider>
        <div class="text-box text-box1">
          <div>0</div>
          <div>14000</div>
          <div>27000</div>
          <div>45000</div>
        </div>
      </div>
      <div class="timer">
        <p>排序：</p>
        <div class="choiceSort">
          <span v-for="list in sorts" :class="[list.uid==0?'active':'']"  :key="list.id" @click="addMore(list.id,$event,'choiceSort')" v-text="list.text"></span>
        </div>
      </div>
      <mu-raised-button @click="subMore" backgroundColor="#FB704C" class="demo-raised-button" fullWidth iconClass="icon iconfont icon-icon_shouye_fangdajing" label="确定" icon=" " primary/>
      <mu-raised-button @click="resetMore" backgroundColor="#fff" class="demo-raised-button" fullWidth label="重置" primary/>
    </mu-dialog>-->
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix.less";
  .detached .mu-appbar .right img{
    width:24/@base;
    height:24/@base;
  }
  .screen-dialog.cityLog3{
    z-index: 20141393111;
  }
  ul.house-list .bottom-content img{
    width: 52/@base;
    height: 16/@base;
    vertical-align: sub;
  }
  .mu-dialog-wrapper {
    z-index: 9999999999!important;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  div.ershou{
    width: 100% !important;
    div.mu-dialog-body{
      padding:0!important;
      button.mu-raised-button:last-child{
        color:#4a4a4a;
      }
      button.mu-raised-button{
        bottom:0;
        width:50%;
        color:#fff;
      }
      div.timer:nth-child(7){
        margin-bottom:50/@base;
      }
    }
  }
  .cityLog{
    width: 100% !important;
    height:100%;
    div.mu-dialog-body{
      background: #f5f5f5;
      max-height:100%!important;
      button.mu-raised-button{
        position: fixed;
        height:50/@base;
        width:50%;
        right:0;
        z-index: 9;
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
  .checkbox-li{
    ul{
      li{
        .checkbox-bg{
          width:16/@base;
          height:16/@base;
          background-image: url('../../assets/img/checkbox-bg.png');
          background-size:100% 100% ;
          img{
            width:16/@base;
            height:16/@base;
            display: none;
          }
        }
      }
      li.active{
        img{
          display: block;
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
  body{
    .no-box{
      max-height: 100%!important;
    }
    .city-box{
      overflow: auto;
      min-height: 400/@base;
    }
  }
  .cityLog{
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
      border-bottom: 0;
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
        .mu-raised-button-wrapper span.mu-raised-button-label{
          width:40%
        }
        i {
          color:#656565;
          font-size: 20/@base;
          margin-left: -8/@base !important;
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
  div.cityLog3{
    width: 100% !important;
    height:100%;
    box-shadow: none!important;
    div.mu-dialog-body .first-row.mls-row{
      background: #F5EAEA;
      position: relative;
      display: box;
      display: -webkit-box;
      display: -moz-box;
      padding: 15/@base;
      border-bottom: 1px solid #ececec;
      .mls{
        width:345/@base;
        height:34/@base;
        border:0;
        text-align: center;
        font-size: 12/@base;
        border-radius: 3/@base;
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
  .mu-raised-button.label-before .mu-raised-button-wrapper {
    border-radius: 0;
    padding-right:0;
  }
  .mu-raised-button.label-before .mu-raised-button-label{
    padding-right:16px;
  }
  .resetBtn {
    background-color: #fff;
    color: #f14114;
    border: 1px solid #f14114 !important;
    font-size: 16/@base;
    margin-left: 20/@base;
    margin-right: 60/@base;
    margin-bottom: 20/@base;
    margin-top: 20/@base;
  }
  .queryBtn {
    background-color: #f14114;
    color: #fff;
    border: 1px solid #f14114 !important;
  }
  .mu-popover.no-box {
    button {
      width: 130/@base;
      height: 36/@base;
      border: none;
      text-align: center;
      line-height: 36/@base;
      outline: none;
    }
    display: inherit;
    top: 80/@base !important;
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
        .choiceButton{
          width: 94%;
        }
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
  }
  .active {
    font-size: 14px;
    color: #f14114;
  }
  #app {
    .mu-toast {
      width: 80%;
      bottom: 30/@base;
      left: 10%;
      height: 40/@base;
      line-height: 40/@base;
      background-color: rgba(0, 0, 0, .5);
      text-align: center;
    }
  }
  .detached {
    .mint-loadmore-top{
      margin-top:31/@base;
    }
    ul.house-list {
      background-color: #fbfbfb;
      min-height: 640/@base;
      li {
        padding: 15/@base 10/@base 15/@base 15/@base;
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
    .right {
      i {
        font-size: 40/@base;
        color: #4a4a4a;
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  import { Loadmore } from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  import { rxUtils } from '../../assets/js/rxUtils'
  import vueSlider from 'vue-slider-component';
  export default{
    data(){
      return {
        priceUnlimited:true,
        choiceBtn:'',
        choiceBtn1:'',
        choiceBtn2:'',
        choiceBtn3:'',
        mlsNum:'',
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
          {text:'50万以下',id:1,data:'0-500000',active:false},
          {text:'50-80万',id:2,data:'500000-800000',active:false},
          {text:'80-100万',id:3,data:'800000-1000000',active:false},
          {text:'100-150万',id:4,data:'1000000-1500000',active:false},
          {text:'150-200万',id:5,data:'1500000-2000000',active:false},
          {text:'200-300万',id:6,data:'2000000-3000000',active:false},
          {text:'300-500万',id:7,data:'3000000-5000000',active:false},
          {text:'500万以上',id:8,data:'5000000-0',active:false}
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
          {text:'不限',id:null,index:null},
          {text:'独立屋',id:0,index:0,englishlng:'Single-house'},
          {text:'排屋',id:1,index:1,englishlng:'Townhouse'},
          {text:'公寓',id:2,index:2,englishlng:'Apartment'},
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
        houseType:'',
        toast:false,
        toastMsg:'',
        cityMap:rxUtils.cityMap,
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
        choiceTime:[
          {text:'不限',id:1,uid:'0'},
          {text:'最近一周',id:2,uid:'2'},
          {text:'一个月内',id:3,uid:'3'},
          {text:'2个月内',id:4,uid:'4'}
        ],
        choiceType:[
          {text:'不限',id:0,uid:'0'},
          {text:'1',id:1,uid:'1'},
          {text:'2',id:2,uid:'2'},
          {text:'3',id:3,uid:'3'},
          {text:'4',id:4,uid:'4'},
          {text:'5+',id:5,uid:'5'}
        ],
        choiceRoom:[
          {text:'全部',id:0,uid:'0'},
          {text:'1',id:1,uid:'1'},
          {text:'2',id:2,uid:'2'},
          {text:'3',id:3,uid:'3'},
          {text:'4',id:4,uid:'4'},
          {text:'5+',id:5,uid:'5'},
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
        allLoaded:false,
        regionCode:'YVR',
        cityType:'',
        lon:'',
        lat:'',
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
        sliderOption1:{
          measureNum:[0,45000],
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
        sliderOption3:{
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
        hostHouse:'',
        imgAdd:'',
        temArr:[],
        temArr1:[],
      }
    },
    mounted(){
      this.$nextTick(function () {
        //this.mountedFunc();
      })
    },
    beforeRouteEnter (to, from, next) {
      console.log(from);
      if(from.fullPath == "/"||from.fullPath == "/screen"||from.fullPath.indexOf('/?')>-1||from.fullPath.indexOf('/mapHouse')>-1){  //返回首页时，清除页面缓存
        next(vm => {
            console.log("即将刷新数据");
          vm.$nextTick(function () {
            vm.mountedFunc();
          })
        })
      }else{
        next();
      }
    },
    methods:{
      mountedFunc(){
        var self = this;
        document.title=this.$route.name;
        this.resetMore();
        /*this.code=this.$route.query.regionCode?this.$route.query.regionCode:this.code;*/
        if(self.$route.query){
          self.inData = self.$route.query;
          self.inData.pageSize = 10;
          self.inData.currentPage = 1;
          //根据筛选条件，将已选择的条件，展示到筛选页中
          self.tempData.direction = self.inData.direction?self.inData.direction:null;
          self.tempData.sortField = self.inData.sortField?self.inData.sortField:null;
          self.tempData.dateType = self.inData.dateType?self.inData.dateType:null;
          self.tempData.buildingType = self.inData.buildingType||self.inData.buildingType==0?self.inData.buildingType:null;
          self.choiceBtn1+=self.tempData.buildingType||self.tempData.buildingType==0?self.sortList[parseInt(self.tempData.buildingType)+1].text:'';
          if(self.inData.beds){
            var bedsArray= self.inData.beds.split(',');
            for(var key in bedsArray){
              for(var key2 in self.roomList){
                if(bedsArray[key]==self.roomList[key2].data){
                  self.roomList[key2].active=true;
                }
              }
            }
          }else{
            for(var key2 in self.roomList){
              self.roomList[key2].active=false;
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
            self.priceUnlimited = false;
            var priceArray= self.inData.priceFilter.split(',');
            for(var key in priceArray){
              for(var key2 in self.moneyList){
                if(priceArray[key]==self.moneyList[key2].data){
                  self.moneyList[key2].active=true;
                  self.choiceBtn2+=self.moneyList[key2].text+',';
                }
              }
            }
            self.choiceBtn2 = self.choiceBtn2.substring(0,self.choiceBtn2.length-1);
          }
          if(self.inData.roomAreaFilter){
            var roomAreaArray= self.inData.roomAreaFilter.split(',');
            for(var key in roomAreaArray){
              for(var key2 in self.roomAreaList){
                if(roomAreaArray[key]==self.roomAreaList[key2].data){
                  self.roomAreaList[key2].active=true;
                  self.choiceBtn+=self.roomAreaList[key2].text+',';
                }
              }
            }
            self.choiceBtn = self.choiceBtn.substring(0,self.choiceBtn.length-1);
          }
          console.log(self.inData);
        }
        this.trigger = this.$refs.button.$el;
        this.trigger1 = this.$refs.button1.$el;
        this.trigger2 = this.$refs.button2.$el;
        self.imgUrl=rxUtils.hostHouse;
        self.hostHouse=rxUtils.hostHouse;
        self.imgAdd=rxUtils.hostHouse;
        self.$http.post('/residence/search.json', self.inData, {
          emulateJSON: true
        }).then(function (response) {
          self.data=response.data.data;
        }).then(function (error) {})
        self.$http.get('/region/listCity.json?code='+self.inData.code, {}, {emulateJSON: true})
          .then(function (response) {
            console.log(response.data)
            self.adds=response.data.data;
          }).then(function (error) {})
      },
      clearArea(){
        let self=this;
        self.inData.minLatitude='';
        self.inData.maxLatitude='';
        self.inData.minLongitude='';
        self.inData.maxLongitude='';
      },
      //选择价格（多选）
      choiceMoney(obj){
        obj.active=!obj.active;
        if(obj.active){
          this.priceUnlimited = false;
        }
      },
      //选择上市时间--单选
      choiceDate(index){
        this.tempData.dateType=this.tempData.dateType==index?'':index;
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
        }else if(type==1||type=='1'){
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
      //根据价格查询--不限
      noMoneySearch(){
        let self=this;
        console.log("点击价格不限查询");
        self.choiceBtn2='';
        self.inData.priceFilter='';
        self.choiceBtn2 = '价格选择';
        self.priceUnlimited = true;
        for(var key2 in self.moneyList){
            self.moneyList[key2].active=false;
        }
        self.clearArea();
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true}).then(function (response) {
          this.open1 =false;
          this.$refs.button1.$el.style.color='#565656';
          if(response.body.data!==null){
            self.data=response.body.data;
          }else{self.data=null;}
        }).then(function (error) {
        })
      },
      //根据价格查询--多选
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
        if(!self.choiceBtn2.length){
          self.choiceBtn2='不限';
          self.priceUnlimited = true;
        }
        self.inData.priceFilter = self.inData.priceFilter.substring(0,self.inData.priceFilter.length-1);
        self.clearArea();
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
        self.clearArea();
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
        self.$http.get('/residence/getDetail.json?mls='+self.mlsNum, {}, {emulateJSON: true}).then(function (response) {
          this.open3 =false;
          if(response.body.data!==null){
            this.$router.push({name:'房源详情',params:{id:self.mlsNum}})
          }else{
            self.showToast('没有该MLS编号的房源');
            self.data=null;;
          }
        }).then(function (error) {})
      },
      //点击筛选页确定按钮进行查询
      search(){
        let self=this;
        if(self.mlsNum){
          //查询接口
          self.searchByMls();
          return;
        }
        console.log("点击筛选页确定按钮进行查询");
        //根据上市时间，获取起止时间
        console.log("self.tempData.dateType:"+self.tempData.dateType);
        console.log("self.tempData:");
        console.log(self.tempData);
        self.getTime(self.tempData.dateType);
        self.inData.dateType = self.tempData.dateType;
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
        //当前页码
        self.inData.currentPage=1;

        //查询接口
        self.clearArea();
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true}).then(function (response) {
          this.open3 =false;
          this.$refs.button3.$el.style.color='#565656';
          if(response.body.data!==null){
            self.data=response.body.data;
          }else{
            self.data=null;;
          }
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
        }).then(function (error) {
        })
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
      sortAdd(id,e,choiceBtn1){
        let self=this;
        self.choiceBtn1=choiceBtn1=='不限'?'房屋类型':choiceBtn1;
        console.log(id);
        this.inData.buildingType=id==null?null:id;
        console.log(this.inData.buildingType);
        this.inData.currentPage=1;
        self.clearArea();
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true}).then(function (response) {
          this.open2 =false;
          this.$refs.button2.$el.style.color='#565656';
          if(response.body.data!==null){
            self.data=response.body.data;
          }else{self.data=null;}
        }).then(function (error) {
        })
      },//排序选择逻辑
      hideMore(){
        this.$refs.button3.$el.style.color='#656565';
        let el=document.getElementsByClassName('choiceRoom')[0].getElementsByTagName('span');
        let el1=document.getElementsByClassName('choiceType')[0].getElementsByTagName('span');
        let el2=document.getElementsByClassName('choiceTime')[0].getElementsByTagName('span');
        let el3=document.getElementsByClassName('choiceSort')[0].getElementsByTagName('span');
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
        for(let i=0;i<el3.length;i++){
            el3[i].className='';
        }
        el3[0].className='active';
        this.open3=false;
        this.inData.startDate='';
        this.inData.endDate='';
        this.inData.beds='';
        this.inData.baths='';
        this.inData.buildingType='';
        this.inData.direction='';
        this.inData.sortField='';
        this.temArr1.splice(0,this.temArr1.length)
        this.temArr.splice(0,this.temArr.length)
        this.sliderOption.measureNum=[0,5000]
        this.sliderOption1.measureNum=[0,45000]
      },
      closeDiage () {
        this.open3 = false;
      },
      loadTop() {
        setTimeout(() => {
          let self=this;
          this.inData.currentPage=1;
          self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
            .then(function (response) {
              self.data=response.data.data;
              self.$refs.loadmore.onTopLoaded();
            }).then(function (error) {

          })
        }, 2000)
      },
      loadBottom() {
        this.allLoaded = true;// 若数据已全部获取完毕
        let self=this;
        self.inData.currentPage=self.inData.currentPage+1;
        setTimeout(() => {
          self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
            .then(function (response) {
              if(response.data.data){
                for(let i=0;i<response.data.data.length;i++){
                  self.data.push(response.data.data[i])
                }
                self.allLoaded=false;
              }else{
                self.allLoaded=true;
              }
              console.log(self.data)
              self.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        }, 2000)
      },
      //去地图
      routerMap(){
        var self = this;
        _czc.push(['_trackEvent', '二手房', 'HouseSwitchMap','切换地图']);
        /*self.inData.direction='';
        self.inData.sortField='';*/
        self.clearArea();
        this.$router.push({name:'地图找房',query:this.inData})
      },
      routerDetail(id){
        _czc.push(['_trackEvent', '二手房', 'HouseDetails','房源详情mslno='+id]);
        console.log(sessionStorage.getItem('detailName'));
        this.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:id},query:{region:sessionStorage.getItem('code')}})
      },
      toggle () {
        this.open = !this.open;
        _czc.push(['_trackEvent', '二手房', 'HouseRegionButton','城市选择按钮']);
        this.$refs.button.$el.style.color='#000';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#656565';
        this.$refs.button3.$el.style.color='#656565';
      },
      toggle1 () {
        let self=this;
        this.open1 = !this.open1;
        _czc.push(['_trackEvent', '二手房', 'HousePriceButton','价格选择按钮']);
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#000';
        this.$refs.button2.$el.style.color='#656565';
        this.$refs.button3.$el.style.color='#656565';
      },
      toggle2 () {
        this.open2 = !this.open2;
        _czc.push(['_trackEvent', '二手房', 'HouseTypeButton','类型选择按钮']);
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#000';
        this.$refs.button3.$el.style.color='#656565';
      },
      toggle3 () {
        let self=this;
        this.open3 = !this.open3;
        _czc.push(['_trackEvent', '二手房', 'HouseMoreButton','更多按钮']);
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#656565';
      },
      handleClose (e) {
        this.open = false
        //this.$refs.button.$el.style.color='#656565';
//        let el=this.$refs.button.$el;
//        el.childNodes[0].getElementsByTagName('i')[0].className ='mu-icon material-icons icon iconfont icon-sanjiao';
      },
      handleClose1 (e) {
        this.open1 = false
        //this.$refs.button1.$el.style.color='#656565';
//        let el=this.$refs.button1.$el;
//        el.childNodes[0].getElementsByTagName('i')[0].className ='mu-icon material-icons icon iconfont icon-sanjiao';
      },
      handleClose2 (e) {
        this.open2 = false
        //this.$refs.button2.$el.style.color='#656565';

      },
      handleClose3 (e) {
        this.open3 = false
        this.$refs.button3.$el.style.color='#656565';
      },
      /*筛选框的弹出逻辑结束*/
      /*筛选按钮逻辑开始*/
      regionAdd(e,id,chineselng,city){//id为code，city为英文名
        let self=this;
        let el=document.getElementsByClassName('subTab')[0].getElementsByTagName('li');
        self.inData.city=city?city:'';
        self.clearArea();
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
          .then(function (response) {
            this.open=false;
            self.inData.chineselng=chineselng?chineselng:null;
            this.$refs.button.$el.style.color='#565656';
            self.data=response.body.data;
            if(self.data==null||self.data.length==0){
              self.noMore=false;
            }else{
              self.noMore=true;
            }
          }).then(function (error) {
        })
      },//选择小区域
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
            self.inData.startDate='';
            self.inData.endDate='';
          }else if(id==2){
            let oldSecond=60*60*24*7*1000;
            let timer=new Date(newSecond-oldSecond);
            let newyear=timer.getFullYear();
            let newmouth=timer.getMonth()+1;
            let newdata=timer.getDate();
            self.inData.startDate=newyear+'-'+newmouth+'-'+newdata;
            self.inData.endDate=year+'-'+mouth+'-'+data;
          }else if(id==3){
            let oldSecond=60*60*24*28*1000;
            let timer=new Date(newSecond-oldSecond);
            let newyear=timer.getFullYear();
            let newmouth=timer.getMonth()+1;
            let newdata=timer.getDate();
            self.inData.startDate=newyear+'-'+newmouth+'-'+newdata;
            self.inData.endDate=year+'-'+mouth+'-'+data;
          }else {
            let oldSecond=60*60*24*59*1000;
            let timer=new Date(newSecond-oldSecond);
            let newyear=timer.getFullYear();
            let newmouth=timer.getMonth()+1;
            let newdata=timer.getDate();
            self.inData.startDate=newyear+'-'+newmouth+'-'+newdata;
            self.inData.endDate=year+'-'+mouth+'-'+data;
          }
        }else if(type=='choiceType') {
          if(id==0){
            for(let i=0;i<el.length;i++){
              el[i].className='';
            }
            e.target.className='active';
            self.inData.baths='';
            self.temArr.splice(0,self.temArr.length)
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
              }else if(id==5){
                self.temArr.push('5')
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
            self.inData.baths=self.temArr.join(',');
          }
        }else if(type=='choiceRoom'){
          if(id==0){
            for(let i=0;i<el.length;i++){
              el[i].className='';
            }
            e.target.className='active';
            self.inData.beds='';
            self.temArr1.splice(0,self.temArr1.length)
          }else {
            el[0].className='';
            if(e.target.className==''){
              e.target.className='active';
              if(id==1){
                self.temArr1.push('1');
              }else if(id==2){
                self.temArr1.push('2');
              }else if(id==3){
                self.temArr1.push('3');
              }else if(id==4){
                self.temArr1.push('4');
              }else if(id==5){
                self.temArr1.push('5');
              }
            }else{
              if(self.temArr1.length>1){
                e.target.className='';
                if(self.temArr1.indexOf(uid)>-1){
                  self.temArr1.splice(self.temArr1.indexOf(uid),1)
                }
              }
            }
            self.inData.beds=self.temArr1.join(',');
          }
        }else if(type=='choiceSort'){
          for(let i=0;i<el.length;i++){
            el[i].className='';
          }
          e.target.className='active';
            if(id==0){
              self.inData.direction='DESC';
              self.inData.sortField=0;
            }else if(id==1){
              self.inData.direction='DESC';
              self.inData.sortField=1;
            }else if(id==2){
              self.inData.direction='ASC';
              self.inData.sortField=1;
            }else if(id==3){
              self.inData.direction='DESC';
              self.inData.sortField=2;
            }else if(id==4){
              self.inData.direction='ASC';
              self.inData.sortField=2;
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
      resetMore(){
        var self = this;
        self.inData={};
        self.tempData=
          {
            sortField:null,
            direction:null,
            dateType:null,
            buildingType:null,
            city:null,
            beds:null
          };
        self.choiceBtn1 = '';
        self.choiceBtn2 = '';
        self.inData.pageSize = 10;
        self.inData.currentPage = 1;
        self.inData.region = self.$route.query.region;
        self.inData.code = self.$route.query.code;
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
        this.sliderOption.measureNum=[0,5000];
        this.sliderOption1.measureNum=[0,45000];
        let el=document.getElementsByClassName('choiceTime')[0].getElementsByTagName('span');
        let el1=document.getElementsByClassName('choiceRoom')[0].getElementsByTagName('span');
        let el2=document.getElementsByClassName('choiceType')[0].getElementsByTagName('span');
        let el3=document.getElementsByClassName('choiceSort')[0].getElementsByTagName('span');
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
        for(let i=0;i<el3.length;i++){
          el3[i].className='';
        }
        el3[0].className='active';
        this.temArr.splice(0,this.temArr.length);
        this.temArr1.splice(0,this.temArr1.length);
        this.inData.startDate='';
        this.inData.endDate='';
        this.inData.beds='';
        this.inData.baths='';
        this.inData.minArea='';
        this.inData.maxArea='';
        this.inData.minLandArea='';
        this.inData.maxLandArea='';
        this.inData.direction='';
        this.inData.sortField='';
        this.open3=false;
        this.$refs.button3.$el.style.color='#656565';
      }
    },
    components: {
      vueSlider,
    }

  }
</script>
