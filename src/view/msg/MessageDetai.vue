<template>
  <div class="message-detail">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right"></div>
    </div>
    <div class="detail-content">
      <pre>
        尊敬的用户:
             恭喜您成为海外安居注册会员，您可以在海外安居平台上浏览大量的海外房产信息数据，为您的海外投资保驾护航！
      </pre>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return {
            topTitle:''
          }
      },
    mounted(){
        this.topTitle=this.$route.params.name;
      document.title=this.$route.name;
    },
    methods:{
          back(){
              this.$router.back()
          }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../../assets/css/mix";
  .message-detail{
    background: #f6f6f6;
    .mu-appbar{
      height:44/@base;
      background: #fff;
      color:#4a4a4a;
    }
    div.detail-content{
      font-size: 16/@base;
      color: #4A4A4A;
      line-height: 26/@base;
      background: #fff;
      padding:18/@base 15/@base;
      position: relative;
      top:10/@base;
    }
  }
</style>
