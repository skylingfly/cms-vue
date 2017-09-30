<template>
    <div>

        <div class="goods-list">
            <div class="mui-card" v-for="(item,index) in cartlist" :key="index">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="item.isselect"></mt-switch>
                        <img :src="picUrl+item.thumb_path" class="thumb_img">
                        <div class="info">
                            <h4>{{item.title}}</h4>
                            <div class="box">
                                <span class="price">￥{{item.sell_price}}</span>
                                <div data-numbox-min="1" class="mui-numbox" style="height: 28px;">
                                    <button type="button" class="mui-btn mui-btn-numbox-minus" @click='minus(item.id)'>-</button>
                                    <input type="number" class="mui-input-numbox" :value="$store.getters.counts[item.id]">
                                    <!-- 渲染value -->
                                    <button type="button" class="mui-btn mui-btn-numbox-plus" @click='add(item.id)'>+</button>
                                </div>
                                <a href="#" @click.prevent="del(item.id)">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <div class="amount">
                            <p>总计（不含运费）</p>
                            <p>
                                已勾选商品
                                <span class="red">{{cartsumqty}}</span> 件 总价：
                                <span class="red">￥{{pricetotal}}</span>
                            </p>
                        </div>
                        <button class="mint-button mint-button--danger mint-button--normal">
                            <label class="mint-button-text">去结算</label>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import config from '../../config'
import mui from "../../../lib/mui/js/mui"
import Vue from 'vue'

export default {
    data() {
        return {
            cartlist: [],
            picUrl: config.picUrl,
        }
    },
    created() {
        var ids = this.$store.state.carts.map(v => {
            return v.id
        }).join(',');

        if (!ids) {
            return
        };
        this.$http.get(config.apiUrl + '/api/goods/getshopcarlist/' + ids).then(res => {
            var data = res.body;
            if (data.status == 0) {
                //添加isselect作为过滤tiaojian
                data.message.forEach(v => {
                    v.isselect = true;
                })
                this.cartlist = data.message;
                //下次dom更新触发触发numbox生效
                  Vue.nextTick(function() {
                    mui(".mui-numbox").numbox();
                })
            }
        });
    },
    methods: {
        add(id) {
            this.$store.commit('add', id);//vuex执行加法
        },
        minus(id) {
            this.$store.commit('minus', id);//vuex执行加法
        },
        del(id) {
            this.$store.commit('del', id);//vuex执行加法
            //同事cartlist也需要删除更新
            var index = this.cartlist.findIndex(v => {
                return v.id == id
            });
            this.cartlist.splice(index, 1);
        },

    },
    computed: {
        cartsumqty() {
            //获取已经过滤的选中的商品
            var goods = this.cartlist.filter(v => {
                return v.isselect;
            });
            var sum = 0;
            goods.forEach(v => {//用选中商品的id条件在对象中循环遍历获取对应的count++
                sum += this.$store.getters.counts[v.id];

            })
            return sum;

        },
        pricetotal() {
            var goods = this.cartlist.filter(v => {
                return v.isselect;
            });
            var sum = 0;
            goods.forEach(v => {//用选中商品的id条件在对象中循环遍历获取对应的count++
                sum += this.$store.getters.counts[v.id]*v.sell_price;

            })
            return sum;
        }
    }
}
</script>

<style>
.goods-list .mui-card-content-inner {
    display: flex;
}


.goods-list .mui-card-content-inner .thumb_img {
    width: 60px;
    height: 60px;
}

.goods-list .mui-card-content-inner .info {
    flex: 1;
}

.goods-list .mui-card-content-inner .info h4 {
    font-size: 14px;
}

.goods-list .mui-card-content-inner .info .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.goods-list .mui-card-content-inner .info .box .price {
    font-size: 16px;
    color: red;
}

.mui-card-content-inner .amount {
    flex: 1;
}

.mui-card-content-inner .red {
    color: red;
    font-size: 16px;
    font-weight: bold;
}
</style>
