<template>
    <div>
        <div class="mui-media-body">
            <h4>{{newsdetail.title}}</h4>
            <p class="mui-ellipsis">
                <span class="time">发表时间:{{newsdetail.add_time | dateFormat}}</span>
                <span class="click">点击:{{newsdetail.click}}次</span>
            </p>
        </div>
        <hr>
        <div class="content" v-html='newsdetail.content'>
        </div>
        <comments :id="$route.params.id"></comments>
    </div>
</template>

<script>
import config from '../../config';
import comments from '../subcompons/comments.vue'//引子组件

export default {
    data(){
        return{
            apiUrl:config.apiUrl,
            newsdetail:{}
        }
    },
    created(){
        this.$http.get(this.apiUrl+'/api/getnew/'+this.$route.params.id).then(
            (res)=>{
                if(res.body.status ==0){
                    this.newsdetail=res.body.message[0];
                }
            }
        )
    },
    components:{
        comments,
    }
}
</script>

<style scoped>

.mui-ellipsis {
    display: flex;
    justify-content: space-between;
    color: #26A2FF;
}
.content{
    padding: 10px;
}

</style>
