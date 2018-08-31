<template>
    <div v-show="list.length">
        <Product v-for="item in list" :info="item" :key="item.id"></Product>
    </div>
</template>

<script>
import Product from '../components/product.vue'
export default {
    components:{
        Product
    },
    computed:{
        list() {
            return this.$store.state.productList;
        }
    },
    mounted () {
        this.$store.dispatch('getProductList');
    }
}
</script>

<style>

</style>
