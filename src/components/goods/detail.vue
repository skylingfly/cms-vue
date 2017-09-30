<template>
  <div class="goodsdetail">
  
    <transition @before-enter='beforeEnter' @enter='enter' @after-enter="afterEnter">
      <div class="reddot" v-show='isShow'></div>
    </transition>

    <!-- swip -->
    <div class="card">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in piclist" :key="index">
          <img :src="picUrl+item.src " alt="">
        </mt-swipe-item>
      </mt-swipe>

    </div>

    <div class="mui-card father">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            <span>市场价：
              <del>￥{{goodsinfo.market_price}}</del>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售价：
              <span class="sale_price">￥{{goodsinfo.sell_price}}</span>
            </span>
          </div>
          <div class="count">
            <span>购买数量：</span>
            <div data-numbox-min="1" class="mui-numbox" :data-numbox-max="goodsinfo.stock_quantity" style="height: 28px;">
              <button type="button" disabled="" class="mui-btn mui-btn-numbox-minus"  @click='num--'>-</button>
              <input type="number" value="1" v-model="num" class="mui-input-numbox">
              <button type="button" class="mui-btn mui-btn-numbox-plus" @click='num++'>+</button>
            </div>
          </div>
          <div class="operate">

            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addtocart">加入购物车</mt-button>

          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header mui-card-media card-title">
        商品参数
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>库存情况: {{goodsinfo.stock_quantity}}件</p>
          <p>上架时间: {{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer1">
        <button class="mint-button mint-button--primary mint-button--large is-plain" @click="$router.push('/goods/desc/'+$route.params.id)">
          <!---->
          <label class="mint-button-text">图文介绍</label>
        </button> <br>
        <button class="mint-button mint-button--danger mint-button--large is-plain" @click="$router.push('/goods/comment/'+$route.params.id)">
          <!---->
          <label class="mint-button-text">商品评论</label>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import config from '../../config'
import mui from '../../../lib/mui/js/mui'
export default {
  data() {
    return {
      piclist: [],
      picUrl: config.picUrl,
      goodsinfo: {},
      isShow: false,
      num: 1,
    }
  },
  created() {
    this.$http.get(config.apiUrl + '/api/getthumimages/' + this.$route.params.id).then(res => {
      var data = res.body;
      if (data.status == 0) {
        this.piclist = data.message;
      }
    });
    this.$http.get(config.apiUrl + '/api/goods/getinfo/' + this.$route.params.id).then(res => {
      var data = res.body;
      if (data.status == 0) {
        this.goodsinfo = data.message[0];
        //JS手动设置设置最大值
        mui('.mui-numbox').numbox().setOption('max',this.goodsinfo.stock_quantity)
      }
    });
  },
  mounted(){
    mui('.mui-numbox').numbox();
  },
  methods: {
    addtocart() {
      //点击变化
      this.isShow = !this.isShow;
      //buycount
      var buycount = mui('.mui-numbox').numbox().getValue();
      //传递给vuex store将当前商品的信息，以及购买数量存入购物车内
      //store.commit('addtocart')可以传入第二参数
      this.$store.commit('addtocart',{id:this.$route.params.id,count:buycount});
    //同步更新圆点的数据
    },
    beforeEnter(el) {
      el.style.transform = "translate(0px, 0px)"
    },
    enter(el) {
      //不需要done就不能用
      el.offsetWidth;//手动触发重绘
      el.style.transform = "translate(110px, " + (window.pageYOffset + 320) + "px)";

    },
    afterEnter(el) {
      this.isShow = !this.isShow;
    }
  }
}
</script>

<style scoped>
.card {

  border-radius: 2px;
  background-color: white;
  background-clip: padding-box;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
  overflow: hidden;
  margin: 10px;
  padding: 15px;
}

.card-title {
  color: #000;
}

.count {
  margin: 8px 0;
}

.mint-swipe {
  height: 180px;
}

.mint-swipe-item img {
  /* width: 100%; */
  height: 180px;
  display: block;
  margin: 0 auto;
}

.goodsdetail {
  position: relative;
}

.reddot {
  height: 20px;
  width: 20px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 340px;
  left: 140px;
  z-index: 999;
  transition: all 0.1s cubic-bezier(0, 1.64, .67, -0.65);
}

.sale_price {
  color: red;
  font-size: 18px;
}

.count {
  margin: 10px auto;
}
</style>
