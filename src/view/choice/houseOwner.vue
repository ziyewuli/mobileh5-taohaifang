<template>
  <div class="houseOwner-index">
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title">
        <span @click="tabChange('sale')" :class="[type=='sale'?'active':'']">我要卖房</span>
        <span @click="tabChange('lease')" :class="[type=='lease'?'active':'']">我要出租</span>
      </div>
      <div class="right"></div>
    </div>
    <div v-if="type=='sale'">
      <div class="sale-bg">
        <div class="sale-top">
          <div class="sale-content">
            <div class="sale-row clearfix">
              <div class="label float-l">所在区域</div>
              <div class="input float-r" @click="showCity1()"><span>{{saleData.cityName||'请选择房子区域'}}</span><img src="../../assets/img/select-btn.png"></div>
            </div>
            <div class="sale-row">
              <div class="label float-l">详细地址</div>
              <div class="input float-r"><input type="text" placeholder="请输入详细地址、街道、门牌号" v-model="saleData.address"/></div>
            </div>
            <div class="sale-row">
              <div class="label float-l">期望售价</div>
              <div class="input float-r">
                <input class="short" type="number" placeholder="请输入您的房价" v-model="saleData.salePrice"/>
                <span class="c-1E1E1E">万{{country=='ca'?'加元':'美元'}}</span>
              </div>
            </div>
            <div class="sale-row">
              <div class="label float-l">联系人</div>
              <div class="input float-r"><input type="text" placeholder="请输入联系人姓名" v-model="saleData.contact"/></div>
            </div>
            <div class="sale-row">
              <div class="label float-l">联系电话</div>
              <div class="input float-r">
                <span class="c-1E1E1E" @click="showCountry1()">+{{saleData.countryCode}}</span>
                <input class="short" type="tel" placeholder="请输入您的联系方式" maxlength="11" v-model="saleData.phone"/>
              </div>
            </div>
          </div>
        </div>
        <mu-dialog dialogClass="cityDialog"  :open="cityDialog1" title="" >
          <div class="city-bg">
            <ul class="subTab">
              <li v-for="city in cityList" :class="{'active':saleData.city==city.englishlng}" @click="choiceCity1(city)"><span>{{city.chineselng}}</span><span class="c-9B9B9B">{{city.englishlng}}</span> <i class="icon iconfont icon-icon_duihao"></i></li>
            </ul>
          </div>
        </mu-dialog>
        <mu-dialog dialogClass="cityDialog countryDialog"  :open="countryDialog1" title="" >
          <div class="city-bg">
            <ul class="subTab">
              <li v-for="country in countryCodeList" :class="{'active':saleData.countryCode==country.code}" @click="choiceCountry1(country.code)"><span>+{{country.code}}</span><span class="c-9B9B9B">{{country.text}}</span> <i class="icon iconfont icon-icon_duihao"></i></li>
            </ul>
          </div>
        </mu-dialog>
        <div class="sale-bottom">
          <div class="submit-btn " @click="saleSubmit" :class="{'active':saleData.city&&saleData.address&&saleData.salePrice&&saleData.contact&&saleData.phone}">立即委托</div>
        </div>
      </div>
    </div>
    <div v-if="type=='lease'" class="">
      <div class="lease-bg">
        <div class="lease-top">
          <div class="lease-content">
            <div class="lease-row clearfix">
              <div class="label float-l">所在区域</div>
              <div class="input float-r" @click="showCity2()"><span>{{leaseData.cityName||'请选择房子区域'}}</span><img src="../../assets/img/select-btn.png"></div>
            </div>
            <div class="lease-row">
              <div class="label float-l">详细地址</div>
              <div class="input float-r"><input type="text" placeholder="请输入详细地址、街道、门牌号" v-model="leaseData.address"/></div>
            </div>
            <div class="lease-row clearfix">
              <div class="label float-l">户型</div>
              <div class="input float-r" @click="showRoom()">
                <span v-if="leaseData.beds&&leaseData.baths&&bedsList[leaseData.beds-1]&&bathsList[leaseData.baths-1]" v-text="bedsList[leaseData.beds-1].text+' '+bathsList[leaseData.baths-1].text"></span>
                <span v-else>请选择户型</span>
                <img src="../../assets/img/select-btn.png"></div>
            </div>
            <div class="lease-row">
              <div class="label float-l">房屋面积</div>
              <div class="input float-r">
                <input class="short" type="number" placeholder="请输入您房屋的室内面积" v-model="leaseData.floorSpace"/>
                <span class="c-1E1E1E">平方英尺</span>
              </div>
            </div>
            <div class="lease-row">
              <div class="label float-l">租金</div>
              <div class="input float-r">
                <input class="short" type="number" placeholder="请输入您的期望租金" v-model="leaseData.rentMonth"/>
                <span class="c-1E1E1E">{{country=='ca'?'加元':'美元'}}/月</span>
              </div>
            </div>
            <div class="lease-row">
              <div class="label float-l">联系人</div>
              <div class="input float-r"><input type="text" placeholder="请输入联系人姓名" v-model="leaseData.contact"/></div>
            </div>
            <div class="lease-row">
              <div class="label float-l">联系电话</div>
              <div class="input float-r">
                <span class="c-1E1E1E" @click="showCountry2()">+{{leaseData.countryCode}}</span>
                <input class="short" type="tel" placeholder="请输入您的联系方式" maxlength="11" v-model="leaseData.phone"/>
              </div>
            </div>
          </div>
        </div>
        <mu-dialog dialogClass="cityDialog"  :open="cityDialog2" title="" >
          <div class="city-bg">
            <ul class="subTab">
              <li v-for="city in cityList" :class="{'active':leaseData.city==city.englishlng}" @click="choiceCity2(city)"><span>{{city.chineselng}}</span><span class="c-9B9B9B">{{city.englishlng}}</span> <i class="icon iconfont icon-icon_duihao"></i></li>
            </ul>
          </div>
        </mu-dialog>
        <mu-dialog dialogClass="cityDialog countryDialog"  :open="countryDialog2" title="" >
          <div class="city-bg">
            <ul class="subTab">
              <li v-for="country in countryCodeList" :class="{'active':leaseData.countryCode==country.code}" @click="choiceCountry2(country.code)"><span>+{{country.code}}</span><span class="c-9B9B9B">{{country.text}}</span> <i class="icon iconfont icon-icon_duihao"></i></li>
            </ul>
          </div>
        </mu-dialog>
        <mu-dialog dialogClass="cityDialog roomDialog"  :open="roomDialog" title="" >
          <div class="city-bg">
            <ul class="subTab">
              <li class="clearfix" >
                <div class="roomCol beds float-l "><span>请选择</span></div>
                <div class="roomCol baths float-l"><span>请选择</span></div>
              </li>
              <li v-for="n in 5" class="clearfix" >
                <div class="roomCol beds float-l " :class="{'active':leaseData.beds==n}" v-if="bedsList[n-1]"  @click="leaseData.beds=n">
                  <span>{{bedsList[n-1].text}}</span>
                  <i class="icon iconfont icon-icon_duihao"></i></div>
                <div class="roomCol baths float-l" :class="{'active':leaseData.baths==n}" v-if="bathsList[n-1]" @click="leaseData.baths=n">
                  <span>{{bathsList[n-1].text}}</span>
                  <i class="icon iconfont icon-icon_duihao"></i>
                </div>
              </li>
              <li >
                  <div class="choiceRoom-btn" @click="choiceRoom()" :class="{'active':leaseData.beds&&leaseData.baths}">确定</div>
              </li>
            </ul>
          </div>
        </mu-dialog>
        <div class="lease-bottom">
          <div class="submit-btn " @click="leaseSubmit" :class="{'active':leaseData.beds&&leaseData.baths&&leaseData.city&&leaseData.address&&leaseData.rentMonth&&leaseData.contact&&leaseData.phone&&leaseData.floorSpace}">立即委托</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  .houseOwner-index{
    padding-top:44/@base;
    background-color: #F5F5F5;
    div.mu-appbar{
      height:44/@base;
      top: 0;
      font-size: 27/@base;
      background: #fff;
      color:#9b9b9b;
      box-shadow: none;
      border-bottom:1px solid #ececec;
      position: fixed;
      div.mu-appbar-title{
        span:nth-child(2){
          display:inline-block;
          margin:0 20/@base;
        }
        span.active{
          color:#1E1E1E ;
        }
      }
    }
    .sale-bg{
      width: 100%;
      .sale-top{
        height:450/@base;
        padding-top:180/@base;
        background-image: url('../../assets/img/sale-top.png');
        background-size: 100% 100%;
        .sale-content{
          margin:0 15/@base 10/@base;
          height:250/@base;
          border: 1px solid #dcdcdc;
          background-color: #fff;
          border-radius: 3px;
          .sale-row{
            height:50/@base;
            line-height:50/@base;
            border-bottom: 1px solid #dcdcdc;
            padding:0 20/@base;
            .label{
              width:60/@base;
              font-size: 14/@base;
              color: #1E1E1E;
            }
            .input{
              width:240/@base;
              text-align: right;
              input{
                text-align: right;
                width:100%;
                height:46/@base;
                line-height:46/@base;
                border: 0;

              }
              input.short{
                width:180/@base;
              }
              input:focus{
                outline:none;
                border: 0;
              }
              span{
                font-size: 14/@base;
                color: #828282;
                letter-spacing: -0.35px;
              }
              img{
                width:8/@base;
                height:8/@base;
                margin: 0 0 2/@base ;
              }
            }
          }
          .sale-row:last-child{
            border-bottom: none;
          }
        }
      }

      .sale-bottom{
        height:170/@base;
        padding-top:10/@base;
        background-image: url('../../assets/img/sale-bottom.png');
        background-size: 100% 100%;
        .submit-btn{
          width: 345/@base;
          height: 46/@base;
          line-height: 46/@base;
          margin:0 auto;
          background-color:#9B9B9B ;
          border-radius: 2px;
          font-size: 16/@base;
          color: #FFFFFF;
          text-align: center;
        }
        .submit-btn.active{
          background: #F14114;
        }
      }

    }
    .lease-bg{
      width: 100%;
      .lease-top{
        height:450/@base;
        padding-top:100/@base;
        background-image: url('../../assets/img/lease-top.png');
        background-size: 100% 100%;
        .lease-content{
          margin:0 15/@base 10/@base;
          height:350/@base;
          border: 1px solid #dcdcdc;
          background-color: #fff;
          border-radius: 5px;
          .lease-row{
            height:50/@base;
            line-height:50/@base;
            border-bottom: 1px solid #dcdcdc;
            padding:0 20/@base;
            .label{
              width:60/@base;
              font-size: 14/@base;
              color: #1E1E1E;
            }
            .input{
              width:240/@base;
              text-align: right;
              input{
                text-align: right;
                width:100%;
                height:46/@base;
                line-height:46/@base;
                border: 0;

              }
              input.short{
                width:180/@base;
              }
              input:focus{
                outline:none;
                border: 0;
              }
              span{
                font-size: 14/@base;
                color: #828282;
                letter-spacing: -0.35px;
              }
              img{
                width:8/@base;
                height:8/@base;
                margin: 0 0 2/@base ;
              }
            }
          }
          .lease-row:last-child{
            border-bottom: none;
          }
        }
      }

      .lease-bottom{
        height:170/@base;
        padding-top:30/@base;
        background-image: url('../../assets/img/sale-bottom.png');
        background-size: 100% 100%;
        .submit-btn{
          width: 345/@base;
          height: 46/@base;
          line-height: 46/@base;
          margin:0 auto;
          background-color:#9B9B9B ;
          border-radius: 2px;
          font-size: 16/@base;
          color: #FFFFFF;
          text-align: center;
        }
        .submit-btn.active{
          background: #F14114;
        }
      }

    }
  }
  .cityDialog{
    .mu-dialog-body{
      width:285/@base;
      height:352/@base;
      padding:0;
      background-color: #fff;
      border-radius: 3px;
      overflow-y:auto !important;
      ul.subTab {
        box-flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        li {
          font-size: 14/@base;
          color: #656565;
          padding: 10/@base 20/@base;
          span:first-child{
            width:90/@base;
            display: inline-block;
          }
          i {
            float: right;
            color: #f14114;
            font-size: 12 @base;
            display: none;
          }
          i.icon-duihao{
            font-size: 17/@base;
          }
        }
        li.active {
          background: rgba(0,0,0,0.05);
          color: #f14114;
          span{
            color: #f14114 !important;
          }
          i {
            display: block;
            font-size: 17/@base;
          }
        }
      }
    }
  }
  .countryDialog .mu-dialog-body{
    height:inherit;
  }
  .roomDialog{
    .mu-dialog-body{
      ul.subTab {
        li{
          padding:0;
          div.roomCol{
            width:50%;
            height:50/@base;
            line-height:50/@base;
            text-align: center;
            border-bottom: 1px solid #dcdcdc;
            span{
              width:100%;
            }
          }
          div.roomCol.active{
            background: rgba(0,0,0,0.05);
            color: #f14114;
            position: relative;
            i{
              position: absolute;
              display: inline-block;
              right:30/@base;
              top:0;
            }
          }
          div.roomCol:last-child{
            border-left: 1px solid #dcdcdc;
          }
          .choiceRoom-btn{
            margin:6/@base 15/@base;
            height:40/@base;
            line-height:40/@base;
            text-align: center;
            background-color:#9B9B9B ;
            border-radius: 2px;
            font-size: 16/@base;
            color: #FFFFFF;
          }
          .choiceRoom-btn.active{
            background: #F14114;
          }
        }
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  import {rxUtils} from '../../assets/js/rxUtils'
  import { MessageBox } from 'mint-ui';
    export default{
      data(){
          return{
            type:'sale',
            region:'',
            code:'',
            country:'ca',
            toastMsg:'',
            toast:false,
            cityList:[],
            countryCodeList:[
              {code:86,text:'中国'},
              {code:1,text:'美国/加拿大'}
            ],

            saleData:{
              city:null,
              cityName:null,
              address:null,
              salePrice:null,
              contact:null,
              countryCode:'86',
              phone:null
            },
            cityDialog1:false,
            countryDialog1:false,

            leaseData:{
              city:null,
              cityName:null,
              address:null,
              rentMonth:null,
              contact:null,
              countryCode:'86',
              phone:null,
              beds:null,
              baths:null,
              floorSpace:null
            },
            bedsList:[
              {text:'1室',beds:1},
              {text:'2室',beds:2},
              {text:'3室',beds:3},
              {text:'4室',beds:4},
              {text:'5+室',beds:5}
            ],
            bathsList:[
              {text:'1卫',baths:1},
              {text:'2卫',baths:2},
              {text:'3卫',baths:3},
              {text:'4卫',baths:4},
              {text:'5+卫',baths:5}
            ],
            cityDialog2:false,
            countryDialog2:false,
            roomDialog:false
          }
      },
    mounted(){
      this.$nextTick(function (){
        let self=this;
        document.title=self.$route.name;
        self.region = self.$route.query.region;
        self.country = self.$route.query.country;
        self.saleData.region = self.leaseData.region = self.code = self.$route.query.code;
        if(self.$route.query.type!==undefined){
          self.type=self.$route.query.type;
        }
        self.$http.get('/region/listCity.json?code='+self.code, {}, {emulateJSON: true})
          .then(function (response) {
            console.log(response.data);
            self.cityList=response.data.data;
          }).then(function (error) {})
      })
    },
    methods:{
      saleSubmit(){
          let self = this;
          if(self.saleData.city&&self.saleData.address&&self.saleData.salePrice&&self.saleData.contact&&self.saleData.phone){
            console.log('self.saleData');
            console.log(self.saleData);
            self.$http.post('/residence/sale/submit.json', self.saleData, {emulateJSON: true})
              .then(function (response) {
                if(response.data.code==100){
                  MessageBox.alert('您的房子已委托成功，我们会有专人联系您！');
                }
                console.log(response.data);
              }).then(function (error) {})

          }
      },
      leaseSubmit(){
          let self = this;
          if(self.leaseData.city&&self.leaseData.address&&self.leaseData.rentMonth&&self.leaseData.contact&&self.leaseData.phone){
            console.log('self.leaseData');
            console.log(self.leaseData);
            self.$http.post('/residence/rent/submit.json', self.leaseData, {emulateJSON: true})
              .then(function (response) {
                if(response.data.code==100){
                  MessageBox.alert('您的房子已委托成功，我们会有专人联系您！');
                }
                console.log(response.data);
              }).then(function (error) {})

          }
      },
      choiceRoom(){
        if(this.leaseData.beds&&this.leaseData.baths){
          this.roomDialog=false;
        }
      },
      showRoom(){
        this.roomDialog=true;
      },
      showCountry1(){
        this.countryDialog1=true;
      },
      showCountry2(){
        this.countryDialog2=true;
      },
      choiceCountry1(countryCode){
        this.saleData.countryCode=countryCode;
        this.countryDialog1=false;
      },
      choiceCountry2(countryCode){
        this.leaseData.countryCode=countryCode;
        this.countryDialog2=false;
      },
      choiceCity1(cityObj){
        this.saleData.city=cityObj.englishlng;
        this.saleData.cityName=cityObj.chineselng;
        this.cityDialog1=false;
      },
      choiceCity2(cityObj){
        this.leaseData.city=cityObj.englishlng;
        this.leaseData.cityName=cityObj.chineselng;
        this.cityDialog2=false;
      },
      showCity1(){
        this.cityDialog1=true;
      },
      showCity2(){
        this.cityDialog2=true;
      },
      back(){
        this.$router.back()
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },//闲时候隐藏toast
      tabChange(type){
          this.type=type;
      }
    }
  }
</script>
       
