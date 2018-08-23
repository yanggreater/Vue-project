Vue.directive('clickoutside',{
    bind:function(el,binding,vnode){
        function documentHandle(e){
            if(el.contains(e.target)){//就是说当点击点在绑定元素的内部，那么就不执行操作
                return false;
            }
            if(binding.value){//对于此程序来说，应该给指令参数，没有直接执行methods里面的方法
                binding.value(e);
            }
        }
        el.vueHandle = documentHandle;
        document.addEventListener('click',documentHandle);
    },
    unbind:function(el,binding){
        document.removeEventListener('click',documentHandle);
        delete el.vueHandle;
    }
});