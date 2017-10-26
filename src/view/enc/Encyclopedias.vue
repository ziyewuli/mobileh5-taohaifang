<template>
  <div class="enc-index">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>知识百科</span></div>
      <div class="right"></div>
    </div>
    <div class="list-box">
      <ul class="sub-list">
        <li class="active">热门百科</li>
        <li>计划买房</li>
        <li>买房政策</li>
        <li>签订合同</li>
        <li>贷款办理</li>
      </ul>
      <ul class="sub-sub-list">
        <li @click="routerDetail">
          <p class="title-text">掌握五大要点就能买好房</p>
          <div class="tips"><span>房价</span><span>业主</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return {

          }
      },

    methods:{
      back(){
          this.$router.back();
      },
      routerDetail(){
          this.$router.push({name:'百科详情',params:{id:'1231'}})
      }
    }
  }
</script>
