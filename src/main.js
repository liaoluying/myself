//入口文件
import Vue from 'vue'

//导入路由模块
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

//缩略图模块
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//注册VUEX
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state:{//this.$store.state.***
    car:car//存入购物车中的商品数据
  },
  mutations:{//this.$store.commit
    addtocar(state,goodsinfo){
      //点击加入购物车，把商品信息保存到store中的car上
      var flag = false //默认没有找到默认的阿商品
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      if(flag === false){
        state.car.push(goodsinfo)
      }

      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updategoodsinfo(state,goodsinfo){
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removefromcar(state,id){
      state.car.some((item,i)=>{
        if(item.id == id){
          state.car.splice(i,1)
          return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updategoodsselected(state,info){
      state.car.some(item => {
        if(item.id = info.id){
          item.selected = info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },

  getters:{//this.$store.getters.***('方法的名称'，'按需传入唯一的参数')
    getallcount(state){
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      });
      return c
    },
    getgoodscount(state){
    var o = []
    state.car.forEach(item => {
      o[item.id] = item.count
    })
    return o;
    },
    getgoodsseleted(state){
      var o =[]
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
    },
    gettotal(state){
      var o = {
        count:0,
        amount:0
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})


//导入resource模块
import vueresource from 'vue-resource'
//安装resource模块
Vue.use(vueresource)
//设置请求的根路径
Vue.http.options.root = 'htpp://vue.studyit.io';
//设置全局Post时表单数据格式
Vue.http.options.emulateJSON = true;


//导入格式化时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MMDD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

//导入自己的路由模块
import router from './router.js'

//按需导入MINT-UI组件
import Mint from "mint-ui";
Vue.use(Mint);

//导入MIUI
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入APP根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: function(createElement){
      return createElement(app)
  },
  router,//挂载路由对象到VM实例上
  store
})