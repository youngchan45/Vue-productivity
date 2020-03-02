<template>
  <div>
    <div class="filter">
      <el-select
        v-model="searchSel"
        @change="currenSearchSel"
        clearable
        placeholder="全部"
        size="small"
      >
        <el-option
          v-for="item in searchOpts"
          :key="item.label"
          :label="item.label"
          :value="item.value"
          size="small"
        ></el-option>
      </el-select>
      <el-input placeholder="请输入关键字" v-model="archivesQuery.condition" clearable size="small"></el-input>
      <!--自定义传参，参数用括号括起来-->
      <el-button size="small" type="primary" @click="getList()">查询</el-button>
      <!-- <el-button size="small" type="text" @click="toggleShow">高级搜索</el-button> -->
    </div>
  </div>
</template>
searchSel: "",
<script>
export default {
  data() {
    return {
      searchSel: "",
      archivesTableData: [],
      searchOpts: [
        //1 全部
        { label: "姓名", value: "2" },
        { label: "身份证", value: "3" },
        { label: "工作单位", value: "4" },
        { label: "级别", value: "5" }
      ],
      archivesQuery: {
        userId: window.sessionStorage.getItem("userId"),
        deptId: window.sessionStorage.getItem("deptId"),
        dateYear: "",
        idCard: "",
        userName: "",
        rankList: "",
        area: "",
        carNum: "",
        estateNum: "",
        goboard: "",
        salary: "",
        punishmentList: "",
        unitList: "",
        button: "button1",
        type: 1, //搜索下拉框
        condition: "", //搜索框里的关键词
        pageIndex: 1,
        pagesize: 10
      }
    };
  },
  methods: {
    currenSearchSel(selVal) {
      // this.searchSel = selVal;
      console.log("简易搜索", selVal);
      this.archivesQuery.type = selVal;
    },
    getList() {
      this.$http
        .get("/query/complexQuery", {
          params: this.archivesQuery
        })
        .then(res => {
          this.archivesTableData = res.data.data[0].list;
          this.paging = res.data.data[0];
          console.log(this.archivesTableData);
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>