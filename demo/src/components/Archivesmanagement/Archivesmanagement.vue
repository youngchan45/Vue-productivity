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
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="工作单位" prop="unit_name" width="120"></el-table-column>
      <el-table-column label="职务" prop="present_post" width="100"></el-table-column>
      <el-table-column label="级别" prop="present_rank" width="120"></el-table-column>
      <el-table-column label="提交时间" width="200" sortable>
        <template slot-scope="scope">{{scope.row.submit_time | timeset}}</template>
      </el-table-column>
      <el-table-column label="查看" align="center" width="260" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="goInfo(scope.row.dateYear,scope.row.idcard)"
          >详情</el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            @click="goComparison(scope.row.dateYear,scope.row.idcard)"
          >历年对比</el-button>
          <el-button type="primary" plain size="mini" @click="goRelations(scope.row)">社会关系</el-button>
        </template>
      </el-table-column>
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
</template>

<script>
// const archivesinfo = () => import("./Archivesinfo.vue");
// import { eventBus} from '../../assets/Vuebus'
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
      },
      paging: {
        pageIndex: 1,
        totalRow: 1,
        pageSize: 10
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
          this.paging = res.data.data[0];
          console.log(this.archivesTableData);
        });
    },
    currenSel(selVal) {
      this.searchSel = selVal;
      console.log("sel", selVal);
    },
    //易错点：涉及到需要提交一次表单的页码参数，需要用接口里面的参数来做传递
    //分页：监听N条/页
    handleSizeChange(newSide) {
      console.log("每页条", newSide);
      this.archivesQuery.pagesize = newSide;
      this.getList();
    },
    //分页：监听页码值
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`);
      this.archivesQuery.pageIndex = newPage;
      this.getList();
    },
    goInfo(dateYear, idcard) {
      this.$router.push(
        //path和query需要放在同一个对象里面
        {
          path: "/archive/infoPerson",
          query: {
            type: 0,
            idcard: idcard,
            dateYear: dateYear
          },
          // component: archivesinfo
        }
      );
      console.log("发送", idcard);
      console.log("发送", dateYear);
    },
    goComparison(dateYear, idcard) {
      this.$router.push({
        path: "/archive/recordcomparison",
        query: {
          type: 0,
          idcard: idcard,
          dateYear: dateYear
        }
      });
    },
    goRelations(row) {
      this.$router.push({
        path: "/archive/socialRelations",
        query: {
          idcard: row.idcard,
          dateYear: row.dateYear
        }
      });
// eventBus.$emit('rowMessage',row)
    },
  }
};
</script>