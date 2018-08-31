import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import './style.css'
import Routers from './router.js'

import product_data from './project.js'

Vue.use(Vuex);
Vue.use(VueRouter);

//路由的配置
const RouterConfig ={
    mode:'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to,from,next) => {
    window.document.title = to.meta.title;
    next();
});
router.afterEach((to,from,next) => {
    window.screenTo(0,0);
});

//状态管理配置
const store = new Vuex.Store({
    state:{
        //商品列表
        productList:[],
        //购物车列表
        cartList:[]
    },
    getters:{

    },
    mutations:{
        setProductList (state,data) {
            state.productList =data;
        }
    },
    actions:{
        //模拟异步获取数据
        getProductList (context) {
            setTimeout(() => {
                context.commit('setProductList',product_data);
            },500);
        }
    }
});

//vue根实例

new Vue({
    el:'#app',
    router,
    store,
    render:h => {
        return h(App);
    }
})