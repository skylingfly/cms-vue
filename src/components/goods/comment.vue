<template>
  <div>
     <comments :id='$route.params.id'></comments>
  </div>
</template>

<script>
import comments from '../subcompons/comments.vue'
export default {
  components:{
    comments
  }
}
</script>

<style scoped>

</style>
