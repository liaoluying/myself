<template>
    <div>
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html='info.content'></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
            info:{}
        }
    },
    created(){
        this.getgoodsdesc()
    },
    methods:{
        getgoodsdesc(){
            this.$http.get('api/goods/getdesc/'+this.id).then(resule =>{
                if(resule.body.status === 0){
                    this.info = resule.body.message[0]
                }
            })
        }
    }
}
</script>

<style lang="scss">
    
</style>
