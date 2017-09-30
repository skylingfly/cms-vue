<template>
    <div class="goods-list">
        <div class="goods-item" v-for="(item,index) in goodslist" :key="index" @click="$router.push('/goods/detail/'+item.id)">
            <img :src="item.img_url" alt="">
            <h4>{{item.title}}</h4>
            <div class="info">
                <p class="price">
                    <span class="nowPrice">￥{{item.sell_price}}</span>
                    <span>
                        <del>￥{{item.market_price}}</del>
                    </span>
                </p>
                <p class="sale">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}</span>
                </p>
            </div>
        </div>
        
    <mt-button type="danger" size="large" plain @click='getmore' :disabled='isnomore' v-show='goodslist.length>0'>加载更多</mt-button>

    </div>
</template>

<script>
import config from '../../config'
import { Toast } from 'mint-ui';//子组件

export default {
    data(){
        return {
            goodslist:[],
            pageindex:1,
            isnomore: false,
        }
    },
    created(){
       this.getdata();
    },
    methods:{
        getmore(){
            this.pageindex++;
            this.getdata();
        },
        getdata(){
             this.$http.get(config.apiUrl + '/api/getgoods?pageindex=' + this.pageindex).then(res => {
                var data = res.body;
                if (data.status == 0) {
                    
                   if (data.message.length > 0) {
                        this.goodslist = this.goodslist.concat(data.message);//有新数据多页显示合并
                    } else {
                        if (this.pageindex != 1) {
                            //给出没有更多提示
                            Toast({
                                message: '没有更多商品',
                                position: 'middle',
                                duration: 5000
                            });
                        }
                        this.isnomore = true;
                    }

                }
            })
        }
    }
}
</script>

<style scoped>
    .goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 3px;
    }
    .goods-item{
        width: 48%;
        border: 1px solid #ccc;
        margin: 1%;
        box-shadow: 0,0,5px,#aaa;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    img{
        width: 100%;
    }
    h4{
        font-size: 14px;
    }
    .info{
        background-color: #eee;
    }
    p{
        margin-top:10px;
        font-size: 13px;
    }
    .nowPrice{
        color: red;
        font-size: 15px;
        margin-right: 8px;
    }
</style>
