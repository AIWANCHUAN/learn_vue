Vue.component('pane', {
    template: '\
    <div class="pane" v-show="show">\
        <slot></slot>\
        <button v-if="closable" @click="shutdown">x</button>\
    </div>\
    ',
    data: () => {
        return {
            show: true,
        }
    },
    props: {
        name:{
            type:String
        },
        label:{
            type:String,
            default:''
        },
        closable:{
            type:Boolean,
            default:true,
        }
    },
    methods:{
        updateNav(){
            this.$parent.updateNav();
        },
        shutdown(){
            bus.$emit("shutdown",this.name);
        }
    },
    watch:{
        label:function(){
            this.updateNav();
        }
    },
    mounted:function(){
        this.updateNav();
        //console.log(this.closable)
    }
});