<template>
    <router-link :to="{name: 'character', params: {id}}">
        <img :src="icon(id)" alt="角色头像" />
        <p class="center">{{ character.n }}</p>
    </router-link>
</template>

<script>
    import characters from '../settings/character';
    import {CLOUD} from "../settings/cloud";
    export default {
        name: "CharacterIcon",
        props: {
            id: Number
        },
        computed: {
            character(){
                console.log(characters, this.id);
                return characters[this.id];
            }
        },
        methods: {
            icon(id){
                return `${CLOUD}/icon/${id}.png`;
            }
        }
    }
</script>

<style scoped>

</style>