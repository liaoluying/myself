<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active':'']" 
                    v-for="item in cates" :key="item.id" @click="getphotolistbycateid(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
		</div>

        <!-- 图片列表区域 -->
        <ul class='photolist'>
            <!--tag将router-link渲染成Li的样式 -->
            <router-link v-for="pitem in list" :key="pitem.id" :to="'/home/photoinfo/'+pitem.id"
            tag="li">
                <img v-lazy="pitem.img_url">
            </router-link>
        </ul>
    </div>
</template>

<script>
//导入MUI的JS文件
import mui from '../../lib/mui/js/mui.min.js'
//初始化滑动控件

export default {
    data(){
        return {
            cates:[],//所有分类的数组
            list :[]//所有图片的数组
        }
    },
    created(){
        this.getallcategory();
        //默认进入页面，主动请求所有图片
        this.getphotolistbycateid(0)
    },
    mounted(){
        //组件中DOM结构被渲染好并放到页面中后
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getallcategory(){
            this.$http.get('api/getimgcategory').then(result => {
                if(result.body.status === 0){
                    this.body.message.unshift({title:'全部', id:0});
                    this.cates = result.body.message;
                }else{
                }
            })         
        },
        getphotolistbycateid(cateid){
            //根据分类ID获取图片列表
            this.$http.get('api/getimages/'+cateid).then(result =>{
                if(result.body.status === 0){
                    this.list = result.body.message;
                }
            })
        }
    }
}
</script>

<style lang="scss">
.photolist{
    list-style: none;
    margin: 0;
    padding: 0;
    li{
        background-color: #ccc ;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        img{
            widows: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
}
</style>