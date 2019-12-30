<template>
  <div>
    <div class="filter">
      <el-select
        v-model="archivesQuery.searchSel"
        @change="currenSel"
        clearable
        placeholder="全部"
        size="mini"
        @clear="getList"
      >
        <el-option
          v-for="item in searchOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        placeholder="请输入关键字"
        v-model="archivesQuery.condition"
        clearable
        size="mini"
        @clear="getList"
      ></el-input>
      <el-button size="mini" type="primary" @click="getList">搜索</el-button>
    </div>
    <el-table
      ref="filterTable"
      :data="archivesTableData"
      style="width: 100%"
      stripe
      border
      max-height="470px"
      show-overflow-tooltip
    >
      <el-table-column type="index" label="#"  width="50"></el-table-column>
      <el-table-column label="姓名"  prop="name" width="100"></el-table-column>
      <el-table-column label="工作单位"  prop="unit_name" width="120"></el-table-column>
      <el-table-column label="职务"  prop="present_post" width="100"></el-table-column>
      <el-table-column label="级别"  prop="present_rank" width="120"></el-table-column>
      <el-table-column label="提交时间"  width="200" sortable>
        <template slot-scope="scope">{{scope.row.submit_time | timeset}}</template>
      </el-table-column>
      <el-table-column label="查看" align="center" width="260">
        <template solt-scope="scope">
          <el-button type="primary" plain size='mini'>详情</el-button>
          <el-button type="primary" plain size='mini'>历年对比</el-button>
          <el-button type="primary" plain size='mini'>社会关系</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      archivesTableData: [],
      deptId: window.localStorage.getItem("deptId"),
      searchOpts: [
        //1 全部
        { label: "姓名", value: "2" },
        { label: "身份证", value: "3" },
        { label: "工作单位", value: "4" },
        { label: "级别", value: "5" }
      ],
      searchSel: "",
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
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .get("/query/complexQuery", {
          params: this.archivesQuery
        })
        .then(res => {
          
        this.archivesTableData = res.data.data[0].list;
        console.log(this.archivesTableData);
        });
    },
    currenSel(selVal) {
      this.searchSel = selVal;
      console.log("sel", selVal);
    }
  }
};
</script>