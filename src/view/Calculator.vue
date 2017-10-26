<template>
  <div class="calculator">
    <div class="mu-appbar mu-paper-1">
      <div @click="back" class="left"><i class="icon iconfont icon-back"></i></div>
      <div class="mu-appbar-title"><span v-text="topTitle"></span></div>
      <div class="right"></div>
    </div>
    <ul class="number-container">
      <li>
        <div class="name">房屋价格：</div>
        <div class="reduce" @click="moneyChange('reduce')">-</div>
        <input disabled type="text" v-model="money">
        <div class="add" @click="moneyChange('add')">+</div>
        <span v-if="country=='ca'">CA$</span>
        <span v-if="country=='us'">$</span>
      </li>
      <li>
        <div class="name">首付比例：</div>
        <div class="reduce" @click="proportionChange('reduce')">-</div>
        <input disabled type="text" v-model="proportion">
        <div class="add" @click="proportionChange('add')">+</div>
        <span>%</span>
      </li>
      <li>
        <div class="name">还款年限：</div>
        <div class="reduce" @click="repaymentChange('reduce')">-</div>
        <input disabled type="text" v-model="repayment">
        <div class="add" @click="repaymentChange('add')">+</div>
        <span>年</span>
      </li>
      <li>
        <div class="name">利率：</div>
        <div class="reduce" @click="rateChange('reduce')">-</div>
        <input disabled type="text" v-model="rate">
        <div class="add" @click="rateChange('add')">+</div>
        <span>%</span>
      </li>
      <li>
        <div class="name">还款周期：</div>
        <div class="cycle">
          <div @click="cycle('mounth')" :class="[cycleType=='mounth'?'active':'']">每月付 <i class="icon iconfont icon-icon_duihao"></i></div>
          <div @click="cycle('hrefMounth')" :class="[cycleType=='hrefMounth'?'active':'']">半月付 <i class="icon iconfont icon-icon_duihao"></i></div>
          <div @click="cycle('week')" :class="[cycleType=='week'?'active':'']">每周付 <i class="icon iconfont icon-icon_duihao"></i></div>
        </div>
      </li>
    </ul>
    <div class="charts-container">
      <p>{{moneyText}}供
        <span v-if="country=='ca'">$ <span>{{moneyData.everyMonth}}</span>加元/{{moneyText}}</span>
        <span v-if="country=='us'">$ <span>{{moneyData.everyMonth}}</span>美元/{{moneyText}}</span>
      </p>
      <p>(人民币￥{{(moneyData.everyMonth*rate).toFixed(2)}})</p>
      <div id="charts" style="width:100%;height:7.54rem">
        <div id="main"  :style="{width:'100%',height:'7.54rem'}"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../assets/css/mix";
  .calculator{
    background: #f6f6f6;
    div.echarts{
      width:100%;
      height:200/@base;
    }
    div.charts-container>p:first-child{
      font-size: 12/@base;
      color: #4A4A4A;
      width:100%;
      text-align: center;
      span{
        font-size: 12/@base;
        color: #9B9B9B;
        span{
          font-size: 24/@base;
          color: #f14114;
        }
      }
    }
    div.charts-container>p:nth-child(2){
      font-size: 14/@base;
      width:100%;
      text-align: center;
      color: #4A4A4A;
    }
    div.charts-container{
      background: #fff;
      margin-top:10/@base;
      padding-top:20/@base;
    }
    div.cycle{
      display:box;
      display:-webkit-box;
      display:-moz-box;
      width:100%-400/@base;
    }
    div.cycle>div.active{
      color:#f14114;
      i.icon{
        display:inline-block;
      }
    }
    div.cycle>div{
      box-flex:1;
      -moz-box-flex: 1;
      -webkit-box-flex: 1;
      font-size: 14/@base;
      color: #656565;
      width:100%;
      i{
        color:#f14114;
        vertical-align: middle;
        font-size: 18/@base;
        margin-top: -2/@base;
        display:none;
      }
    }
    ul.number-container{
      background: #fff;
      li>span{
        font-size: 14/@base;
        color: #4A4A4A;
        width:30/@base;
        display:block;
      }
      li{
        display:box;
        display:-webkit-box;
        display:-moz-box;
        padding:17/@base 10/@base;
        border-bottom:1px solid #ececec;
        div.name{
          font-size: 14/@base;
          color: #4A4A4A;
          margin-right:5/@base;
          width:72/@base;
        }
        div.reduce,div.add{
          width:26/@base;
          height:26/@base;
          background: #f5f5f5;
          margin-right:10/@base;
          text-align: center;
          line-height:26/@base;
          font-size: 12/@base;
          color:#9b9b9b;
          margin-top:-2/@base;
        }
        input{
          display:block;
          box-flex:1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          background: #fff;
          border:none;
          color:#f14114;
          vertical-align: middle;
          outline: none;
        }
        input:disabled{
          background: #fff;
        }
      }
    }
    .mu-appbar{
      height:44/@base;
      background: #fff;
      color:#4a4a4a;
      box-shadow: none;
      border-bottom:1px solid #ececec;
      margin-bottom:10/@base;
    }
  }
