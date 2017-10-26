<template :key="key">
  <div class="CompareHouse clearMargin">
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    <div class="mu-appbar mu-paper-1 mu-appbar-2">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title" ><span >{{title}}</span></div>
      <div class="right">
        <img src="../../assets/img/toMap.png" @click="routerMap()" />
      </div>
    </div>
    <div class="currInfo">
      <div class="row row1"><span>在售价格:</span></div>
      <div class="row row2"><span>${{(residenceData.price/10000).toFixed(2)}}万美元</span></div>
      <div class="row row3"><span>{{residenceData.beds}}室{{residenceData.baths}}卫</span><span>{{residenceData.floorsize}}平方英尺</span><span>{{residenceData.builtIn}}年建造</span></div>
    </div>
    <div class="compare " >
      <div class="compare-top text-center"></div>
      <div class="compare-middle clearMargin">
        <div class="xAxis"></div>
        <div class="xAxis-bg">
          <div class="point text-center " v-for="(item,index) in compareData.priceRange" v-if="item.num>0" :class="['point'+index,{'size3':item.num>=6,'size2':item.num>=3&&item.num<6,'active':choiceIndex==index}]" @click="compareIndex(index)" >
            <span>{{item.num}}</span>
            <div class="tipInfo text-center" v-if="item.minPrice!=item.maxPrice">${{(item.minPrice/10000).toFixed(0)}}W-${{(item.maxPrice/10000).toFixed(0)}}W</div>
            <div class="tipInfo text-center" v-else>${{(item.minPrice/10000).toFixed(0)}}W</div>
          </div>
          <div class="yourHome" :style="yourHomeLeft"></div>
        </div>
        <div class="price-bg">
          <span class="float-l">${{(compareData.minPrice/10000).toFixed(0)}}万</span>
          <span class="float-r">${{(compareData.maxPrice/10000).toFixed(0)}}万</span>
        </div>
      </div>
    </div>
    <ul v-if="saleList&&saleList.length>0" class="house-list" >
      <li v-for="list in saleList" @click="routerDetail(list.id)">
        <div class="top-img">
          <img v-if="list.imageslocal" :src="imgAdd+JSON.parse(list.imageslocal).contentslide[0].big" alt="">
          <img v-else-if="list.images&&list.images.length>0&&!list.imageslocal" :src="imgAdd+list.images[0]" alt="">
          <img v-else src="../../assets/img/moren.png" alt="">
          <div v-if="list.marketTime"  class="createdDay-bg" >  {{list.marketTime}}</div>
        </div>
        <div class="bottom-content">
          <h3>
            <span >${{(list.price/10000).toFixed(2)}}万</span>
          </h3>
          <p class="region" :class="{'LH39':!list.builtIn}">{{list.beds}}室{{list.baths}}卫</p>
          <p class="builtIn" >{{list.interiorfloorspace?list.interiorfloorspace+'平方英尺':'面积未知'}}</p>
          <p class="builtIn" v-if="list.builtIn">{{list.builtIn+'年建造'}}</p>
          <div class="compare-result text-right">
            <h3 class="compare-price">
              <span v-if="list.price-residenceData.price==0">{{((list.price-residenceData.price)/10000).toFixed(2)}}万</span></h3>
              <span v-if="list.price-residenceData.price>0" class="c-78B832">+{{((list.price-residenceData.price)/10000).toFixed(2)}}万</span></h3>
              <span v-else class="c-f14114">{{((list.price-residenceData.price)/10000).toFixed(2)}}万</span></h3>
            <p class="compare-beds">
              <span v-if="list.beds-residenceData.beds==0">{{list.beds-residenceData.beds}}室</span>
              <span v-else-if="list.beds-residenceData.beds>0" ><span class="c-f14114">+{{list.beds-residenceData.beds}}</span>室</span>
              <span v-else ><span class="c-78B832">{{list.beds-residenceData.beds}}</span>室</span>
              <span v-if="list.baths-residenceData.baths==0">{{list.baths-residenceData.baths}}卫</span>
              <span v-else-if="list.baths-residenceData.baths>0" ><span class="c-f14114">+{{list.baths-residenceData.baths}}</span>卫</span>
              <span v-else ><span class="c-78B832">{{list.baths-residenceData.baths}}</span>卫</span>
            </p>
            <p class="compare-area" v-if="list.interiorfloorspace">
              <span v-if="list.interiorfloorspace-residenceData.floorsize==0">{{list.interiorfloorspace-residenceData.floorsize}}</span>
              <span v-if="list.interiorfloorspace-residenceData.floorsize>0" class="c-f14114">+{{list.interiorfloorspace-residenceData.floorsize}}</span>
              <span v-else class="c-78B832">{{list.interiorfloorspace-residenceData.floorsize}}</span>平方英尺
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix.less";
  div.CompareHouse{
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
          div.compare-result{
            position: absolute;
            right:5/@base;
            top:10/@base;
            h3.compare-price{
              font-size: 18/@base;
              color:#7F7F7F;
            }
            p.compare-beds,p.compare-area{
              span{
                font-size: 12/@base;
                color:#7F7F7F;
              }
              font-size: 12/@base;
              line-height: 20/@base;
              color:#7F7F7F;
            }
          }
        }
      }
    }
    div.currInfo{
      height:120/@base;
      background-color: #fff;
      padding:0 15/@base;
      margin-bottom:10/@base;
      .row{
        height:40/@base;
        line-height: 40/@base;
      }
      .row1{
        span{
          font-size: 12/@base;
          color: #1E1E1E;
        }
      }
      .row2{
        span{
          font-size: 22/@base;
          color: #F14114;
        }
      }
      .row3{
        span{
          font-size: 16/@base;
          color: #656565;
        }
      }
    }
    div.compare{
      background-color: #fff;
      border-bottom: 1px solid #ececec;
      .compare-top{
        height:30/@base;
        line-height:30/@base;
        span{
          font-size: 14/@base;
          color: #1E1E1E;
        }
      }
      .compare-middle{
        height:170/@base;
        position: relative;
        .xAxis{
          position: absolute;
          top:58/@base;
          left:20/@base;
          height:4px;
          width: 335/@base;
          background: #D8D8D8;
        }
        .xAxis-bg{
          position: relative;
          height:40/@base;
          width: 315/@base;
          margin:40/@base auto 0;
          border-left: 1px solid #D8D8D8;
          border-right: 1px solid #D8D8D8;
          .point{
            position: absolute;
            width:22/@base;
            height:22/@base;
            line-height:22/@base;
            border-radius: 22/@base;
            top:10/@base;
            background-color: #4A4A4A;
            color:#fff;
          }
          .tipInfo{
            position: absolute;
            font-size: 14/@base;
            color: #1E1E1E;
            width:120/@base;
            height:34/@base;
            line-height:28/@base;
            letter-spacing: -0.35/@base;
            top:-50/@base;
            left:-49/@base;
            background-image: url('../../assets/img/tipInfo-bg.png');
            background-size: 100% 100%;
          }
          .point0{
            left:20/@base;
            z-index: 1;
          }
          .point1{
            left:80/@base;
            z-index: 2;
          }
          .point2{
            left:140/@base;
            z-index: 3;
          }
          .point3{
            left:200/@base;
            z-index: 4;
          }
          .point4{
            left:260/@base;
            z-index: 5;
          }
          .size2{
            width:30/@base;
            height:30/@base;
            line-height:30/@base;
            border-radius: 30/@base;
            top:5/@base;
            .tipInfo{
              left:-45/@base;
              top:-45/@base;
            }
          }
          .size3{
            width:40/@base;
            height:40/@base;
            line-height:40/@base;
            border-radius: 40/@base;
            top:0;
            .tipInfo{
              left:-40/@base;
              top:-40/@base;
            }
          }
          .point.active{
            background: #F14114;
            z-index: 6;
            .tipInfo{
              background-image: url('../../assets/img/tipInfo-bg-active.png');
              color:#fff;
            }
          }
          .yourHome{
            position: absolute;
            width:90/@base;
            height:98/@base;
            background-image: url('../../assets/img/yourhome.png');
            background-size: 100% 100%;
            z-index: 0;
            left:100/@base;
          }
        }
        .price-bg{
          height:40/@base;
          line-height:40/@base;
          width: 335/@base;
          margin:0 auto 0;
          span{
            font-size: 14/@base;
            color: #1E1E1E;
          }
        }
      }
      .compare-bottom{
        padding:10/@base 20/@base 0;
        .saleCompare{
          width:335/@base;
          height:40/@base;
          line-height:40/@base;
          margin-bottom:10/@base;
          padding:0 13/@base;
          border:1px solid #dcdcdc;
          border-radius: 2px;
          span{
            font-size: 14/@base;
            color: #333333;
          }
        }
      }
    }
    .mu-appbar .right img{
      width:24/@base;
      height:24/@base;
    }
  }
