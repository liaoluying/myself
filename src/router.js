import VueRouter from 'vue-router'

//导入对应的路由组件
import homecontainer from './components/tabbar/homecontainer.vue'
import membercontainer from './components/tabbar/membercontainer.vue'
import shopcarcontainer from './components/tabbar/shopcontainer.vue'
import searchcontainer from './components/tabbar/searchcontainer.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photos/photolist.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodsdesc from './components/goods/goodsdesc.vue'
import goodscmt from './components/goods/goodscmt.vue'

// 创建路由对象
var router = new VueRouter({
  routes: [//配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: homecontainer },
    { path: '/member', component: membercontainer },
    { path: '/shopcar', component: shopcarcontainer },
    { path: '/search', component: searchcontainer },
    { path:'/home/newslist', component: newslist},
    { path:'/home/newsinfo/:id',component: newsinfo},
    { path:'/home/photolist', component: photolist},
    { path:'/home/photoinfo/:id', component: photoinfo},
    { path:'/home/goodslist', component: goodslist},
    { path:'/home/goodsinfo/:id', component: goodsinfo},
    { path:'/home/goodsdesc/:id', component: goodsdesc, name:'goodsdesc'},
    { path:'/home/goodscmt/:id', component: goodscmt, name:'goodscmt'},
    
  ],
  
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router