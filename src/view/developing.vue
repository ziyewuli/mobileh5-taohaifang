<template>

  <div class="" >
      <div class="mu-appbar mu-paper-1" v-show="!hideTitle">
        <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
        <div class="mu-appbar-title"><span>{{title}}</span></div>
        <div class="right"></div>
      </div>
      <div class="img-content">
        <img src="../assets/img/developing.png">
      </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import "../assets/css/mix.less";
  div.mu-appbar{
    width:100%;
    .mu-appbar-title{
      height:43/@base;
      line-height:43/@base;
    }
  }
  div.img-content{
    width:100%;
    img{
      width:100%;
    }
  }
</style>
<script>
  import Vue from 'vue'
  export default{
    data(){
        return {
          hideTitle:false,
          title:'功能即将上线...'
        }
      },
    mounted() {
      this.$nextTick(function () {
        scroll(0,0);
        let self=this;
        self.title = self.$route.query.title?self.$route.query.title:self.title;
        self.hideTitle = self.$route.query.hideTitle?self.$route.query.hideTitle:false;
      })
    },
    methods:{
      back(){
        this.$router.back()
      }
    }
  }
</script>
   
