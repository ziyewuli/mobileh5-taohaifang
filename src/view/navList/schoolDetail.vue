<template>
  <div class="school-detail">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>{{title}}</span></div>
      <div class="right">
        <img src="../../assets/img/toMap.png" @click="routerMap()" />
      </div>
    </div>
    <div class="top-img">
      <img v-if="!data1.photo" src="../../assets/img/school-l.png" alt="">
      <img v-else :src="imgUrl+data1.photo" alt="">
    </div>
    <div class="top-content">
      <p class="name" v-text="data1.name"></p>
      <div class="tip">
        <span v-text="data1.cityZH?data1.cityZH:data1.city"></span>
        <span class="grade" :class="data1.grade=='Elementary'?'Elementary':data1.grade=='High'?'High':'Secondary'">{{data1.type=='Public'?'公立':'私立'}}{{data1.grade=='Elementary'?'小学':data1.grade=='High'?'高中':'中学'}}</span>
        <i v-for="icon in icon1" class="icon iconfont icon-icon_wendaxiangqing_yishoucang icon1"></i><i v-for="icon in icon2" class="icon iconfont icon-icon_wendaxiangqing_yishoucang icon2"></i>
      </div>
      <div class="locataion" >
        {{location}}&nbsp;&nbsp;
        <span @click="toMapSchoolSingle" >查看地图</span>
      </div>
      <!--<div class="score">
        <i v-for="icon in icon1" class="icon iconfont icon-icon_wendaxiangqing_yishoucang"></i><i v-for="icon in icon2" class="icon iconfont icon-icon_wendaxiangqing_weishoucang"></i>
      </div>-->
    </div>
    <div class="info-detail">
      <ul class="info-detai">
        <li v-if="country=='us'">
          <p><span class="info-key">排名</span><span class="info-value">{{data1.rankingofall?data1.rankingofall:'--'}}</span></p>
          <p><span class="info-key">学生人数</span><span class="info-value" v-if="data1.students">{{data1.students.Students?data1.students.Students:'无'}}</span></p>
          <p><span class="info-key">学生教师比例</span><span class="info-value">{{data1.ratio?data1.ratio:'无'}}</span></p>
          <p><span class="info-key">阅读精通率</span><span class="info-value" v-if="data1.acdamics">{{data1.acdamics['Percent Proficient - Reading']?data1.acdamics['Percent Proficient - Reading']:'无'}}</span></p>
          <p><span class="info-key">数学精通率</span><span class="info-value" v-if="data1.acdamics">{{data1.acdamics['Percent Proficient - Math']?data1.acdamics['Percent Proficient - Math']:'无'}}</span></p>
          <p><span class="info-key">AP注册率</span><span class="info-value" v-if="data1.acdamics">{{data1.acdamics['AP Enrollment']?data1.acdamics['AP Enrollment']:'无'}}</span></p>
          <p><span class="info-key">联系电话</span><span class="info-value">{{data1.phone?data1.phone:'无'}}</span></p>
          <p><span class="info-key">学校网站</span><span class="info-value">{{data1.website?data1.website:'无'}}</span></p>
        </li>
        <li v-else>
          <p><span class="info-key">本年度排名</span><span class="info-value">{{data1.frank}}</span></p>
          <p><span class="info-key">五年平均排名</span><span class="info-value">{{data1.fyrank}}</span></p>
          <p><span class="info-key">非英语学生率</span><span class="info-value">{{data1.esl}}%</span></p>
          <p><span class="info-key">法语教学比例</span><span class="info-value">{{data1.immersion}}%</span></p>
          <p><span class="info-key">特殊教育比例</span><span class="info-value">{{data1.specialneeds}}%</span></p>
          <p><span class="info-key">参加测试人数</span><span class="info-value">{{data1.enrollment}}</span></p>
          <p><span class="info-key">家长年均收入</span><span class="info-value">{{data1.avginc}}</span></p>
          <p><span class="info-key">联系电话</span><span class="info-value">{{data1.other&&JSON.parse(data1.other)['Phone Number']}}</span></p>
        </li>
      </ul>
    </div>
    <div class="detached clearMargin" style="margin-top:.5rem;">
        <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
        <div class="choice" style="border-bottom:1px solid #ececec;">
          <mu-raised-button  ref="button2" @click="toggle2" :label="choiceBtn1||'房屋类型'" icon=" " :iconClass="[{'icon-icon_esf_xiala_':open2,'icon-icon_esf_xiala':!open2},'icon iconfont']" labelPosition="before"  secondary/>
          <mu-raised-button  ref="button1" @click="toggle1" :label="choiceBtn2||'价格选择'"  icon=" " :iconClass="[{'icon-icon_esf_xiala_':open1,'icon-icon_esf_xiala':!open1},'icon iconfont']" labelPosition="before" secondary/>
          <mu-raised-button  ref="button" @click="toggle" :label="choiceBtn||'房屋面积'" icon=" " :iconClass="[{'icon-icon_esf_xiala_':open,'icon-icon_esf_xiala':!open},'icon iconfont']" labelPosition="before"  secondary/>
          <mu-raised-button  ref="button3" @click="toggle3" :label="'更多'" icon=" " iconClass="icon iconfont icon-icon_gengduo" labelPosition="before" secondary/>
        </div>
        <div class="list-bg">
          <mt-loadmore v-if="data!=null" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" >
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
       <!-- <mu-popover popoverClass="choiceActive city-box schoolType" overlayOpacity="0.5" overlay="true" :trigger="trigger" :open="open" @close="handleClose">
          <ul class="subTab">
            <li class="active" @click="regionAdd('',$event,'不限')" >不限 <i class="icon iconfont icon-icon_duihao"></i></li>
            <li v-for="list in adds"  @click="regionAdd(list.code,$event,list.chineselng)">{{list.chineselng}} <i class="icon iconfont icon-icon_duihao"></i></li>
          </ul>
        </mu-popover>-->
      <mu-popover popoverClass="choiceActive type-box schoolType" overlayOpacity="0.5" overlay="true" :trigger="trigger2" :open="open2" @close="handleClose2">
        <ul class="sort-list">
          <i class="icon iconfont icon-icon_shouye_youjiantou"></i>
          <li v-for="list in sortList" :class="[list.id==inData.buildingType?'active':'']" @click="sortAdd(list.id,$event,list.text)">{{list.text}}&nbsp;&nbsp;<span class="c-9B9B9B">{{list.englishlng}}</span> <i class="icon iconfont icon-icon_duihao"></i></li>
        </ul>
      </mu-popover>
      <mu-popover popoverClass="choiceActive money-box schoolType checkbox-li"  overlayOpacity="0.5" overlay="true" :trigger="trigger1" :open="open1" @close="handleClose1">
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
      <mu-popover popoverClass="choiceActive schoolType checkbox-li"  overlayOpacity="0.5" overlay="true" :trigger="trigger" :open="open" @close="handleClose">
          <ul class="subTab">
            <i class="icon iconfont icon-icon_shouye_youjiantou"></i>
            <li @click="noAreaSearch()" :class="{'active':areaUnlimited}">不限<i class="icon iconfont icon-icon_duihao"></i></li>
            <li v-for="list in roomAreaList"  @click="choiceRoomArea(list)" :class="{'active':list.active}">{{list.text}}
              <div class="checkbox-bg float-r MR15">
                <img src="../../assets/img/selected.png">
              </div>
            </li>
            <li>
              <mu-raised-button @click="roomAreaAdd()" label="确定" backgroundColor="#F14114" class="demo-raised-button choiceButton"/>
            </li>
          </ul>
        </mu-popover>
      <mu-dialog dialogClass="cityLog3" :open="open3" @close="closeDiage" scrollable>
          <div class="mu-appbar mu-paper-1">
            <div @click="open3=false" class="left"><i class="icon iconfont icon-back"></i></div>
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
        <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
      </div>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  .school-detail .mu-appbar .right img{
    width:24/@base;
    height:24/@base;
  }
  ul.house-list .bottom-content img{
    width: 52/@base;
    height: 16/@base;
    vertical-align: sub;
  }
  div.schoolType{
    top:104/@base!important;
  }
  div.money-box{
    i.icon-icon_shouye_youjiantou{
      left:120/@base;
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
  .school-detail .choice{
    position: static;
  }
  .school-detail .choice i.icon-icon_shouye_youjiantou{
    top:36/@base!important;
  }
  div.school-detail{
    div.mu-appbar{
      height:44/@base;
      background: #fff;
      color:#565656;
      font-size: 27/@base;
      z-index: 201412345;
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
      div.locataion{
        color:#9b9b9b;
        font-size: 12/@base;
        margin-top: -5/@base;
        i.icon{
          font-size: 20/@base;
          margin-left:-10/@base;
        }
        span{
          font-size: 12/@base;
          color: #1E1E1E;
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
          font-size: 14/@base;
          color:#9B9B9B;
          width: 100/@base;
          display: inline-block;
        }
        .info-value{
          width:240/@base;
          display: inline-block;
          font-size: 14/@base;
          color:#1E1E1E;
          vertical-align: top;
          word-wrap: break-word;
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
      display: box;
      display: -moz-box;
      display: -webkit-box;
      position: static;
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
  .city-box{
    overflow: auto;
    min-height: 400/@base;
  }
  div.mu-dialog-wrapper{
    z-index: 9999999999999999999999999!important;
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
      left:20/@base;
    }
  }
  ul.money-list{
    i.icon-icon_shouye_youjiantou{
      left:214/@base;
    }
  }
  ul.subTab{
    i.icon-icon_shouye_youjiantou{
      right:120/@base;
    }
  }
</style>
<script>
  import { rxUtils } from '../../assets/js/rxUtils'
  import Vue from 'vue'
  import { Loadmore } from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  import vueSlider from 'vue-slider-component';
  export default{
    data(){
          return {
            country:null,
            isTest:false,
            priceUnlimited:true,
            areaUnlimited:true,
            tempData:{
              sortField:null,
              direction:null,
              dateType:null,
              buildingType:null,
              beds:null
            },
            title:'学校详情',
            choiceShow:false,
            choiceBtn:'',
            choiceBtn1:'',
            choiceBtn2:'',
            choiceBtn3:'',
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
            region:'',
            money:'',
            topMoney:'',
            lastMoney:'',
            sort:'',
            roomNum:'',
            time:'',
            wishNum:'',
            measureNum:'',
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
              {text:'500平方英尺以下',id:1,data:'0-500',active:false},
              {text:'500-800平方英尺',id:2,data:'500-800',active:false},
              {text:'800-1000平方英尺',id:3,data:'800-1000',active:false},
              {text:'1000-1500平方英尺',id:4,data:'1000-1500',active:false},
              {text:'1500-2000平方英尺',id:5,data:'1500-2000',active:false},
              {text:'2000-3000平方英尺',id:6,data:'2000-3000',active:false},
              {text:'3000-5000平方英尺',id:7,data:'3000-5000',active:false},
              {text:'5000平方英尺以上',id:8,data:'5000-0',active:false}
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
            toastMsg:'',
            toast: false,
            data:[],
            inData:{
              pageSize:10,
              currentPage:1,
              buildingType:null,//0:独立屋 1:排屋 2:公寓
              region:'YVR',//区域 YVR:温哥华 YTO:多伦多
              /*city:'',
              minLatitude:'',//最低纬度
              maxLatitude:'',//最高纬度
              minLongitude:'',//最低经度
              maxLongitude:'',//最高经度*/
              priceFilter:'',//价格  格式“0-500000,800000-1000000,2000000-0”
              roomAreaFilter:'',//房屋面积 格式：“0-500,800-1000,2000-0”
              landAreaFilter:'',//土地面积 格式：“0-1000,1000-2000,2000-0”
             /* direction:'',//ASC,DESC
              sortField:'',//排序字段0:默认 1:总价 2:面积*/
              startDate:'',//挂牌开始时间
              endDate:'',//挂牌结束时间
              beds:'',//卧室数量
              baths:'',//卫生间数量
              schoolId:''//学校ID
              /*secondary:'',//高中
              elementary:'',//初中*/
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
            sliderOption2:{
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
            data1:{},
            imgUrl:'',
            location:'',
            icon1:[],
            icon2:[],
            houseImg:'',
            imgAdd:'',
            temArr:[],
            temArr1:[]
          }
  },
    mounted(){
      scroll(0,0);
      this.$nextTick(function () {
        let self= this;
        self.imgUrl=rxUtils.hostSchool;
        self.houseImg=rxUtils.hostHouse;
        self.imgAdd=rxUtils.hostHouse;
        self.country=sessionStorage.getItem('country');
        self.isTest = rxUtils.variable.isTest;
        if(self.$route.query){
          self.inData = self.$route.query;
          self.inData.pageSize = 10;
          self.inData.currentPage = 1;
          self.inData.region = self.$route.query.region?self.$route.query.region:sessionStorage.getItem('region');
          //根据筛选条件，将已选择的条件，展示到筛选页中

          self.tempData.direction = self.inData.direction?self.inData.direction:null;
          self.tempData.sortField = self.inData.sortField?self.inData.sortField:null;
          self.tempData.dateType = self.inData.dateType?self.inData.dateType:null;
          self.tempData.buildingType = self.inData.buildingType?self.inData.buildingType:null;
          self.choiceBtn1+=self.tempData.buildingType?self.sortList[self.tempData.buildingType].text:'';
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
            self.priceUnlimited = false;
            var priceArray= self.inData.priceFilter.split(',');
            for(var key in priceArray){
              for(var key2 in self.moneyList){
                if(priceArray[key]==self.moneyList[key2].data){
                  self.moneyList[key2].active=true;
                  self.choiceBtn2+=self.moneyList[key].text+',';
                }
              }
            }
            self.choiceBtn2 = self.choiceBtn2.substring(0,self.choiceBtn2.length-1);
          }
          if(self.inData.roomAreaFilter){
            self.areaUnlimited = false;
            var roomAreaArray= self.inData.roomAreaFilter.split(',');
            for(var key in roomAreaArray){
              for(var key2 in self.roomAreaList){
                if(roomAreaArray[key]==self.roomAreaList[key2].data){
                  self.roomAreaList[key2].active=true;
                  self.choiceBtn+=self.roomAreaList[key].text+',';
                }
              }
            }
            self.choiceBtn = self.choiceBtn.substring(0,self.choiceBtn.length-1);
          }
          console.log(self.inData);
        }
        document.title=this.$route.name;
        this.trigger = this.$refs.button.$el;
        this.trigger1 = this.$refs.button1.$el;
        this.trigger2 = this.$refs.button2.$el;
        document.addEventListener('scroll',this.scroll)

        //学校详情
        self.$http.get('/school/getDetail.json?id='+self.$route.params.id, {'params':{region:self.inData.region}}, {emulateJSON: true})
          .then(function (response) {
            self.data1=response.body.data;
            console.log(self.data1.grade);
            console.log(self.data1.grade=='Elementary');
            /*if(self.data1.grade=='Elementary'){
              self.inData.elementary=self.data1.name;
            }else{
              self.inData.secondary=self.data1.name;
            }*/
            console.log(self.inData);
            let n=1;
            for(let i=0;i<parseInt(response.body.data.rating/2);i++,n++){
                self.icon1.push(n)
            }
            for(let i=0;i<Math.round(5-(response.body.data.rating/2));i++,n++){
              self.icon2.push(n)
            }
            self.location=response.body.data.address.split(',')[0]+','+response.body.data.address.split(',')[1]
            self.inData.schoolId = self.data1.id;
            self.inData.region = self.data1.region;
            //查询学校周边房源
            self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
              .then(function (response) {
                self.data=response.body.data;
                console.log(response.body.data)
              }).then(function (error) {
            })
          }).then(function (error) {
        })
        self.$http.get('/region/listCity.json?code='+this.cityCode, {}, {emulateJSON: true})
          .then(function (response) {
            self.adds=response.body.data;
          }).then(function (error) {
        })
      })
    },
    beforeDestroy(){
      document.removeEventListener('scroll',this.scroll );
    },
    methods:{
      clearArea(){
        let self=this;
        self.inData.minLatitude='';
        self.inData.maxLatitude='';
        self.inData.minLongitude='';
        self.inData.maxLongitude='';
      },
      toMapSchoolSingle(){
          console.log("跳转去单学校页面");
        this.$router.push({name:'学校地图',query:this.inData})
      },
      back(){
          this.$router.back();
      },
      closeDiage () {
        this.dialog = false;
        this.dialogCity=false;
      },
//      loadTop() {
//        setTimeout(() => {
//          let self=this;
//          this.inData.currentPage=1;
//          self.$http.post('/residence/search.json', this.inData, {emulateJSON: true})
//            .then(function (response) {
//              self.data=response.body.data;
//              this.$refs.loadmore.onTopLoaded();
//            }).then(function (error) {
//
//          })
//        }, 2000)
//      },
      scroll(){
        let a=document.getElementsByClassName('detached')[0].offsetTop;
        let b=document.body.scrollTop+42;
        console.log(a,b);
        if(a-b<0){
          document.getElementsByClassName('mu-appbar')[0].style.position='fixed';
          document.getElementsByClassName('choice')[0].style.position='fixed';
          document.getElementsByClassName('choice')[0].style.top=44*15/375+'rem';
          document.getElementsByClassName('detached')[0].style.margin=(44*15/375+0.5)+'rem 0 0 0';
          document.getElementsByClassName('list-bg')[0].style.margin=(37*15/375)+'rem 0 0 0';
          this.title=this.data1.name+'学区房源';
        }else{
          document.getElementsByClassName('mu-appbar')[0].style.position='static';
          document.getElementsByClassName('choice')[0].style.position='static';
          document.getElementsByClassName('detached')[0].style.margin=0.5+'rem 0 0 0';
          document.getElementsByClassName('list-bg')[0].style.margin='0';
          this.title='学校详情';
        }
      },
      loadBottom() {
        this.allLoaded = true;// 若数据已全部获取完毕
        let self=this;
        self.inData.currentPage=self.inData.currentPage+1;
        setTimeout(() => {
          self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
            .then(function (response) {
              for(let i=0;i<response.body.data.length;i++){
                self.data.push(response.body.data[i])
              }
              this.allLoaded=false;
              console.log(self.data)
              this.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        }, 2000)
      },
      shoucang(id,type){
        let self=this;
        if(!rxUtils.sessionStorage.getItem("authentication")){
          this.toastMsg='请先登录'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.toast = false;
            this.$router.push({name:'登录首页'})
          }, 2000)
        }else{
          if(type.favorite){
            self.$http.post('/residence/doFavor.json', {
              id:id,region:sessionStorage.getItem("code")
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  this.toastMsg='取消收藏成功'
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                    type.favorite=!type.favorite;
                  }, 2000)
                }else{
                  this.toastMsg=response.body.resultMsg;
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                  }, 2000)
                }
              }).then(function (error) {
            })
          }else{
            self.$http.post('/residence/doFavor.json', {
              id:id,region:sessionStorage.getItem("code")
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  this.toastMsg='收藏成功'
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                    type.favorite=!type.favorite;
                  }, 2000)
                }else{
                  this.toastMsg=response.body.resultMsg;
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                  }, 2000)
                }
              }).then(function (error) {
            })
          }
        }
      },//收藏
      //跳转学区房源地图页
      routerMap(){
        var self = this;
        _czc.push(['_trackEvent', '学校详情', 'SchoolDetailSwitchMap','切换地图']);
        this.$router.push({name:'学区找房',query:this.inData})
      },
      routerDetail(id){
        this.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:id},query:{region:sessionStorage.getItem('code')}})
      },
      /*筛选框的弹出逻辑开始*/
      toggle () {
        this.$refs.button.$el.style.color='#000';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#656565';
        this.$refs.button3.$el.style.color='#656565';
        let a=document.getElementsByClassName('detached')[0].offsetTop+1;
        let b=document.body.scrollTop;
        if(a>b){
          window.scrollTo(0,a)
        }
        if(this.open){
          this.open = !this.open;
        }else{
          setTimeout(()=>{
            this.open = !this.open;
          },100);
        }
      },
      toggle1 () {
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#000';
        this.$refs.button2.$el.style.color='#656565';
        let a=document.getElementsByClassName('detached')[0].offsetTop+1;
        let b=document.body.scrollTop;
        if(a>b){
          window.scrollTo(0,a)
        }
        if(this.open1){
          this.open1 = !this.open1;
        }else{
          setTimeout(()=>{
            this.open1 = !this.open1;
          },100);
        }
      },
      toggle2 () {
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#000';
        let a=document.getElementsByClassName('detached')[0].offsetTop+1;
        let b=document.body.scrollTop;
        if(a>b){
          window.scrollTo(0,a)
        }
        if(this.open2){
          this.open2 = !this.open2;
        }else{
          setTimeout(()=>{
            this.open2 = !this.open2;
          },100);
        }


        /*setTimeout(()=>{
          console.log(this.open2);
          this.open2 = !this.open2;
          console.log(this.open2);
        },100);*/
      },
      toggle3 () {
        this.$refs.button.$el.style.color='#656565';
        this.$refs.button1.$el.style.color='#656565';
        this.$refs.button2.$el.style.color='#656565';
        let a=document.getElementsByClassName('detached')[0].offsetTop+1;
        let b=document.body.scrollTop;
        if(a>b){
          window.scrollTo(0,a)
        }
        if(this.open3){
          this.open3 = !this.open3;
        }else{
          setTimeout(()=>{
            this.open3 = !this.open3;
          },100);
        }
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
      handleClose3 (e) {
        this.open3 = false
        this.$refs.button3.$el.style.color='#656565';
      },
      /*筛选框的弹出逻辑结束*/
      //选择价格（多选）
      choiceMoney(obj){
        obj.active=!obj.active;
        if(obj.active){
          this.priceUnlimited = false;
        }
      },
      //选择价格（多选）
      choiceRoomArea(obj){
        obj.active=!obj.active;
        if(obj.active){
          this.areaUnlimited = false;
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

      //根据房屋面积查询--不限
      noAreaSearch(){
        let self=this;
        console.log("点击房屋面积不限查询");
        self.inData.roomAreaFilter='';
        self.choiceBtn='房屋面积';
        self.areaUnlimited = true;
        for(var key2 in self.roomAreaList){
          self.roomAreaList[key2].active=false;
        }
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
      //根据房屋面积查询--多选
      roomAreaAdd(){
        let self=this;
        console.log("点击房屋面积查询");
        self.choiceBtn='';
        self.inData.roomAreaFilter='';
        for(var key in self.roomAreaList){
          if(self.roomAreaList[key].active){
            self.choiceBtn+=self.roomAreaList[key].text+',';
            self.inData.roomAreaFilter+=self.roomAreaList[key].data+',';
          }
        }
        self.choiceBtn = self.choiceBtn.substring(0,self.choiceBtn.length-1);
        if(!self.choiceBtn.length){
          self.choiceBtn='不限';
          self.areaUnlimited = true;
        }
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
      //点击筛选页确定按钮进行查询
      search(){
        let self=this;
        console.log("点击筛选页确定按钮进行查询");
        //根据上市时间，获取起止时间
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
        self.clearArea();
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true}).then(function (response) {
          this.open3 =false;
          if(response.body.data!==null){
            self.data=response.body.data;
          }else{
            self.data=null;;

          }
        }).then(function (error) {
        })
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
            this.inData.baths=self.temArr.join(',');
          }
        }else if(type=='choiceRoom'){
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
        this.inData.minLandArea=this.sliderOption1.measureNum[0];
        if(this.sliderOption1.measureNum[1]==0){
          this.inData.maxLandArea='';
        }else if(this.sliderOption1.measureNum[1]==45000){
          this.inData.maxLandArea='';
        }else{
          this.inData.maxLandArea=this.sliderOption1.measureNum[1];
        }
        if(this.sliderOption.measureNum[1]==0){
          this.inData.maxArea='';
        }else if(this.sliderOption.measureNum[1]==5000){
          this.inData.maxArea='';
        }else{
          this.inData.maxArea=this.sliderOption.measureNum[1];
        }
        this.inData.currentPage=1;
        self.clearArea();
        self.$http.post('/residence/search.json', self.inData, {emulateJSON: true})
          .then(function (response) {
            self.data=response.body.data;
            self.open3=false;
          }).then(function (error) {
        })
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
          };
        self.inData.pageSize = 10;
        self.inData.currentPage = 1;
        self.inData.schoolId = self.$route.params.id;
        self.inData.region = self.$route.query.region;
        self.choiceBtn = '';
        self.choiceBtn1 = '';
        self.choiceBtn2 = '';
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
        console.log(self.inData);
      },
    },
    components: {
      vueSlider
    }
  }
</script>
   
