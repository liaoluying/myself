<template>
    <div class="goods-list">
        <router-link class="goods-item" v-for="item in goodslist" :key="item.id"
         :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock}}件</span>
                </p>
            </div>
        </router-link>

        <mt-button type='danger' size='large' @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageindex: 1,
            goodslist: []
        }
    },
    created(){
        this.goodslist();
    },
    methods:{
        getgoodslist(){
            this.$http.get('api/getgoods?pageindex='+ this.pageindex)
            .then(result =>{
                if(result.body.status === 0){
                    //this.goodslist = result.body.message;
                    this.goodslist = this.goodslist.concat(result.body.message)
                }else{

                }
            })
        },
        getmore(){
            this.pageindex++
            this.getgoodslist()
        }
    }
}
</script>

<style lang="scss">
    .goods-list{
        display:flex;
        flex-wrap: wrap;
        padding: 8px;
        justify-content: space-between;
        margin: 4px 0 ;
        
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 9px #ccc;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height:293px;

            img{
                width: 100%;
            }

            .title{
                font-size: 14px;
            }

            .info{
                p{
                    margin: 0;
                    padding: 5px;
                }
                background-color: #eee;
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
            }
        }
    }
</style>