<template>
  <div id="app">
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
button, a.button{
  display: block;
  border: slategray 2px solid;
  background: #eee;
  padding: 0.5em;
  margin: 0.5em 0;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5em;
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
p{
  text-indent: 2em;
  text-align: left;
}
.center{
  text-indent: 0;
  text-align: center;
}
</style>
