<template>
  <div class="message-list">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right"></div>
    </div>
    <ul class="list-container">
      <!--<li @click="routerDetail('用户信息完善')">
        <div class="left-content">
          <p>用户信息完善</p>
          <p>2016-12-22 10:23</p>
        </div>
        <div class="right-icon"><i class="icon iconfont icon-new"></i></div>
        <div class="right-gou">
          <i class="icon iconfont icon-llmainpageback-copy-copy"></i>
        </div>
      </li>-->
      <li @click="routerDetail('新用户注册')">
        <div class="left-content">
          <p>新用户注册</p>
          <p>2016-12-19 10:31</p>
        </div>
        <div class="right-icon"><i class="icon iconfont icon-new"></i></div>
        <div class="right-gou">
          <i class="icon iconfont icon-llmainpageback-copy-copy"></i>
        </div>
      </li>
      <!--<li  @click="routerDetail('修改密码')">
        <div class="left-content">
          <p>修改密码</p>
          <p>2016-12-19 07:23</p>
        </div>
        <div class="right-icon"><i class="icon iconfont icon-new"></i></div>
        <div class="right-gou">
          <i class="icon iconfont icon-llmainpageback-copy-copy"></i>
        </div>
      </li>
      <li @click="routerDetail('修改地区')">
        <div class="left-content">
          <p>修改地区</p>
          <p>2016-12-17 07:18</p>
        </div>
        <div class="right-icon"><i class="icon iconfont icon-new"></i></div>
        <div class="right-gou">
          <i class="icon iconfont icon-llmainpageback-copy-copy"></i>
        </div>
      </li>-->
    </ul>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  .message-list{
    .mu-appbar{
      height:44/@base;
      background: #fff;
      color:#4a4a4a;
    }
    .list-container{
      li{
        display:box;
        display:-moz-box;
        display:-webkit-box;
        border-bottom:1px solid #f6f6f6;
        div.right-gou{
          margin-right:-10/@base;
          i.icon-llmainpageback-copy-copy{
            float:right;
            color:#4a4a4a;
            font-size: 36/@base;
          }
          height:40/@base;
        }
        padding:10/@base;
        div.right-icon{
          height:40/@base;
          i.icon{
            font-size: 40/@base;
            color: #4F9DEB;
            float:right;
            margin-top:-4/@base;
          }
        }
        div.left-content{
          box-flex:1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          p:first-child{
            font-size: 14/@base;
            color: #4A4A4A;
            margin-bottom:7/@base;
          }
          p:last-child{
            font-size: 12/@base;
            color: #9B9B9B;
          }
        }
      }
    }
  }
</style>
<script>
  export default {
      data(){
          return {
            topTitle:''
          }
      },
    mounted(){
        this.$nextTick(function(){
            this.topTitle=this.$route.params.name;
          document.title=this.$route.name;
        })
    },
    methods:{
      back(){
          this.$router.back()
      },
        routerDetail(name){
            this.$router.push({name:'消息详情',params:{name:name}})
        }
    }
  }
</script>
