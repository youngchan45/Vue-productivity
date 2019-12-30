<template>
  <div>
    <div class="filter">
      <span>部门</span>
      <el-select
        v-model="queryInfo.dept"
        clearable
        placeholder="全部"
        size="mini"
        @clear="getTableList"
      >
        <el-option
          v-for="item in deptOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>角色</span>
      <el-select
        v-model="queryInfo.role"
        clearable
        placeholder="全部"
        size="mini"
        @clear="getTableList"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>状态</span>
      <el-select
        v-model="queryInfo.state"
        clearable
        placeholder="全部"
        size="mini"
        @clear="getTableList"
      >
        <el-option
          v-for="item in stateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>姓名</span>
      <el-input
        placeholder="请输入姓名"
        prefix-icon="el-icon-search"
        v-model="queryInfo.chinesename"
        clearable
        @clear="getTableList"
        size="mini"
      ></el-input>
      <el-button @click="getTableList" size="mini" type="primary">搜索</el-button>
      <el-button @click="newAccount" size="mini" type="primary">新建账号</el-button>
    </div>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      stripe
      border
      max-height="500px"
      show-overflow-tooltip
    >
      <el-table-column type="index" label="#" align="center" width="50"></el-table-column>
      <el-table-column prop="username" label="账号" width="130"></el-table-column>
      <el-table-column prop="chinesename" label="真实姓名" width="120"></el-table-column>
      <el-table-column prop="deptName" label="部门" width="130"></el-table-column>
      <el-table-column prop="roleName" label="角色" width="130"></el-table-column>
      <el-table-column prop="logintime" type="date" label="最后登录时间" sortable>
        <template slot-scope="scope">{{scope.row.logintime | timeset}}</template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <!-- 插入一个模板template 加一个属性slot-scope，其中scope.row代表这一行的数据;
        只要定义了作用域插槽，就会覆盖上面的prop，所以可以删掉prop-->
        <template slot-scope="scope">
          <!-- 判断：停用启用，过期 锁定 -->
          <el-tag v-if="scope.row.stop==0" :type="'warning'" disable-transitions>停用</el-tag>
          <el-tag
            v-if="scope.row.stop==1&&scope.row.isGuoQi=='过期'"
            :type="'primary'"
            disable-transitions
          >过期</el-tag>
          <el-tag
            v-if="scope.row.stop==1&&scope.row.isGuoQi=='不过期'&&!scope.row.accountNonLocked"
            :type="'danger'"
            disable-transitions
          >锁定</el-tag>
          <el-tag
            v-if="scope.row.stop==1&&scope.row.isGuoQi=='不过期'&&scope.row.accountNonLocked"
            :type="'success'"
            disable-transitions
          >正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="360">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="editAccount(scope.row.id)">编辑</el-button>
          <el-button type="danger" plain size="mini" @click="delSure(scope.row.id)">删除</el-button>
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
      <!--新增弹窗内容-->
      <el-form
        ref="userAddFormRef"
        statue-icon
        :model="userAddForm"
        :rules="userAddFormRules"
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        size="small"
      >
        <el-form-item label="姓名" prop="chinesename" clearable>
          <el-input v-model="userAddForm.chinesename"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-select v-model="userAddForm.deptid" clearable placeholder="请选择">
            <el-option
              v-for="item in deptOptions1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userAddForm.id" clearable placeholder="请选择">
            <el-option
              v-for="item in roleOptions1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效期至" prop="date">
          <div class="block">
            <el-date-picker
              v-model="userAddForm.effectiveTime"
              type="date"
              placeholder="请选择日期"
              value-format="yyyy-MM-dd 23:59:59"
              @change="getSTime"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="userAddForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userAddForm.password" clearable></el-input>
          <span class="passRandom" @click="passRandom">随机生成</span>
        </el-form-item>
        <!-- <span slot="footer" class="dialog-footer"> -->
        <el-form-item class="addBtn">
          <el-button @click="userAddVisible = false">取消</el-button>
          <el-button type="primary" @click="saveNewAccount(userAddForm.id)">保存</el-button>
        </el-form-item>
      </el-form>
      <!-- </span> -->
    </el-dialog>

    <!--编辑弹窗-->
    <el-dialog
      title="编辑账号"
      :visible.sync="userEditVisible"
      width="470px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
    >
      <!--编辑弹窗内容-->
      <el-form
        ref="userEditFormRef"
        statue-icon
        :model="userEditForm"
        :rules="userAddFormRules"
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        size="small"
      >
        <el-form-item label="姓名" prop="chinesename" clearable>
          <el-input v-model="userEditForm.chinesename"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-select v-model="userEditForm.deptid" clearable placeholder="请选择">
            <el-option
              v-for="item in deptOptions1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userEditForm.id" clearable placeholder="请选择" @change="currenSel">
            <el-option
              v-for="item in roleOptions"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效期至" prop="date">
          <div class="block">
            <el-date-picker
              v-model="userEditForm.effectiveTime"
              type="date"
              placeholder="请选择日期"
              value-format="yyyy-MM-dd 23:59:59"
              @change="getSTime"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="userEditForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userEditForm.password" clearable disabled></el-input>
          <!-- <span class="passRandom" @click="passRandom">随机生成</span> -->
        </el-form-item>
        <!-- <span slot="footer" class="dialog-footer"> -->
        <el-form-item class="addBtn">
          <el-button @click="userEditVisible = false">取消</el-button>
          <!--此时的保存按钮传递的参数id应该为表单中的id 而不是总表格里面的scope-->
          <el-button type="primary" @click="saveEditAccount(userEditForm.id)">保存</el-button>
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
      //表格数据绑定
      tableData: [],
      currentPage4: 1,
      //新增账号弹窗数据绑定
      userAddForm: {
        chinesename: "",
        deptid: "",
        id: "",
        effectiveTime: "",
        username: "",
        password: ""
      },
      //编辑账号弹窗数据绑定
      userEditForm: {
        chinesename: "",
        deptid: "",
        id: "",
        effectiveTime: "",
        username: "",
        password: ""
      },
      //账号规则
      userAddFormRules: {
        chinesename: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "2-10个字符", trigger: "blur" }
        ],
        // dept: [{ required: true, message: "请选择部门", trigger: "change" }],
        // role: [{ required: true, message: "请选择角色", trigger: "change" }],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, message: "8个字符", trigger: "blur" }
        ]
      },
      //新增账号弹窗默认隐藏
      userAddVisible: false,
      //编辑账号弹窗默认隐藏
      userEditVisible: false,
      //获取接口返回的关于分页的数据
      paging: "",
      //日历控件
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },

      //部门筛选下拉框
      deptOptions: [
        // {value:'',label:''}
      ],
      deptOptions1: [],
      //角色筛选下拉框
      roleOptions: [],
      roleOptions1: [],
      //状态筛选下拉框
      stateOptions: [
        { label: "正常", value: "0" },
        { label: "锁定", value: "1" },
        { label: "过期", value: "2" },
        { label: "停用", value: "3" }
      ]
    };
  },
  created() {
    this.getTableList();
    this.getFliterDept();
    this.getFliterRole();
  },
  methods: {
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
          this.deptOptions.push({ label: item.deptName, value: item.deptName });
          this.deptOptions1.push({ label: item.deptName, value: item.deptId });
        });
      });
    },
    //获取角色筛选框的数据
    async getFliterRole() {
      await this.$http.get("/role/getAllRole").then(res => {
        res.data.data.forEach(item => {
          this.roleOptions.push({ label: item.roleName, value: item.roleName });
          this.roleOptions1.push({ label: item.roleName, value: item.roleId });
          console.log("获取角色", item.roleId);
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
    //点击打开新建弹窗
    newAccount() {
      this.userAddVisible = true;
    },
    //账号弹窗的随机密码
    passRandom() {
      this.$http.get("/usermanage/getUserPassword").then(res => {
        this.userAddForm.password = res.data.data;
        this.userEditForm.password = res.data.data;
        console.log(res.data);
        this.$message.success(res.data.message);
      });
    },
    //给账号解锁
    deblocking(rowId) {
      //拼接在url上
      this.$http.get("/usermanage/unlock/" + rowId).then(res => {
        if (!status == 200) {
          return this.$message.error("解锁失败");
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
    getSTime(timeVal) {
      console.log("time", timeVal);
      this.userAddForm.effectiveTime = timeVal;
      this.userEditForm.effectiveTime = timeVal;
    },
    //新增账号的保存新账号
    saveNewAccount(id) {
      this.$refs.userAddFormRef.validate(valid => {
        if (!valid) return;
        this.$http
          .post("/usermanage/newUser/" + id, this.userAddForm)
          .then(res => {
            // console.log('tag111',this.userAddForm.effectiveTime)
            if (!res.data.status === 200) {
              return this.$message.error("新增账号失败");
            }
            this.$message.success("新增账号成功");
            this.userAddVisible = false;
            this.getTableList();
            // console.log("保存新用户", res);
          });
      });
    },
    //点击打开编辑弹窗
    async editAccount(id) {
      this.userEditVisible = true;
      await this.$http
        .get("/usermanage/getUserInfoByUserId/" + id)
        .then(res => {
          this.userEditForm = res.data.data;
          console.log("编辑", this.userEditForm);
        });
    },
    //编辑弹窗的保存
    saveEditAccount(id) {
      this.$refs.userEditFormRef.validate(valid => {
        if (!valid) return;
        this.$http
          .post("/usermanage/updateUser/" + id, this.userEditForm)
          .then(res => {
            if (!res.data.status === 200) {
              return this.$message.error("编辑账号失败");
            }
            this.$message.success("编辑账号成功");
            this.userEditVisible = false;
            this.getTableList();
            console.log("编辑保存", res);
          });
      });
    },
    currenSel(selVal) {
      console.log("角色", selVal); //返回roleId
      this.queryInfo.role = selVal;
    },
    //删除账号
    async delSure(id) {
      await this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete("/usermanage/deleteUser/" + id).then(res => {
            // console.log('删除',res)
            if (!res.data.status === 200) {
              return this.$message.error("删除失败");
            }
            this.$message.success("删除成功");
            this.getTableList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang='less' scoped>
.filter {
  .el-input {
    width: 160px;
    margin: 0 5px 0 0;
  }
  .el-input__inner {
    width: 100px;
    margin: 0 5px 0 0;
  }
  span {
    margin: 0 5px 0 0;
  }
}
.el-table {
  font-size: 0.78rem;
}
.el-dialog__body {
  padding: 0;
  .passRandom:hover {
    color: #409eff;
    cursor: pointer;
    display: inline-block;
  }
  .addBtn {
    display: flex;
    justify-content: center;
  }
}
</style>