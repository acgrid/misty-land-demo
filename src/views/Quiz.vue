<template>
    <div>
        <progress :value="step" :max="quantity"></progress>
        <div v-if="running">
            <p>Q<span>{{ step + 1 }}</span>: {{ question }}</p>
            <ul class="c">
                <li v-for="option in options" @click="answer(option)">{{ option }}</li>
            </ul>
            <p v-if="step > 0"><button @click="back">上一问</button></p>
        </div>
        <div v-else>
            <h4>你答对了<b>{{ right }}</b>题，得<b :class="scoreClass">{{ score }}</b>分</h4>
            <h3 v-if="score > pass">可以走出新手村，开始传说吧！</h3>
            <button v-else @click="start">再来一次</button>
        </div>
    </div>
</template>

<script>
    function shuffled(arr) {
        const dup = arr.slice();
        let i = dup.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [dup[j], dup[i]] = [dup[i], dup[j]];
        }
        return dup;
    }
    const sources = [
        {q: "雾之大陆第一个正式PV的发布日期是？", a: ["2018/8/5", "2018/7/17", "2018/5/20", "2018/2/3"]},
        {q: "雾之大陆每个阵营有几个角色可选？", a: ["2", "1", "3", "4"]},
        {q: "雾之大陆卡片背景色彩是？", a: ["荣耀黄金", "英勇黄铜", "不屈白银", "璀璨钻石"]},
        {q: "雾之大陆导致中土与西大陆分离的原因是？", a: ["被陨石砸中", "被神祗斩断", "大陆板块运动", "因为忘了设置重力"]},
        {q: "中土浮空岛上的城池叫什么名字？", a: ["悬空城", "天元城", "天星城", "摘星城"]},
        {q: "九龙帝国的力量体系是什么？", a: ["气穴", "奇穴", "精炼", "真气"]},
        {q: "西大陆一共有几大势力？", a: ["三大势力", "四大势力", "九大家族", "十全大补汤"]},
        {q: "九龙帝国有几大家族？", a: ["九大家族", "十大家族", "八大家族", "三大家族"]},
        {q: "魔法王国为什么一般人无法到达？", a: ["因为有结界", "因为有膜法师", "因为没有钱", "因为有战争"]},
    ];
    export default {
        name: "Quiz",
        data(){
            return {
                quantity: 5,
                pass: 80,
                questions: [],
                answers: []
            };
        },
        computed: {
            step(){
                return this.answers.length;
            },
            started(){
                return this.questions.length > 0;
            },
            ended(){
                return this.answers.length >= this.questions.length;
            },
            running(){
                return this.started && !this.ended;
            },
            currentQuestion(){
                return this.started ? sources[this.questions[this.step]] : undefined;
            },
            question(){
                return this.currentQuestion ? this.currentQuestion.q : undefined;
            },
            options(){
                return this.currentQuestion ? shuffled(this.currentQuestion.a) : undefined;
            },
            right(){
                return this.answers.filter((answer, index) => {
                    return sources[this.questions[index]].a.indexOf(answer) === 0; // Right answer is the first item in source
                }).length;
            },
            score(){
                return Math.round(this.right / this.quantity * 100);
            },
            scoreClass(){
                return this.score > this.pass ? 'pass' : 'fail';
            }
        },
        methods: {
            start(){
                const pool = [...sources.keys()];
                if(this.quantity > sources.length) this.quantity = sources.length;
                this.questions = sources.slice(0, this.quantity).map(() => {
                    return pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
                });
                console.log(this.questions);
                this.answers.splice(0);
            },
            answer(answer){
                if(this.running) this.answers.push(answer);
            },
            back(){
                if(this.running) this.answers.splice(this.step - 1);
            }
        },
        created() {
            this.start();
        }
    }
</script>

<style lang="less" scoped>
b{
    padding: 0 0.5em;
    &.pass{
        color: green;
    }
    &.fail{
        color: orangered;
    }
}
</style>