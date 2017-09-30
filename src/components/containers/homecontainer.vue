<template>
  <div>
    <!-- swip -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in imglist" :key="index">
        <img :src="apiUrl+item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#/news/list">
            <img src='../../images/menu3.png'>
            <div class="mui-media-body">新闻资讯</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#/pic/list">
            <img src='../../images/menu4.png'>
            <div class="mui-media-body">图片分享</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#/goods/list">
            <img src='../../images/menu5.png'>
            <div class="mui-media-body">商品购买</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#/news/list">
            <img src='../../images/menu6.png'>
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#/news/list">
            <img src='../../images/menu9.png'>
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#/news/list">
            <img src='../../images/menu10.png'>
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import config from '../../config'

export default {
  data() {
    return {
      apiUrl: config.apiUrl,
      imglist: [],
    }
  },
  created() {
    this.$http.get(this.apiUrl + '/api/getlunbo').then(//rescour内置方法请求数据
      (res) => {
        if (res.body.status == 0) {
          console.log(res.body.message)
          this.imglist = res.body.message;
        }
      }
    )
  }

}
</script>

<style scoped>
.mint-swipe {
  height: 180px;
}

.mint-swipe-item img {
  width: 100%;
  height: 180px;
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}

.mui-grid-9 img {
  width: 60px;
  border: none;
}
</style>

