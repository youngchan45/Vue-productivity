<template>
  <div>
<quick-search @onGetList="getDataList"></quick-search>
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
import quickSearch from '../publicUse/Quicksearch'
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
   components:{quickSearch},
  created() {
    this.getDataList();
  },
  methods: {
    getDataList(data) {
      console.log("chuan",data)
      this.$http
        .get("/query/complexQuery", {
          //这里之所以有或，是因为在页面加载后需要立即调用这个函数，此时用this.archivesQuery；搜索时则用data，不能用data是因为data一开始为空，得点击搜索按钮后才会从子组件里传来数据
          params: data || this.archivesQuery
        })
        .then(res => {
          this.archivesTableData = res.data.data[0].list;
          this.paging = res.data.data[0];
          // console.log(this.archivesTableData);
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
    //点击按钮时把row的信息传过去，跳转到页面时请求接口拿到亲戚数据，接口需要的参数依旧从url带的参数里面拿
    //由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面；
    //query要用path来引入，params要用name来引入
//1.query查询(?)传参，传参的参数会在地址栏中展示，可携带任意类型参数，通过this.$route.query获取；该方式的弊端在于，在页面间跳转可正常使用，如info、isTrue、func，但是在进行页面刷新时，所有参数值会转化为字符串，如对象info会转化为字符串'[Object Object]'，布尔值isTrue会转化为'false'，从而导致使用错误
//2.params传参，也可携带任意类型数据，参数在地址栏不可见，通过this.$route.params获取；页面刷新后参数消失
//3.在路由中定义参数：path:"/archive/recordcomparison/:id/:info",参数会被全部转化为字符串，在地址栏中可见，通过this.$route.params获取；页面刷新后参数不会消失
//4.query更加类似于我们ajax中get传参，params则类似于post
    goRelations(row) {
      this.$router.push({
        path: "/archive/socialRelations",
        query: row
      });
// eventBus.$emit('rowMessage',row)
    },
  }
};
</script>