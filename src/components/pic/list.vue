<template>
    <div id='slide'>
        <div class="mui-content">
            <div id="slider" class="mui-slider">
                <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                    <div class="mui-scroll">
                        <a class="mui-control-item" @click.prevent="golink(0)">
                            全部
                        </a>
                        <a class="mui-control-item" @click.prevent="golink(item.id)" v-for="(item,index) in navlist" :key="index">
                            {{item.title}}
                        </a>
                    </div>
                </div>

            </div>
        </div>

        <div class="pic-list">
            <ul>
                <li v-for="(item,index) in picdata" :key="index">
                    <router-link :to="'/pic/detail/'+item.id" class=""><img v-lazy="picUrl+item.img_url">
                        <div>
                            <p>{{item.title}}</p>
                            <p>{{item.zhaiyao}}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui'//引入mui
import config from '../../config'
export default {
    data() {
        return {
            apiUrl: config.apiUrl,
            picUrl: config.picUrl,
            navlist: [],
            picdata: []
        }
    },
    created() {
        this.$http.get(this.apiUrl + '/api/getimgcategory').then(res => {
            var data = res.body;
            if (data.status == 0) {

                this.navlist = data.message;

            };

        });
        this.getpic();
    },
    watch: {
        $route() {
            this.getpic();
        }
    },
    mounted() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        golink(id) {
            this.$router.push('/pic/list/' + id)
        },
        getpic() {
            this.$http.get(this.apiUrl + '/api/getimages/' + this.$route.params.id).then(res => {
                var data = res.body;
                if (data.status == 0) {

                    this.picdata = data.message;
                }
            })
        }
    }
}
</script>

<style scoped>
#slider {
    background-color: #fff;
}

.pic-list ul {
    padding: 0 5px;
    background-color: #ccc;
}

.pic-list ul li {
    list-style: none;
    position: relative;
    margin-bottom: 8px;
    box-shadow: 0 0 8px #999;
}

.pic-list ul li div {
    position: absolute;
    bottom: 0;
    left: 10px;
    background-color: rgba(0, 0, 0, .4);
}

.pic-list ul li div p {
    color: #fff;
}


img[lazy=loaded] {
    width: 100%;
    display: block;
}

img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
    display: block;
}
</style>

