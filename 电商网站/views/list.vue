<template>
    <div v-show="list.length">
        <div class="list-control">
            <div class="list-control-filter">
                <span>品牌:</span>
                <span
                    class="list-control-filter-item"
                    :class="{on:item === filterBrand}"
                    v-for="item in brands"
                    @click="handleFilterBrand(item)"
                >{{item}}</span>
            </div>
            <div class="list-control-filter">
                <span>颜色:</span>
                <span
                    class="list-control-filter-item"
                    :class="{on:item === filterColor}"
                    v-for="item in colors"
                    @click="handleFilterColor(item)"
                >{{item}}</span>
            </div>
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
        <div v-if="!filteredAndOrderedList.length" class="product-not-found">
            暂无相关商品
        </div>
    </div>
</template>

<script>
import Product from '../components/product.vue'
export default {
    data() {
        return{
            order:'',
            filterBrand:'',
            filterColor:''
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
            if(this.filterBrand!==''){
                list = list.filter(item => item.brand ===this.filterBrand);
            }
            if(this.filterColor !==''){
                list = list.filter(item => item.color === this.filterColor);
            }
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
        },
        brands() {
            return this.$store.getters.brands;
        },
        colors() {
            return this.$store.getters.colors;
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
        },
        handleFilterBrand (brand) {
            if(this.filterBrand === brand){
                this.filterBrand = ''
            }else{
                this.filterBrand = brand
            }
        },
        handleFilterColor (color) {
            if(this.filterColor === color){
                this.filterColor = ''
            }else{
                this.filterColor = color
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
