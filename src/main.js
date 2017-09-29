//1. 导入Vue模块
import Vue from "vue"
//2. 导入App.vue组件
import App from "./App.vue"



//4 导入Mint-UI
import Mint from "mint-ui"
import "mint-ui/lib/style.css"
Vue.use(Mint)



//5. 导入mui的css
import "../lib/mui/css/mui.css"
import "../lib/mui/css/icons-extra.css"


//6. 导入vue-resource,请求数据
import VueResource from "vue-resource"

Vue.use(VueResource)

//6. 导入过滤器
import "./filters/datefilter"


//3. 导入路由配置
import router from "./router/router"

//3. 声明一个新的Vue对象
var vm = new Vue({
    el: "#app",
    router,
    render: function(createElement){
        return createElement(App)
    }
})


