<template>
    <div>
        <h2>创造者之问</h2>
        <div v-if="!ended">
            <p>我是雾之大陆的创造者，接下来将向你提出四个问题，这几个问题将决定是你成为一个什么样的人，从而降临到雾之大陆。</p>
            <h3>- {{ title }} -</h3>
            <h4>{{ question }}</h4>
            <ul class="c">
                <li v-for="(option, index) in options" @click="answer(index)">{{ option }}</li>
            </ul>
            <p v-if="step > 0"><button @click="back">回到上一问</button></p>
        </div>
        <div v-else>
            <h4>好的，已经选出适合你的职业！</h4>
            <!--<button @click="restart">再来一次</button>-->
        </div>
        <div v-if="chosen">
            <h3>你已经成为一名</h3>
            <CharacterIcon :id="chosen" style="width: 40%; margin: 0 auto;"></CharacterIcon>
            <router-link class="button" :to="{name: 'quiz'}">走出新手村</router-link>
        </div>
        <div v-if="usable.length">
            <h3>你也许是一名</h3>
            <ul class="u">
                <li v-for="item in usable">
                    <router-link :to="{name: 'character', params: {id: item}}">
                        <img :src="icon(item)" alt="角色头像" />
                        <div>{{ characters[item].n }}</div>
                    </router-link>
                </li>
            </ul>
            <h5>点击角色，了解并选择</h5>
            <p v-if="ended">不同的职业角色，竞技场技能不同，想事先了解技能用途，请观察新手任务墙。</p>
        </div>
    </div>
</template>

<script>
    import characters from '../settings/character';
    import {CLOUD} from "../settings/cloud";
    import store from '../store';
    import {ANSWER_QUESTION, UNDO_ANSWER, CLEAR_ANSWERS} from "../mutations";
    import CharacterIcon from "../components/CharacterIcon";

    const questions = [
        {q: "如果必经之路上出现了一块大石挡路，你会怎么办？", t: "人物的性格", c:[
                {a: "打碎它", u: [1, 3]},
                {a: "飞过去", u: [4]},
                {a: "把石头移走", u: [10]},
                {a: "闪现过去", u: [6]},
                {a: "找伙伴一起解决它", u: [5, 7]}
            ]},
        {q: "如果任务途中，遇到一位女子求助想与你同行，你会怎么办？", t: "对事物的观点", c: [
                {a: "给她一些必须品后离开", u: [8]},
                {a: "杀了她", u: [2]},
                {a: "与她同行", u: [5, 4]},
                {a: "询问她的情况并给出相应帮助", u: [7]},
                {a: "无视", u: [6, 9]}
            ]},
        {q: "经历一番艰辛，找到了宝箱，你觉得里面会是什么？", t: "人生的追求", c: [
                {a: "绝世武器", u: [1]},
                {a: "一张新藏宝图", u: [8]},
                {a: "一本秘籍", u: [10]},
                {a: "一直想找的答案", u: [3, 9]},
                {a: "危险", u: [2]}
            ]},
        {q: "你对神怎么看？", t: "信仰", c: [
                {a: "它们是曾经的最强者", u: [9, 10]},
                {a: "没有神", u: [7, 8]},
                {a: "很神秘，平时碰不到", u: [6, 5]},
                {a: "我就是神", u: [1, 2]},
                {a: "神是我们的先祖", u: [4, 3]}
            ]}
    ];
    export default {
        name: "Question",
        components: {CharacterIcon},
        beforeRouteEnter(to, from, next){
            next(store.state.tutorialRead ? undefined : {name: 'home'});
        },
        data() {
            return {
                characters
            };
        },
        computed: {
            answers(){
                return this.$store.state.answers;
            },
            step() {
                return this.answers.length;
            },
            ended(){
                return this.step >= questions.length;
            },
            title(){
                return this.ended ? undefined : questions[this.step].t;
            },
            question(){
                return this.ended ? undefined : questions[this.step].q;
            },
            options(){
                return this.ended ? undefined : questions[this.step].c.map(choice => choice.a);
            },
            usable() {
                return questions.slice(0, this.step).reduce((usable, question, index) => {
                    if(this.answers[index] < questions[index].c.length){
                        questions[index].c[this.answers[index]].u.forEach(item => {
                            if(usable.indexOf(item) === -1) usable.push(item);
                        })
                    }
                    return usable;
                }, []);
            },
            chosen(){
                return this.$store.state.characterChosen;
            }
        },
        methods: {
            restart: function(){
                this.$store.commit(CLEAR_ANSWERS);
            },
            back: function(){
                this.$store.commit(UNDO_ANSWER);
            },
            answer: function(index){
                if(this.ended) return;
                if(index < questions[this.step].c.length) this.$store.commit(ANSWER_QUESTION, index);
            },
            icon(id){
                return `${CLOUD}/icon/${id}.png`;
            }
        }
    }
</script>

<style lang="less" scoped>
    h3{
        margin-top: 2em;
        color: orangered;
    }
    ul.u{
        padding: 0.5em 0;
        display: flex;
        li{
            width: 20%;
            padding-left: 0.2%;
            list-style: none;
            text-align: center;
            img{
                max-width: 100%;
                box-shadow: 2px 2px 3px #cccccc;
            }
            p{
                margin: 0 0 0.5em 0;
            }
            a{
                &:link{
                    color: #42b983;
                }
                &:visited{
                    color: orange;
                }
            }
            &:first-child{
                padding-left: 0;
            }
        }
    }
</style>