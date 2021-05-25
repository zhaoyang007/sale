<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/supplier/login">供应商</router-link> |
      <router-link to="/seller/login">销售商</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
