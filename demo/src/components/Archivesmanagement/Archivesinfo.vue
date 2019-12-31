<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title0">
      <div class="title1">
        <h3>{{2019}}</h3>
        <img :src="calendar" alt="calendar" class="calendarPng" />
        <h3>年度档案</h3>
      </div>
      <div>
        <el-button type="primary" size="mini">
          导出PDF
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
      <h4>{{idcard}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calendar: require("../../assets/img/calendar.png"),
      type: "",
      idcard: "",
      dateYear: "",
    };
  },
  created() {
    this.getQuery();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getQuery() {
        this.type=this.$route.query.type;
        this.idcard=this.$route.query.idcard;
        this.dateYear=this.$route.query.dateYear;
        console.log("接收", this.idcard);
      console.log("接收", this.dateYear);
    }

  },
//   watch: {
//       "$route":'getQuery'
//   },
};
</script>

<style lang='less' scoped>
.title0 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title1 {
    display: flex;
    align-items: center;
    .calendarPng {
      width: 26px;
      height: 26px;
      padding: 0 10px;
    }
  }
}
</style>