<template>
    <div class="cmt-contatiner">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论（最多120字）" maxlength="120"
         v-model="msg"></textarea>

        <mt-botton type="primary" size="large" @click="postcmt">发表评论</mt-botton>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in commentslist" :key='item.add_time'>
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.name}}&nbsp;&nbsp;发表时间：{{item.add_time|dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content === 'undefined'?'此用户很懒，什么都没说':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
import{Toast} from 'mint-ui'

export default {
    data(){
        return{
            pageindex: 1,//默认展示第一页数据
            commentslist: [],//所有评论数据
            msg: '',//评论输入的内容
        }
    },
    created(){
        this.getcomments()
    },
    methods:{
        getcomments(){//获取评论
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex)
            .then(result=>{
                if(result.body.status === 0){
                    //this.commentslist = result.body.message
                    //前一页数据拼接后一页数据
                    this.commentslist = this.commentslist.concat(result.body.message);
                }else{
                    Toast('获取评论失败')
                }
            })
        },
        getmore(){//加载更多
            this.pageindex++;
            this.getcomments()
        },
        postcmt(){
            //校验是否为空内容
            if(this.msg.trim().length === 0){
               return Toast('评论内容不能为空！')
            }
        //发表评论
        //参数1 请求URL地址
        //参数2 提交给服务器的数据对象{content: this.msg} ‘content’为开发文档中规定
        //参数3  定义提交数据时的表单中的数据格式 {emulateJSON:ture}
            this.$http.post('api/postcomment/'+this.id,{content:this.msg.trim()})
            .then(result => {
                if(result.body.status === 0){
                                    //1手动拼接
                let cmt = {
                    name:'匿名用户',
                    add_time:Date.now(),
                    content:this.msg.trim()
                };
                this.commentslist.unshift(cmt);
                this.msg = '';
                }else{
                    Toast('发表评论失败，请重试')
                }
            });
        }
    },
    props:['id']
};
</script>


<style lang="scss" scoped>
    .cmt-contatiner{
        h3{
            font-size: 16px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    background-color: #ccc;
                    line-height: 35px;
                    text-indent:1em;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>