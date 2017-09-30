<template>
  <div>
    <div class="mui-media-body pic-title">
      <h4>{{goodsdetail.title}}</h4>
    </div>
    <div id="pic-content" v-html='goodsdetail.content'>
    </div>
  </div>
</template>

<script>
import config from '../../config';


export default {
  data() {
    return {
      apiUrl: config.apiUrl,
      goodsdetail: {}
    }
  },
  created() {
    this.$http.get(this.apiUrl + '/api/goods/getdesc/' + this.$route.params.id).then(
      (res) => {
        if (res.body.status == 0) {
          this.goodsdetail = res.body.message[0];
        }
      }
    )
  },

}
</script>

<style>
.pic-title{
  border-bottom: 1px solid #ccc;
}
#pic-content {
  width: 100%;
  padding: 10px;
}

#pic-content img.gomeImgLoad {
    width: 100% !important;
    display: block;
}
</style>
