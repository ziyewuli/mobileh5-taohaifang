<template>
  <div class="ask-dynamic">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span>问答动态</span></div>
      <div class="right" style=""></div>
    </div>
    <div class="tabs">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="newAsk" title="新的回复"/>
        <mu-tab value="newLike" title="给我的赞"/>
      </mu-tabs>
      <div class="replyNum text-center" @click="activeTab='newAsk'">99+</div>
      <div class="replyNum replyNum2 text-center" @click="activeTab='newLike'">1</div>
    </div>
    <div class="ask" v-if="activeTab=='newAsk'">
      <mt-loadmore v-if="datas!==null" :bottom-method="loadMore" :bottom-all-loaded="allLoaded1" ref="loadmore">
        <ul class="new-list">
          <li v-for="list in datas" :key="list.id" @click.stop="routerDetail(list.id)">
            <div class="list-top">
              <span class="ask-title bold" style="height:auto;" v-text="list.title"></span>
              <img v-if="list.images!==null&&list.images!==''" src="../../assets/img/hasPic.png">
              <!--<p class="remark"  v-text="list.remark.length>70?list.remark.substring(0,70)+'...':list.remark"></p>-->
            </div>
            <!--<div v-if="list.images!==null&&list.images!==''" class="img-list">
              <img v-for="img in list.images" :src="imgUrl+img" alt="">
            </div>-->
            <div class="tips"><span v-for="tip in list.labels" v-text="tip"></span></div>
            <!--<div class="list-bottom">
              <span class="ask-time" v-text="list.dateFmt"></span>
              <i class="icon iconfont icon-icon_huidashu"></i> <span class="answer" v-text="list.answerNum"></span>
            </div>-->
            <div class="list-bottom clearfix">
              <span class="ask-time" v-text="list.nickName+'提问于'+list.dateFmt"></span>
              <span class="answer float-r" >查看{{list.answerNum}}个回答</span>
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <div v-else class="no-ask">
        <img src="../../assets/img/noask.png" alt="">
        <p>暂无回答</p>
        <button @click="routerAsk('问答')">去提问看看</button>
      </div>
    </div>
    <div class="ask" v-if="activeTab=='newLike'">
      <mt-loadmore v-if="datas1!==null" :bottom-method="loadMore1" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="new-list">
        </ul>
      </mt-loadmore>
      <div v-else class="no-ask">
        <img src="../../assets/img/noask.png" alt="">
        <p>暂无回答</p>
        <button @click="routerAsk('问答列表')">去问答看看</button>
      </div>
    </div>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import '../../assets/css/mix';
  div.ask-dynamic{
    div.mu-appbar{
      height:44/@base;
      background-color: #fff;
      color:#4a4a4a;
      font-size: 27/@base;
    }
    div.tabs{
      position: relative;
      .replyNum{
        height:18/@base;
        min-width: 18/@base;
        font-size: 14/@base;
        line-height: 18/@base;
        padding:0 5/@base;
        position: absolute;
        background-color: #F14114;
        color: #fff;
        border-radius: 9/@base;
        top:14/@base;
        left:130/@base;
        z-index: 3;
      }
      .replyNum.replyNum2{
        left:315/@base;
      }
    }
    div.mu-tabs{
      height:44/@base;
      background-color:#f5f5f5 ;
      button{
        color:#9b9b9b;
      }
      button.mu-tab-active{
        color:#f14114;
      }
      span.mu-tab-link-highlight{
        background-color: #f14114;
      }
    }
    div.ask{
      div.mint-loadmore-bottom{
        margin-bottom:-50px !important;
      }
      ul.ask-list,ul.new-list{
        li{
          position: relative;
          padding:20/@base 20/@base 0;
          background-color: #fff;
          border-bottom:1px solid #ececec;
          div.list-top{
            padding-bottom: 20/@base;
            img{
              width:16/@base;
              height:16/@base;
              vertical-align: middle;
            }
            span.ask-title{
              font-size: 18/@base;
              color: #1E1E1E;
              line-height: 26/@base;
              vertical-align: middle;
            }
            .remark{
              padding:15/@base 0;
            }
          }
          div.tips{
            span{
              background: #EBEBEB;
              border-radius: 1px;
              display:inline-block;
              text-align: center;
              font-size: 12/@base;
              color: #9B9B9B;
              line-height:12/@base;
              padding:2/@base 5/@base;
              margin-right:10/@base;
            }
          }
          div.list-bottom{
            i.icon-icon_wenda_yixuan{
              color:#c2c2c2;
              font-size: 14/@base;
            }
            span{
              font-size: 12/@base;
              color: #9B9B9B;
            }
            span:first-child{
              margin-right:22/@base;
            }
          }
          button.answer-btn{
            width:76/@base;
            text-align: center;
            height:26/@base;
            line-height:26/@base;
            border:1px solid rgba(241,65,20,0.53);
            border-radius: 13/@base;
            position: absolute;
            right:20/@base;
            bottom:20/@base;
            background-color: #fff;
            font-size: 14/@base;
            color: #F14114;
          }
          div.img-list{
            img{
              width:110/@base;
              height:80/@base;
            }
            img:nth-child(2){
              margin:0 2/@base;
            }
          }
        }
      }
      ul.new-list{
        li{
          margin-bottom:15/@base;
          p.remark{
            color:#9b9b9b;
            font-size: 14/@base;
          }
          div.list-bottom{
            padding: 10/@base 0 20/@base;
            span,i{
              vertical-align: middle;
            }
            i.icon-icon_huidashu{
              font-size: 16/@base;
              color:#9b9b9b;
            }
          }
          div.my-answer-bg{
            .answer-list{
              border-top: 1px solid #ececec;
              .list-bottom{
                .answer-icon{
                  display: inline-block;
                  margin-right: 0;
                  width:30/@base;
                  color:#f14114;
                  font-size: 16/@base;
                }
                .answer-content{
                  display: inline-block;
                  width:300/@base;
                  font-size: 16/@base;
                  color: #4A4A4A;
                  vertical-align: top;
                }
              }
            }
          }
        }
      }
      div.no-ask{
        width:100%;
        padding-top:80/@base;
        background-color: #fff;
        position: absolute;
        top:88/@base;
        bottom:0;
        img{
          display: block;
          margin:0 auto;
          width:100/@base;
          height:100/@base;
        }
        p{
          color:#cfcfcf;
          font-size: 22/@base;
          text-align: center;
          margin-top:20/@base;
        }
        button{
          display: block;
          width:255/@base;
          color:#fff;
          height:40/@base;
          line-height:40/@base;
          font-size: 16/@base;
          text-align: center;
          border:none;
          background-color: #f14114;
          margin:100/@base auto 0 auto;
          border-radius: 6/@base;
          outline: none;
        }
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  import { Loadmore } from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  import {rxUtils} from '../../assets/js/rxUtils'
  export default{
    data(){
        return{
          allLoaded:false,
          allLoaded1:false,
          activeTab:'newAsk',
          imgUrl:'',
          pageSize:5,
          currentPage:1,
          currentPage1:1,
          datas:[],
          datas1:[]
        }
    },
    mounted(){
      let self=this;
      document.title=this.$route.name;
      this.$nextTick(function () {
        this.scroller = this.$el;
        this.scroller1 = this.$el
        self.imgUrl=rxUtils.hostAsk;
        self.$http.get('/question/unreadAnswers.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage, {}, {emulateJSON: true})
          .then(function (response) {
            this.datas=response.body.data.data;
          }).then(function (error) {
        })
        self.$http.get('/question/unreadLikes.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage1, {}, {emulateJSON: true})
          .then(function (response) {
            this.datas1=response.body.data;
          }).then(function (error) {
        })
      })
    },
    methods:{
      timer:function(val){
        let date=new Date(val);
        let year=date.getFullYear();
        let mouth=date.getMonth()+1;
        let data=date.getDate();
        if(mouth<10){
          var newMouth='0'+mouth
        }else{
          var newMouth=mouth
        }
        if(data<10){
          var newData='0'+data;
        }else{
          var newData=data;
        }
        return year+'-'+newMouth+'-'+newData
      },
      back(){
          this.$router.back();
      },
      handleTabChange (val) {
        this.activeTab = val
      },
      routerAsk(name){
        this.$router.push({name:name})
        this.$router.go(0)
      },
      routerDetail(id){
        this.$router.push({name:'问答详情',params:{id:id}})
      },
      loadMore () {
        let self=this;
        self.currentPage=self.currentPage+1;
        setTimeout(() => {
          self.$http.get('/question/unreadAnswers.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage, {}, {emulateJSON: true})
            .then(function (response) {
              /*if(response.body.data!==null){
                this.allLoaded1 = true;
                for(let i=0;i<response.body.data.length;i++){
                    this.datas.push(response.body.data[i])
                }
                this.allLoaded1 = false;
                this.$refs.loadmore.onBottomLoaded();
              }else{
                this.allLoaded1 = true;
                this.$refs.loadmore.onBottomLoaded();
              }*/
            }).then(function (error) {
          })
        }, 2000)
      },
      loadMore1 () {
        let self=this;
        self.currentPage1=self.currentPage1+1;
        setTimeout(() => {
          self.$http.get('/question/unreadLikes.json?pageSize='+self.pageSize+'&currentPage='+self.currentPage1, {}, {emulateJSON: true})
            .then(function (response) {
              /*if(response.body.data!==null){
                for(let i=0;i<response.body.data.length;i++){
                  this.datas1.push(response.body.data[i])
                }
                this.$refs.loadmore.onBottomLoaded();
                this.allLoaded = false
              }else{
                this.allLoaded = true;// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();
              }*/
            }).then(function (error) {
          })
        }, 2000)
      },
    }
  }
</script>
