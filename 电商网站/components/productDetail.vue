<template>
    <div v-if="product">
        <div class="product">
            <div class="product-image">
                <img :src="product.image">
            </div>
            <div class="product-info">
                <h1 class="product-name">{{product.name}}</h1>
                <div class="product-cost">￥{{product.cost}}</div>
                <div 
                    class="product-add-cart"
                    @click="handleClickAdd"
                    >加入购物车</div>
            </div>
        </div>
        <div class="product-desc">
            <img 
                v-for="n in 10"
                :src="'http://ordfm6aah.bkt.clouddn.com/shop/'+n+'.jpeg'"
                :key="n"
            >
        </div>
    </div>
</template>

<script>
import product_data from '../project.js'
export default {
    data () {
        return {
            id:parseInt(this.$route.params.id),
            product:null
        }
    },
    methods:{
        getProduct () {
            setTimeout(()=> {
                this.product = product_data.find(item => item.id === this.id)
            },500)
        },
        handleClickAdd () {
            this.$store.commit('addCart',this.id);
        }
    },
    mounted () {
        this.getProduct();
    }
}
</script>

<style scoped>
    .product {
        margin: 32px;
        padding: 32px;
        background: #fff;
        border: 1px solid #dddee1;
        border-radius: 10px;
        overflow: hidden;
    }
    .product-image{
        width: 50%;
        height: 550px;
        float: left;
        text-align: center;
    }
    .product-image img{
        height: 100%;
    }
    .product-info{
        width: 50%;
        padding: 150px 0 250px;
        height: 150px;
        float: left;
        text-align: center; 
    }
    .product-cost{
        color: #f2352e;
        margin: 8px 0;
    }
    .product-add-cart{
        display: inline-block;
        cursor: pointer;
        border-radius: 4px;
        color: #fff;
        background: #2d8cf0;
        margin: 8px 0;
        padding: 8px 64px;
    }
    .product-desc{
        background: #fff;
        margin: 32px;
        padding: 32px;
        border: 1px solid #dddee1;
        border-radius: 10px;
    }
    .product-desc img{
        display: block;
        width: 50%;
        margin: 32px auto;
        padding: 32px;
        border-bottom: 1px solid #dddee1;
    }
</style>