</style>
<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default{
      data(){
          return {
            country:null,
            unit:null,
            rate:null,
            topTitle:'购房计算器',
            money:1000000,
            proportion:30,
            repayment:20,
            rate:0.256,
            cycleType:'mounth',
            chartsoption:{
              tooltip: {
                trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              color:['#E9E167','#F7AF68','#4F9DEB','#AE78ED'],
              legend:{
                orient:'vertical',
                right:'0',
                top:'16%',
                itemGap:12,
                padding:[15,15],
                textStyle:{
                  fontSize:14,
                  color:'#4a4a4a'
                },
                data:[
                  {name:"交易税", icon: 'circle'},
                  {name:"首付", icon: 'circle'},
                  {name:"贷款总额", icon: 'circle'},
                  {name:"利息总额", icon: 'circle'}
                  ]
             },
              series: [{
                name: '访问来源',
                type: 'pie',
                radius : ['25%', '50%'],
                center: ['20%', '50%'],
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label:{
                  normal:{
                    show:false
                  }
                },
                data: [
                  {value:49820, name:'交易税'},
                  {value:600000, name:'首付'},
                  {value:1400000, name:'贷款总额'},
                  {value:1000000, name:'利息总额'},
                ]
              }],
            },
            moneyType:'12',
            moneyText:'月',
            moneyData:{}
          }
      },
    mounted(){
      this.$nextTick(function () {
          let self=this;
        document.title=this.$route.name;
        self.money = this.$route.query.price?this.$route.query.price:self.money;
        self.country = this.$route.query.country?this.$route.query.country:sessionStorage.getItem('country');
        if(self.country=='us'){
          self.unit='美元';
          if(sessionStorage.getItem("usdRate")){
            self.rate = sessionStorage.getItem("usdRate");
          }else{
            //获取汇率
            self.$http.get('/cfg/config.json', {}, {emulateJSON: true})
              .then(function (response) {
                self.rate=response.data.data.usdRate;
                sessionStorage.setItem("usdRate",self.usdRate);
              }).then(function (error) {
            })
          }
        }else if(self.country=='ca'){
          self.unit='加元';
          if(sessionStorage.getItem("cadRate")){
            self.rate = sessionStorage.getItem("cadRate");
          }else{
            //获取汇率
            self.$http.get('/cfg/config.json', {}, {emulateJSON: true})
              .then(function (response) {
                self.rate=response.data.data.cadRate;
                sessionStorage.setItem("cadRate",self.cadRate);
              }).then(function (error) {
            })
          }
        }

        function houseCalculator(totalPrice, firstRate, year, monthRate, week) {
          var b = totalPrice, //总价
            c = monthRate, //利率
            d = firstRate, //首付比例
            e = b * d, // 0.01*总价*首付比例
            f = year, //还款年限
            g = week, //还款周期 12月付、24半月付、52周付
            h = b * (1 - d / 100),
            i = c / 100,
            j = i / 2,
            k = 12 * f,
            l = 2 / 12,
            m = Math.pow(1 + j, l) - 1,
            n = Math.pow(1 + m, k),
            o = h * m * n / (n - 1);
          //获取交易税
          function getBuyTax() {
            var tal = totalPrice;
            if (200000 >= b) {
              return priceConvert(.01 * tal, 2);
            } else {
              if (tal > 20000) {
                return priceConvert(.02 * tal - 2000, 2);
              }
            }
            return 0;
          }
          //价格转换
          function priceConvert(inputNum, precision) {
            return parseFloat(parseFloat(inputNum).toFixed(precision));
          }
          //贷款总额
          function getLoanPrice() {
            return priceConvert(b-e,2);
          }
          //利息总额
          function getRatePrice() {
            var tmp = 12 * o / g;
            var loan = getLoanPrice();
            return priceConvert(tmp*g*f-loan,2);
          }
          return {
            everyMonth: priceConvert(12 * o / g, 2),
            firstPayment: e,
            buyTax: getBuyTax(),
            loanPayment: getLoanPrice(),
            ratePayment: getRatePrice()
          };
        }
        this.moneyData=houseCalculator(self.money,self.proportion/100,self.repayment,self.rate/100,self.moneyType)
        self.chartsoption.series[0].data[0].value=self.moneyData.buyTax;
        self.chartsoption.series[0].data[1].value=self.moneyData.firstPayment;
        self.chartsoption.series[0].data[2].value=self.moneyData.loanPayment;
        self.chartsoption.series[0].data[3].value=self.moneyData.ratePayment;
        self.chartsoption.series[0].data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.series[0].data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.series[0].data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.series[0].data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
        self.chartsoption.legend.data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.legend.data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.legend.data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.legend.data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(self.chartsoption);
      })
    },
    methods:{
      rateChange(type){
          let self=this;
          if(type=='add'){
              let num=Number(this.rate)+0.01;
              this.rate=num.toFixed(3);
          }else{
              if(this.rate>0){
                let num=this.rate-0.01;
                this.rate=num.toFixed(3);
              }else{
                  this.rate=0;
              }
          }
        function houseCalculator(totalPrice, firstRate, year, monthRate, week) {
          var b = totalPrice, //总价
            c = monthRate, //利率
            d = firstRate, //首付比例
            e = b * d, // 0.01*总价*首付比例
            f = year, //还款年限
            g = week, //还款周期 12月付、24半月付、52周付
            h = b * (1 - d / 100),
            i = c / 100,
            j = i / 2,
            k = 12 * f,
            l = 2 / 12,
            m = Math.pow(1 + j, l) - 1,
            n = Math.pow(1 + m, k),
            o = h * m * n / (n - 1);
          //获取交易税
          function getBuyTax() {
            var tal = totalPrice;
            if (200000 >= b) {
              return priceConvert(.01 * tal, 2);
            } else {
              if (tal > 20000) {
                return priceConvert(.02 * tal - 2000, 2);
              }
            }
            return 0;
          }
          //价格转换
          function priceConvert(inputNum, precision) {
            return parseFloat(parseFloat(inputNum).toFixed(precision));
          }
          //贷款总额
          function getLoanPrice() {
            return priceConvert(b-e,2);
          }
          //利息总额
          function getRatePrice() {
            var tmp = 12 * o / g;
            var loan = getLoanPrice();
            return priceConvert(tmp*g*f-loan,2);
          }
          return {
            everyMonth: priceConvert(12 * o / g, 2),
            firstPayment: e,
            buyTax: getBuyTax(),
            loanPayment: getLoanPrice(),
            ratePayment: getRatePrice()
          };
        }
        this.moneyData=houseCalculator(self.money,self.proportion/100,self.repayment,self.rate/100,self.moneyType)
        self.chartsoption.series[0].data[0].value=self.moneyData.buyTax;
        self.chartsoption.series[0].data[1].value=self.moneyData.firstPayment;
        self.chartsoption.series[0].data[2].value=self.moneyData.loanPayment;
        self.chartsoption.series[0].data[3].value=self.moneyData.ratePayment;
        self.chartsoption.series[0].data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.series[0].data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.series[0].data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.series[0].data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
        self.chartsoption.legend.data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.legend.data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.legend.data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.legend.data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
      },//改变利率
      repaymentChange(type){
        let self=this;
          if(type=='add'){
              if(this.repayment<30){
                  this.repayment=this.repayment+1;
              }else{
                  this.repayment=30;
              }
          }else{
              if(this.repayment>0){
                  this.repayment=this.repayment-1;
              }else{
                  this.repayment=0;
              }
          }
        function houseCalculator(totalPrice, firstRate, year, monthRate, week) {
          var b = totalPrice, //总价
            c = monthRate, //利率
            d = firstRate, //首付比例
            e = b * d, // 0.01*总价*首付比例
            f = year, //还款年限
            g = week, //还款周期 12月付、24半月付、52周付
            h = b * (1 - d / 100),
            i = c / 100,
            j = i / 2,
            k = 12 * f,
            l = 2 / 12,
            m = Math.pow(1 + j, l) - 1,
            n = Math.pow(1 + m, k),
            o = h * m * n / (n - 1);
          //获取交易税
          function getBuyTax() {
            var tal = totalPrice;
            if (200000 >= b) {
              return priceConvert(.01 * tal, 2);
            } else {
              if (tal > 20000) {
                return priceConvert(.02 * tal - 2000, 2);
              }
            }
            return 0;
          }
          //价格转换
          function priceConvert(inputNum, precision) {
            return parseFloat(parseFloat(inputNum).toFixed(precision));
          }
          //贷款总额
          function getLoanPrice() {
            return priceConvert(b-e,2);
          }
          //利息总额
          function getRatePrice() {
            var tmp = 12 * o / g;
            var loan = getLoanPrice();
            return priceConvert(tmp*g*f-loan,2);
          }
          return {
            everyMonth: priceConvert(12 * o / g, 2),
            firstPayment: e,
            buyTax: getBuyTax(),
            loanPayment: getLoanPrice(),
            ratePayment: getRatePrice()
          };
        }
        this.moneyData=houseCalculator(self.money,self.proportion/100,self.repayment,self.rate/100,self.moneyType)
        self.chartsoption.series[0].data[0].value=self.moneyData.buyTax;
        self.chartsoption.series[0].data[1].value=self.moneyData.firstPayment;
        self.chartsoption.series[0].data[2].value=self.moneyData.loanPayment;
        self.chartsoption.series[0].data[3].value=self.moneyData.ratePayment;
        self.chartsoption.series[0].data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.series[0].data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.series[0].data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.series[0].data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
        self.chartsoption.legend.data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.legend.data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.legend.data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.legend.data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
      },//改变还款年限
      proportionChange(type){
        let self=this;
          if(type=='add'){
              if(this.proportion<100){
                this.proportion=this.proportion+1;
              }else{
                this.proportion=100;
              }
          }else{
              if(this.proportion>0){
                  this.proportion=this.proportion-1;
              }else{
                  this.proportion=0;
              }
          }
        function houseCalculator(totalPrice, firstRate, year, monthRate, week) {
          var b = totalPrice, //总价
            c = monthRate, //利率
            d = firstRate, //首付比例
            e =  b * d, // 0.01*总价*首付比例
            f = year, //还款年限
            g = week, //还款周期 12月付、24半月付、52周付
            h = b * (1 - d / 100),
            i = c / 100,
            j = i / 2,
            k = 12 * f,
            l = 2 / 12,
            m = Math.pow(1 + j, l) - 1,
            n = Math.pow(1 + m, k),
            o = h * m * n / (n - 1);
          //获取交易税
          function getBuyTax() {
            var tal = totalPrice;
            if (200000 >= b) {
              return priceConvert(.01 * tal, 2);
            } else {
              if (tal > 20000) {
                return priceConvert(.02 * tal - 2000, 2);
              }
            }
            return 0;
          }
          //价格转换
          function priceConvert(inputNum, precision) {
            return parseFloat(parseFloat(inputNum).toFixed(precision));
          }
          //贷款总额
          function getLoanPrice() {
            return priceConvert(b-e,2);
          }
          //利息总额
          function getRatePrice() {
            var tmp = 12 * o / g;
            var loan = getLoanPrice();
            return priceConvert(tmp*g*f-loan,2);
          }
          return {
            everyMonth: priceConvert(12 * o / g, 2),
            firstPayment: e,
            buyTax: getBuyTax(),
            loanPayment: getLoanPrice(),
            ratePayment: getRatePrice()
          };
        }
        this.moneyData=houseCalculator(self.money,self.proportion/100,self.repayment,self.rate/100,self.moneyType)
        self.chartsoption.series[0].data[0].value=self.moneyData.buyTax;
        self.chartsoption.series[0].data[1].value=self.moneyData.firstPayment;
        self.chartsoption.series[0].data[2].value=self.moneyData.loanPayment;
        self.chartsoption.series[0].data[3].value=self.moneyData.ratePayment;
        self.chartsoption.series[0].data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.series[0].data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.series[0].data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.series[0].data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
        self.chartsoption.legend.data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.legend.data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.legend.data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.legend.data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
      },//改变首付比例
      moneyChange(type){
        let self=this;
        if(type=='add'){
            this.money=this.money+1000;
            this.chartsoption.series[0].data[0].value=this.money;
        }else{
            if(this.money>0){
              this.money=this.money-1000;
              this.chartsoption.series[0].data[0].value=this.money;
            }else{
              this.money=0;
              this.chartsoption.series[0].data[0].value=0;
            }
        }
        function houseCalculator(totalPrice, firstRate, year, monthRate, week) {
          var b = totalPrice, //总价
            c = monthRate, //利率
            d = firstRate, //首付比例
            e = b * d, // 0.01*总价*首付比例
            f = year, //还款年限
            g = week, //还款周期 12月付、24半月付、52周付
            h = b * (1 - d / 100),
            i = c / 100,
            j = i / 2,
            k = 12 * f,
            l = 2 / 12,
            m = Math.pow(1 + j, l) - 1,
            n = Math.pow(1 + m, k),
            o = h * m * n / (n - 1);
          //获取交易税
          function getBuyTax() {
            var tal = totalPrice;
            if (200000 >= b) {
              return priceConvert(.01 * tal, 2);
            } else {
              if (tal > 20000) {
                return priceConvert(.02 * tal - 2000, 2);
              }
            }
            return 0;
          }
          //价格转换
          function priceConvert(inputNum, precision) {
            return parseFloat(parseFloat(inputNum).toFixed(precision));
          }
          //贷款总额
          function getLoanPrice() {
            return priceConvert(b-e,2);
          }
          //利息总额
          function getRatePrice() {
            var tmp = 12 * o / g;
            var loan = getLoanPrice();
            return priceConvert(tmp*g*f-loan,2);
          }
          return {
            everyMonth: priceConvert(12 * o / g, 2),
            firstPayment: e,
            buyTax: getBuyTax(),
            loanPayment: getLoanPrice(),
            ratePayment: getRatePrice()
          };
        }
        this.moneyData=houseCalculator(self.money,self.proportion/100,self.repayment,self.rate/100,self.moneyType)
        self.chartsoption.series[0].data[0].value=self.moneyData.buyTax;
        self.chartsoption.series[0].data[1].value=self.moneyData.firstPayment;
        self.chartsoption.series[0].data[2].value=self.moneyData.loanPayment;
        self.chartsoption.series[0].data[3].value=self.moneyData.ratePayment;
        self.chartsoption.series[0].data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.series[0].data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.series[0].data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.series[0].data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
        self.chartsoption.legend.data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.legend.data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.legend.data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.legend.data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
      },//改变房屋价格
      cycle(type){
        let self=this;
        this.cycleType=type;
        if(type=='mounth'){
            this.moneyType=12;
            this.moneyText='月'
        }else if(type=='hrefMounth'){
            this.moneyType=24
          this.moneyText='半月'
        }else{
            this.moneyType='52';
            this.moneyText='周'
        }
        function houseCalculator(totalPrice, firstRate, year, monthRate, week) {
          var b = totalPrice, //总价
            c = monthRate, //利率
            d = firstRate, //首付比例
            e =b * d, // 0.01*总价*首付比例
            f = year, //还款年限
            g = week, //还款周期 12月付、24半月付、52周付
            h = b * (1 - d / 100),
            i = c / 100,
            j = i / 2,
            k = 12 * f,
            l = 2 / 12,
            m = Math.pow(1 + j, l) - 1,
            n = Math.pow(1 + m, k),
            o = h * m * n / (n - 1);
          //获取交易税
          function getBuyTax() {
            var tal = totalPrice;
            if (200000 >= b) {
              return priceConvert(.01 * tal, 2);
            } else {
              if (tal > 20000) {
                return priceConvert(.02 * tal - 2000, 2);
              }
            }
            return 0;
          }
          //价格转换
          function priceConvert(inputNum, precision) {
            return parseFloat(parseFloat(inputNum).toFixed(precision));
          }
          //贷款总额
          function getLoanPrice() {
            return priceConvert(b-e,2);
          }
          //利息总额
          function getRatePrice() {
            var tmp = 12 * o / g;
            var loan = getLoanPrice();
            return priceConvert(tmp*g*f-loan,2);
          }
          return {
            everyMonth: priceConvert(12 * o / g, 2),
            firstPayment: e,
            buyTax: getBuyTax(),
            loanPayment: getLoanPrice(),
            ratePayment: getRatePrice()
          };
        }
        this.moneyData=houseCalculator(self.money,self.proportion/100,self.repayment,self.rate/100,self.moneyType)
        self.chartsoption.series[0].data[0].value=self.moneyData.buyTax;
        self.chartsoption.series[0].data[1].value=self.moneyData.firstPayment;
        self.chartsoption.series[0].data[2].value=self.moneyData.loanPayment;
        self.chartsoption.series[0].data[3].value=self.moneyData.ratePayment;
        self.chartsoption.series[0].data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.series[0].data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.series[0].data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.series[0].data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
        self.chartsoption.legend.data[0].name='交易税'+' '+' '+' '+' '+' '+' '+' '+self.moneyData.buyTax+self.unit;
        self.chartsoption.legend.data[1].name='首付'+' '+' '+' '+' '+' '+' '+' '+' '+' '+ ' '+self.moneyData.firstPayment+self.unit;
        self.chartsoption.legend.data[2].name='贷款总额'+' '+' '+' '+self.moneyData.loanPayment+self.unit;
        self.chartsoption.legend.data[3].name='利息总额'+' '+' '+' '+self.moneyData.ratePayment+self.unit;
      },
      back(){
          this.$router.back();
      }
    },
  }
</script>
