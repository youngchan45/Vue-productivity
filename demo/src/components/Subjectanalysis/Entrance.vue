<template>
  <div>
    分析入口{{now}}
    <group></group>
  </div>
</template>

<script>
import group from "../publicUse/Group";
export default {
  data() {
    return {
      now: ""
    };
  },
  created() {   
    console.warn("into page");
    console.log(this.$route.query.page);    
  },
  methods: {},
  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val, oldVal);
        this.$forceUpdate();
        this.now = this.$route.query.page;
      },
      immediate: true
    }
  },
  components: {
    group
  }
};
</script>

<style lang="less" scoped>
</style>