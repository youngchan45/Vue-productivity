<template>
  <div>
    分析入口{{da}}
    <group></group>
  </div>
</template>

<script>
import group from "../publicUse/Group";
export default {
  data() {
    return {
      da: ""
    };
  },
  created() {
     
    console.warn("into page");
    console.log(this.$route.query.page);
    
  },

  updated() {
    console.warn("into page");
  },
  mounted() {
    console.warn("into page");
    // this.getGround();
  },
  methods: {},
  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val, oldVal);
        this.$forceUpdate();
        this.da = this.$route.query.page;
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