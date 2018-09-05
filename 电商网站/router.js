const routers = [
    {
        path:'/list',
        meta:{
            title:'商品列表'
        },
        component: (resolve) => require(['./views/list.vue'],resolve)
    },
    {
        path:'*',
        redirect:'/list'
    },
    {
        path:'/productDetail/:id',
        meta:{
            title:'商品详情'
        },
        component: (resolve) => require(['./components/productDetail.vue'],resolve)
    },
    {
        path:'/cart',
        meta:{
            title:'购物车'
        },
        component: (resolve) => require(['./components/cart.vue'],resolve)
    }
]
export default routers;