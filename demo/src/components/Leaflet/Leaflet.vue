<template>
    <div>
        <div class="filter">
      <el-select
        v-model="archivesQuery.searchSel"
        @change="currenSel"
        clearable
        placeholder="全部"
        size="small"
        @clear="getList"
      >
        <el-option
          v-for="item in searchOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          size="small"
        ></el-option>
      </el-select>
      <el-input
        placeholder="请输入关键字"
        v-model="archivesQuery.condition"
        clearable
        size="small"
        @clear="getList"
      ></el-input>
      <el-button size="small" type="primary" @click="getList">查询</el-button>
    </div>

    <h3>人员</h3>
        <el-table
      ref="filterTable"
      :data="archivesTableData"
      style="width: 100%"
      stripe
      border
      max-height="470px"
      show-overflow-tooltip
    > 
    <el-table-column type="index" label="#" width="50" fixed="left"></el-table-column>
      <el-table-column type="index" label="序号" width="100" fixed="left"></el-table-column>
      <el-table-column label="姓名" prop="name" width="200"></el-table-column>
      <el-table-column label="身份证" prop="unit_name" ></el-table-column>
      <el-table-column label="级别" prop="present_post" width="200"></el-table-column>
      <el-table-column label="单位" prop="present_rank" ></el-table-column>
    </el-table>
    <!-- <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="archivesQuery.pageIndex"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.totalRow"
      ></el-pagination>
    </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            archivesTableData:[],
            searchOpts: [
        //1 全部
        { label: "姓名", value: "2" },
        { label: "身份证", value: "3" },
        { label: "工作单位", value: "4" },
        { label: "级别", value: "5" }
      ],
      input:'',
      userDefinedChecked:[],
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
        }
    },
    methods: {
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
    },
    currenSel(selVal) {
      this.searchSel = selVal;
      console.log("sel", selVal);
    }
    },
}
</script>