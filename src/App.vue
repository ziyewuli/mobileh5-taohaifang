<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件！ -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件！ -->
    </router-view>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @base:375/15rem;
  div.mu-appbar{
    height:44/@base;
    background: #fff;
    color:#4a4a4a;
    font-size: 17/@base;
    box-shadow: none;
    border-bottom:1px solid #ececec;
    div.mu-appbar-title{
      text-align: center;
      span{
        font-size: 17/@base!important;
      }
    }
    div.right{
      i.icon{
        font-size: 30/@base;
      }
    }
  }
  *{
    margin:0;
    padding:0;
  }
  body,html{
    background-color: #f6f6f6!important;
  }
  #app>.mu-paper{
    position:fixed;
    bottom:0;
    width:100%;
    z-index:2;
    .mu-bottom-item-active .mu-bottom-item-text{
      color:#F14114;
    }
    .mu-bottom-item-active .mu-bottom-item-icon{
      color:#F14114;
    }
    .mu-bottom-item-active .mu-bottom-item-text{
      font-size: 12/@base;
    }
  }
</style>
<script>
  import './assets/fonts/iconfont.css'
  import mixin from  './assets/js/mixins'
  export default {
    name:'app',
    mixin:[mixin],
    data () {
      return {
      }
    },
    mounted(){
      this.$nextTick(function () {
        let self=this;
//        document.title=this.$route.name;
      })
    },
    methods: {
      handleChange (val) {
        this.navCode = val
        this.$router.push({path:'/'+val})
      },
    }
  }
</script>
