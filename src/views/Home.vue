<template>
  <div class="home">
    <router-link class="button" v-if="read" :to="{name: 'quiz'}">曾经阅读过，点击跳过</router-link>
    <img alt="Logo" src="../assets/logo.png">
    <h4>阵营与职业</h4>
    <img src="http://misty-land-1253523747.file.myqcloud.com/tutorial/1.png" alt="阵营与职业" />
    <h4>系统介绍</h4>
    <img src="http://misty-land-1253523747.file.myqcloud.com/tutorial/2.png" alt="系统介绍" />
    <img src="http://misty-land-1253523747.file.myqcloud.com/tutorial/3.png" alt="系统介绍" />
    <button v-if="!read" @click="complete">已经阅读完毕，准备从新手村毕业</button>
    <button v-if="read" @click="reset">重置进度</button>
  </div>
</template>

<script>
// @ is an alias to /src
import {RESET, READ_TUTORIAL} from "../mutations";

export default {
  name: 'home',
  computed: {
    read(){
      return this.$store.state.tutorialRead;
    }
  },
  methods: {
    complete(){
      this.$store.commit(READ_TUTORIAL);
      this.$router.push({name: 'quiz'});
    },
    reset(){
      this.$store.commit(RESET);
    }
  }
}
</script>

<style lang="less" scoped>
  .home{
    box-sizing: border-box;
    width: 100%;
  }
  img{
    max-width: 100%;
  }
</style>
