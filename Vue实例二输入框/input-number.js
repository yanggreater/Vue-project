function isNumber(value){
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'');
}

Vue.component('inputNumber',{
    template:'\
        <div class="input-number">\
            <input :value="currentValue" type="text" @change="handleChange"></input>\
             <button @click="handleDown" :disabled="currentValue<=min">-</button>\
            <button @click="handleUp" :disabled="currentValue>=max">+</button>\
        </div>',
    props:{
        
        min:{
            type:Number,
            default:-Infinity
        },
        max:{
            type:Number,
            default:Infinity
        },
        value:{
            type:Number,
            default:0
        }
    },
    data:function(){
        return{
            currentValue:this.value
        }
            
    },
    watch:{
        currentValue:function(val){
            this.$emit('input',val);
            //this.$emit('on-chang',val);这种自定义方法去改变父组件的值
        },
        value:function(val){
            this.updateValue(val);
        }

    },
    methods:{
        updateValue:function(val){
            if(val>=this.max)
                this.currentValue = this.max;
            if(val<=this.min)
                this.currentValue = this.min;
            this.currentValue = val;
        },
        handleDown:function(){
            if(this.currentValue<=this.min)
                return;
            this.currentValue--;
        },
        handleUp:function(){
            if(this.currentValue>=this.max)
                return;
            this.currentValue++;
        },
        handleChange:function(event){
            var val = event.target.value.trim();
            if(isNumber(val)){
                val = Number(val);
                this.currentValue = val;
                if(val>=this.max)
                    this.currentValue = this.max;
                if(val<=this.min)
                    this.currentValue = this.min;
            }else{
                event.target.value = this.currentValue;
            }
        }
    },
    mounted:function(){
        this.updateValue(this.value);
    }
})