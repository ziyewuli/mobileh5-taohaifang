<template>
  <div class="browse-log">
    <div  style="z-index: 899999999999" class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>房源浏览记录</span></div>
      <div class="right"></div>
    </div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul v-if="data!=null" class="house-list" >
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
      <!--<ul v-if="data!==null" class="house-list">
        <li v-for="list in data" @click="routerDetail(list.id)">
          <div class="top-img">
            <div class="top-small-tip"><span v-text="list.marketTime"></span></div>
            <img v-if="list.imageslocal==''&&list.images==''" src="../../assets/img/moren.png" alt="">
            <img v-else :src="list.imageslocal==''&&JSON.parse(list.images).contentslide[0].big.indexOf('http')<0?hostHouse+JSON.parse(list.images).contentslide[0].big:JSON.parse(list.images).contentslide[0].big" alt="">
            <img v-else :src="list.images==''&&JSON.parse(list.imageslocal).contentslide[0].big.indexOf('http')<0?hostHouse+JSON.parse(list.imageslocal).contentslide[0].big:JSON.parse(list.imageslocal).contentslide[0].big" alt="">

          </div>
          <div class="bottom-content">
            <h3 v-if="list.buildingType=='House'">{{list.beds}}卧{{list.baths}}卫·独立屋</h3>
            <h3 v-if="list.buildingType=='Row / Townhouse'">{{list.beds}}卧{{list.baths}}卫·排屋</h3>
            <h3 v-if="list.buildingType=='Apartment'">{{list.beds}}卧{{list.baths}}卫·公寓</h3>
            <p class="region">{{list.cityZH}} {{list.city}}</p>
            <p class="interiorfloorspace">{{'房屋面积'+list.interiorfloorspace+'平方英尺'}}</p>
            <p class="builtIn">{{list.builtIn==0?'建造年份未知':list.builtIn}}</p>

            <div class="money-time">
              <p class="money"><span>$</span>{{(list.price/10000).toFixed(2)}}万</p>
              <p class="time">{{timer(list.createdAt)}}</p>
            </div>
            <div @click.stop="shoucang(list.id,list)" class="shoucang"><i :class="['icon','iconfont',list.favorite?'icon-icon_yishoucangfangyuan':'icon-icon_shoucangfangyuan']"></i></div>
          </div>
        </li>
      </ul>-->
      <div v-else style="text-align: center;">暂时没有数据哦...</div>
    </mt-loadmore>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  ul.house-list .bottom-content img{
    width: 52/@base;
    height: 16/@base;
    vertical-align: sub;
  }

  div.browse-log{
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
    div.mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#4a4a4a;
      font-size: 27/@base;
      box-shadow: none;
      border-bottom:1px solid #ececec;
    }
  }
</style>
<script>
  import Vue from 'vue'
  import { rxUtils } from '../../assets/js/rxUtils'
  import { Loadmore } from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  export  default{
    data(){
      return{
        toast:false,
        toastMsg:'',
        data:{},
        pageSize:10,
        currentPage:1,
        allLoaded:false,
        imgUrl:'',
        imgAdd:'',
        timer:function(val){
          let date=new Date(val);
          let year=date.getFullYear();
          let mouth=date.getMonth()+1;
          let data=date.getDate();
          return year+'-'+mouth+'-'+data
        },
      }
    },
    mounted(){
      this.$nextTick(function () {
        let self=this;
        document.title=this.$route.name;
        self.imgUrl=rxUtils.hostHouse;
        self.imgAdd=rxUtils.hostHouse;
        self.$http.get('/residence/listHistories.json?currentPage=1&pageSize=10&region='+sessionStorage.getItem('code'), self.inData, {emulateJSON: true})
          .then(function (response) {
            self.data=response.body.data;
          }).then(function (error) {
        })
      })
    },
    methods:{
      routerDetail(id){
        this.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:id},query:{region:sessionStorage.getItem('code')}})
      },
      loadTop(){
        let self= this;
        self.currentPage=1;
        setTimeout(function(){
          self.$http.get('/residence/listHistories.json?currentPage=1&pageSize=10&region='+sessionStorage.getItem('code'), self.inData, {emulateJSON: true})
            .then(function (response) {
              self.data=response.body.data;
              this.$refs.loadmore.onTopLoaded();
            }).then(function (error) {
          })
        },2000)
      },
      loadBottom(){
        let self= this;
        self.currentPage=self.currentPage+1;
        this.allLoaded = true;// 若数据已全部获取完毕
        setTimeout(function(){
          self.$http.get('/residence/listHistories.json?pageSize=10&currentPage='+self.currentPage+'&region='+sessionStorage.getItem('code'), self.inData, {emulateJSON: true})
            .then(function (response) {
              if(response.body.data!==null){
                for(let i=0;i<response.body.data.length;i++){
                    self.data.push(response.body.data[i])
                }
                this.allLoaded = false;// 若数据已全部获取完毕
              }
              this.$refs.loadmore.onBottomLoaded();
            }).then(function (error) {
          })
        },2000)
      },
      back(){
        this.$router.back();
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
          }, 1000)
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
                  }, 1000)
                }else{
                  this.toastMsg=response.body.resultMsg;
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                  }, 1000)
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
                  }, 1000)
                }else{
                  this.toastMsg=response.body.resultMsg;
                  this.toast = true
                  if (this.toastTimer) clearTimeout(this.toastTimer)
                  this.toastTimer = setTimeout(() => {
                    this.toast = false;
                  }, 1000)
                }
              }).then(function (error) {
            })
          }
        }
      },//收藏
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },//闲时候隐藏toast
    }
  }
</script>
