<template>
  <div class="message-enc">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span @click="type=true" :class="[type?'active':'']">资讯</span><span @click="type=false" :class="[!type?'active':'']">百科</span></div>
      <div class="right"></div>
    </div>
    <div v-show="type" class="message-content">
      <div class="tabs">
        <span @click="tabChange('ONLINE',$event)" class="active">房产在线</span><span @click="tabChange('ANALYZE',$event)" >楼市分析</span><span @click="tabChange('HOT',$event)" >热推房源</span><span @click="tabChange('IMMIGRANT',$event)" >移民留学</span><span @click="tabChange('LIFE',$event)" >海外生活</span><span @click="tabChange('EXPERT',$event)" >名家专栏</span>
      </div>
      <div class="tab-content">
        <div v-if="recommend!==''" @click="routerDetail(recommend.id)" class="top-img">
          <img :src="imgUrl+recommend.imgUrl" alt="">
          <span class="top-title" v-text="recommend.title"></span>
        </div>
        <ul class="center-list">
          <li v-if="type1.length>0" @click="routerDetail(list.id)" v-for="list in type1">
            <div class="left-img"><img :src="imgUrl+list.imgUrl" alt=""></div>
            <div class="right-content">
              <p v-text="list.title"></p>
              <div class="tips"><span :class="[list.source=='淘海房'?'yc':'gray']" v-text="list.source=='淘海房'?'淘海房原创':list.source"></span><span class="time" v-text="timer(list.createdAt)"></span></div>
            </div>
          </li>
          <li v-else>暂无更多数据...</li>
        </ul>
      </div>
    </div>
    <div v-show="!type" class="enc-index">
      <div class="list-box">
        <ul class="sub-list">
          <li v-for="list in subList" @click="getList(list.id)" :class="[listType==list.id?'active':'']" v-text="list.text"></li>
        </ul>
        <ul class="sub-sub-list">
          <li v-for="list in baikeList" @click="routerEncDetail(list.id)">
            <p class="title-text" v-text="list.title"></p>
            <div class="tips" v-if="list.keywords!==''"><span v-for="list in list.keywords.split(',')" v-text="list"></span></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  div.message-enc>div.mu-appbar{
    height:44/@base;
    background: #fff;
    color:#565656;
    font-size: 27/@base;
    box-shadow: none;
    border-bottom:1px solid #ececec;
    position: fixed;
    z-index: 9;
    div.mu-appbar-title{
      span{
        display:inline-block;
        color:#9b9b9b;
        font-size:16/@base ;
     }
      span:first-child{
        margin-right:30/@base;
        margin-left:-30/@base;
      }
      span.active{
        color:#F14114;
        font-weight: bold;
      }
    }
  }
  div.tabs{
    overflow-x:scroll;
    white-space:nowrap;
    span {
      width: 90/@base;
      height: 44/@base;
      line-height: 44/@base;
      text-align: center;
      font-size: 16/@base;
      color:#4a4a4a;
      display:inline-block;
    }
    span.active{
      color:#f14114;
      border-bottom:2px solid #f14114;
    }
  }
