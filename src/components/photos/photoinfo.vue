<template>
    <div class="photoinfo-container">
        <h3>{{photoinfolist.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfolist.add_time|dateFormat}}</span>
            <span>点击：{{photoinfolist.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100"
         @click="$preview.open(index, list)" :key="item.src">

        <!-- 图片介绍区域 -->
        <div class="content">{{photoinfolist.content}}</div>

        <!-- 评论区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            id: this.$route.params.id,
            photoinfolist: {},
            list:[],//缩略图数组
        };
    },

    created(){
        this.getphotoinfo();
        this.getthumbs()
    },

    methods:{
        getphotoinfo(){
            this.$http.get('api/getimageinfo/'+this.id).then(result => {
                if(result.body.status ===0){
                    this.photoinfolist = result.body.message[0]
                }else{
                    Toast('')
                }
            })
        },
        getthumbs(){
            this.$http.get('api/getthumimages/'+this.id).then(result =>{
                if(result.body.status === 0){
                    result.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                    });
                }
            })
        }
    },
    comments:{//注册comments子组件的节点
    "comment-box" : comment
    }
}
</script>

<style lang="scss">
.photoinfo-container{
    padding: 5px;
    h3{
        font-size: 15px;
        color: #26a2ff;
        text-align: center;
        margin: 15px 0 ;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
}
    
</style>