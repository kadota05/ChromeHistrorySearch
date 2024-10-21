<template>
  <div id="app">
    <h1>Chrome History Explorer</h1>
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/instructions" class="nav-link">利用方法はこちら</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: #121212;
  color: #e0e0e0;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #ffd700;
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 30px;
}

nav {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.nav-link {
  color: #ffd700;
  text-decoration: none;
  margin: 0 15px;
  font-size: 1.2em;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffffff;
}
</style>