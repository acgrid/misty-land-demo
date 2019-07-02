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
            <h4>你答对了<b>{{ right }}</b>题，得<b :class="passed ? 'pass' : 'fail'">{{ score }}</b>分</h4>
            <h3 v-if="passed">可以走出新手村，开始征程了！</h3>
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
        {q: "中土浮空岛上的城池叫什么名字？", a: ["悬空城", "天元城", "天星城", "摘星城"]},
        {q: "九龙帝国的力量根源是什么？", a: ["气穴", "奇穴", "精炼", "真气"]},
        {q: "九龙帝国有几大家族？", a: ["九大家族", "十大家族", "八大家族", "三大家族"]},
        {q: "魔法王国为什么一般人无法到达？", a: ["因为有结界", "因为有膜法师", "因为没有钱", "因为有战争"]},
        {q: "目前发布的职业形象有几位是女性？", a: ["3位", "4位", "1位", "7位"]},
        {q: "歌月山位于哪个阵营地域？", a: ["魔法王国", "九龙帝国", "中土", "部落联盟"]},
        {q: "终凉山是哪个职业的大本营？", a: ["刺客", "探险家", "龙族", "修仙士"]},
        {q: "以下哪个场景位于北境？", a: ["极北城", "龙石岛", "魔石岛", "第三都市"]},
        {q: "全域战争中侦察是哪个职业的技能？", a: ["执法者", "军团长", "修仙士", "魔法师"]},
        {q: "全域战争中驱灾避祸是哪个职业的技能？", a: ["修仙士", "秘法师", "魔法师", "元素使"]},
        {q: "全域战争中秘术法阵技能的作用是？", a: ["交换场上卡牌", "召唤一张卡牌", "免疫伤害", "偷看别人的牌"]},
        {q: "雾之大陆目前公布了几个阵营（不算外域）？", a: ["5", "6", "3", "8"]},
        {q: "羽族居住的地方是？", a: ["生命之树", "天空之城", "光明神殿", "天使之城"]},
        {q: "魔法师的法力来源？", a: ["魔法石和法咒", "魔法卷轴和魔导器", "反器材狙击枪和RPG", "冥想"]},
        {q: "北境联邦最大的区域是？", a: ["寒风冰原", "斯泰吉亚", "万渊平原", "冷原"]},
        {q: "北大陆上的特殊道具是怎么来的？", a: ["遗迹中发掘", "天上掉的", "哆啦A梦", "魔法王国开发"]},
        {q: "北大陆最著名登陆点是？", a: ["千帆港", "拉莱耶", "藏宝海湾", "博德之门"]},
    ];
    export default {
        name: "Quiz",
        data(){
            return {
                quantity: 10,
                pass: 6,
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
            passed(){
                return this.right >= this.pass;
            }
        },
        methods: {
            start(){
                const pool = [...sources.keys()];
                if(this.quantity > sources.length) this.quantity = sources.length;
                this.questions = sources.slice(0, this.quantity).map(() => {
                    return pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
                });
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
    font-size: 1.25em;
    &.pass{
        color: green;
    }
    &.fail{
        color: orangered;
    }
}
</style>