</style>
<script>
  import Vue from 'vue'
  import {rxUtils} from '../../assets/js/rxUtils'
  export default {
    data(){
        return{
          id:null,
          status:null,
          imgAdd:null,
          title:null,
          toast:false,
          toastMsg:'',
          yourHomeLeft:{},
          choiceIndex:null,
          compareData:{},
          residenceData:{},
          saleList:[]
        }
    },
    mounted(){
      scroll(0,0);
      this.$nextTick(function () {
        let self=this;
        self.id=this.$route.query.id;
        self.status=this.$route.query.status;
        this.imgAdd=rxUtils.hostHouse;
        document.title=self.status==1?"在售房源比较":'已售房源比较';
        self.title=self.status==1?"在售房源比较":'已售房源比较';
        //查询房源比较数据
        self.getCompare(self.id,self.status);
      })
    },
    methods:{
      routerMap(){
        var self = this;
        this.$router.push({name:'地图比较',query:{id:self.id,status:self.status}})
      },
      compareIndex(index){
        let self = this;
        self.choiceIndex=self.choiceIndex==index?null:index;
      },
      getCompare(id,status){
        let self = this;
        self.$http.get('/residence/compare.json', {'params':{'id':id,status:status,region:sessionStorage.getItem("code")}}, {emulateJSON: true}).then(function (response) {
          self.compareData = response.body.data;
          self.residenceData = self.compareData.currResidence;
          self.saleList = status==1?self.compareData.saleList:self.compareData.soldList;
          var left = (self.residenceData.price-self.compareData.minPrice)/(self.compareData.maxPrice-self.compareData.minPrice);
          self.yourHomeLeft={'left':(315*left-45)*15/375+'rem'};
        })
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
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
      back(){
        this.$router.back();
      },//返回上一页
      close() {
        this.dialog = false;
      },//关闭轮播弹窗
    }
  }
</script>
             
