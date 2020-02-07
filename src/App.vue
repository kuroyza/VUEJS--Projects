<template>
  <div id="app">
    <a href="#" class="backbtn" @click.prevent="goBack">Back</a>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/projects">Projects</router-link>
    </div>
    <router-view />
  </div>
</template>


<script>
export default {
  methods:{
    goBack(){
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}

body{
  background-color: rgba(0, 77, 200, .1);
}

ul{
  list-style: none;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;
  transition: all .3s;

  &.router-link-exact-active {
    color: #42b983;
  }

  &:hover{
    color: #2c3e50d2;
  }
}
</style>
