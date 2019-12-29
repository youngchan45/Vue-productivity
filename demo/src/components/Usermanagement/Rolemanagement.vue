<template>
  <div>
    <div class="filter">
      <span>角色</span>
      <el-select
        v-model="roleInfo.roleName"
        clearable
        placeholder="全部"
        size="mini"
        @clear="getList"
      >
        <el-option
          v-for="item in roleOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>权限</span>
      <el-input
        placeholder="请输入权限"
        prefix-icon="el-icon-search"
        v-model="roleInfo.menuName"
        clearable
        size="mini"
        @clear="getList"
      ></el-input>
      <el-button size="mini" type="primary" @click="getList">搜索</el-button>
      <el-button size="mini" type="primary" @click="openAddRole">新建角色</el-button>
    </div>
    <el-table
      ref="filterTable"
      :data="roleTableData"
      style="width: 100%"
      stripe
      border
      max-height="470px"
      show-overflow-tooltip
    >
      <!--易错点：prop	对应列内容的字段名，也可以使用 property 属性 需与接口的字段对应 否则无法渲染-->
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色" width="120"></el-table-column>
      <el-table-column prop="num" label="人数" width="70"></el-table-column>
      <el-table-column prop="source" label="权限"></el-table-column>
      <el-table-column prop="updateTime" type="date" label="修改时间" width="170" sortable>
        <template slot-scope="scope">{{scope.row.updateTime | timeset}}</template>
      </el-table-column>
      <!-- 插入一个模板template 加一个属性slot-scope，其中scope.row代表这一行的数据;
      只要定义了作用域插槽，就会覆盖上面的prop，所以可以删掉prop-->

      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="editRole(scope.row.roleId)">编辑</el-button>
          <el-button type="danger" plain size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="roleInfo.pageIndex"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totalRow"
      ></el-pagination>
    </div>

    <!--新建弹窗-->
    <el-dialog
      class="dialog"
      title="新建角色"
      :visible.sync="roleAddVisible"
      width="470px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
    >
      <!--新增角色弹窗内容-->
      <el-form
        ref="roleAddFormRef"
        statue-icon
        :model="roleAddForm"
        :rules="roleFormRules"
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        size="small"
      >
        <el-form-item label="角色" prop="roleName" clearable>
          <el-input v-model="roleAddForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="source">
          <el-card class="card">
            <el-tree
              :data="sourceData"
              node-key="id"
              @check-change="handleCheckChange"
              highlight-current
              ref="sourceTree"
              :expand-on-click-node="false"
              show-checkbox
              accordion
            ></el-tree>
          </el-card>
          <el-button @click="checkAll">全选</el-button>
          <el-button @click="resetTree">重置</el-button>
        </el-form-item>
        <el-form-item class="addBtn">
          <el-button @click="roleAddVisible = false">取消</el-button>
          <el-button type="primary" @click="saveAddRole">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑弹窗-->
    <el-dialog
      class="dialog"
      title="编辑角色"
      :visible.sync="roleEditVisible"
      width="470px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
    >
      <!--编辑角色弹窗内容-->
      <el-form
        ref="roleEditFormRef"
        statue-icon
        :model="roleEditForm"
        :rules="roleFormRules"
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        size="small"
      >
        <el-form-item label="角色" prop="roleName" clearable>
          <el-input v-model="roleEditForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="source">
          <el-card class="card">
            <el-tree
              :data="sourceData"
              node-key="id"
              @check-change="handleCheckChange"
              highlight-current
              ref="sourceTree"
              :expand-on-click-node="false"
              show-checkbox
              accordion
            ></el-tree>
          </el-card>
          <el-button @click="checkAll">全选</el-button>
          <el-button @click="resetTree">重置</el-button>
        </el-form-item>
        <el-form-item class="addBtn">
          <el-button @click="roleEditVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEditRole">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleInfo: {
        pageIndex: 1,
        pagesize: 10,
        roleName: "",
        menuName: ""
      },
      roleTableData: [],
      //易错点：下拉框的数据绑定是一个数组！
      roleOpt: [],
      role: "",
      roleAddForm: {
        roleName: "",
        roleId: ""
      },
      roleEditForm: {
        roleName: "",
        roleId: ""
      },
      roleFormRules: {
        roleName: [{ required: true, message: "请输入角色名", trigger: "blur" }]
      },
      roleAddVisible: false,
      roleEditVisible: false,
      //弹窗内权限列表数据
      sourceData: [],
      totalRow: 1,
      checkedBox: []
    };
  },

  created() {
    this.getList();
    this.getRoleOpt();
    this.getMenu();
  },
  methods: {
    async getList() {
      await this.$http
        .get("/role/searchRole", { params: this.roleInfo })
        .then(res => {
          console.log("role", res);
          this.roleTableData = res.data.data[0].list;
          this.totalRow = res.data.data[0].totalRow;
        });
    },
    //分页N条一页
    handleSizeChange(newSide) {
      this.roleInfo.pagesize = newSide;
      this.getList();
    },
    //分页当前页
    handleCurrentChange(newPage) {
      this.roleInfo.pageIndex = newPage;
      this.getList();
    },
    //获取筛选框中的角色下拉框
    async getRoleOpt() {
      await this.$http.get("/role/getAllRole").then(res => {
        console.log("下拉框", res);
        res.data.data.forEach(item => {
          this.roleOpt.push({ label: item.roleName, value: item.roleName });
        });
      });
    },
    //点击打开弹窗
    openAddRole() {
      this.roleAddVisible = true;
    },
    //获取弹窗中的权限列表
    async getMenu() {
      await this.$http.get("/menu/getMenu").then(res => {
        console.log("tree", res);
        for (let i = 0; i < res.data.data.length; i++) {
          let obj = {
            label: res.data.data[i].menuName,
            id: res.data.data[i].menuId,
            children: []
          };
          this.sourceData.push(obj);
        }

        for (let i = 0; i < res.data.data.length; i++) {
          for (let j = 0; j < res.data.data[i].childrens.length; j++) {
            let childObj = {
              label: res.data.data[i].childrens[j].menuName,
              id: res.data.data[i].childrens[j].menuId,
              children: []
            };
            this.sourceData[i].children.push(childObj);
            console.log("look", res.data.data[6].childrens[2].menuName);
          }
        }
      });
    },
    handleCheckChange(treeSelVal,checked, indeterminate) {
      console.log("treeSel", treeSelVal,checked, indeterminate);
      this.checkedBox.push(treeSelVal.id)
      // this.checkedBox=treeSelVal.id;
      console.log(this.checkedBox);
    },
    //弹窗全选权限树
    checkAll() {
      console.log(this.$refs.sourceTree.setCheckedNodes(this.sourceData));
    },
    //弹窗重置权限树
    resetTree() {
      console.log(this.$refs.sourceTree.setCheckedKeys([]));
    },
    //保存新建角色
    saveAddRole() {
      this.$http
        .post("/role/creatRole", {
          roleId: "",
          roleName: this.roleAddForm.roleName,
          createTime: new Date(),
          updateTime: new Date(),
          ids: this.checkedBox
        })
        .then(res => {
          if (res.status != 200) {
            return this.$message.success("新建角色失败");
          }
          this.$message.success("新增角色成功");
          this.roleAddVisible = false;
          this.getList();
        });
    },
    //编辑角色
    async editRole(roleId) {
      this.roleEditVisible = true;
      await this.$http
        .get("/role/getRole", {
          params: { roleId: roleId }
        })
        .then(res => {
          console.log("bianji", res);
          this.roleEditForm.roleName = res.data.data[0].roleName;
          this.roleEditForm.roleId = res.data.data[0].roleId;
          this.checkedBox = res.data.data[0].ids;
        });
    },
    //保存编辑角色
    saveEditRole() {
      this.$http
        .post("/role/creatRole", {
          roleId: this.roleEditForm.roleId,
          roleName: this.roleEditForm.roleName,
          // createTime: new Date(),
          // updateTime: new Date(),
          ids: this.checkedBox
        })
        .then(res => {
          if (res.status != 200) {
            return this.$message.success("编辑角色失败");
          }
          this.$message.success("编辑角色成功");
          this.roleEditVisible = false;
          this.getList();
        });
    }
  }
};
</script>

<style lang='less' scope>
// .dialog{
//   // height: 70%;
//   // width:150px;
// }
.sourceDiv {
  display: flex;
}
.card {
  width: 300px;
  height: 300px;
  overflow: auto;
}
</style>