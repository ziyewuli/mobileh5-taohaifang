<template :key="key">
  <div class="detail-content clearMargin">
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast" />
    <div class="mu-appbar mu-paper-1 mu-appbar-2" v-show="!hideTitle">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><img src="../../assets/img/mls.png" style="width:35px;height:35px;vertical-align: middle"><span v-text="data.mslno"></span></div>
      <div class="right" v-show="!isApp">
        <i @click.stop="shoucang(data.id,data)"  :class="['icon','iconfont',data.favorite?'icon-icon_yishoucangfangyuan':'icon-icon_shoucangfangyuan']"></i>
       </div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" id="pic">
      <swiper-slide v-for="banner in banners" :key="banner.big"><img @click="showSwiperDialog" :src="data.imageslocal!==''?imgAdd+banner.big:banner.big" alt=""></swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <div v-show="!hideTitle">
      <mu-tabs id="muTab" style="position: fixed;z-index: 99999999999999;" v-show="tabShow" :value="nav" @change="handleTabChange1">
        <mu-tab v-for="item in tabs" :value="item.value" :title="item.title" :key="item.value"  />
      </mu-tabs>
    </div>

    <div class="detail-text">
      <div class="detail-text1">
        <p class="detail-location">
          <span class="scale">{{data.cityZH}}·{{buildingType}}·{{data.beds}}室<span>{{data.baths}}</span>卫</span>
        </p>
        <div class="detail-money">
          <span>${{price}}万加元</span>
          <span>&nbsp;&nbsp;(约合￥<i>{{(data.priceCNY/10000).toFixed(0)}}</i>万元)&nbsp;<i @click="goMoney" class="icon iconfont icon-icon_jisuanqi1"></i></span>

        </div>
      </div>
      <!--<div class="detai-text2">
        <div>
          <p>屋型</p>
          <p><span>{{data.beds}}</span>室<span>{{data.baths}}</span>卫</p>
        </div>
        <div>
          <p>面积(平方英尺)</p>
          <p>{{data.interiorfloorspace}} <span style="font-size: 12px;">(约{{(data.interiorfloorspace*0.0929).toFixed(0)}}㎡)</span></p>
        </div>
        <div>
          <p>建筑类型</p>
          <p>{{buildingType}}</p>
        </div>
      </div>-->
    </div>
    <section id="info" class="info">
      <div class="left"></div>
      <div class="right ">房屋信息</div>
      <div @click="showDialog" class="look-more float-r">更多介绍<i class="icon iconfont icon-icon_xiaojiantouyou float-r"></i></div>
    </section>
    <div class="info-detai-bg" style="width:100%;background-color: #fff;padding-bottom:10px;">
      <ul class="info-detai clearfix" style="display:inline-block;">
        <li v-if="data.mslno"><span>MLS编号</span><span>{{data.mslno}}&nbsp;<img @click="tipDialog1=true" src="../../assets/img/tipBtn.png" ></span></li>
        <li v-if="data.createdAt"><span>上市日期</span><span>{{timer(data.createdAt)}}<span class="c-7F7F7F FS12" v-if="data.marketDay">(上市{{data.marketDay}}天)</span><span class="c-7F7F7F FS12" v-else>(今日上市)</span></span></li>
        <li v-if="data.builtIn"><span>建造年份</span><span>{{data.builtIn}}年</span></li>
        <li v-if="data.featuresTable&&JSON.parse(data.featuresTable)['土地性质']"><span>土地性质</span><span >{{JSON.parse(data.featuresTable)['土地性质']}}&nbsp;<img @click="tipDialog3=true" src="../../assets/img/tipBtn.png" ></span></li>
        <li v-if="data.interiorfloorspace"><span>房屋面积</span><span>{{data.interiorfloorspace.toFixed(0)}}平方英尺&nbsp;<span class="c-7F7F7F FS12">(约合{{(data.interiorfloorspace/10.76).toFixed(0)}}平方米)</span></span></li>
        <li v-if="data.landSize"><span>土地面积</span><span>{{data.landSize.toFixed(0)}}平方英尺&nbsp;<span class="c-7F7F7F FS12">(约合{{(data.landSize/10.76).toFixed(0)}}平方米)</span></span></li>
        <li v-if="data.propertyfrontage"><span>土地面宽</span><span>{{data.propertyfrontage}}英尺&nbsp;<span class="c-7F7F7F FS12">(约合{{(data.propertyfrontage*0.30).toFixed(0)}}米)</span></span></li>
        <li v-if="data.landdepth"><span>土地进深</span><span>{{data.landdepth}}英尺&nbsp;<span class="c-7F7F7F FS12">(约合{{(data.landdepth*0.30).toFixed(0)}}米)</span></span></li>
        <li v-if="data.landTax"><span>地税金额</span><span>${{data.landTax}}/年&nbsp;<span class="c-7F7F7F FS12">(约合{{(data.landTax*data.priceCNY/data.price).toFixed(0)}}/年)</span>&nbsp;<img @click="tipDialog2=true" src="../../assets/img/tipBtn.png" ></span></li>
        <li v-if="data.featuresTable&&JSON.parse(data.featuresTable)['物业费']"><span>物业费用</span><span>${{JSON.parse(data.featuresTable)['物业费']}}/月</span></li>
        <!--<li v-if="data.featuresTable&&JSON.parse(data.featuresTable)['社区名称']"><span>社区名称</span><span>{{JSON.parse(data.featuresTable)['社区名称']}}</span></li>
        <li v-if="data.detailsTable&&JSON.parse(data.detailsTable)['屋内设施']" class="clearfix"><span>屋内设施</span>
          <span class="float-r">
            {{JSON.parse(data.detailsTable)['家具状况']+','}}
            {{JSON.parse(data.detailsTable)['供冷类型']+','}}
            {{JSON.parse(data.detailsTable)['防火设施']+','}}
            {{JSON.parse(data.detailsTable)['装修情况']+','}}
            {{JSON.parse(data.detailsTable)['特征']}}
            {{JSON.parse(data.detailsTable)['制冷']+','}}
            {{JSON.parse(data.detailsTable)['储藏']+','}}
          </span>
        </li>
        <li v-if="data.detailsTable&&JSON.parse(data.detailsTable)['公用设施']" class="clearfix"><span>公共设施</span>
          <span class="float-r">
            {{JSON.parse(data.detailsTable)['泳池类型']+','}}
            {{JSON.parse(data.detailsTable)['建筑设施']+','}}
            {{JSON.parse(data.detailsTable)['景色']+','}}
            {{JSON.parse(data.detailsTable)['公用设施']+','}}
            {{JSON.parse(data.detailsTable)['景观特征']+','}}
            {{JSON.parse(data.detailsTable)['结构']+','}}
            {{JSON.parse(data.detailsTable)['防火设施']+','}}
            {{JSON.parse(data.detailsTable)['排序设备']+','}}
            {{JSON.parse(data.detailsTable)['供水']+','}}
            {{JSON.parse(data.detailsTable)['泳池特征']+','}}
          </span>
        </li>
        <li v-if="data.detailsTable&&JSON.parse(data.detailsTable)['周边设施']" class="clearfix"><span>周边设施</span>
          <span class="float-r">
            {{JSON.parse(data.detailsTable)['周边设施']}}
          </span>
        </li>-->
      </ul>
      <!--<ul class="info-detai" style="display:inline-block;">
        <li><span>{{data.mslno}}</span></li>
        <li v-for="val in infoArr2" :key="list.id"><span>{{val}}</span></li>
      </ul>-->
    </div>
    <mu-dialog dialogClass="tipsDialog"  :open="tipDialog1" title="" @close="close">
      <div class="mlsTips">
        <div class="tips-title clearfix">
          <span>MLS编号</span>
          <img class="float-r" src="../../assets/img/tipClose.png" @click="showTipDialog1">
        </div>
        <div class="tips-content">
          MLS房源共享系统是北美一个统一的提供房源的平台，平台上每套房源都拥有且只有一个唯一的MLS编号，用户可根据编号查询房屋的相关信息。
        </div>
      </div>
    </mu-dialog>
    <mu-dialog dialogClass="tipsDialog"  :open="tipDialog2" title="" @close="close">
      <div class="mlsTips">
        <div class="tips-title clearfix">
          <span>地税金额</span>
          <img class="float-r" src="../../assets/img/tipClose.png" @click="tipDialog2=false">
        </div>
        <div class="tips-content">
          一般是当地政府每年对该房屋的评估价×当地固定税率，此税率一般在千分之四到五之间。
        </div>
      </div>
    </mu-dialog>
    <mu-dialog dialogClass="tipsDialog"  :open="tipDialog3" title="" @close="close">
      <div class="mlsTips">
        <div class="tips-title clearfix">
          <span>土地性质</span>
          <img class="float-r" src="../../assets/img/tipClose.png" @click="tipDialog3=false">
        </div>
        <div class="tips-content">
          <span class="title">Freehold(永久地权)</span>
          非共有物业。指业主同时拥有房屋和土地产权，多为独立屋。<br><br>
          <span class="title">Strata(永久地权)</span>
          永久地权，共有物业。土地的所有权由多个业主共同拥有，物业公司统一打理公共设施，多为联排别墅。<br><br>
          <span class="title">Leasehold(无土地业权)</span>
          业主拥有房子的使用权，但土地权归政府或者他人所有，多为公寓。
        </div>
      </div>
    </mu-dialog>
    <mu-dialog :open="dialog" dialogClass="moreDialog demo-popup-bottom" @close="close" title="" scrollable>
      <div class="mu-appbar mu-paper-1 mu-appbar-2">
        <div @click="dialog=false" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span class="scale">{{data.cityZH}}·{{buildingType}}·{{data.beds}}室<span>{{data.baths}}</span>卫</span></div>
        <div class="right">
        </div>
      </div>
      <div class="more-title">
      </div>
      <section class="info" v-if="data.moreDetail">
        <div class="left"></div>
        <div class="right ">更多信息</div>
      </section>
      <div v-if="data.moreDetail">
        <div class="more-row clearfix" v-for="(value,key) in data.moreDetail" >
          <div class="more-text float-l">{{key}}</div>
          <div class="more-content float-l">{{value}}</div>
        </div>
      </div>

      <section  class="info">
        <div class="left"></div>
        <div class="right ">房间描述</div>
      </section>
      <section class="content-detail">{{data.description}}</section>
    </mu-dialog>
    <section id="map-index"  class="info">
      <div class="left"></div>
      <div class="right ">地图</div>
    </section>
    <div class="map-icon float-l" id="map"></div>
    <div class="school-map clearfix" @click="showMap">
      <div class="map-icon float-l" id="googleMap" ></div>
      <div class="address float-l">
        <span v-if="data.address">{{(data.address).split(',')[0]}}</span>
      </div>
    </div>
    <section id="rooms" class="info" v-if="rooms&&rooms.length>0">
      <div class="left"></div>
      <div class="right ">房间分布</div>
    </section>
    <div class="rooms" v-if="rooms&&rooms.length>0">
       <div class="rooms-row rooms-head clearfix">
         <div class="floor float-l">楼层</div>
         <div class="room float-l">房间</div>
         <div class="area float-l">面积</div>
       </div>
      <div class="rooms-row clearfix" v-for="item in rooms" v-if="item[0].indexOf('not available')==-1&&item[1].indexOf('not available')==-1&&item[2].indexOf('not available')==-1">
        <div class="floor float-l">{{item[0]}}</div>
        <div class="room float-l">{{item[1]}}</div>
        <div class="area float-l">{{item[2]}}</div>
      </div>
    </div>
    <!--<div id="map" @click="showMap" class="map none"></div>-->
    <section id="school" class="info">
      <div class="left"></div>
      <div class="right ">所属学区</div>
    </section>
    <div v-if="data.schools&&data.schools.length>0" v-for="school in data.schools" class="primary" >
      <div class="school-bottom" @click="routerSchool(school.id)">
        <div class="school-info clearfix">
          <div class="school-address float-l">
            <div class="school-address-top">
              <nobr>{{school.name}}</nobr>
            </div>
            <div class="school-address-middle">
              <span class="chool-type" v-if="school.type=='Public'">公立</span><span class="chool-type" v-else>私立</span>
              <span  v-if="school.grade=='Elementary'">小学</span><span  v-else>中学</span>
              <i v-for="icon in parseInt(school.rating/2)" class="icon iconfont icon-icon_wendaxiangqing_yishoucang icon1"></i><i v-for="icon in 5-parseInt(school.rating/2)" class="icon iconfont icon-icon_wendaxiangqing_yishoucang icon2"></i>
              <!--<i v-for="icon in icon2" class="icon iconfont icon-icon_wendaxiangqing_yishoucang icon2"></i>-->
            </div>
            <div class="school-address-middle"><span class="chool-type">年度排名&nbsp;<span class="c-D0021B bold">{{school.frank}}</span></span></div>
            <div class="school-address-bottom"><i class="icon iconfont icon-icon-fangyuanjulix"></i>距离房源{{GetDistance(school)}}公里</div>
          </div>
          <i class="icon iconfont icon-icon_xiaojiantouyou float-r"></i>
        </div>
        <!--<div class="school-periphery clearfix">
          <div><span>该学区内二手房源:{{school.houseCount}}套</span></div>
        </div>-->
        <!--<div class="school-content">
          <ul>
            <li class="school-top">
              <p class="school-name"><span>{{schoolData.xx.name}}</span><i class="icon iconfont icon-icon_xiaojiantouyou"></i></p>
              <span class="chool-type">小学</span><span class="chool-type" v-if="schoolData.xx=='Public'">公立</span><span class="chool-type" v-else>公立</span>
              <p class="juli">距离房源 <i class="icon iconfont icon-icon_julifangyuanjuli">{{xxjuli}}</i>公里</p>
            </li>
            <li><span>去年全省排名</span><span><i>{{String(schoolData.xx.frank).split('/')[0]}}</i>/{{String(schoolData.xx.frank).split('/')[1]}}</span></li>
            <li><span>近5年全省排名</span><span><i>{{String(schoolData.xx.fyrank).split('/')[0]}}</i>/{{String(schoolData.xx.fyrank).split('/')[1]}}</span></li>
          </ul>
        </div>-->
        <!--<div class="school-num">
          <p>学区内房源</p>
          <p>{{schoolData.xx.houseCount}}<i>套</i></p>
        </div>-->
      </div>
    </div>
    <div v-if="!data.schools||!data.schools.length>0" class="no-school">暂无学校信息</div>
    <section id="message" class="info" v-if="!isApp">
      <div class="left"></div>
      <div class="right ">用户留言</div>
      <div @click="showMessageListDialog" v-if="messages&&messages.length>3" class="look-more float-r">全部留言<i class="icon iconfont icon-icon_xiaojiantouyou float-r"></i></div>
    </section>
    <div class="messages text-left" v-if="messages&&messages.length>0&&!isApp">
      <div v-for="(item, index) in messages" v-if="index<3" class="message-content" >
        <img src="../../assets/img/message-icon.png">&nbsp;&nbsp;&nbsp;<span>{{item.content}}</span>
      </div>
      <div class="addMessage-bg">
        <div class="addMessage text-center" @click="openMessageSubmitDialog">
          <img src="../../assets/img/addPic.png"><span>添加留言</span>
        </div>
      </div>
    </div>
    <div class="no-school text-center" v-if="(!messages||!messages.length>0)&&!isApp">
        <div class="addMessage" @click="openMessageSubmitDialog">
          <img src="../../assets/img/addPic.png"><span>添加留言</span>
        </div>
    </div>
    <mu-dialog :open="messageListDialog" dialogClass="demo-popup-bottom messageListDialog" @close="messageListDialog=false" title="" scrollable>
      <div class="mu-appbar mu-paper-1 mu-appbar-2">
        <div @click="messageListDialog=false" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>&nbsp;&nbsp;&nbsp;用户留言({{messages.length||0}})</span></div>
        <div class="right">
          <span @click="openMessageSubmitDialog">留言</span>
        </div>
      </div>
      <div class="messageList">
          <div v-for="item in messages" class="message-content">
            <div>用户 {{timer(item.createdAt)}}</div>
            <div>
              <span>{{item.content}}</span>
            </div>
          </div>
      </div>
    </mu-dialog>
    <mu-dialog :open="messageSubmitDialog" dialogClass="demo-popup-bottom messageSubmitDialog" @close="openMessageSubmitDialog" scrollable>
      <div class="mu-appbar mu-paper-1 mu-appbar-2">
        <div @click="messageSubmitDialog=false" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>添加留言</span></div>
        <div class="right">
        </div>
      </div>
      <div class="message-text">
        <textarea v-model="content" placeholder="请输入您的留言(36个字符以内)" maxlength="36"></textarea>
        <div class="content-num">（{{content.length}}/36）</div>
      </div>
      <mu-raised-button @click="submit" label="提交" class="submitBtn" />
      <div style="width:100%;height:600px"></div>
    </mu-dialog>
    <!--<section id="language" class="info">
      <div class="left"></div>
      <div class="right bold">语言分布</div>
    </section>
    <div class="language-bg" v-if="languageChart.length>0">
      <div class="language-row clearfix" v-for="item in languageChart">
        <div class="line-bg float-l" >
          <div class="line" :style="item.style"></div>
        </div>
        <div class="language-type float-l"><nobr>{{item.name}}（{{item.val}}）</nobr></div>
        <div class="percentage float-l">{{item.percentage}}</div>
      </div>
    </div>
    <div v-else class="no-school">暂无语言分布信息</div>-->
    <!--<echarts :options="chartsoption"></echarts>-->
    <section id="resource" class="info">
      <div class="left"></div>
      <div class="right ">附近相似房源</div>
    </section>
    <div class="list-bg">
      <ul v-if="resourceData!=null" class="house-list" >
        <li v-for="list in resourceData" @click="routerDetail(list.id)">
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
      <div v-else class="no-school">暂无相似房源</div>
    </div>
    <!--<section id="money" class="info">
      <div class=""></div>
      <div class="right bold">贷款估计</div>
    </section>
    <div class="loan-box">
      <div class="loan-content">按照30%首付估计，您需要首付${{moneyData.firstPayment}}加元，交易税${{moneyData.buyTax}}加元，贷款期限30年，利率为2.15%，每月需还款：</div>
      <div class="loan-num">$&nbsp;<span>{{moneyData.everyMonth}}</span>加元 <span>(约合￥<i>{{(moneyData.everyMonth*5).toFixed(2)}}</i>元)</span></div>
      <div class="calculator" @click="goMoney"><i class="icon iconfont icon-shouye-jisuanqi"></i>房贷计算器</div>
      <p class="statement">免责申明：上方数据仅供参考，准确数据请咨询您的银行</p>
    </div>-->
    <mu-popup position="right" popupClass="demo-popup-right" :open="rightPopup" @close="close('right')">
      <div class="mu-appbar mu-paper-1">
        <div @click="rightPopup=false" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span></span></div>
        <div class="right"></div>
      </div>
      <div id="map-content"></div>
    </mu-popup>
    <mu-dialog dialogClass="swiper-class" @click="swiperDialog=false" :open="swiperDialog" title="" @close="close">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="banner in banners" :key="banner.big"><img @click="swiperDialog=true" :src="data.imageslocal!==''?imgAdd+'/'+banner.big:banner.big" alt=""></swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <span class="close-swiper" @click="swiperDialog=false">关闭</span>
    </mu-dialog>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix.less";
  .tipsDialog{
    width:325/@base;
    background: #4A4A4A;
    border-radius: 2/@base;
    padding:20/@base 15/@base;
    .tips-title{
      height:40/@base;
      span{
        font-size: 16/@base;
        color: #FFFFFF;
      }
      img{
        width:18/@base;
        height:18/@base;
      }
    }
    .tips-content{
      font-size: 12/@base;
      color: #FFFFFF;
      span.title{
        font-size: 12/@base;
        color:#F5A623;
      }
    }
  }
  ul.house-list .bottom-content img{
    width: 52/@base;
    height: 16/@base;
    vertical-align: sub;
  }
  div.detail-content{
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
    div.right{
      .icon{
        color:#f14114;
        font-size: 30/@base;
      }
      i.icon-icon_wendaxiangqing_fenxiang{
        font-size: 40/@base;
      }
    }
  }
  div.language-bg{
    padding:10/@base 15/@base;
    background: #fff;
    .language-row{
      padding:5/@base 0;
      .line-bg{
        width: 160/@base;
        .line{
          border-radius:5/@base ;
          height: 5/@base;
          background: #ffa48c;
          margin-top: 10/@base;
        }
      }
      .language-type{
        color:#1e1e1e;
        font-size: 14/@base;
        padding-left:25/@base;
        width:150/@base;
      }
      .percentage{
        color:#656565;
        font-size: 12/@base;
        width:30/@base;
      }
    }
  }
  div.addMessage{
    width:100/@base;
    height:30/@base;
    border: 1px solid #979797;
    margin:0 auto;
    img{
      width:14/@base;
      height:14/@base;
      vertical-align: middle;
    }
    span{
      vertical-align: middle;
      font-size: 14/@base;
      color: #1E1E1E;
      line-height: 30/@base;
    }
  }
  div.rooms{
    background: #fff;
    text-align: center;
    .rooms-row{
      height:50/@base;
      line-height:50/@base;
      border-bottom: 1px solid #dcdcdc;
      div{
        font-size: 12/@base;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      div:nth-child(1){
        width:115/@base;
      }
      div:nth-child(2){
        width:115/@base;
      }
      div:nth-child(3){
        width:145/@base;
      }

    }
    .rooms-row.rooms-head{
      height:40/@base;
      line-height:40/@base;
      color:#656565;
    }
  }
  div.messages{
    .message-content{
      background: #fff;
      border-bottom: 1px solid #dcdcdc;
      padding:15/@base;
      img{
        width: 20/@base;
        height: 20/@base;
        vertical-align: middle;
      }
      span{
        font-size: 14/@base;
        color: #1E1E1E;
        line-height: 20/@base;
        vertical-align: middle;
      }
    }
    .addMessage-bg{
      background: #fff;
      padding:20/@base 0;
    }
  }
  div.moreDialog{
    .more-title{
      margin-top:44/@base;
      background: #fff;
      line-height:50/@base;
      text-align: center;
      font-size: 16/@base;
      color: #1E1E1E;
    }
    .more-row{
      background: #fff;
      padding:10/@base 15/@base;
      border-bottom: 1px solid #dcdcdc;
      color:#000;
      font-size: 14/@base;
      .more-text{
        color:#656565;
        width:75/@base;
      }
      .more-content{
        width:268/@base
      }
    }
  }
  div.messageListDialog{
    .messageList{
      margin-top: 44/@base;
      .message-content{
        background: #fff;
        border-bottom: 1px solid #dcdcdc;
        padding:15/@base;
        span{
          font-size: 16/@base;
          color: #1E1E1E;
          line-height: 26/@base;
        }
      }
    }
  }
  div.messageSubmitDialog{
    .mu-appbar{
      position: static;
    }
    .message-text{
      position: relative;
      textarea{
        padding:15/@base 15/@base 30/@base;
        height:180/@base;
        width: 100%;
        border:0;
        resize: none;
      }
      .content-num{
        position: absolute;
        right:0;
        bottom:10/@base;
      }
    }
    .submitBtn{
      width:90%;
      color: #fff;
      background-color: #f14114;
      margin: 5%;
    }
  }
  div.no-school{
    padding:30/@base 0;
    text-align: center;
    background: #fff;
    font-size: 14px;
    color: #9B9B9B;
  }
  .screen-dialog{

  }
  div.mu-dialog-wrapper{
    bottom: 0;
    .close{
      width:100%;
      height:50/@base;
      padding:0 15/@base;
      position: fixed;
      bottom: 0;
      text-align: center;
      background: #fff;
      span{
        display: block;
        width:100%;
        height:50/@base;
        line-height:50/@base;
        color:#f14114;
        font-size: 16/@base;
        border-top: 1px solid #ddd;
      }
    }
    div.demo-popup-bottom{
      width:100%;
      height:100%;
      i.icon-login_icon_btn_clean {
        position: absolute;
        top:20/@base;
        right:30/@base;
        font-size: 20/@base;
      }
    }
    div.mu-dialog-body{
      max-height:100%!important;
      height:100%;
      padding:0!important;
    }
  }

  div.look-more{
    color:#656565;
    font-size: 12/@base;
    padding:0 15/@base;
  }
  div.swiper-class{
    width: 100%;
    height: 100%;
    background-color: #000;
    .mu-dialog-body{
      padding:0;
      height:100%;
      width:100%;
      .close-swiper{
        color:#fff;
        font-size: 16/@base;
        position: absolute;
        right:20/@base;
        top:20/@base;
      }
    }
    .swiper-container{
      top:30%;
      overflow: initial;
    }
    .swiper-container-autoheight .swiper-wrapper{
      height:200/@base!important;
      .swiper-slide{
        height:100%;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .swiper-pagination{
      width:60/@base;
      font-size: 12/@base;
      color: #FFFFFF;
      height:16/@base;
      line-height:16/@base;
      background-color: rgba(0,0,0,.4);
      border-radius: 8/@base;
      left:43%;
      top:-140/@base;
    }
  }
  #map-content{
    width:100%;
    height:100%;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 1.76rem;
    right: 0;
  }
  .demo-popup-right{
    width:100%;
    z-index: 999999999999!important;
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    transform: translate3d(0,0,0);
  }
  .detail-content,.demo-popup-bottom{
    background-color: #f6f6f6;
    .swiper-container{
      margin-top:44/@base;
      height:200/@base;
    }
    /*   #map{
         width:100%;
         height:160/@base;
       }*/
    #muTab{
      top:44/@base;
      z-index: 2014000 !important;
    }
    .mu-appbar{
      position: fixed;
    }
    .loan-box{
      padding:10/@base;
      background: #fff;
      ul.house-list {
        background-color: #fbfbfb;
        li {
          padding: 15/@base 10/@base;
          width: 100%;
          position: relative;
          background-color: #fff;
          border-bottom:1px solid #ececec;
          display:box;
          display:-webkit-box;
          display:-moz-box;
          padding-top:10/@base;
          img {
            width: 100%;
            vertical-align: bottom;
          }
          div.top-img {
            width:112/@base;
            position: relative;
            height:84/@base;
            div.top-small-tip{
              position: absolute;
              left:-4/@base;
              top:8/@base;
              background-image: url('../../assets/img/tipbag.png');
              width:60/@base;
              height:26/@base;
              line-height:18/@base;
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
            img{
              width:100%;
              height:100%;
            }
          }
          div.bottom-content {
            width: 100%;
            box-flex:1;
            -moz-box-flex: 1;
            -webkit-box-flex: 1;
            margin-left:10/@base;
            position: relative;
            h3{
              font-size: 16/@base;
              color:#4a4a4a;
            }
            div.shoucang{
              position: absolute;
              right:0;
              top:-6/@base;
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
            }
            div.money-time{
              position:absolute;
              right:0/@base;
              bottom:10/@base;
              p.time{
                font-size: 12/@base;
                color:#656565;
                width:80/@base;
                text-align: center;
              }
              p.money{
                color:#f14114;
                font-size:18/@base;
                font-weight: bold;
                width:100/@base;
                text-align: center;
                span{
                  font-size: 12/@base;
                  -webkit-transform-origin-x: 0;
                  -webkit-transform: scale(0.90);
                  display:inline-block;
                }
              }
            }
          }
        }
      }
      /*p.statement{
        width:100%;
        text-align: center;
        font-size: 12/@base;
        color: #C2C2C2;
      }
      div.calculator{
        width:145/@base;
        height:32/@base;
        line-height:32/@base;
        color:#EE6723;
        font-size: 14/@base;
        margin:36/@base auto;
        border:1px solid #EE6723;
        border-radius: 16/@base;
        text-align: center;
        i.icon{
          margin-right:5/@base;
          vertical-align: middle;
          position: relative;
        }
      }
      div.loan-content{
        font-size: 14/@base;
        color: #4A4A4A;
      }
      div.loan-num{
        font-size: 12/@base;
        color: #4A4A4A;
        width:100%;
        text-align: center;
        span:first-child{
          color:#EE6723;
          font-size: 24/@base;
        }
        span:last-child{
          font-size: 12/@base;
          color: #9B9B9B;
          i{
            color: #000000;
          }
        }
      }*/
    }
    .table-box{
      background: #fff;
      .container{
        width:100%;
        div.container-box{
          border-bottom:1px solid #ddd;
          div.container-top{
            display:box;
            display:-webkit-box;
            display:-moz-box;
          }
          div.container-top>div{
            box-flex:1;
            -moz-box-flex: 1;
            -webkit-box-flex: 1;
            display:block;
            width:100%;
            text-align: center;
            font-size: 12/@base;
            color: #4A4A4A;
            padding:11/@base 0;
          }
          div.container-bottom{
            font-size: 12/@base;
            margin-left:20/@base;
            color: #9B9B9B;
          }
        }
      }
      div.header{
        display:box;
        display:-webkit-box;
        display:-moz-box;
      }
      div.header>div{
        box-flex:1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        font-size: 12/@base;
        color: #4F9DEB;
        border-bottom:1px solid #ddd;
        display:block;
        width:100%;
        text-align: center;
        padding:12/@base 0;
      }
      div.blueColor{
        color: #4F9DEB!important;
      }
    }
    .echarts{
      width:100%;
      height:300/@base;
      background:#fff!important;
    }
    .mu-tab-link-highlight{
      background-color: #f14114;
      height:1px;
    }
    .primary,.middle{
      width:100%;
      background-color: #fff;
      padding:20/@base 15/@base;
      border-bottom: 1px solid #dcdcdc;
      li.school-top{
        p.school-name{
          color: #2889EA;
          font-size: 18/@base;
          font-weight: bold;
          span{
            display: inline-block;
            width:75% !important;
            color: #2889EA!important;
            vertical-align: middle;
            overflow: hidden;
            font-size: 18/@base!important;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          i{
            font-size: 18/@base!important;
            position: relative;
            top:2/@base;
            vertical-align: middle;
            margin-left:10/@base;
          }
        }
        p.juli{
          font-size: 14/@base;
          color: #9B9B9B;
          i.icon{
            color:#EE6723;
            font-size: 15/@base;
          }
        }
        span.chool-type{
          display: inline-block;
          width:44/@base;
          height:22/@base;
          text-align: center;
          line-height:22/@base;
          border:1px solid #ddd;
          margin-right:10/@base;
          margin-top:15/@base;
          margin-bottom:15/@base;
        }
      }
      div.school-bottom{
        .school-info{
          width: 100%;
          i.icon-icon_xiaojiantouyou{
            margin-top:30/@base;
            color:#4A4A4A;
          }
          .school-icon{
            width:60/@base;
            height:60/@base;
            img{
              width:60/@base;
              height:60/@base;
            }
          }
          .school-address{
            margin-left:10/@base;
            line-height: 20/@base;
            max-width: 175/@base;
            div.school-address-top{
              font-size: 16/@base;
              color:#1e1e1e;
              nobr{
                display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
              }
            }
            div.school-address-middle,div.school-address-bottom{
              font-size: 12/@base;
              color:#7f7f7f;
              padding:2/@base 0;
              i.icon1{
                color:#D0011B;
              }
              i.icon2{
                color:#ABABAB;
              }
              span{
                font-size: 12/@base;
                color:#7f7f7f;
              }
            }
          }
          .school-ranking{
            width:80/@base;
            height:60/@base;
            line-height: 30/@base;
            text-align: center;
            p:first-child{
              color:#f14114;
              font-size: 16/@base;
              span:last-child{
                font-size: 16/@base;
              }
            }
            p:last-child{
              color:#7f7f7f ;
              font-size: 12/@base;
            }
          }
        }
        .school-periphery{
          padding:0 8/@base;
          line-height: 50/@base;
          color:#656565;
          span{
            font-size: 16/@base;
            color:#1e1e1e;
          }
        }
        /*div.school-content{
          box-flex:1;
          -moz-box-flex: 1;
          -webkit-box-flex: 1;
          li{
            margin:7/@base 0;
            span{
              font-size: 14/@base;
              color: #9B9B9B;
              display:inline-block;
            }
            span:first-child{
              width:100/@base;
            }
            span:last-child{
              i{
                color: #2889EA;
              }
            }
          }
        }
        div.school-num{
          width:100/@base;
          height:100/@base;
          margin-left:58/@base;
          background-image: url('../../assets/img/housebg.png');
          background-size: 100% 100%;
          p{
            width:100%;
            text-align: center;
          }
          p:first-child{
            padding-top:26/@base;
            margin-bottom:10/@base;
            font-size: 10/@base;
            color: #9b9b9b;
            transform:scale(.9);
          }
          p:last-child{
            font-size: 24/@base;
            color: #f14114;
            margin-top:-10/@base;
            i{
              font-size: 10/@base;
              color: #9B9B9B;
            }
          }
        }*/
      }
    }
    .mu-tabs{
      background-color: #FAFAFA;
      border-bottom:1px solid #ddd;
    }
    .mu-tab-link{
      color:#9B9B9B;
    }
    .mu-tab-active {
      font-size: 12/@base;
      color: #f14114;
    }
    .el-collapse-item__content{
      padding-top:0;
      padding-right:0;
    }
    .el-collapse-item__wrap{
      background-color: #f6f6f6;
    }
    .mu-list>div{
      margin-left:42/@base;
      border-bottom:1px solid #ddd;
    }
    .mu-list{
      padding-top:0;
      .mu-item{
        padding-left:0;
      }
      .mu-item.show-right{
        padding:0;
      }
      .mu-item-title{
        padding-right:26/@base;
        height:100%;
        span{
          font-size: 14/@base;
          color: #4A4A4A;
        }
        span:last-child{
          float:right;
        }
      }
    }
    .el-collapse-item{
      .el-collapse-item__header{
        height:50/@base;
        line-height:50/@base;
        i.el-icon-arrow-right{
          margin-top:20/@base;
        }
        span.juli{
          float:right;
          margin-right:7.5/@base;
          font-size: 14/@base;
          color: #4A4A4A;
        }
        span.name{
          font-size: 14/@base;
          margin-left:13/@base;
          color: #4A4A4A;
        }
        span.first{
          font-size: 14/@base;
          color: #4A4A4A;
        }
      }
    }
    .el-collapse-item.is-active>.el-collapse-item__header .el-collapse-item__header__arrow {
      float: right;
      margin-top: 15px;
      margin-right: 20px;
    }
    .el-collapse-item__header__arrow {
      float: right;
      margin-top: 15px;
      margin-right: 20px;
    }
    section.content-detail{
      padding:16/@base 12/@base 13/@base 12/@base;
      font-size: 14/@base;
      color: #4A4A4A;
      background-color: #fff;
      letter-spacing: 1px;
      line-height: 23px;
    }
    ul.info-detai1:nth-child(2){
      li{
        span:last-child{
          margin-left:0;
        }
      }
    }
    ul.info-detai1{
      padding:10/@base 0;
      background-color: #fff;
      li{
        font-size: 12/@base;
        color: #656565;
        padding:7/@base 0;
        span:first-child{
          display: inline-block;
          text-align:justify;
        }
        span:last-child{
          color: #000;
          font-weight: bold;
          margin-left:18/@base;
          display: inline-block;
          width:160/@base;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }

    div.info-detai-bg{
      width:100%;
      background-color: #fff;
      padding-bottom:10px;
      border-bottom: 1px solid #ddd;
      ul.info-detai:nth-child(2){
        li{
          span:last-child{
            margin-left:0;
          }
        }
      }
      ul.info-detai{
        padding:10/@base 15/@base;
        background-color: #fff;
        li{
          padding:7/@base 0;
          >span:first-child{
            font-size: 14/@base;
            color: #656565;
            display: inline-block;
            width:75/@base;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          >span:last-child{
            font-size: 14/@base;
            color: #1e1e1e;
            display: inline-block;
            overflow: hidden;
            vertical-align:top;
            img{
              width:13/@base;
              height:13/@base;
              vertical-align: middle;
            }
          }
        }
      }
    }
    section.info{
      width:100%;
      background-color: #fff;
      height:40/@base;
      line-height:40/@base;
      border-top:1px solid #ddd;
      border-bottom:1px solid #ddd;
      margin-top:16/@base;
      div.left{
        display:inline-block;
        width:2px;
        height:16/@base;
        background: #f14114;
        vertical-align: sub;
      }
      div.right{
        display:inline-block;
        font-size: 16/@base;
        margin-left:10/@base;
        color: #4A4A4A;
      }
    }
    div.school-map{
      height: 150/@base;
      overflow: hidden;
      position: relative;
      div#googleMap{
        width: 375/@base;
        height: 200/@base;
      }
      div.address{
        position: absolute;
        height:30/@base;
        top:30/@base;
        width: 100%;
        text-align: center;
        i{
            color:#9B9B9B;
        }
        span{
          background: #fff;
          padding:0 12/@base;
          line-height: 30/@base;
          height: 30/@base;
          display: inline-block;
          color:#4a4a4a;
          font-size: 12/@base;
        }
      }
      div.distance{
        width:40/@base;
        height:40/@base;
        border-radius:20/@base;
        background:#ebebeb;
        margin-top:15/@base;
        i.icon-icon-daohangx{
          color:#f14114;
          font-size: 30/@base;
          margin-left:5/@base;
        }
      }
    }
    .detail-text{
      background-color: #fff;
      padding:5/@base 15/@base 15/@base;
      border-bottom:1px solid #ddd;
      div.detail-text1{
        div.detail-money{
          font-size: 12/@base;
          color: #4A4A4A;
          overflow-y: hidden;
          span:nth-child(1){
            font-size: 18/@base;
            color: #f14114;
            font-weight: bold;
          }
          span:nth-child(2){
            font-size: 12/@base;
            color: #9B9B9B;
            position: relative;
            i{
              font-size: 12/@base;
              color: #1e1e1e;
            }
            i.icon-icon_jisuanqi1{
              font-size: 50/@base;
              color: #feae9a;
              position:absolute;
              top:-30/@base;
            }
          }
        }
        p.detail-location{
          font-size: 12/@base;
          color: #7f7f7f;
          line-height: 40/@base;
          .scale{
            font-size: 16/@base;
            color:#1e1e1e;
          }
          .year{
            font-size: 12/@base;
          }
          i.icon{
            font-size: 20/@base;
            vertical-align: middle;
            margin-left:-5/@base;
            color:#9b9b9b;
          }
        }
      }
      div.detai-text2{
        display:box;
        display:-webkit-box;
        display:-moz-box;
        padding-top:10/@base;
        div:nth-child(2),div:nth-child(3){
          p:last-child{
            margin-top:2/@base;
          }
        }
        div{
          box-flex:1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          width:100%;
          p:first-child{
            font-size: 12/@base;
            color: #4A4A4A;
          }
          p:last-child{
            font-size: 18/@base;
            color: #FF690B;
            span{
              font-size: 20/@base;
            }
          }
          p{
            width:100%;
            text-align: center;
          }
        }
      }
    }
    .mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#4a4a4a;
      font-size: 17/@base;
      div.mu-appbar-title{
        span{
          /*margin-left:30/@base;*/
        }
      }
    }
    div.swiper-container{
    }
    .swiper-container-autoheight .swiper-wrapper{
      height:240/@base!important;
      .swiper-slide{
        height:100%;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .swiper-pagination{
      width:60/@base;
      font-size: 12/@base;
      color: #FFFFFF;
      height:16/@base;
      line-height:16/@base;
      background-color: rgba(0,0,0,.4);
      border-radius: 8/@base;
      left:82%;
    }
  }
  div.red-color{
    color:#f14114;
  }
</style>
<script>
  import Vue from 'vue'
  import myPosition from '../../assets/img/myPosition.png'
  import {rxUtils} from '../../assets/js/rxUtils'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data(){
      return{
        isApp:false,
        hideTitle:false,
        cityMap:{
          "ca0101":{code:'ca0101',cityName:'多伦多',country:'ca',region:'YTO',detailName:'房源详情'},
          "ca0201":{code:'ca0201',cityName:'温哥华',country:'ca',region:'YVR',detailName:'房源详情'},
          "us0101":{code:'us0101',cityName:'纽约',country:'us',region:'us0101',detailName:'美国房源详情'},
          "us0201":{code:'us0201',cityName:'旧金山',country:'us',region:'us0201',detailName:'美国房源详情'},
          "us0202":{code:'us0202',cityName:'洛杉矶',country:'us',region:'us0202',detailName:'美国房源详情'},
          "us0301":{code:'us0301',cityName:'西雅图',country:'us',region:'us0301',detailName:'美国房源详情'}
        },
        tipDialog1:false,
        tipDialog2:false,
        tipDialog3:false,
        content:'',
        messageSubmitDialog:false,
        messageListDialog:false,
        messages:[],
        tabs:[],
        style:{width:'30%'},
        languageChart:[],
        toast:false,
        toastMsg:'',
        rightPopup:false,
        tabShow:false,
        nav:'info',
        topTitle:'MLSNO',
        banners:[
        ],
        english:false,
        swiperDialog:false,
        activeNames:1,
        chartsoption:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color:['#C2F170','#70F1CD','#70D7F1','#7084F1','#FE98EE','#795547','#06a5ff','#a421bd','#3f51b5','#01bdd8'],
          legend:{
            orient:'vertical',
            right:'1%',
            top:'16%',
            itemGap:4,
            data:[]
          },
          yAxis: {},
          series: [{
            name: '访问来源',
            type: 'pie',
            radius : '50%',
            center: ['28%', '50%'],
            labelLine: {
              normal: {
                show: false
              }
            },
            label:{
              normal:{
                show:false
              }
            },
            data: []
          }]

        },
        data:{},
        resourceData:[],
        price:'',
        chinaPrice:'',
        buildingType:'',
        imgAdd:'',
        initialSlide:0,
        tdmj:'',
        info:[],
        infoArr1:[],
        infoArr2:[],
        dialog: false,
        longitude:'',
        latitude:'',
        detailInfo1:[],
        detailInfo2:[],
        schoolData:{
          xx:{},
          zx:{}
        },
        xxjuli:'',
        zxjuli:'',
        rooms:[],
        moneyData:'',
        map1:'',
        hostHouse:''
      }
    },
    beforeDestroy(){
      document.removeEventListener('scroll',this.scroll );
    },
    mounted(){
      scroll(0,0);
      this.$nextTick(function () {
        let self=this;
        document.title=this.$route.name;
        if(self.$route.query.region){
          //获取APP标识
          self.isApp = self.$route.query.isApp?self.$route.query.isApp:false;
          self.hideTitle = self.$route.query.hideTitle=='true'?true:false;

          var cityObj = self.cityMap[self.$route.query.region];
          self.cityName=cityObj.cityName;
          self.code=cityObj.code;
          self.region=cityObj.region;
          self.country=cityObj.country;
          self.detailName=cityObj.detailName;
          sessionStorage.setItem('cityName',self.cityName)
          sessionStorage.setItem('region',self.region)
          sessionStorage.setItem('code',self.code)
          sessionStorage.setItem('country',self.country)
          sessionStorage.setItem('detailName',self.detailName)
        }else{
          self.region=sessionStorage.getItem("region");
          self.code=sessionStorage.getItem("code");
        }
        self.getDetail(this.$route.params.id);
      })
    },
    created(){

    },
    watch: {
      /*topPopup (val) {
       if (val) {
       setTimeout(() => {
       this.topPopup = false
       }, 2000)
       }
       }*/
    },
    methods:{
      getDetail(id){
        let self = this;
        self.$http.get('/residence/getDetail.json', {'params':{'id':id,region:self.region}}, {emulateJSON: true}).then(function (response) {
          self.data=response.body.data;
          //查询留言信息
          self.getlistComment();
          this.price=rxUtils.mil(String((self.data.price/10000).toFixed(2)))
          this.imgAdd=rxUtils.hostHouse;
          this.hostHouse=rxUtils.hostHouse;//房子
          this.chinaPrice=rxUtils.mil(String(parseInt(self.data.price*5.1127/10000)))
          if(self.data.buildingType=='House'){
            self.buildingType='独立屋'
          }else if(self.data.buildingType=='Apartment'){self.buildingType='公寓'}else{
            self.buildingType='排屋'
          }
          if(self.data.imageslocal!==''){
            this.banners=JSON.parse(self.data.imageslocal).contentslide;
          }else{
            this.banners=null;
          }
          if(this.data.landTable!==''){
            this.tdmj=JSON.parse(this.data.landTable).Frontage;
          }
          let info=JSON.parse(this.data.featuresTable);
          this.info=info;
          /*console.log('-----');
          console.log(info);
          console.log(info['土地面积']);
          if(info['土地面积1']){
            console.log(info['土地面积1']);
          }
          for(let key in info){
            if(key=='物业类型'||key=='建筑类型'){
            }else{
              this.infoArr1.push(key)
            }
          }
          for(let i=0;i<this.infoArr1.length;i++){
            this.infoArr2.push(info[this.infoArr1[i]])
          }*/
          this.longitude=this.data.longitude;
          this.latitude=this.data.latitude;
          /*if(this.data.detailsTable!==''){
            let detailInfo=JSON.parse(this.data.detailsTable)
            for(let key in detailInfo){
              this.detailInfo1.push(key)
            }
            for(let i=0;i<this.detailInfo1.length;i++){
              this.detailInfo2.push(detailInfo[this.detailInfo1[i]]);
            }
          }
          if(this.data.buildingTable!==''){
            let detailInfo3=JSON.parse(this.data.buildingTable)
            for(let key in detailInfo3){
              this.detailInfo1.push(key)
            }
            for(let i=0;i<this.detailInfo1.length;i++){
              if(detailInfo3[this.detailInfo1[i]]!==undefined){
                this.detailInfo2.push(detailInfo3[this.detailInfo1[i]]);
              }
            }
          }
          if(this.data.landTable!==''){
            let detailInfo4=JSON.parse(this.data.landTable)
            for(let key in detailInfo4){
              this.detailInfo1.push(key)
            }
            for(let i=0;i<this.detailInfo1.length;i++){
              if(detailInfo4[this.detailInfo1[i]]!==undefined){
                this.detailInfo2.push(detailInfo4[this.detailInfo1[i]]);
              }
            }
          }
          this.infoArr1.push('邮政编码');
          this.infoArr2.push(this.data.address.split(' ')[this.data.address.split(' ').length-1]);*/
          //var myCenter=new google.maps.LatLng(43.58165,-79.6481);
          var myCenter=new google.maps.LatLng(self.data.latitude,self.data.longitude);
          var el = document.getElementById("googleMap");
          var mapProp = {
            center:myCenter,
            zoom:13,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            disableDefaultUI:true,
            draggable:false,

          };
          var googleMap=new google.maps.Map(el,mapProp);
          console.log(googleMap);
          var marker=new google.maps.Marker({
            position:myCenter,
            icon:myPosition
          });
          marker.setMap(googleMap);
          //setTimeout(hideTip, 1000);//隐藏谷歌logo
          function hideTip() {
            var lst = el.getElementsByTagName("a");
            if(lst.length>0){
              for (var i = 0; i < lst.length; i++) {
                lst[i].parentElement.style.display = "none";
              }
            }else{
              setTimeout(hideTip, 500);
            }
          }

          this.map=googleMap;
          /*var geojson = {
           "type": "FeatureCollection",
           "features": [
           {
           "type": "Feature",
           "properties": {
           "message": "Foo",
           "iconSize": [60, 60],
           'className':'icon iconfont icon-icon_shouye_dingweidian green-color'
           },
           "geometry": {
           "type": "Point",
           "coordinates": [self.data.latitude,self.data.longitude]
           }
           }
           ]
           };
           geojson.features.forEach(function(marker) {
           // create a DOM element for the marker
           console.log("marker");
           console.log(marker);
           var el = document.createElement('div');
           el.className = 'icon iconfont icon-icon_shouye_dingweidian red-color';
           el.style.fontSize='48px';
           el.addEventListener('click', function() {
           let icon=document.getElementsByClassName('icon-icon_shouye_dingweidian');
           for(let i=0;i<icon.length;i++){
           icon[i].style.color='red';
           }
           el.style.color='green';
           map.flyTo({center:marker.geometry.coordinates});
           });
           // add marker to map
           /!*new GMarker(el, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]})
           .setLatLng(marker.geometry.coordinates)
           .addTo(map);*!/
           });*/
          let maxNum=0;
          let sunNum=0;
          let chartObj=JSON.parse(self.data.languageChart).chartmap;
          for(let key in chartObj){
            if(chartObj[key]>maxNum){
              maxNum = chartObj[key];
            }
            sunNum+=chartObj[key];
          }
          for(let key in chartObj){
            let languageObj={};
            languageObj.name=key;
            languageObj.val=chartObj[key];
            languageObj.percentage=(chartObj[key]/sunNum*100).toFixed(2)+'%';
            languageObj.style={width:(chartObj[key]/maxNum*100).toFixed(2)+'%'};
            self.languageChart.push(languageObj);
          }
          console.log(self.languageChart);
          let seriesData=[];
          //self.chartsoption.series[0].data=seriesData;
          //self.chartsoption.legend.data=lagType;
          if(self.data.roomsTable!==''){
            self.rooms=JSON.parse(self.data.roomsTable);
            self.tabs=[{'value':'info','title':'信息'},{'value':'map-index','title':'地图'},{'value':'rooms','title':'房间'},{'value':'school','title':'学区'},{'value':'message','title':'留言'},{'value':'resource','title':'推荐'}];
          }else{
            self.tabs=[{'value':'info','title':'信息'},{'value':'map-index','title':'地图'},{'value':'school','title':'学区'},{'value':'message','title':'留言'},{'value':'resource','title':'推荐'}];
          }
          //self.rooms=[1,2];
          //self.tabs=['pic','info','map-index','school','language','resource'];
          //self.tabs=[{'value':'info','title':'信息'},{'value':'map-index','title':'地图'},{'value':'rooms','title':'房间'},{'value':'school','title':'学区'},{'value':'message','title':'留言'},{'value':'resource','title':'推荐'}];
          //self.tabs=[{'value':'pic','title':'留言'},{'value':'info','title':'信息'},{'value':'map-index','title':'地图'},{'value':'school','title':'学区'},{'value':'language','title':'房间'},{'value':'resource','title':'推荐'}];
          //self.tabs=[{'value':'pic','title':'留言'},{'value':'info','title':'信息'},{'value':'map-index','title':'地图'},{'value':'school','title':'学区'},{'value':'resource','title':'推荐'}];
          function houseCalculator(totalPrice, firstRate, year, monthRate, week) {
            var b = totalPrice, //总价
              c = monthRate, //利率
              d = firstRate, //首付比例
              e = .01 * b * d, // 0.01*总价*首付比例
              f = year, //还款年限
              g = week, //还款周期 12月付、24半月付、52周付
              h = b * (1 - d / 100),
              i = c / 100,
              j = i / 2,
              k = 12 * f,
              l = 2 / 12,
              m = Math.pow(1 + j, l) - 1,
              n = Math.pow(1 + m, k),
              o = h * m * n / (n - 1);
            //获取交易税
            function getBuyTax() {
              var tal = totalPrice;
              if (200000 >= b) {
                return priceConvert(.01 * tal, 2);
              } else {
                if (tal > 20000) {
                  return priceConvert(.02 * tal - 2000, 2);
                }
              }
              return 0;
            }
            //价格转换
            function priceConvert(inputNum, precision) {
              return parseFloat(parseFloat(inputNum).toFixed(precision));
            }
            //贷款总额
            function getLoanPrice() {
              return priceConvert(b-e,2);
            }
            //利息总额
            function getRatePrice() {
              var tmp = 12 * o / g;
              var loan = getLoanPrice();
              return priceConvert(tmp*g*f-loan,2);
            }
            return {
              everyMonth: priceConvert(12 * o / g, 2),
              firstPayment: e,
              buyTax: getBuyTax(),
              loanPayment: getLoanPrice(),
              ratePayment: getRatePrice()
            };
          }
          this.moneyData=houseCalculator(self.data.price,0.3,30,0.0215,12);
          //self.$http.post('/residence/search.json', {pageSize:10,currentPage:1,region:'YVR'}, {
          self.$http.post('/residence/listRelevance.json', {id:self.data.id,region:self.region}, {
            emulateJSON: true
          }).then(function (response) {
            self.resourceData=response.data.data;
          }).then(function (error) {})
          document.addEventListener('scroll',this.scroll )
        })
      },
      showMessageListDialog(){
        _czc.push(['_trackEvent', '房源详情', 'MoreComments','全部留言']);
        this.messageListDialog=true
      },
      showTipDialog1(){
        _czc.push(['_trackEvent', '房源详情', 'ClickMlsMark','点击Mls叹号图标']);
        this.tipDialog1=false
      },
      showTipDialog2(){
        _czc.push(['_trackEvent', '房源详情', 'ClickLandTaxMark','点击地税金额叹号图标']);
        this.tipDialog2=false
      },
      showTipDialog3(){
        _czc.push(['_trackEvent', '房源详情', 'ClickLandTypeMark','点击土地性质叹号图标']);
        this.tipDialog3=false
      },
      showDialog(){
        _czc.push(['_trackEvent', '房源详情', 'HouseMoreDetail','更多介绍mslno='+this.data.mslno]);
        this.dialog=true
      },
      showSwiperDialog(){
        _czc.push(['_trackEvent', '房源详情', 'ClickHouseImage','点击房源图片']);
        this.swiperDialog=true;
      },
      showTips(){
          let self = this;
          self.tipDialog1 = true;
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      openMessageSubmitDialog(){
        let self = this;
        _czc.push(['_trackEvent', '房源详情', 'SubmitComments','添加留言']);
        let authentication = rxUtils.sessionStorage.getItem("authentication")?rxUtils.sessionStorage.getItem("authentication"):null;
        if(authentication){
          self.messageListDialog=false
          self.messageSubmitDialog=true;
        }else{
          this.messageListDialog=false;
          this.toastMsg='请先登录'
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.toast = false;
            this.$router.push({name:'登录首页'})
          }, 2000)
        }
      },
      submit(){
        let self = this;
        if(!self.content.length){
          this.toastMsg='请输入留言内容';
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.toast = false;
          }, 2000)
          return false;
        }
        self.$http.post('/residence/doComment.json', {region:self.code,residenceId:self.data.id,content:self.content}, {emulateJSON: true}).then(function (response) {
          //self.messages=response.body.data?response.body.data:[];
          if(response.code=='405'){
            self.toastMsg='登录已失效，请重新登录'
            self.toast = true
            if (self.toastTimer) clearTimeout(self.toastTimer)
            self.toastTimer = setTimeout(() => {
              self.toast = false;
              self.$router.push({name:'登录首页'})
            }, 2000)
          }else{
            self.messageSubmitDialog=false;
            self.content='';
            self.toastMsg='提交成功';
            self.toast = true
            if (self.toastTimer) clearTimeout(self.toastTimer)
            self.toastTimer = setTimeout(() => {
              self.toast = false;
            }, 2000)
            self.handleTabChange1('message');
            self.getlistComment();
          }
        })
      },
      getlistComment(){
        let self = this;
        self.$http.get('/residence/listComment.json', {'params':{'residenceId':self.data.id,'pageSize':10,'currentPage':1,region:self.region}}, {emulateJSON: true}).then(function (response) {
          self.messages=response.body.data?response.body.data:[];
        })
      },
      //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
      GetDistance(obj){
        let self=this;
        var lat1=self.latitude;
        var lng1=self.longitude;
        var lat2 = obj.latitude;
        var lng2 = obj.longitude;
        var radLat1 = Rad(lat1);
        var radLat2 = Rad(lat2);
        var a = radLat1 - radLat2;
        var  b = Rad(lng1) - Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
            Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000; //输出为公里
        function Rad(d){
          return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
        }
        return s.toFixed(2);
      },
      routerSchool(id){
        _czc.push(['_trackEvent', '房源详情', 'SchoolDetail','学校详情id='+id]);
        this.$router.push({name:'学校详情',params:{id:id}})
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
      routerDetail(id){
        let self = this;
        _czc.push(['_trackEvent', '房源详情', 'SimilarHouse','相似房源mslno='+id]);
        self.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:id},query:{region:sessionStorage.getItem('code')}});
        self.getDetail(id);
        setTimeout(()=>{
          scroll(0,0);
        },0)
      },
      showMap(){
        let self=this;
        _czc.push(['_trackEvent', '房源详情', 'ClickHouseMap','点击房源地图mslno='+self.data.mslno]);
        this.$router.push({name:'房源地图',query:{latitude:self.latitude,longitude:self.longitude,address:self.data.address,swipeShow:true}});
        return false;
      },
      shoucang(id,type){
        let self=this;
        if(!sessionStorage.getItem("authentication")){
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
              id:id,region:self.region
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  _czc.push(['_trackEvent', '房源详情', 'LikeHouse','取消收藏房源']);
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
                    this.$router.push({name:'登录首页'});
                    sessionStorage.removeItem("authentication");
                  }, 2000)
                }
              }).then(function (error) {
            })
          }else{
            self.$http.post('/residence/doFavor.json', {
              id:id,region:self.region
            }, {emulateJSON: true})
              .then(function (response) {
                if(response.body.success){
                  _czc.push(['_trackEvent', '房源详情', 'LikeHouse','收藏房源']);
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
                    this.$router.push({name:'登录首页'});
                    sessionStorage.removeItem("authentication");
                  }, 2000)
                }
              }).then(function (error) {
            })
          }
        }
      },//收藏
      goMoney(){
        _czc.push(['_trackEvent', '房源详情', 'CaculatorInHouse','房贷计算器']);
        this.$router.push({name:'计算器',query:{price:this.data.price,country:'ca'}})
      },
      closeRight () {
        this.rightPopup = false
      },
      handleTabChange (val) {
        this.activeTab = val
      },//tab
      back(){
        this.$router.back();
      },//返回上一页
      close() {
        this.dialog = false;
      },//关闭轮播弹窗
      handleTabChange1(val){
        this.nav=val
        _czc.push(['_trackEvent', '房源详情', 'HouseNavigationBar','房源顶部的导航条']);
        document.body.scrollTop=document.getElementById(val).offsetTop-90;
        /*if(document.body.scrollTop<document.getElementById(val).offsetTop){
         if(val!=='money'){
         var gundong=setInterval(function(){
         document.body.scrollTop+=20;
         if(document.body.scrollTop>document.getElementById(val).offsetTop-100){
         clearInterval(gundong)
         }
         },1)
         }else{
         var gundong1=setInterval(function(){
         document.body.scrollTop+=40;
         if(document.body.scrollTop>document.getElementById(val).offsetTop-400){
         clearInterval(gundong1)
         }
         },1)
         }
         }
         if(document.body.scrollTop>document.getElementById(val).offsetTop){
         var gundong3=setInterval(function(){
         document.body.scrollTop-=20;
         if(document.body.scrollTop<document.getElementById(val).offsetTop){
         clearInterval(gundong3)
         }
         },1)
         }*/
      },//锚点滚动
      scroll(){
        console.log('scroll');
        let self = this;
        if(self.rooms&&self.rooms.length>0){
          console.log("rooms有值");
          //监听滚动条改变tabs
          this.tabShow=true;
          if(document.body.scrollTop<document.getElementById(self.tabs[0].value).offsetTop-90){
            this.tabShow=false;
          }else if(document.body.scrollTop>=document.getElementById(self.tabs[0].value).offsetTop-90&&document.body.scrollTop<document.getElementById(self.tabs[1].value).offsetTop-90){
            this.nav=self.tabs[0].value;
            this.tabShow=true;
          }else if(document.body.scrollTop>document.getElementById(self.tabs[1].value).offsetTop-90&&document.body.scrollTop<document.getElementById(self.tabs[2].value).offsetTop-90){
            this.nav=self.tabs[1].value;
            this.tabShow=true;
          }else if(document.body.scrollTop>document.getElementById(self.tabs[2].value).offsetTop-90&&document.body.scrollTop<document.getElementById(self.tabs[3].value).offsetTop-90){
            this.nav=self.tabs[2].value;
            this.tabShow=true;
          }else if(document.body.scrollTop>document.getElementById(self.tabs[3].value).offsetTop-90&&document.body.scrollTop<document.getElementById(self.tabs[4].value).offsetTop-90){
            this.nav=self.tabs[3].value;
            this.tabShow=true;
          }else if(document.body.scrollTop>document.getElementById(self.tabs[4].value).offsetTop-90&&document.body.scrollTop<document.getElementById(self.tabs[5].value).offsetTop-90){
            this.nav=self.tabs[4].value;
            this.tabShow=true;
          }else if(document.body.scrollTop>document.getElementById(self.tabs[5].value).offsetTop-90){
            this.nav=self.tabs[5].value;
            this.tabShow=true;
          }
          console.log(this.nav);
        }else{
          //监听滚动条改变tabs
          console.log("rooms无值");
          this.tabShow=true;
          if(document.body.scrollTop<document.getElementById(self.tabs[0].value).offsetTop-90){
            this.tabShow=false;
          }else if(document.body.scrollTop>=document.getElementById(self.tabs[0].value).offsetTop-90&&document.body.scrollTop<document.getElementById(self.tabs[1].value).offsetTop-90){
            this.nav=self.tabs[0].value;
          }else if(document.body.scrollTop>document.getElementById(self.tabs[1].value).offsetTop-90&&document.body.scrollTop<document.getElementById(self.tabs[2].value).offsetTop-90){
            this.nav=self.tabs[1].value;
          }else if(document.body.scrollTop>document.getElementById(self.tabs[2].value).offsetTop-90&&document.body.scrollTop<document.getElementById(self.tabs[3].value).offsetTop-90){
            this.nav=self.tabs[2].value;
          }else if(document.body.scrollTop>document.getElementById(self.tabs[3].value).offsetTop-90&&document.body.scrollTop<document.getElementById(self.tabs[4].value).offsetTop-90){
            this.nav=self.tabs[3].value;
          }else if(document.body.scrollTop>document.getElementById(self.tabs[4].value).offsetTop-90){
            this.nav=self.tabs[4].value;
          }
          console.log(this.nav);
        }
        //let tabs=['pic','info','map-index','school','language','resource'];

      }
    },
    props:{
      swiperOption:{
        type:Object,
        default: function () {
          let self=this;
          return {
            // 所有配置均为可选（同Swiper配置）
            autoplay: 3000,
            direction : 'horizontal',
            grabCursor : true,
            setWrapperSize :true,
            autoHeight: true,
            loop:true,
            speed:500,
            paginationType: 'fraction',
            autoplayDisableOnInteraction:false,
            pagination : '.swiper-pagination',
            paginationClickable :true,
            mousewheelControl : false,
            observeParents:true,
            debugger: true,
            initialSlide:0,
            // swiper callbacks
            // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
            onSlideChangeEnd: function(swiper){
//              self.initialSlide=swiper.activeIndex;
            }
            // more Swiper config ...
            // ...
          }
        }

      },
      namespace:{
        type:String,
        default:'mySwiperA'
      },
      imgAffix:{
        type:Object,
        default: function () {
          return {
            prefix:'https://img.findaily.cn/',
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
      type:{
        type:String,
        default:"link"
      }
    },//轮播组件传参
    components: {
      swiper,
      swiperSlide,
    }
  }
</script>
