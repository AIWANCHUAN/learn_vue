Vue.component('controller-group', {
    template: '<div class="btn-group">\
    <button v-if="questionsNum>1&&step!=(questionsNum-1)" @click="stepNext" disabled="false">下一步</button>\
    <button v-if="step==(questionsNum-1)">提交</button>\
    <button v-if="step!=0" @click="stepPrev">上一步</button>\
    <button>重置</button>\
    </div>',
    props: ['step', 'questionsNum'],
    data: function () {

    },
    methods: {
        stepNext: function () {
            bus.$emit("increasestep");
        },
        stepPrev: function () {
            bus.$emit("decresesestep");
        }
    }


})