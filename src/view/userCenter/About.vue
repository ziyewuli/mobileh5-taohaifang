<template>
  <div class="about-us">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right"></div>
    </div>
    <div class="about-content">
      <img  class="logo"  src="../../assets/img/logo.png" alt="">
      <div class="about-text">
        淘海房是加拿大多伦多和温哥华等地区购房者的一站式购房助手，是海外房产综合服务和信息交流的工具。为购房者提供最全面最真实的房源信息、楼市新闻及政策分析、房产百科、地产问答、移民留学资讯和海外生活资讯。
      </div>
    </div>
    <div class="about-code">
      <span>当前版本</span>
      <span>V1.0</span>
    </div>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  .about-us{
    background: #f6f6f6;
    div.mu-appbar{
      color:#4a4a4a;
      height:44/@base;
      background: #fff;
      box-shadow: none;
      border-bottom:1px solid #ececec;
      margin-bottom:10/@base;
    }
    img.logo{
      display:block;
      width:110/@base;
      height:110/@base;
      margin:0 auto;
      margin-bottom:31/@base;
    }
    div.about-content{
      background: #fff;
      padding:20/@base 24/@base;
      font-size: 14/@base;
      color: #4A4A4A;
      line-height: 21/@base;
      margin-bottom:10/@base;
    }
    div.about-code{
      padding:20/@base 15/@base;
      background: #fff;
      span:first-child{
        font-size: 14/@base;
        color: #4A4A4A;
      }
      span:last-child{
        font-size: 14/@base;
        float:right;
        margin-right:15/@base;
        color: #9B9B9B;
      }
    }
  }
</style>
<script>
  export default{
      data(){
          return{
              topTitle:'关于我们'
          }
      },
    mounted(){
      document.title=this.$route.name;
    },
    methods:{
          back(){
              this.$router.back();
          }
    }
  }
</script>
