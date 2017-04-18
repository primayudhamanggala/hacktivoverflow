<template>
  <div id="app">
    <HeadNav></HeadNav>
    <router-view></router-view>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import HeadNav from './components/HeadNav'
import PageFooter from './components/PageFooter'

export default {
  name: 'app',
  components: {
    HeadNav,
    PageFooter
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
</style>
