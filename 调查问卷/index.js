var app=new Vue({
    el:"#app",
    data:{
        step:0,
        questionsNum: [0,1,2]
    },
    mounted:function(){
        var _this=this;
        bus.$on("increasestep",function(){
            _this.step++;
        });
        bus.$on("decresesestep", function () {
            _this.step--;
        });
    }
})