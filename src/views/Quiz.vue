<template>
    <div>
        <div v-if="chosen">
            <h2>你已经成为一名</h2>
            <CharacterIcon :id="chosen" style="width: 50%; margin: 0 auto;"></CharacterIcon>
        </div>
        <h2>九龙之争故事背景</h2>
        <p>九龙帝国因为域内有九个天地气穴而得名，相传如果能在气穴中修炼，将会拥有超过常人的能力。九大气穴能力各不相同，几千年来，气穴由几大家族势力分别守护，每隔十年都将举办一场比武大会，胜利者将有资格造访所有气穴。比武大会又被称为“九龙之争”，大会已成为九龙国的传统，每次大会，各大家族，江湖门派，九龙国之外的势力都会派人参与。大会历史悠久，哪怕中间发生战争、朝代更替，也不曾中断过。</p>
        <h2>走出新手村</h2>
        <p>你想去参加大会，但是长老显然觉得你还太嫩；</p>
        <blockquote>长老：想出山，先来考你几个问题，答上来了才能让你去参加九龙之争；我出10道题，及格了方算过关。</blockquote>
        <hr />
        <div v-if="!everPassed">
            <progress :value="step" :max="quantity"></progress>
            <div v-if="running">
                <h3>Q<span>{{ step + 1 }}</span>: {{ question }}</h3>
                <ul class="c">
                    <li v-for="option in options" @click="answer(option)">{{ option }}</li>
                </ul>
                <p v-if="step > 0"><button @click="back">上一问</button></p>
                <p class="center">提示来自雾之大陆设定集，新手任务墙</p>
            </div>
            <div v-else>
                <h4>你答对了<b>{{ right }}</b>题，得<b :class="passed ? 'pass' : 'fail'">{{ score }}</b>分</h4>
                <button v-if="!passed" @click="start">再来一次</button>
            </div>
        </div>
        <div v-if="skip">
            <p style="color: orangered; font-size: large">你的知识水平得到了认可，在新手村NPC那里交任务吧。</p>
            <blockquote>九龙之争各路势力都已经混杂其中，我们派了密探去打探信息；如果遇到困难你们可以互相照应，多去<b>【酒馆】</b>打听，那边消息比较灵通，不过人员也很复杂，总之自己小心。</blockquote>
        </div>
    </div>
</template>

<script>
    import {PASS_QUIZ} from "../mutations";
    import store from '../store';
    import CharacterIcon from "../components/CharacterIcon";

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
        {q: "雾之大陆角色卡片背景色彩是？", a: ["荣耀黄金", "英勇黄铜", "不屈白银", "璀璨钻石"]},
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
        components: {CharacterIcon},
        beforeRouteEnter(to, from, next){
            next(store.state.characterChosen ? undefined : {name: 'home'});
        },
        data(){
            return {
                everPassed: this.$store.state.quizPassed, // not responsive
                quantity: 10,
                pass: 6,
                questions: [],
                answers: []
            };
        },
        computed: {
            chosen(){
                return this.$store.state.characterChosen;
            },
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
            },
            skip(){
                return this.everPassed || this.passed;
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
                if(this.running){
                    this.answers.push(answer);
                    if(this.passed) this.$store.commit(PASS_QUIZ);
                }
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
    blockquote{
        text-align: left;
        font-style: italic;
        margin: 0.5em 0;
        padding-left: 2em;
        position: relative;
        &:before{
            content: '“';
            position: absolute;
            top: 0;
            left: 0.5em;
            font-size: 2em;
            color: orangered;
        }
        &:after{
            content: '”';
            position: absolute;
            bottom: -0.5em;
            right: 0.5em;
            font-size: 2em;
            color: orangered;
        }
    }
</style>