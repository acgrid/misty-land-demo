<template>
    <div v-if="character">
        <div v-show="loaded" class="img-container" style="position: relative; background: transparent top center no-repeat; background-size: contain" :style="{backgroundImage: powerImage}">
            <img :src="tachie" alt="角色立绘" class="full-width" @load="loaded = true" />
            <span class="text-land">{{ character.n }}</span>
        </div>
        <div v-if="!loaded">加载立绘中</div>
        <div style="text-align: left">
            <div>【阵营】<span class="nation">{{ powerName }}</span></div>
            <div>【介绍】<span class="description"> {{ character.d }}</span></div>
            <div class="weui-flex">
                <div class="weui-flex__item">【人设】<span class="illustrator">{{ character.e }}</span></div>
                <div class="weui-flex__item">【CV】<span class="cv">{{ character.cv }}</span></div>
            </div>
            <blockquote>
                <audio :src="audio" ref="audio" @ended="playing = false" @playing="playing = true"></audio>
                <a class="speech" :class="{active: playing}" @click="playSpeech">&#9654; 播放</a>
                <span class="dialog">{{ character.s }}</span>
            </blockquote>
        </div>
        <button v-if="!chosen" @click="choose">选择我，开启征程</button>
        <a class="button" @click="$router.back()">返回</a>
    </div>
</template>

<script>
    import powers from '../settings/power';
    import characters from '../settings/character';
    import {CLOUD} from "../settings/cloud";
    import {CHOOSE_CHARACTER} from "../mutations";

    export default {
        name: "Character",
        data(){
            return {
                playing: false,
                loaded: false
            };
        },
        computed: {
            id(){
                return this.$route.params.id;
            },
            character(){
                return characters[this.id];
            },
            name(){
                return this.character && this.character.n;
            },
            tachie(){
                return `${CLOUD}/tachie/${this.id}.png`;
            },
            audio(){
                return `${CLOUD}/speech/${this.id}.ogg`;
            },
            power(){
                return powers[this.character.p];
            },
            powerName(){
                return this.power.name;
            },
            powerImage(){
                return `url(${CLOUD}/power/${this.power.id}s.png)`;
            },
            chosen(){
                return this.$store.state.characterChosen;
            }
        },
        methods: {
            playSpeech(){
                if(!this.playing) this.$refs.audio.play();
            },
            choose(){
                this.$store.commit(CHOOSE_CHARACTER, this.id);
                this.$router.push({name: 'pre-quiz'});
            }
        },
        watch: {
            tachie(){
                this.loaded = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    img{
        max-width: 100%;
    }
    p{
        margin: 0.5em 0;
    }
    blockquote{
        margin: 1em 0;
        padding-left: 1em;
        border-left: dimgray solid 4px;
    }
    button{
        background: #42b983;
        font-size: 1.25em;
    }
    a.speech{
        margin-right: 0.5em;
        &:link, &:visited, &:hover{
            color: orangered;
        }
        &.active{
            &:link, &:visited, &:hover{
                color: gray;
            }
        }
    }
    .text-land{
        font-family: "MZDL", sans-serif;
        font-size: 1.5em;
        width: 1em;
        top: 1%;
        left: 10%;
        position: absolute;
    }
</style>