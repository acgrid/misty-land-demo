<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">认识世界</router-link> |
      <router-link to="/quiz">走出新手村</router-link> |
      <router-link to="/question">创造者之问</router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less">
@import "./assets/font.less";
.ext-font("MZDL", "//misty-land-1253523747.file.myqcloud.com/font/");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 0.5em;
}
#nav {
  padding: 30px;
}
a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  &.router-link-exact-active{
    color: #42b983;
  }
  &:hover{
    color: green;
  }
  &:active{
    color: orangered;
  }
}
ul.c{
  padding: 0;
  li{
    list-style: none;
    margin: 0.25em;
    border-radius: 1em;
    padding: 0.5em;
    font-weight: bold;
    background: slategray;
    color: wheat;
  }
}
</style>
