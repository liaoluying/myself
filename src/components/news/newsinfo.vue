<template>
    <div class="newsinfo-contatiner">
        <!-- 标题区域 -->
        <h3 class="title">{{newsinfo.title}}</h3> 
        <p class="subtitle">
            <span >发表时间：{{newsinfo.add_time | dataFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>

        <hr>
        <!-- 用html渲染内容 v-html  内容区域 -->
        <div class="content" v-html='newsinfo.content'></div>

        <!-- 评论区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import{Toast} from 'mint-ui'

//1.导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
            id: this.$route.params.id,//将 url地址中传递过来的id挂载到data上。
            newsinfo:{}
        }
    },
    created(){
        this.getnewsinfo();
    },
    methods:{
        getnewsinfo(){//获取新闻详情
           this.$http.get('api/getnew/'+this.id).then(result =>{
               if(result.body.status === 0){
                   this.newsinfo = result.body.message[0];
               }else{
                   Toast('获取新闻失败！')
               }
           })
        }
    },
    comments:{//注册comments子组件的节点
        "comment-box" : comment
    }
}
</script>

<style lang="scss" >
    .newsinfo-contatiner{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 12px 0;
            color: #226aff;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: sapce-between;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>