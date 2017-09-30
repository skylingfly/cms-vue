import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        carts: []
    },
    mutations: {
        addtocart(state, goods) {//传入的新产品信息
            //
           var carts= localStorage.getItem('carts');//判断内存是否有cartsjson字符串
           carts =carts?JSON.parse(carts):[];//转变数组
            //判断goods内容中是存在同样产品id对应的count++同样也可以按照arr.every结果来判断是否有相同id产品
            var issame =false;
            carts.forEach(v=>{
                if(v.id==goods.id){
                    v.count+=goods.count;
                    issame=true;
                }
            });
            if (!issame) {//不同直接push
                carts.push(goods);
            }
            //更新vuex
            state.carts = carts;
           
            //存入内存
           localStorage.setItem('carts',JSON.stringify(carts));
         
        },
        add(state,id){
            state.carts.forEach(v=>{
                if(v.id==id){
                    v.count++
                }
            });
            console.log(state.carts)
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        minus(state,id){
            state.carts.forEach(v=>{
                if(v.id==id){
                    v.count--
                }
            });
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        del(state,id){
           var index =state.carts.findIndex(v=>{
                return v.id ==id
            });
            state.carts.splice(index,1);
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
    },
    getters:{//计算属性得到最新数据
        carttotalqty:state=>{
            var carts = localStorage.getItem('carts');//判断内存是否有cartsjson字符串
            state.carts = carts ? JSON.parse(carts) : [];
            var sumqty = 0;
            state.carts.forEach(v=>{
                sumqty+=v.count
            })
            return sumqty;//商品总数
        },
        //counts就是一个对象， 将购物车数组中所有的id作为键，将id对应的count作为值
        counts(state){
            var obj={};//存id:count
            state.carts.forEach(v=>{
                obj[v.id]=v.count;
            })
            return obj;
        }
    }
});