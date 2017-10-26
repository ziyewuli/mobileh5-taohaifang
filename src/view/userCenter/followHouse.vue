<template>
  <div class="follow-house">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right"></div>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="buy" title="买房"/>
      <mu-tab value="rent" title="租房"/>
    </mu-tabs>
    <ul v-if="activeTab=='buy'" class="buy-list">
      <li @click="routerDetail(123)">
        <div class="buy-top">
          <img src="../../assets/img/h1.png" alt="">
          <p class="top-time">挂牌时间：2017-01-19</p>
          <p class="top-text">12900 32 Ave cd</p>
          <div @click.stop="collection()" class="shoucang"><i class="icon iconfont icon-yishoucang"></i></div>
        </div>
        <div class="buy-bottom">
          <div>
            <p>租金</p>
            <p>$12344万</p>
          </div>
          <div>
            <p>房屋面积</p>
            <p>10595</p>
          </div>
          <div>
            <ul>
              <li>· 独立屋</li>
              <li>· 6室8卫</li>
            </ul>
          </div>
        </div>
      </li>
      <li @click="routerDetail(123)">
        <div class="buy-top">
          <img src="../../assets/img/h1.png" alt="">
          <p class="top-time">挂牌时间：2017-01-19</p>
          <p class="top-text">12900 32 Ave cd</p>
          <div @click.stop="collection()" class="shoucang"><i class="icon iconfont icon-yishoucang"></i></div>
        </div>
        <div class="buy-bottom">
          <div>
            <p>租金</p>
            <p>$12344万</p>
          </div>
          <div>
            <p>房屋面积</p>
            <p>10595</p>
          </div>
          <div>
            <ul>
              <li>· 独立屋</li>
              <li>· 6室8卫</li>
            </ul>
          </div>
        </div>
      </li>
      <li @click="routerDetail(123)">
        <div class="buy-top">
          <img src="../../assets/img/h1.png" alt="">
          <p class="top-time">挂牌时间：2017-01-19</p>
          <p class="top-text">12900 32 Ave cd</p>
          <div @click.stop="collection()" class="shoucang"><i class="icon iconfont icon-yishoucang"></i></div>
        </div>
        <div class="buy-bottom">
          <div>
            <p>租金</p>
            <p>$12344万</p>
          </div>
          <div>
            <p>房屋面积</p>
            <p>10595</p>
          </div>
          <div>
            <ul>
              <li>· 独立屋</li>
              <li>· 6室8卫</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <ul v-if="activeTab=='rent'" class="rent-list">
      <li @click="routerDetail(123)">
        <div class="buy-top">
          <img src="../../assets/img/h1.png" alt="">
          <p class="top-time">挂牌时间：2017-01-19</p>
          <p class="top-text">12900 32 Ave cd</p>
          <div @click.stop="collection()" class="shoucang"><i class="icon iconfont icon-yishoucang"></i></div>
        </div>
        <div class="buy-bottom">
          <div>
            <p>租金</p>
            <p>$12344万</p>
          </div>
          <div>
            <p>房屋面积</p>
            <p>10595</p>
          </div>
          <div>
            <ul>
              <li>· 独立屋</li>
              <li>· 6室8卫</li>
            </ul>
          </div>
        </div>
      </li>
      <li @click="routerDetail(123)">
        <div class="buy-top">
          <img src="../../assets/img/h1.png" alt="">
          <p class="top-time">挂牌时间：2017-01-19</p>
          <p class="top-text">12900 32 Ave cd</p>
          <div @click.stop="collection()" class="shoucang"><i class="icon iconfont icon-yishoucang"></i></div>
        </div>
        <div class="buy-bottom">
          <div>
            <p>租金</p>
            <p>$12344万</p>
          </div>
          <div>
            <p>房屋面积</p>
            <p>10595</p>
          </div>
          <div>
            <ul>
              <li>· 独立屋</li>
              <li>· 6室8卫</li>
            </ul>
          </div>
        </div>
      </li>
      <li @click="routerDetail(123)">
        <div class="buy-top">
          <img src="../../assets/img/h1.png" alt="">
          <p class="top-time">挂牌时间：2017-01-19</p>
          <p class="top-text">12900 32 Ave cd</p>
          <div @click.stop="collection()" class="shoucang"><i class="icon iconfont icon-yishoucang"></i></div>
        </div>
        <div class="buy-bottom">
          <div>
            <p>租金</p>
            <p>$12344万</p>
          </div>
          <div>
            <p>房屋面积</p>
            <p>10595</p>
          </div>
          <div>
            <ul>
              <li>· 独立屋</li>
              <li>· 6室8卫</li>
            </ul>
          </div>
        </div>
      </li>
      <li @click="routerDetail(123)">
        <div class="buy-top">
          <img src="../../assets/img/h1.png" alt="">
          <p class="top-time">挂牌时间：2017-01-19</p>
          <p class="top-text">12900 32 Ave cd</p>
          <div @click.stop="collection()" class="shoucang"><i class="icon iconfont icon-yishoucang"></i></div>
        </div>
        <div class="buy-bottom">
          <div>
            <p>租金</p>
            <p>$12344万</p>
          </div>
          <div>
            <p>房屋面积</p>
            <p>10595</p>
          </div>
          <div>
            <ul>
              <li>· 独立屋</li>
              <li>· 6室8卫</li>
            </ul>
          </div>
        </div>
      </li>
      <li @click="routerDetail(123)">
        <div class="buy-top">
          <img src="../../assets/img/h1.png" alt="">
          <p class="top-time">挂牌时间：2017-01-19</p>
          <p class="top-text">12900 32 Ave cd</p>
          <div @click.stop="collection()" class="shoucang"><i class="icon iconfont icon-yishoucang"></i></div>
        </div>
        <div class="buy-bottom">
          <div>
            <p>租金</p>
            <p>$12344万</p>
          </div>
          <div>
            <p>房屋面积</p>
            <p>10595</p>
          </div>
          <div>
            <ul>
              <li>· 独立屋</li>
              <li>· 6室8卫</li>
            </ul>
          </div>
        </div>
      </li>
      <li @click="routerDetail(123)">
        <div class="buy-top">
          <img src="../../assets/img/h1.png" alt="">
          <p class="top-time">挂牌时间：2017-01-19</p>
          <p class="top-text">12900 32 Ave cd</p>
          <div @click.stop="collection()" class="shoucang"><i class="icon iconfont icon-yishoucang"></i></div>
        </div>
        <div class="buy-bottom">
          <div>
            <p>租金</p>
            <p>$12344万</p>
          </div>
          <div>
            <p>房屋面积</p>
            <p>10595</p>
          </div>
          <div>
            <ul>
              <li>· 独立屋</li>
              <li>· 6室8卫</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../assets/css/mix";
  ul.buy-list,ul.rent-list{
    background: #f6f6f6;
    li{
      padding:10/@base 10/@base;
      div.buy-top{
        width:100%;
        height:180/@base;
        position: relative;
        div.shoucang{
          position: absolute;
          width:26/@base;
          height:26/@base;
          line-height:26/@base;
          background: rgba(0,0,0,.5);
          font-size: 15/@base;
          top:10/@base;
          right:10/@base;
          text-align: center;
          border-radius: 50%;
          i.icon-weishoucang{
            color:#fff;
          }
          i.icon-yishoucang{
            color: #0F8DED;
          }
        }
        p.top-time{
          font-size: 12/@base;
          color: #FFFFFF;
          background: rgba(0,0,0,.4);
          width:183/@base;
          text-align: center;
          height:22/@base;
          line-height:22/@base;
          border-radius:0 11/@base 11/@base 0;
          top:10/@base;
          left:0;
          position: absolute;
        }
        p.top-text{
          font-size: 14/@base;
          position: absolute;
          bottom:5/@base;
          left:10/@base;
          color: #FFFFFF;
        }
        img{
          width:100%;
          vertical-align: middle;
        }
      }
      div.buy-bottom>div{
        box-flex:1;
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
      }
      div.buy-bottom{
        display:box;
        display:-webkit-box;
        display:-moz-box;
        background: #fff;
        padding:13/@base 0;
        div{
          p,li{
            width:100%;
            text-align: center;
          }
          p:first-child{
            font-size: 12/@base;
            color: #9B9B9B;
            line-height: 17/@base;
            margin-bottom:5/@base;
          }
          p:last-child{
            font-size: 16/@base;
            color: #F04D61;
            line-height: 17/@base;
          }
          ul{
            margin-top:-2/@base;
            li{
              font-size: 12/@base;
              color: #656565;
              padding:0;
            }
          }
        }
      }
    }
  }
  .follow-house{
    div.mu-appbar{
      height:44/@base;
      color:#4a4a4a;
      background: #fff;
      margin-bottom:2/@base;
    }
    div.mu-tabs{
      height:44/@base;
      background: #fff;
      .mu-tab-text{
        color: #9B9B9B;
      }
      button.mu-tab-active{
        .mu-tab-text{
          color:#2889EA;
        }
      }
      .mu-tab-link-highlight{
        background: #2889EA;
      }
    }
  }
</style>
<script>
  export default{
      data(){
          return {
            activeTab:'buy',
            topTitle:'我关注的房子'
          }
      },
      mounted(){
        document.title=this.$route.name;
      },
      methods:{
        routerDetail(id){
            this.$router.push({name:sessionStorage.getItem('detailName')?sessionStorage.getItem('detailName'):'房源详情',params:{id:id},query:{region:sessionStorage.getItem('code')}})
        },
        collection(){
            alert('收藏或取消收藏')
        },
        handleTabChange (val) {
          this.activeTab = val
        },
        back(){
              this.$router.back();
          }
      }
  }
</script>
