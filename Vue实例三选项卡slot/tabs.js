Vue.component('tabs',{
    template:'\
        <div class="tabs">\
            <div class="tabs-title">\
                <div v-for="(item,index) in navList"\
                    :class="tabClass(item)"\
                    @click="handleChange(index)">\
                    {{item.label}}\
                </div>\
            </div>\
            <div class="tabs-content">\
                <slot></slot>\
            </div>\
        </div>',
    props:{
        value:{
            type:[String,Number]
        }
    },
    data:function(){
        return{
            currentValue:this.value,
            navList:[],
        }
    },
    methods:{
        getTabs:function(){//获取所有自己的名字为pane子组件
            return this.$children.filter(function(item){
                return item.$options.name === "pane";
            });
        },
        updateNav:function(){
            this.navList = [];
            var _this = this;
            this.getTabs().forEach(function(pane,index){
                _this.navList.push({
                    label:pane.label,
                    name:pane.name||index
                });
                //如果pane组件没有给出name那么默认设置是索引
                if(!pane.name)
                    pane.name = index;
                if(index === 0){
                    if(!_this.currentValue){
                        _this.currentValue = pane.name||index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus:function(){//标题显示函数
            var tabs = this.getTabs();
            var _this = this;
            tabs.forEach(function(tab){
                return tab.show = tab.name ===_this.currentValue;
            });
            
        },
        tabClass:function(item){//对选中的标题设置特殊的样式
            return [
                'tabs-tab',
                {
                    'tabs-tab-active':item.name ===this.currentValue
                }
            ]
        },
        handleChange:function(index){
            var nav = this.navList[index];
            var name = nav.name
            this.currentValue = name;
            this.$emit('input',name);
        }
    },
    watch:{
        value:function(val){
            this.currentValue = val;
        },
        currentValue:function(){
            this.updateStatus();
        }
    }
})