</style>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix.less";
  .message-content{
    padding-top:54/@base;
    .mu-appbar{
      height:44/@base;
      font-size: 27/@base;
      background-color:#fff;
      color:#fff;
      border-bottom:1px solid #ececec;
      box-shadow: none;
      .mu-appbar-title{
        line-height:44/@base;
        span{
          margin-right:20/@base;
          font-size: 17/@base;
        }
      }
    }
    .mu-tabs{
      background-color:#f5f5f5;
      height:40/@base;
      button.mu-tab-active{
        div.mu-tab-text{
          color:#f14114;
        }
      }
      button{
        div.mu-tab-text{
          color:#4a4a4a;
          font-size: 16/@base;
        }
      }
      span.mu-tab-link-highlight{
        background-color: #f14114;
      }
    }
    div.tab-content{
      div.top-img{
        position: relative;
        img{
          width:100%;
          vertical-align: bottom;
        }
        span.top-title{
          font-size: 16/@base;
          position: absolute;
          bottom:0;
          left:10/@base;
          color: #FFFFFF;
          background: rgba(0,0,0,.5);
          padding:4/@base 10/@base;
          margin-left:-10/@base;
          display: block;
          width:100%;
        }
      }
    }
    ul.center-list{
      li{
        display:box;
        display:-webkit-box;
        display:-moz-box;
        padding:15/@base 13/@base;
        border-bottom:1px solid #ececec;
        div.left-img{
          width:96/@base;
          height:80/@base;
          img{
            width:100%;
            height:100%;
          }
        }
        div.right-content{
          box-flex:1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          height:80/@base;
          position: relative;
          margin-left:10/@base;
          p{
            font-size: 16/@base;
            color: #4A4A4A;
            line-height: 24/@base;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          div.tips{
            font-size: 12/@base;
            margin-top:32/@base;
            position: absolute;
            bottom:0;
            left:0;
            span.yc{
              color: #f14114;
            }
            span.gray{
              color:#9b9b9b;
            }
            span.time{
              margin-left:10/@base;
              color: #9B9B9B;
            }
            span.look{
              float:right;
              color:#565656;
              i.icon{
                font-size: 16/@base;
                vertical-align: middle;
                color:#c2c2c2;
                margin-right:4/@base;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  .enc-index{
    .mu-appbar{
      height:44/@base;
      background-color: #fff;
      border-bottom:1px solid #ececec;
      font-size: 27/@base;
      div.left{
        i.icon{
          color:#565656;
        }
      }
    }
    .list-box{
      width:100%;
      position: absolute;
      top:44/@base;
      bottom:0;
      ul.sub-list{
        display:block;
        width:100/@base;
        position: fixed!important;
        top:44/@base!important;
        bottom:0;
        li.active{
          background-color: #fff;
        }
        li{
          font-size: 16/@base;
          color: #4A4A4A;
          line-height: 31/@base;
          padding:8/@base 17/@base;
          background-color: #f5f5f5;
        }
      }
      ul.sub-sub-list{
        display:block;
        background-color: #fff;
        margin-left:100/@base;
        padding:0 15/@base 18/@base;
        min-height:100%;
        li{
          border-bottom:1px solid #ececec;
          padding:15/@base 0;
          p{
            font-size: 16/@base;
            font-family: '微软雅黑';
            color: #4A4A4A;
            margin-bottom:14/@base;
          }
          div.tips{
            width:100%;
            overflow: hidden;
            span{
              padding:0 6/@base;
              color:#f14114;
              border:1px solid #f14114;
              margin-right:14/@base;
              margin-bottom:10/@base;
              word-break: break-all;
              display:inline-block;
              font-size: 12/@base;
            }
          }
        }
      }
    }
  }
</style>
<script>
  import {rxUtils} from '../../assets/js/rxUtils'
  export default {
    data(){
          return {
            type:true,
            topTitle:'资讯指南',
            activeTab:'ONLINE',
            pageSize:10,
            currentPage:1,
            type1:[],
            imgUrl:'',
            timer:function(time){
                let date=new Date(time);
                let year=date.getFullYear();
                let month=date.getMonth()+1;
                let day=date.getDate();
                if(month<10){
                    var newMouth='0'+month
                }
                if(day<10){
                    var newDay='0'+day;
                }
                return year+'-'+newMouth+'-'+newDay;
            },
            recommend:'',
            subList:[
              {text:'房产术语',id:1},
              {text:'购房须知',id:2},
              {text:'买房攻略',id:3},
            ],
            baikeList:[],
            listType:1
          }
      },
    mounted(){
      this.$nextTick(function (){
        let self = this;
        self.imgUrl=rxUtils.encImg;
        document.title=this.$route.name;
        if(self.$route.query.type!==undefined&&self.$route.query.type=='baike'){
            self.type=false;
        }else{
            self.type=true;
        }
        self.$http.get('/info/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type=1', {}, {emulateJSON: true})
          .then(function (response) {
              console.log(response.body.data)
            self.type1=response.body.data;
          }).then(function (error) {
        })
        self.$http.get('/info/listRecommend.json?type=1', {}, {emulateJSON: true})
          .then(function (response) {
            self.recommend=response.body.data[0];
            console.log(response.body.data)
          }).then(function (error) {
        })
        self.$http.get('/baike/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type=1', {}, {emulateJSON: true})
          .then(function (response) {
            console.log(response.body.data)
            self.baikeList=response.body.data
          }).then(function (error) {
        })
      })
    },
    methods:{
      back(){
          this.$router.back();
      },
      tabChange (val,e) {
          let self=this;
          let el=document.getElementsByClassName('tabs')[0].getElementsByTagName('span');
          for(let i=0;i<el.length;i++){
              el[i].className='';
          }
        e.target.className='active';
        if(val=='ONLINE'){
            var type=1;
        }else if(val=='ANALYZE'){
            var type=2;
        }else if(val=='HOT'){
            var type=3;
        }else if(val=='IMMIGRANT'){
            var type=4;
        }else if(val=='LIFE'){
            var type=5;
        }else if(val=='EXPERT'){
            var type=6;
        }
        self.$http.get('/info/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+type, {}, {emulateJSON: true})
          .then(function (response) {
            self.type1=response.body.data;
            if(response.body.success){
              this.activeTab = val
            }
          }).then(function (error) {
        })
        self.$http.get('/info/listRecommend.json?type='+type, {}, {emulateJSON: true})
          .then(function (response) {
            self.recommend='';
            self.recommend=response.body.data[0];
          }).then(function (error) {
        })
      },
      routerDetail(id){
          this.$router.push({name:'资讯详情',params:{id:id}})
      },
      routerEncDetail(id){
        this.$router.push({name:'百科详情',params:{id:id}})
      },
      getList(id){
        let self=this;
        this.listType=id;
        self.$http.get('/baike/search.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage+'&type='+id, {}, {emulateJSON: true})
          .then(function (response) {
            console.log(response.body.data)
            self.baikeList=response.body.data
          }).then(function (error) {
        })
      }
    }
  }
</script>
