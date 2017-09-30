<template>
    <div class="comments">
        <div class="commentpost">
            <h4>发表评论</h4>
            <hr>
            <textarea name="" id="" cols="30" rows="3" placeholder="请输入评论内容，最多输入120字" v-model="commenttxt"></textarea>

            <mt-button type="primary" size="large" @click='postcomment'>发表评论</mt-button>

        </div>
        <div class="commentlist">
            <div class="comment-item" v-for='(item,index) in commentlist' :key="index">
                <div class="comment-info">
                    <span>第{{index+1}}楼</span>
                    <span>{{item.user_name}}</span>
                    <span>发表时间: {{item.add_time | dateFormat}}</span>
                </div>
                <div class="comment-content">
                    {{item.content}}
                </div>
            </div>
            <!--加载按钮没数据不需要显示  -->
            <mt-button type="danger" size="large" plain @click='getmore' :disabled='isnomore' v-show='this.commentlist.length>0'>加载更多</mt-button>

        </div>
    </div>
</template>

<script>
import config from '../../config';
import { Toast } from 'mint-ui';//子组件
export default {
    data() {
        return {
            apiUrl: config.apiUrl,
            pageindex: 1,
            commentlist: [],
            isnomore:false,
            commenttxt:'',
        }
    },
    created() {
        this.getdata();
    },
    props: ['id'],
    methods:{
        getdata(){
                this.$http.get(this.apiUrl + '/api/getcomments/' + this.id + '?pageindex=' + this.pageindex)//只能获取一页
                .then((res) => {
                    if (res.body.status == 0) {
                        // console.log(res.body);
                        if(res.body.message.length>0){
                            this.commentlist = this.commentlist.concat(res.body.message);//有新数据多页显示合并
                        }else{
                            if(this.pageindex!=1){
                                Toast({
                                    message: '没有更多评论',
                                    position: 'middle',
                                    duration: 5000
                                });
                            }
                           this.isnomore=true;
                        }
                        
                    }
                })
        },
        getmore(){
            this.pageindex++;
            this.getdata();
        },
        postcomment(){
               if(this.commenttxt.trim()){
                   this.$http.post(this.apiUrl + '/api/postcomment/'+ this.id,{content:this.commenttxt},{emulateJSON:true}).then((res)=>{
                       if(res.body.status==0){
                           this.commentlist.unshift({
                               add_time:new Date(),
                               content:this.commenttxt,
                               user_name:"匿名用户"
                           });
                           this.commenttxt='';
                       }
                   },)
               }else{
                   Toast({
                       message: '请输入评论',
                       position: 'middle',
                       duration: 5000
                   });
               }
        }
    }
}

</script>

<style scoped>
.commentpost textarea {
    margin-bottom: 0;
}

.comments {
    padding: 0 5px;
}

.comment-info {
    background-color: #ccc;
    line-height: 30px;
}

.comment-content {
    text-indent: 2em;
}
</style>


