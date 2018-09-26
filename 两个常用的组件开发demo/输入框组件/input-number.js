
//验证是否为数字
function isValueNumber(val){
    return (/(^-?(0{1})|([1-9]+[0-9]*)\.{1}\d+$)|(^-?[1-9]+[0-9]*$)|(^-?0{1}$)/).test(val+"");
}

//数字表单组件
Vue.component('input-number', {
    template: '\
    <div class="input-number">\
    \<input\
        type="text" \
        :value="currentValue "\
        @change="handelChange" \
        @keydown.up="handleUp" \
        @keydown.down="handleDown">\
    <button \
        @click="handleDown" \
        :disabled="currentValue<=min">-</button>\
    <button \
        @click="handleUp" \
        :disabled="currentValue>=max">+</button>\
    </div>\
    ',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        },
        step:{
            type:Number,
            default:1
        }
    },
    data: function () {
        if (this.value > this.max) this.value = this.max;
        if (this.value < this.min) this.value = this.min;
        return {
            currentValue: this.value,
        }
    },
    watch: {
        currentValue: function (val) {
            //当currentValue改变时，向父级组件发射了input事件
            //在父组件调用input-number组件时，因为使用了 v-model 动态双向绑定了value
            //所以相当于监听了 input 事件，而且动态的将val传递给 v-model  改变了父组件的 value 数据
            this.$emit("input", val);
            //该示例，没有使用这个方法
            this.$emit("on-change", val);
        },
        value: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue=val;
        }
    },
    methods: {
        handleDown: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue -= this.step;
        },
        handleUp: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue += this.step;
        },
        handelChange: function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;
            if(isValueNumber(val)){
                val=Number(val);
                this.currentValue=val;
                if(val >max){
                    this.currentValue=max;
                }else if(val<min){
                    this.currentValue=min;
                }
            }else{
                event.target.value=this.currentValue;
            }
        }
    },
    mounted: function () {
        
    }
});