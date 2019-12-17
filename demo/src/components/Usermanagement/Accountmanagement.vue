<template>
  <div>
    <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>-->
    <el-button @click="newAccount">新建账号</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      stripe
      border
      max-height="460px"
    >
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
        :filters="stateData"
        filter-placement="bottom-start"
        :filter-method="stateFilter"
        :filter-multiple="false"
      >
        <!-- 插入一个模板template 加一个属性slot-scope，其中scope.row代表这一行的数据;
        只要定义了作用域插槽，就会覆盖上面的prop，所以可以删掉prop-->
        <template slot-scope="scope">
          <!-- {{scope.row.isGuoQi}} -->
          <!-- 判断：停用启用，过期 锁定 -->
          <!-- <span :class="[scope.row.stop? 'yStop':'nStop']">正常</span> -->

          <span v-if="scope.row.stop==0">停用</span>
          <span v-if="scope.row.stop==1&&scope.row.isGuoQi=='过期'">过期</span>
          <span v-if="scope.row.stop==1&&scope.row.isGuoQi=='不过期'&&!scope.row.accountNonLocked">锁定</span>
          <span v-if="scope.row.stop==1&&scope.row.isGuoQi=='不过期'&&scope.row.accountNonLocked">正常</span>
        </template>
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
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini">编辑</el-button>
          <el-button type="danger" plain size="mini">删除</el-button>
          <el-button
            type="success"
            plain
            size="mini"
            v-if="scope.row.stop==0"
            @click="whetherUsing(scope.row.id,scope.row.stop)"
          >启用</el-button>
          <el-button
            type="warning"
            plain
            size="mini"
            v-if="scope.row.stop==1&&scope.row.isGuoQi=='不过期'&&scope.row.accountNonLocked"
            @click="whetherUsing(scope.row.id,scope.row.stop)"
          >停用</el-button>
          <el-button
            type="warning"
            plain
            size="mini"
            v-if="scope.row.stop==1&&scope.row.isGuoQi=='过期'"
            @click="whetherUsing(scope.row.id,scope.row.stop)"
          >停用</el-button>
          <el-button
            type="warning"
            plain
            size="mini"
            v-if="scope.row.stop==1&&scope.row.isGuoQi=='不过期'&&!scope.row.accountNonLocked"
            @click="whetherUsing(scope.row.id,scope.row.stop)"
          >停用</el-button>

          <el-button
            type="info"
            plain
            size="mini"
            v-if="scope.row.stop==1&&scope.row.isGuoQi=='不过期'&&!scope.row.accountNonLocked"
            @click="deblocking(scope.row.id)"
          >解锁</el-button>
          <el-button type="info" plain size="mini" v-else disabled>解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageIndex"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.paging.totalRow"
      ></el-pagination>
    </div>
    <!--新建弹窗-->
    <el-dialog
      title="新建账号"
      :visible.sync="userAddVisible"
      width="470px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
    >
      <!--弹窗内容-->
      <el-form
        ref="userEditFormRef"
        statue-icon
        :model="userAddForm"
        :rules="userAddFormRules"
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item label="姓名" prop="chinesename" label-width="100px">
          <el-input v-model="userAddForm.chinesename" clearable></el-input>
        </el-form-item>

        <el-form-item label="部门" prop="dept" label-width="100px">
          <el-select v-model="value" clearable placeholder="请选择">
            <option value=" " v-show='false'></option>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </el-form-item>

        <el-form-item label="角色" prop="role" label-width="100px">
          <el-input v-model="userAddForm.role"></el-input>
        </el-form-item>
        <el-form-item label="有效期至" prop="date" label-width="100px">
          <div class="block">
            <el-date-picker v-model="editData" type="date" placeholder="请选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="账号" prop="username" label-width="100px">
          <el-input v-model="userAddForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="100px">
          <el-input v-model="userAddForm.password" clearable></el-input>
          <span class="passRandom" @click="passRandom">随机生成</span>
        </el-form-item>
        <!-- <span slot="footer" class="dialog-footer"> -->
        <el-form-item>
          <el-button @click="userAddVisible = false">取消</el-button>
          <el-button type="primary" @click="saveNewAccount">保存</el-button>
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
      queryInfo: {
        dept: "",
        role: "",
        state: "",
        //当前页
        pageIndex: 1,
        chinesename: "",
        pagesize: ""
      },
      tableData: [],
      deptNameData: [{ text: "", value: "" }],
      roleNameData: [{ text: "", value: "" }],
      stateData: [
        { text: "正常", value: "正常" },
        { text: "过期", value: "过期" },
        { text: "停用", value: "停用" },
        { text: "锁定", value: "锁定" }
      ],
      currentPage4: 1,
      //账号数据绑定
      userAddForm: {
        chinesename: "",
        dept: "",
        role: "",
        date: "",
        username: "",
        password: ""
      },
      //账号规则
      userAddFormRules: {},
      userAddVisible: false,
      editData: "",
      paging: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      options:[
        {value:'',label:''}
      ],
       value: '',
    };
  },
  created() {
    this.getTableList();
    this.getFliterDept();
    this.getFliterRole();
  },
  methods: {
    // indexMethod(index) {
    //   return index * 1 + 1;
    // },
    //获取表格数据
    async getTableList() {
      await this.$http
        .get("/usermanage/getUser", { params: this.queryInfo })
        .then(res => {
          console.log("表格数据", res);
          this.tableData = res.data.data[0].list;
          this.paging = res.data.data[0];
        });
    },
    //获取部门筛选框的数据
    async getFliterDept() {
      await this.$http.get("/dept/getAllDept").then(res => {
        res.data.data.forEach(item => {
          // console.log(item.deptName)
          // this.deptNameData[0].text=item.deptName;
          // this.deptNameData[0].value=item.deptName;
          this.deptNameData.push({ text: item.deptName, value: item.deptName });
          this.options.push({ value: item.deptName, label: item.deptName })
        });
      });
      // this.options.unshift({value:'全部',label:'全部'})
      
    },
    //获取角色筛选框的数据
    async getFliterRole() {
      await this.$http.get("/role/getAllRole").then(res => {
        // console.log('角色',res);
        res.data.data.forEach(item => {
          this.roleNameData.push({ text: item.roleName, value: item.roleName });
        });
      });
    },
    //分页：监听N条/页
    handleSizeChange(newSide) {
      console.log("每页条", newSide);
      this.queryInfo.pagesize = newSide;
      this.getTableList();
    },
    //分页：监听页码值
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`);
      this.queryInfo.pageIndex = newPage;
      this.getTableList();
    },
    //筛选部门，后端返回新分页，未完成
    deptNameFilter(value, row, column) {
      const property = column["property"];
      // console.log('111',row[property])
      // this.queryInfo.dept = value;
      // this.getTableList();
      return row[property] === value;
    },
    //筛选角色，后端返回新分页，未完成
    roleNameFilter(value, row, column) {
      const property = column["property"];
      // this.queryInfo.role = value;
      // this.getTableList();
      // console.log('222',row[property])
      return row[property] === value;
    },
    //筛选状态，后端返回新分页，未完成
    stateFilter(value, row, column) {
      const property = column["property"];
      // this.queryInfo.state = value;
      // this.getTableList();
      console.log("111", row[property]);
      return row[property] === value;
    },
    //点击打开新建弹窗
    newAccount() {
      this.userAddVisible = true;
    },
    //随机密码
    passRandom() {
      this.$http.get("/usermanage/getUserPassword").then(res => {
        this.userEditForm.password = res.data.data;
        console.log(res.data);
        this.$message.success(res.data.message);
      });
    },
    deblocking(rowId) {
      //拼接在url上
      this.$http.get("/usermanage/unlock/" + rowId).then(res => {
        if (!status == 200) {
          this.$message.error("解锁失败");
        }
        this.$message.success("解锁成功");
        console.log("解锁", res.data);
      });
    },
    //账号是否停用启用
    whetherUsing(id, stop) {
      if (stop == 1) {
        this.$http
          .get("/usermanage/changeStopStatus/" + id + "/0")
          .then(res => {
            console.log("停用", res);
            this.getTableList();
          });
      } else {
        this.$http
          .get("/usermanage/changeStopStatus/" + id + "/1")
          .then(res => {
            console.log("启用", res);
            this.getTableList();
          });
      }
    },
    //保存新账号
    saveNewAccount(roleId) {
      this.$http
        .post("/usermanage/updateUser/" + roleId, this.userAddForm)
        .then(res => {
          console.log("保存新账号", res);
        });
    }
    // async status() {
    //   await this.$http
    //     .get("/usermanage/getUser", { params: this.queryInfo })
    //     .then(res => {
    //       console.log("状态", res);
    //       this.tingyong = res.data.data[0].list.stop;
    //       this.guoqi = res.data.data[0].list.isGuoQi;
    //       this.suoding = res.data.data[0].list.accountNonLocked;
    //     });
    // }
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
  color: #409eff;
  cursor: pointer;
  display: inline-block;
}
</style>