<template>
  <div class="message">
    <div  class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>消息</span></div>
      <div class="right"></div>
    </div>
    <div class="container">
      <ul>
        <li @click='routerMessage("系统消息")'>
          <div class="left-img"><img src="../assets/img/xiaoxi.png" alt=""><span class="new-m"></span></div>
          <div class="center-content">
            <p>系统消息</p>
            <p>用户信息完善</p>
          </div>
          <div class="right-time">12-26</div>
        </li>
        <!--<li  @click='routerMessage("活动提醒")'>
          <div class="left-img"><img src="../assets/img/tixing.png" alt=""><span class="new-m"></span></div>
          <div class="center-content">
            <p>活动提醒</p>
            <p>人民币贬值，海外资产配置正当时</p>
          </div>
          <div class="right-time">10:30</div>
        </li>
        <li  @click='routerMessage("每日精选")'>
          <div class="left-img"><img src="../assets/img/jingxuan.png" alt=""><span class="new-m"></span></div>
          <div class="center-content">
            <p>每日精选</p>
            <p>这么性价比高的房子有吗？</p>
          </div>
          <div class="right-time">09:32</div>
        </li>-->
      </ul>
    </div>
    <div class="no-more">——— 暂无更多消息 ———</div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../assets/css/mix.less";
  .mu-item-wrapper{
    background-color: #fff;
  }
  .mu-appbar-title{
    text-align: center;
    span{
      font-size: 17/@base;
      color: #4A4A4A;
    }
  }
  .message{
    background:#f6f6f6;
    .mu-appbar{
      background: #fff;
      height:44/@base;
      margin-bottom:10/@base;
      div.left{
        i.icon{
          color:#4a4a4a;
        }
      }
    }
    .no-more{
      font-size: 14/@base;
      width:100%;
      text-align: center;
      margin-top:20/@base;
      color: #C2C2C2;
    }
    .container{
      background:#fff;
      li{
        border-bottom:2px solid #f6f6f6;
        display:box;
        display:-webkit-box;
        display:-moz-box;
        padding:10/@base;
        border-bottom:2px solid #f6f6f6;
        div{
          p:nth-child(1){
            font-size: 16/@base;
            color: #4A4A4A;
          }
          p:nth-child(2){
            font-size: 12/@base;
            color: #9B9B9B;
          }
        }
      }
      li>div.left-img{
        margin-right:10/@base;
        position: relative;
        span.new-m{
          position: absolute;
          width:8/@base;
          height:8/@base;
          border-radius: 50%;
          background: red;
          top:0;
          right:0;
        }
        img{
          width:42/@base;
        }
      }
      li>div.center-content{
        box-flex:1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
      }
    }
  }
</style>
<script>
  export default{
      data(){
          return {

          }
      },
    mounted(){
      document.title=this.$route.name;
    },
    methods:{
      routerMessage(name){
          this.$router.push({name:'消息列表',params:{name:name}})
      },
      back(){
          this.$router.back();
      }
    },
    mounted(){
      this.$nextTick(function () {
      })
    }
  }
</script>
