<template>
  <div>
    基本资料
    <group></group>
  </div>
</template>

<script>
import Group from "../../publicUse/Group";
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$route)
  },
  methods: {},
  components: {
    group: Group
  }
};
</script>