<template>
  <div>
    <group></group>
    <div class="warn">
      <h3>预警信息</h3>
      <div>更多</div>
    </div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in tabPane"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <div v-for="(item,index) in warnList" :key="index">
          <el-link href underline>{{item.name}}{{item.post}}{{item.ranks}}{{item.deptName}}疑似违规</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Group from "../components/publicUse/Group";
export default {
  data() {
    return {
      activeName: "0",
      warnQuery: {
        deptId: 1,
        type: ""
      },
      warnList: [],
      tabPane: [
        { label: "房产预警", name: "0", type: "0" },
        { label: "涉及裸官", name: "1", type: "1" },
        { label: "疑似经商办企业", name: "2", type: "2" }
      ]
    };
  },
  created() {
    this.getWarnInfo();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.warnQuery.type = tab.index;
      this.getWarnInfo();
    },
    getWarnInfo() {
      this.$http
        .get("/warn/indexWarnInfo", {
          params: this.warnQuery
        })
        .then(res => {
          console.log("卡片3", res);
          this.warnList = res.data.data.slice(0, 5);
        });
    }
  },
  components: {
    group: Group
  }
};
</script>

<style lang="less" scoped>
.warn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>