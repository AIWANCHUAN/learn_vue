//假数据，真实业务一般用ajax从服务器动态获取
var list = [
    {
        id: 1,
        name: 'iphoneX',
        price: 7000,
        count: 1
    },
    {
        id: 2,
        name: 'ipad',
        price: 3000,
        count: 1
    },
    {
        id: 3,
        name: 'Mack Pro',
        price: 14000,
        count: 1
    }
];

//创建vue实例
var app = new Vue({
    el: '#app',
    data: {
        list: list,
    },
    computed: {
        totalPrice: function () {
            var total = 0;
            //累加每个商品的总价
            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                total += item.price * item.count;
            }
            return total.toString().replace(/\B(?=\d{3})+$/g, ",");
        }
    },
    methods: {
        handleReduce: function (index) {
            var item = this.list[index];
            if (item.count === 1) return;
            item.count -= 1;
        },
        handleAdd: function (index) {
            var item = this.list[index];
            item.count += 1;
        },
        handleRemove: function (index) {
            this.list.splice(index, 1);
        }
    }
})