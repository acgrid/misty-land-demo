<template>
    <div>
        <div v-if="!loaded">加载中</div>
        <div v-show="loaded">
            <div class="img-container" style="position: relative; background: transparent top center no-repeat; background-size: contain" :style="{backgroundImage: powerImage}">
                <img :src="tachie" alt="角色立绘" class="full-width" @load="loaded = true" />
                <span class="text-land name" style="width: 1em; top: 1%; left: 10%; position: absolute"></span>
            </div>
            <p><a @click="$router.back()">返回</a></p>
            <div style="text-align: left">
                <p>【阵营】<span class="nation">{{ powerName }}</span></p>
                <p>【介绍】<span class="description"> {{ character.d }}</span></p>
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
        </div>
    </div>
</template>

<script>
    import powers from '../settings/power';
    import characters from '../settings/character';
    import {CLOUD} from "../settings/cloud";

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
                return `url(${CLOUD}/power/${this.id}s.png)`;
            },
        },
        methods: {
            playSpeech(){
                if(!this.playing) this.$refs.audio.play();
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
</style>