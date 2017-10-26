<template>
  <div class="set-language">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right"></div>
    </div>
    <ul class="language-list">
      <li @click="choiceLanguage($event)">简体中文 <i class="icon iconfont icon-gou"></i></li>
      <li @click="choiceLanguage($event)">English <i class="icon iconfont icon-gou"></i></li>
    </ul>
  </div>
</template>
<script>
  export default{
      data(){
          return {
              topTitle:'语言设置'
          }
      },
    mounted(){
      document.title=this.$route.name;
    },
    methods:{
      choiceLanguage(e){
          let el=document.getElementsByClassName('language-list')[0].getElementsByTagName('li');
          for(let i=0;i<el.length;i++){
              el[i].className='';
          }
          e.target.className='active';
      },
      back(){
          this.$router.back()
      }
    }
  }
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  .set-language{
    background: #f6f6f6;
    div.mu-appbar{
      height:44/@base;
      background: #fff;
      color: #4a4a4a;
      margin-bottom:10/@base;
      box-shadow: none;
      border-bottom:1px solid #ececec;
    }
    .language-list{
      background: #fff;
      li.active{
        color:#2889Ea;
        i.icon-gou{
          display:block;
        }
      }
      li{
        padding:20/@base 10/@base;
        font-size: 14/@base;
        color: #656565;
        border-bottom:1px solid #ececec;
        i{
          color:#2889EA;
          float:right;
          margin-right:10/@base;
          font-size: 12/@base;
          display:none;
        }
      }
    }
  }
</style>
