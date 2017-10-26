import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['../view/Index'], resolve)
const screen = resolve => require(['../view/Screen'], resolve)
const buyPro = resolve => require(['../view/buyPro'], resolve)
const buyProUS = resolve => require(['../view/buyProUS'], resolve)
const loanPro = resolve => require(['../view/loanPro'], resolve)
const loanProUS = resolve => require(['../view/loanProUS'], resolve)
const bannerShare = resolve => require(['../view/bannerShare'], resolve)
const developing = resolve => require(['../view/developing'], resolve)
const message = resolve => require(['../view/Message'], resolve)
const my = resolve => require(['../view/My'], resolve)
const detached = resolve => require(['../view/navList/DetachedHouse'], resolve)
const schoolHouse = resolve => require(['../view/navList/schoolHouse'], resolve)
const messageContent = resolve => require(['../view/enc/Message'], resolve)
const infoList = resolve => require(['../view/enc/infoList'], resolve)
const encList = resolve => require(['../view/enc/encList'], resolve)
const detailContent = resolve => require(['../view/navList/DetailContent'], resolve)
const detailContentUS = resolve => require(['../view/navList/DetailContentUS'], resolve)
const CompareHouse = resolve => require(['../view/navList/CompareHouse'], resolve)
const mapHouse = resolve => require(['../view/navList/MapHouse'], resolve)
const mapHouseCompare = resolve => require(['../view/navList/mapHouseCompare'], resolve)
const mapSchoolHouse = resolve => require(['../view/navList/mapSchoolHouse'], resolve)
const mapSchoolSingle = resolve => require(['../view/navList/mapSchoolSingle'], resolve)
const mapHouseSingle = resolve => require(['../view/navList/mapHouseSingle'], resolve)
const messageList = resolve => require(['../view/msg/MessageList'], resolve)
const messageDetail = resolve => require(['../view/msg/MessageDetai'], resolve)
const followHouse = resolve => require(['../view/userCenter/followHouse'], resolve)
const lookHouse = resolve => require(['../view/userCenter/lookRecord'], resolve)
const rentRecord = resolve => require(['../view/userCenter/rentRecord'], resolve)
const languageSetting = resolve => require(['../view/userCenter/SettingLanguage'], resolve)
const about = resolve => require(['../view/userCenter/About'], resolve)
const calculator = resolve => require(['../view/Calculator'], resolve)
const indexReg = resolve => require(['../view/LoginRegister'], resolve)
const register = resolve => require(['../view/userCenter/Register'], resolve)
const login = resolve => require(['../view/userCenter/Login'], resolve)
const xieyi = resolve => require(['../view/userCenter/xieyi'], resolve)
const findPass = resolve => require(['../view/userCenter/FindPass'], resolve)
const newPassPhone = resolve => require(['../view/userCenter/PhoneNewPass'], resolve)
const newMailPhone = resolve => require(['../view/userCenter/MailNewPass'], resolve)
const settingIndex = resolve => require(['../view/userCenter/SettingIndex'], resolve)
const askDynamic = resolve => require(['../view/userCenter/askDynamic'], resolve)
const ask = resolve => require(['../view/ask/AskIndex'], resolve)
const askTag = resolve => require(['../view/ask/AskTag'], resolve)
const question = resolve => require(['../view/ask/Question'], resolve)
const answer = resolve => require(['../view/ask/Answer'], resolve)
const askDetail = resolve => require(['../view/ask/AskDetail'], resolve)
const encyclopedias = resolve => require(['../view/enc/Encyclopedias'], resolve)
const encDetail = resolve => require(['../view/enc/EncDetail'], resolve)
const msgDetail = resolve => require(['../view/enc/MessageDetail'], resolve)
const choiceIndex = resolve => require(['../view/choice/ChoiceIndex'], resolve)
const houseOwner = resolve => require(['../view/choice/houseOwner'], resolve)
const schoolDetail = resolve => require(['../view/navList/schoolDetail'], resolve)
const collection = resolve => require(['../view/userCenter/Collection'], resolve)
const myAsk = resolve => require(['../view/userCenter/MyAsk'], resolve)
const browseLog = resolve => require(['../view/userCenter/BrowseLog'], resolve)
const addPass = resolve => require(['../view/userCenter/AddPass'], resolve)
const editorPass = resolve => require(['../view/userCenter/EditPass'], resolve)
const bangEmail = resolve => require(['../view/userCenter/BangEmail'], resolve)
const editEmail = resolve => require(['../view/userCenter/ChangeEmail'], resolve)
const bindPhone = resolve => require(['../view/userCenter/BindPhone'], resolve)
const changePhone = resolve => require(['../view/userCenter/ChangePhone'], resolve)
const changeNick = resolve => require(['../view/userCenter/ChangeNick'], resolve)
const mapSchool = resolve => require(['../view/navList/MapSchool'], resolve)
Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    },
    {
      path: '/index',
      name: '首页',
      component: Index,

    },
    {
      path: '/screen',
      name: '房源筛选',
      component: screen,

    },
    {
      path: '/buyPro',
      name: '买房过程',
      component: buyPro,

    },
    {
      path: '/buyProUS',
      name: '买房过程美国',
      component: buyProUS,

    },
    {
      path: '/loanPro',
      name: '贷款流程',
      component: loanPro,

    },
    {
      path: '/loanProUS',
      name: '贷款流程美国',
      component: loanProUS,

    },
    {
      path: '/bannerShare',
      name: '分享专题',
      component: bannerShare,

    },
    {
      path: '/developing',
      name: '开发中',
      component: developing,

    },
    {
      path: '/message',
      name: '消息',
      component: message
    },
    {
      path: '/my',
      name: '个人中心',
      component: my
    },
    {
      path: '/detached',
      name: '找房列表',
      component: detached,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/schoolHouse',
      name: '学区房',
      component: schoolHouse,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/messageContent',
      name: '资讯(弃用)',
      component: messageContent
    },
    {
      path: '/infoList',
      name: '资讯',
      component: infoList
    },
    {
      path: '/encList',
      name: '百科',
      component: encList
    },
    {
      path: '/detailContent/:id',
      name: '房源详情',
      component: detailContent
    },
    {
      path: '/detailContentUS/:id',
      name: '美国房源详情',
      component: detailContentUS
    },
    {
      path: '/CompareHouse',
      name: '房源比较',
      component: CompareHouse
    },
    {
      path: '/mapHouse',
      name: '地图找房',
      component: mapHouse
    },
    {
      path: '/mapHouseCompare',
      name: '地图比较',
      component: mapHouseCompare
    },
    {
      path: '/mapSchoolHouse',
      name: '学区找房',
      component: mapSchoolHouse
    },
    {
      path: '/mapSchoolSingle',
      name: '学校地图',
      component: mapSchoolSingle
    },
    {
      path: '/mapHouseSingle',
      name: '房源地图',
      component: mapHouseSingle
    },
    {
      path: '/messageList/:name',
      name: '消息列表',
      component: messageList
    },
    {
      path: '/messageDetail/:name',
      name: '消息详情',
      component: messageDetail
    },
    {
      path: '/followHouse/:type',
      name: '我关注的房子',
      component: followHouse
    },
    {
      path: '/lookHouse/:type',
      name: '我的看房记录',
      component: lookHouse
    },
    {
      path: '/rentRecord/:type',
      name: '我的出租记录',
      component: rentRecord
    },
    {
      path: '/languageSetting',
      name: '语言设置',
      component: languageSetting
    },
    {
      path: '/about',
      name: '关于我们',
      component: about
    },
    {
      path: '/calculator',
      name: '计算器',
      component: calculator
    },
    {
      path: '/indexReg',
      name: '登录首页',
      component: indexReg
    },
    {
      path: '/register',
      name: '注册',
      component: register
    },
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/xieyi',
      name: '协议',
      component: xieyi
    },
    {
      path: '/findPass',
      name: '找回密码',
      component: findPass
    },
    {
      path: '/newPassPhone/:type',
      name: '手机找回密码',
      component: newPassPhone
    },
    {
      path: '/newMailPhone/:type',
      name: '邮箱找回密码',
      component: newMailPhone
    },
    {
      path: '/settingIndex',
      name: '设置首页',
      component: settingIndex
    },
    {
      path: '/ask',
      name: '问答列表',
      component: ask,
    },
    {
      path: '/askTag',
      name: '问答标签',
      component: askTag,
    },
    {
      path: '/askDynamic',
      name: '问答动态',
      component: askDynamic,
    },
    {
      path: '/question',
      name: '问答',
      component: question
    },
    {
      path: '/answer/:id',
      name: '回答',
      component: answer
    },
    {
      path: '/askDetail/:id',
      name: '问答详情',
      component: askDetail
    },
    {
      path: '/encyclopedias',
      name: '百科列表',
      component: encyclopedias
    },
    {
      path: '/encDetail/:id',
      name: '百科详情',
      component: encDetail
    },
    {
      path: '/msgDetail/:id',
      name: '资讯详情',
      component: msgDetail
    },
    {
      path: '/choiceIndex',
      name: '精选',
      component: choiceIndex,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/houseOwner',
      name: '我是房主',
      component: houseOwner
    },
    {
      path: '/schoolDetail/:id',
      name: '学校详情',
      component: schoolDetail
    },
    {
      path: '/collection/:type',
      name: '收藏列表',
      component: collection,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/myAsk',
      name: '我的问答',
      component: myAsk
    },
    {
      path: '/browseLog',
      name: '看房记录',
      component: browseLog
    },
    {
      path: '/editorPass',
      name: '修改密码',
      component: editorPass
    },
    {
      path: '/addPass',
      name: '设置密码',
      component: addPass
    },
    {
      path: '/bangEmail',
      name: '绑定邮箱',
      component: bangEmail
    },
    {
      path: '/editEmail',
      name: '修改邮箱',
      component: editEmail
    },
    {
      path: '/bindPhone',
      name: '绑定手机',
        component: bindPhone
    },
    {
      path: '/changePhone',
      name: '修改手机',
      component: changePhone
    },
    {
      path: '/changeNick',
      name: '修改昵称',
      component: changeNick
    },
    {
      path: '/mapSchool',
      name: '学区地图',
      component: mapSchool
    }
  ],
})
