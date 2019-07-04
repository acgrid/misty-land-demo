<template>
  <div class="home">
    <router-link class="button" v-if="read" :to="{name: 'question'}">曾经阅读过，点击跳过</router-link>
    <h2>认识世界</h2>
    <img alt="Logo" src="../assets/logo.png">
    <p>我们并不是单纯开发一款游戏或者动画，而是计划构建一个架空的虚拟世界。让所有人都可以参与到这个世界的创造，大家一起用文字、设计、图画、音频、动画等形式，逐渐丰富这个世界的细节。</p>
    <p>在未知次元的迷雾中有一个幻想世界，它被称为雾之大陆。人类帝国、部落文明、冒险大陆、上古遗迹散落其中，这里还有很多未知而神秘的地方，等待着你来探索。</p>
    <h4>阵营与职业</h4>
    <img src="http://misty-land-1253523747.file.myqcloud.com/tutorial/1.png" alt="阵营与职业" />
    <button v-if="!read" @click="complete">进入雾之大陆</button>
    <div v-if="read">
      <h3>重头再来？</h3>
      <button @click="reset">重置进度</button>
    </div>
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
      this.$router.push({name: 'question'});
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
