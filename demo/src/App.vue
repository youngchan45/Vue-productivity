<template>
  <div id="app">
    <!-- <p @click="a">111</p> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      
    }
  },
  methods: {
    // a(){
    //   this.$router.push('Login')
    // }
  },
}
</script>

<style>

</style>
