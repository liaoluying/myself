<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" 
        @change='countchanged' ref="numberbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted(){
        mui('.mui-numbox').numbox()
    },
    methods:{
        countchanged() {
            //文本框数据被修改时，立即把最新的数据通过事件调用传递给父组件
            this.$emit('getcount',parseInt(this.$refs.numbox.value));
        }
    },
    props:['max'],
    watch:{
        'max':function(newval, oldval){
            mui("mui-numbox").numbox().setOption('max',newval);
        }
    }
}
</script>

<style lang="scss">
    
</style>