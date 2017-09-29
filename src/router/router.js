//1. 导入Vue模块
import Vue from "vue"

//4. 导入路由插件 vue-router
import VueRouter from "vue-router"

//5. 将VueRouter和Vue关联起来
Vue.use(VueRouter);


// 导入相应的组件文件
import Homecontainer from '../components/containers/homecontainer.vue';
import Cartcontainer from '../components/containers/cartcontainer.vue';
import Membercontainer from '../components/containers/membercontainer.vue';
import Searchcontainer from '../components/containers/searchcontainer.vue';
//新闻
import Newslist from '../components/news/list.vue';
import Newsdetail from '../components/news/details.vue';
// 图片
import Picdetail from '../components/pic/details.vue';
import Piclist from '../components/pic/list.vue';

export default new VueRouter({
    routes: [
        { path: '/', component: Homecontainer},
        { path: '/cart', component: Cartcontainer},
        { path: '/member', component: Membercontainer},
        { path: '/search', component: Searchcontainer},

        { path: '/news/list', component: Newslist},
        { path: '/news/detail/:id', component: Newsdetail},

        { path: '/pic/list', redirect: '/pic/list/0'},
        { path: '/pic/list/:id?', component: Piclist},
        { path: '/pic/detail/:id', component: Picdetail},
      

    ]
})