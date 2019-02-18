<template>
    <div goodsinfo-container>

        <transition
        @before-enter='beforeenter'
        @enter='enter'
        @after-enter='afterenter'>
            <div class="ball" v-show="ballflage" ref='ball'></div>
        </transition>


        <!-- 商品轮播图区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
						<swiper :lunbtulist='lunbotu' :isfull='false'></swiper>
				</div>
			</div>
		</div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfolist.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsinfolist.m_price}}</del>&nbsp;&nbsp;销售价<span class="nprice">
                        ￥{{goodsinfolist.s_price}}</span>
                    </p>
                    <P>购买数量：<numberbox @getcount='getselectedcount(count)' :max='goodsinfolist.stock'></numberbox></P>
                    <p>
                        <mt-button type='primary' size='samll'>立即购买</mt-button>
                        <mt-button type='danger' size='samll' @click="addtocar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
		</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfolist.no}}</p>
                    <p>库存情况：{{goodsinfolist.stock}}</p>
                    <p>上架时间：{{goodsinfolist.add_time|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type='primary' size='large' plain @click="godesc(this.id)">图文介绍</mt-button>
                <mt-button type='danger' size='large' plain @click="gocmt(this.id)">商品评论</mt-button>
            </div>
		</div>
    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue';
import numberbox from '../subcomponents/goodsinfo_number.vue';

export default {
    data(){
        return {
            id: this.$route.params.id,
            lunbotu:[],
            goodsinfolist:{},
            ballflag: false,
            selectedcount:1
        }
    },
    created(){
        this.getlunbotu(),
        this.getgoodsinfo()
    },
    methods:{
        getlunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(result => {
                if(result.body.status === 0){
                    result.body.message.forEach(item  => {
                        item.img = item.src
                    });
                    this.lunbotu = result.body.message;
                }
            })
        },
        getgoodsinfo(){
            this.$http.get('api/goods/getinfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.goodsinfolist = result.body.message[0]
                }else{

                }
            })
        },
        godesc(id){
            this.$router.push({name:'goodsdesc',params:{id}})
        },
        gocmt(id){
            this.$router.push({name:'goodscmt',params:{id}})
        },
        addtocar(){
            this.ballflag = !this.ballflag
            var goosdsinfo = {
                id:this.id,
                count:this.selectedcount, 
                price:this.goodsinfolist.s-price,
                selected:true};
            this.$store.commit('addtocar', 'goosdsinfo');
        },
        beforeenter(el){
            el.style.transform = 'translate(0,0)';
        },
        enter(el,done){
            el.offsetWidth;
            //获取小球在页面中的位置
           const ballposition = this.$refs.ball.getBoundingClientRect();
           //获取徽标在页面中 的位置
           const badgeposition = document.getElementById('badge').getBoundingClientRect();

           const xdist = badgeposition.left - ballposition.left;
           const ydist = badgeposition.top - ballposition.top;

            el.style.transform = `translate(${xdist}px,${ydist}px)`;
            el.style.transition = 'all 0.5s ease';
            done();
        },
        afterenter(el){
            this.ballflag = !this.ballflag;
        },
        getselectedcount(count){
            this.selectedcount = count;
        }
    },
    components:[
        swiper,
        numberbox
    ]
}
</script>


<style lang="scss">
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
        
        .nprice{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
        .mui-card-footer{
            display: block;
        }
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 399;
            left: 146;
        }
    }
</style>
