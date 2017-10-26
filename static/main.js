import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'mint-ui/lib/style.css'
import './assets/css/map.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import VueResource from  'vue-resource'
Vue.use(MuseUI)
Vue.use(VueResource)
Vue.config.productionTip = false
import './assets/css/base.css'
import './assets/css/mix.less'
import {rxUtils}  from './assets/js/rxUtils'
rxUtils.setRem(15);
let app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
router.beforeEach((to, from, next) => {
  // document.title=to.name;
  next();
})
router.afterEach((to, from, next) => {
  document.title = to.name;
  var mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    iframe.setAttribute('src', '/favicon.ico')
    var iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
})
Vue.prototype.ajax = function (){alert(123444444)};
Vue.http.interceptors.push((request, next) => {
  let self = app;
  console.log(request);
  let authentication = rxUtils.sessionStorage.getItem("authentication")?rxUtils.sessionStorage.getItem("authentication"):null;
  if(request.body){
    request.body.authentication=authentication
  }else{
    request.params.authentication=authentication;
  }
  //request.params.authentication=authentication;
  // modify request
  //request.method = 'POST';//在请求之前可以进行一些预处理和配置
  if(isWeiXin()){
    //alert("isWeiXin");
    //if(!authentication){http://localhost:8080/#/index
      //location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx58472d4ac16c8e60&redirect_uri=http%3A%2F%120.0.0.1%3A8080%2F#%2F%23%2F&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
      //location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx58472d4ac16c8e60&redirect_uri=http%3A%2F%2Fm.taohaifang.com%2Fmobile%2F%23%2F&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
  }else{
    //}
    //alert("notWeiXin");

  }
  // continue to next interceptor
  next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    console.log(response);
    if(response.body.code==405||response.body.code==900){
      console.log("405拦截");
      self.toastMsg='请先登录';
      self.toast = true;
      //this.ajax();
      /*if (self.toastTimer) clearTimeout(self.toastTimer);
      self.toastTimer = setTimeout(() => {
        self.toast = false;
        self.$router.push({name:'登录首页'})
      }, 1000)*/
    }
    //response.body = '...';
    return response;

  });
});

function isWeiXin(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }else{
    return false;
  }
}
