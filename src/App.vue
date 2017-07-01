<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <div class="text-wrap">{{ apiText }}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      apiText: 'LTC 정보를 가져오고 있습니다.'
    }
  },
  mounted () {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.text-wrap {
  word-break: break-all;
}
</style>
