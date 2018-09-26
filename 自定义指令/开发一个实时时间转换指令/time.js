var time = {
    //获取当前时间戳
    getUnix: function () {
        var date = new Date();
        return date.getTime();
    },
    //获取当天的0点0分0秒的时间戳
    getTodayUnix: function () {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获取当年1月1日0点0分0秒的时间戳
    getYearUnix: function () {
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获取标准年月日
    getLastDate: function (time) {
        var date = new Date(time);
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },
    //转换时间
    getFormatTime: function (timestamp) {
        var now = this.getUnix();
        var today = this.getTodayUnix();
        var year = this.getYearUnix();
        var timer = (now - timestamp) / 1000;//定位时间和现在的时间差   转为秒级
        console.log(timer);

        var tip = ""; //返回值  提示定位时间距离现在多久

        if (timer <= 0) {
            tip = '刚刚';
        } else if (Math.floor(timer / 60) <= 0) {
            tip = Math.floor(timer) + '秒前';
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && timestamp >= today) {
            tip = Math.floor(timer / 3600) + '小时前';
        } else if (timer / 86400 <= 31) {
            tip = Math.floor(timer / 86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }
}

Vue.directive('time', {
    bind: (el, binding) => {
        el.innerHTML = time.getFormatTime(binding.value);
        el.__timeout__ = setInterval(() => {
            el.innerHTML = time.getFormatTime(binding.value);
        }, 6000)
    },
    unbind: (el) => {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
})