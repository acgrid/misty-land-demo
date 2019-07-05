<template>
    <div>
        <CharacterIcon :id="chosen" style="width: 50%; margin: 0 auto;"></CharacterIcon>
        <h2 class="center">现在，请找新手村NPC领取</h2>
        <h2 style="color: orangered">【任务手册】</h2>
        <router-link class="button" :to="{name: 'quiz'}">填好了，给长老说我要出山</router-link>
    </div>
</template>

<script>
    import CharacterIcon from "../components/CharacterIcon";
    import store from "../store"
    export default {
        name: "PreQuiz",
        components: {CharacterIcon},
        beforeRouteEnter(to, from, next){
            next(store.state.characterChosen ? undefined : {name: 'home'});
        },
        computed: {
            chosen(){
                return this.$store.state.characterChosen;
            },
        }
    }
</script>

<style scoped>

</style>