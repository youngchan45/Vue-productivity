<template>
  <div>
    <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>-->
    <el-table ref="filterTable" :data="tableData" style="width: 100%" stripe border height max-height="450px">
      <el-table-column type="index" label="#" align="center" width="40"></el-table-column>
      <el-table-column prop="username" label="账号" width="120"></el-table-column>
      <el-table-column prop="chinesename" label="真实姓名" width="120"></el-table-column>
      <el-table-column
        prop="deptName"
        label="部门"
        width="120"
        :filters="deptNameData"
        column-key="deptName"
        :filter-multiple="false"
        :filter-method="deptNameFilter"
        filter-placement="bottom-start"
      ></el-table-column>

      <el-table-column
        prop="roleName"
        label="角色"
        width="120"
        :filters="roleNameData"
        column-key="roleName"
        :filter-multiple="false"
        :filter-method="roleNameFilter"
        filter-placement="bottom-start"
      ></el-table-column>
      <el-table-column
        prop="logintime"
        tyepe="date"
        label="最后登录时间"
        width="160"
        column-key="date"
        sortable
      ></el-table-column>
      <el-table-column
        label="状态"
        width="70"
        :filters="isGuoQiData"
        filter-placement="bottom-center"
        :filter-multiple="false"
      >
        <!-- 插入一个模板template 加一个属性slot-scope，其中scope.row代表这一行的数据;
        只要定义了作用域插槽，就会覆盖上面的prop，所以可以删掉prop-->
        <template slot-scope="scope">{{scope.row.isGuoQi}}</template>
        <!-- <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>-->
        <!-- <template slot-scope='scope'>
          
        </template>-->
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template>
          <el-button type="primary" plain size="mini" @click="edit">编辑</el-button>
          <el-button type="danger" plain size="mini">删除</el-button>
          <el-button type="success" plain size="mini">启用</el-button>
          <el-button type="info" plain size="mini">解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageIndex"
        :page-sizes="[10, 20, 30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.paging.totalRow"
      ></el-pagination>
    </div>
    <!--编辑弹窗-->
    <el-dialog
      title="用户编辑"
      :visible.sync="userEditVisible"
      width="45%"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
    >
      <!--弹窗内容-->
      <el-form
        ref="userEditFormRef"
        statue-icon
        :model="userEditForm"
        :rules="userEditFormRules"
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item label="姓名" prop="chinesename">
          <el-input v-model="userEditForm.chinesename" clearable></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-input v-model="userEditForm.dept"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="userEditForm.role"></el-input>
        </el-form-item>
        <el-form-item label="有效期至" prop="date">
          <div class="block">
            <el-date-picker v-model="editData" type="date" placeholder="请选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="userEditForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userEditForm.password" clearable></el-input>
          <span class="passRandom" @click="passRandom">随机生成</span>
        </el-form-item>
        <!-- <span slot="footer" class="dialog-footer"> -->
        <el-form-item>
          <el-button @click="userEditVisible = false">取消</el-button>
          <el-button type="primary" @click="userEditVisible = false">保存</el-button>
        </el-form-item>
      </el-form>
      <!-- </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo:{
            dept: "",
            role: "",
            state: "",
            //当前页
            pageIndex: 1,
            chinesename: "",
            pagesize:'',
          },
      tableData: [],
      deptNameData: [{ text: "", value: "" }],
      roleNameData: [{ text: "", value: "" }],
      isGuoQiData: [
        { text: "正常", value: "正常" },
        { text: "过期", value: "过期" },
        { text: "停用", value: "停用" },
        { text: "锁定", value: "锁定" }
      ],
      currentPage4: 1,
      userEditForm: {
        chinesename: "",
        dept: "",
        role: "",
        date: "",
        username: "",
        password: ""
      },
      userEditFormRules: {},
      userEditVisible: false,
      editData: "",
      paging: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      //判断：停用启用，过期 锁定
      
      
    };
  },
  created() {
    this.getTableList();
    this.getFliterDept();
    this.getFliterRole();
    this.status();
  },
  methods: {
    // indexMethod(index) {
    //   return index * 1 + 1;
    // },
    async getTableList() {
      await this.$http
        .get("/usermanage/getUser", {params: this.queryInfo
        })
        .then(res => {
          console.log("表格数据", res);
          this.tableData = res.data.data[0].list;
          this.paging = res.data.data[0];
        });
    },
    async getFliterDept() {
      await this.$http.get("/dept/getAllDept").then(res => {
        // console.log('部门',res);
        res.data.data.forEach(item => {
          // console.log(item.deptName)
          // this.deptNameData[0].text=item.deptName;
          // this.deptNameData[0].value=item.deptName;
          this.deptNameData.push({ text: item.deptName, value: item.deptName });
        });
      });
    },
    async getFliterRole() {
      await this.$http.get("/role/getAllRole").then(res => {
        // console.log('角色',res);
        res.data.data.forEach(item => {
          this.roleNameData.push({ text: item.roleName, value: item.roleName });
        });
      });
    },
    //监听N条/页
    handleSizeChange(newSide) {
      console.log('每页条',newSide);
      this.queryInfo.pagesize=newSide;
      this.getTableList();
      this.newSide=newSide;
    },
    //监听页码值
    handleCurrentChange(newPageIndex) {
      console.log(`当前页: ${newPageIndex}`);
      this.queryInfo.pageIndex=newPageIndex;
      this.getTableList();
    },
    deptNameFilter(value) {
      // const property = column["property"];
      // console.log('111',row[property])
      this.queryInfo.dept=value;
      this.getTableList();
      // return row[property] === value;
    },
    roleNameFilter(value, row, column) {
      const property = column["property"];

      // console.log('111',row[property])
      return row[property] === value;
    },

    edit() {
      this.userEditVisible = true;
    },
    passRandom() {},
    status() {},
  }
};
</script>

<style lang='less' scoped>
.el-table {
  font-size: 0.78rem;
}
.el-dialog__body {
  padding: 0;
}
.passRandom:hover {
  color: #509ae0;
  cursor: pointer;
}
</style>