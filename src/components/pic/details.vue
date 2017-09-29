<template>
    <div>
        <div class="mui-media-body">
            <h4>{{picdetail.title}}</h4>
            <p class="mui-ellipsis">
                <span class="time">发表时间:{{picdetail.add_time | dateFormat}}</span>
                <span class="click">点击:{{picdetail.click}}次</span>
            </p>
        </div>
        <hr>
        
    <div class="preview-list">
        <img class="preview-img" v-for="(item, index) in imglist" :key="index" :src="item.src" @click="$preview.open(index, imglist)">
    </div>

        <div class="content" v-html='picdetail.content'>
        </div>
        <comments :id="$route.params.id"></comments>
    </div>
</template>

<script>
import Vue from 'vue'
import config from '../../config'
import comments from '../subcompons/comments.vue'
import VuePreview from 'vue-preview'

Vue.use(VuePreview);//安装到Vue

export default {
    data() {
        return {
            picdetail:{},
            imglist:[],
            picUrl:config.picUrl
        }
    },
    components:{
        comments
    },
    created(){
        this.$http.get(config.apiUrl+ '/api/getimageInfo/'+this.$route.params.id).then(res=>{
            var data = res.body;
            if(data.status==0){
                
                this.picdetail=data.message[0];
            }
        });
        this.$http.get(config.apiUrl+'/api/getthumimages/'+ this.$route.params.id).then(res => {
            var data = res.body;
            if (data.status == 0) {
                console.log(data);
                //循环加属性
                data.message.forEach(v=>{
                    v.src=this.picUrl+ v.src;
                    v.w=600;
                    v.h=400;
                });
                this.imglist = data.message;
            }
        });
    }
}
</script>

<style scoped>
    h4{
        color:#26a2ff;
    }
    .preview-list img{
        width: 23%;
        margin-left: 1%;
    }

</style>

