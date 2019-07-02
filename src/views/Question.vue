<template>
    <div>
        <div v-if="!ended">
            <h3>{{ title }}之问</h3>
            <p>{{ question }}</p>
            <ul class="c">
                <li v-for="(option, index) in options" @click="answer(index)">{{ option }}</li>
            </ul>
            <p v-if="step > 0"><button @click="back">回到上一问</button></p>
        </div>
        <div v-else>
            <h4>好的，已经选出适合你的职业！</h4>
            <button @click="restart">再来一次</button>
        </div>
        <div v-if="usable">
            <h3>适合你的职业</h3>
            <ul class="u">
                <li v-for="item in usable">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    const questions = [
        {q: "如果必经之路上出现了一块大石挡路，你会怎么办？", t: "性格", c:[
                {a: "打碎它", u: ["军团长", "龙族"]},
                {a: "飞过去", u: ["羽族"]},
                {a: "把石头移走", u: ["修仙士"]},
                {a: "闪现过去", u: ["魔法师"]},
                {a: "找人帮忙", u: ["元素使", "执法者"]}
            ]},
        {q: "如果任务途中，遇到一位女子求助想与你同行，你会怎么办？", t: "观点", c: [
                {a: "给她一些必须品后离开", u: ["探险家"]},
                {a: "杀了她", u: ["刺客"]},
                {a: "与她同行", u: ["元素使", "羽族"]},
                {a: "询问她的情况并给出相应帮助", u: ["执法者"]},
                {a: "无视", u: ["魔法师", "秘法师"]}
            ]},
        {q: "经历一番艰辛，找到了宝箱，你觉得里面会是什么？", t: "追求", c: [
                {a: "一把武器", u: ["军团长"]},
                {a: "一张新藏宝图", u: ["探险家"]},
                {a: "一本秘籍", u: ["修仙士"]},
                {a: "想找的答案", u: ["龙族", "秘法师"]},
                {a: "危险", u: ["刺客"]}
            ]},
        {q: "你对神怎么看？", t: "信仰", c: [
                {a: "他一定是曾经的最强者", u: ["秘法师", "修仙士"]},
                {a: "没有神", u: ["执法者", "探险家"]},
                {a: "并不容易让你碰到神", u: ["魔法师", "元素使"]},
                {a: "我就是神", u: ["军团长", "刺客"]},
                {a: "我们的先祖成为了神", u: ["羽族", "龙族"]}
            ]}
    ];
    export default {
        name: "Question",
        data() {
            return {
                choices: []
            };
        },
        computed: {
            step: function () {
                return this.choices.length;
            },
            ended: function(){
                return this.step >= questions.length;
            },
            title: function(){
                return questions[this.step].t;
            },
            question: function(){
                return questions[this.step].q;
            },
            options: function(){
                return questions[this.step].c.map(choice => choice.a);
            },
            usable: function () {
                return questions.slice(0, this.step).reduce((usable, question, index) => {
                    if(this.choices[index] < questions[index].c.length){
                        questions[index].c[this.choices[index]].u.forEach(item => {
                            if(usable.indexOf(item) === -1) usable.push(item);
                        })
                    }
                    return usable;
                }, []);
            }
        },
        methods: {
            restart: function(){
                this.choices.splice(0);
            },
            back: function(){
                if(this.step > 0) this.choices.splice(this.step - 1);
            },
            answer: function(index){
                if(this.ended) return;
                if(index < questions[this.step].c.length){
                    this.choices.push(index);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    ul{
        padding: 0;
        li{
            list-style: none;
            margin: 0.25em;
            border-radius: 1em;
            padding: 0.5em;
            font-weight: bold;
        }
    }
    ul.c li{
        background: slategray;
        color: wheat;
    }
    ul.u li{
        background: gold;
    }
</style>