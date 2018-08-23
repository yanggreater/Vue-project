new Vue({
    el:"#app",
    data:{
        Lists:[
            {
                id:1,
                name:"《锋利的Jquery》",
                price:85,
                count:1
            },
            {
                id:2,
                name:"《Vue.js实战》",
                price:59,
                count:1
            },
            {
                id:3,
                name:"《JS高级程序设计》",
                price:88,
                count:1,
            }
        ]
    },
    computed:{
        totalPrice:function(){
            var total = 0;
            for(var i = 0;i<this.Lists.length;i++){
                var item = this.Lists[i];
                total = total + item.price*item.count;
            }
            return total;
        }
    },
    methods:{
        HandleRemove:function(index){
            this.Lists.splice(index,1);
        },
        HandleAdd:function(index){
            this.Lists[index].count++;
        },
        HandleReduce:function(index){
            if(this.Lists[index].count === 1)
                return;
            this.Lists[index].count--;
        }
    }

});