Vue.component("tabs", {
    template: "#tabs-temp",
    props: {
        //这里的value是为了能够使用v-model
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            //因为不能修改value所以复制一份自己维护
            currentValue: this.value,
            //用于渲染  tabs 的标题
            navList: [],

        }
    },
    methods: {
        //点击标题关闭触发
        handleshutdown(name) {
            alert(name)
        },
        tabsCls(item) {
            return [
                'tabs-tab', {
                    //给当前选中的tab加一个class
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        //点击tab 标题触发
        handleChange(index) {
            var nav = this.navList[index];
            var name = nav.name;
            //改变当前选中的tab，并触发下面的watch
            this.currentValue = name;
            //更新value
            this.$emit('input', name);
            //触发一个自定义事件供父级使用
            this.$emit('on-click', name);
        },
        getTabs() {
            //遍历子组件过滤得到所有的pane组件  $option是组件信息
            return this.$children.filter(function (item) {
                return item.$options.name === "pane";
            });
        },
        updateNav() {
            //先清空标题
            this.navList = [];
            var _this = this;
            this.getTabs().forEach(function (pane, index) {
                //将标题和  name标识 存放到navLis
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index,
                });
                //如果pane组件没有name属性 ，为了同步pane组件和navList，默认设置它的索引
                if (!pane.name) pane.name = index;
                //设置当前选中的tab索引(初始化的时候如果没传 value属性  设置currentvalue为索引或者name属性)
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue === pane.name || index;
                    }
                }
            });

            this.updateStatus();
            //接收关闭事件
            bus.$on("shutdown", function (name) {
                _this.navList.forEach(function (item, index) {
                    if (item.name === name) {
                        _this.navList.splice(index, 1);
                    }
                })
            })
        },

        updateStatus() {
            var tabs = this.getTabs();
            var _this = this;
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currentValue;
            })
        }
    },
    watch: {
        value: function (val) {
            this.currentValue = val;
        },
        currentValue: function () {
            this.updateStatus();
        }
    }
});