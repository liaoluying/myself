<template>
    <div class="shopcar-container">
        <div class="good_list">
            <!-- 商品列表区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key='item.id'>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						
                        <mt-switch v-model="$store.getter.getgoodsseleted[item.id]"
                        @change="selectedchanged(item.id,$store.getter.getgoodsseleted[item.id])"></mt-switch>
                        <img :src="itme.thumb_path" >
                        <div class="info">
                            <h1>item.title</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}.</span>
                                <numbox :initcount='$store.getter.getgoodscount[item.id]' :goodsid='item.id'></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>

					</div>
				</div>
			</div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red">{{$store.getter.gettotal.count}}</span>件，总价<span class="red">￥{{$store.getter.gettotal.amount}}</span></p> 
                        </div>
                        <mt-button type='danger'>去结算</mt-button>
					</div>
				</div>
		</div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_number.vue'
export default {
    data(){
        return {
            goodslist:[]
        }
    },
    created(){
        this.getgoodslist()
    },
    methods:{
        getgoodslist(){
            var idarr = [];
            this.$store.state.car.forEach(item => idarr.push(item.id));
            if(idarr.length <=0){
                return;
            }
            this.$http.get('api/goods/getshopcarlist/'+idarr.join(','))
            .then(result => {
                if(result.body.status === 0){
                    this.goodslist = result.body.message
                }
            });
        },
        remove(id, index){
            //传递ID删除store中的商品，传递index删除goodslist中的商品
            this.goodslist.splice(index,1);
            this.$store.commit('removefromca', id);
        },
        selectedchanged(id,val){
            this.$store.commit('updategoodsselected',{id, selected:val})
        }
    },
    components: {
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }
            img{
                width: 6px;
                height: 60px;
            }
            h1{
                font-size: 15px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{color: red;font-weight: bold;}
            }
        }
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>