<template>
    <div v-show="list.length">
        <div class="list-control">
            <div class="list-control-order">
                <span>排序:</span>
                <span
                    @click="handleDefault"
                    class="list-control-order-item"
                    :class="{on:order ===''}"
                >默认</span>
                <span
                    @click="handleOrderSales"
                    class="list-control-order-item"
                    :class="{on:order === 'sales'}"
                >销售</span>
                <span
                    @click="handleOrderByprice"
                    class="list-control-order-item"
                    :class="{on:order.indexOf('cost')>-1}">
                    价格
                    <template v-if="order === 'cost-desc'">↓</template>
                    <template v-if="order === 'cost-asc'">↑</template>
                </span>
            </div>
        </div>
        <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
    </div>
</template>

<script>
import Product from '../components/product.vue'
export default {
    data() {
        return{
            order:''
        } 
    },  
    components:{
        Product
    },
    computed:{
        list() {
            return this.$store.state.productList;
        },
        filteredAndOrderedList() {
            let list = [...this.list];
            if(this.order !== '') {
                if(this.order ==='sales'){
                    list.sort((a,b) => {return b.sales-a.sales})
                }else if(this.order === 'cost-desc'){
                     list.sort((a,b) => b.cost-a.cost)
                }else if(this.order === 'cost-asc'){
                   list.sort((a,b) => a.cost-b.cost)
                }
            }
            return list;
        }
    },
    methods:{
        handleDefault() {
            this.order = ''
        },
        handleOrderSales () {
            this.order = 'sales'
        },
        handleOrderByprice () {
            if(this.order === 'cost-desc'){
                this.order = 'cost-asc'
            }else{
                this.order ='cost-desc'
            }
        }
    },
    mounted () {
        this.$store.dispatch('getProductList');
    }
}
</script>

<style scoped>
     .list-control{
        background: #fff;
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .list-control-filter{
        margin-bottom: 16px;
    }
    .list-control-filter-item,
    .list-control-order-item {
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e9eaec;
        border-radius: 4px;
        margin-right: 6px;
        padding: 2px 6px;
    }
    .list-control-filter-item.on,
    .list-control-order-item.on{
        background: #f2352e;
        border: 1px solid #f2352e;
        color: #fff;
    }
    .product-not-found{
        text-align: center;
        padding: 32px;
    }
</style>
