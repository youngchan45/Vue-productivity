<template>
  <div>
    <div class="filter">
      <span>日志名称</span>
      <el-select v-model="logQuery.dept" clearable placeholder="全部" size="mini" @clear="getLogList">
        <el-option
          v-for="item in logNameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>用户名称</span>
      <el-input
        placeholder="用户名称"
        prefix-icon="el-icon-search"
        v-model="dictName"
        clearable
        @clear="getLogList"
        size="mini"
      ></el-input>
      <el-button size="mini" type="primary" @click="getLogList">查询</el-button>
    </div>

    <el-table ref="dictTable" :data="logList" style="width: 100%" stripe border max-height="470px">
      <el-table-column type="index" label="#" align="center" width="40"></el-table-column>
      <el-table-column prop="userName" label="日志名称" width="160"></el-table-column>
      <el-table-column prop="userName" label="用户名称" width="160"></el-table-column>
      <el-table-column prop="logDesc" label="日志描述" width="170"></el-table-column>
      <el-table-column prop="oprateDate" type="date" label="更新时间" width="190" sortable>
        <template slot-scope="scope">{{scope.row.oprateDate | timeset}}</template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="logQuery.pageIndex"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totalRow"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logNameOptions: [],
      logList: [],
      logQuery: [
        {
          pageIndex: 1,
          state: "",
          userName: "",
          IP: "",
          pagesize: 10
        }
      ],
      totalRow: 1
    };
  },
  created() {
    this.getLogList();
  },
  methods: {
    async getLogList() {
     await this.$http
        .get("/dict/getAllDict", { params: this.logQuery })
        .then(res => {
          console.log(res);
          this.logList = res.data.data[0].list;
          this.totalRow = res.data.data.totalRow;
        });
    },
    handleSizeChange(newPageSize) {
      this.logQuery.pagesize = newPageSize;
      this.getLogList();
    },
    handleCurrentChange(newPageIndex) {
      this.logQuery.pageIndex = newPageIndex;
      this.getLogList();
    }
  }
};
</script>

<style lang="less" scope>
</style>