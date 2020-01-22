<template>
  <el-card>
    <el-col>
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
    </el-col>

    <el-col :span="16">
      <div>
        <h3>人员</h3>
        <el-table
          ref="filterTable"
          :data="personData"
          style="width: 100%"
          stripe
          border
          max-height="470px"
          tooltip-effect="light"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" label="#" width="50" fixed="left"></el-table-column>
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="身份证" prop="unit_name" show-overflow-tooltip></el-table-column>
          <el-table-column label="级别" prop="present_post" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" prop="present_rank"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="archivesQuery.pageIndex"
            :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paging.totalRow"
          ></el-pagination>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <h3>选项</h3>
      <div class="leafTab">
        <el-tabs stretch class>
          <el-tab-pane label="专题分析">
            <el-checkbox-group v-model="leafChecked" class="checkFlex" >
              <el-checkbox label="个人基本情况"></el-checkbox>
              <el-checkbox label="
因私出入境情况"></el-checkbox>
              <el-checkbox label="配偶、子女移居国（境)外情况"></el-checkbox>
              <el-checkbox label="房产情况"></el-checkbox>
              <el-checkbox label="配偶、子女及其配偶经商办企业"></el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="档案主题">
            <el-checkbox-group v-model="leafChecked1" class="checkFlex">
              <el-checkbox label="个人基本情况"></el-checkbox>
              <el-checkbox label="领导干部信息表(一)"></el-checkbox>
              <el-checkbox label="领导干部信息表(二)"></el-checkbox>
              <el-checkbox label="领导干部信息表(三)"></el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary " plain>预览活页</el-button>
      </div>
    </el-col>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      personData: [],
      searchOpts: [
        //1 全部
        { label: "姓名", value: "2" },
        { label: "身份证", value: "3" },
        { label: "工作单位", value: "4" },
        { label: "级别", value: "5" }
      ],
      multipleSelection: [],
      input: "",
      leafChecked: [],
      leafChecked1: [],
      searchSel: "",
      paging: "",
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
          this.personData = res.data.data[0].list;
          this.paging = res.data.data[0];
          console.log(this.archivesTableData);
        });
    },
    currenSel(selVal) {
      this.searchSel = selVal;
      console.log("sel", selVal);
    },
    handleSizeChange(newSide) {
      console.log("每页条", newSide);
      this.archivesQuery.pagesize = newSide;
      this.getList();
    },
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`);
      this.archivesQuery.pageIndex = newPage;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("val", this.multipleSelection);
    }
  }
};
</script>
<style lang='less' scoped>
.leafTab {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  .checkFlex {
    line-height: 36px;
  }
}
</style>