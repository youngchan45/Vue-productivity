<template>
    <div>
     <div class="filter">
      <span>角色</span>
      <el-select
        v-model="role"
        clearable
        placeholder="全部"
        size="mini"
        
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
      :data="tableData"
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
        <!-- <template slot-scope="scope"> -->
          <el-button type="primary" plain size="mini" >编辑</el-button> 
          <el-button type="danger" plain size="mini" >删除</el-button>          
        <!-- </template> -->
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageIndex"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.paging.totalRow"
      ></el-pagination>
    </div>-->

    <!--新建弹窗-->
    <el-dialog
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
        :rules="roleAddFormRules"
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        size="small"
      >
        <el-form-item label="角色" prop="roleName" clearable>
          <el-input v-model="roleAddForm.roleName"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <tree-table ref="treeGridTable" :data="treeGridData" :columns="columns"
          :selection-type='false' :show-header="false" :border='false'></tree-table> -->
          <el-tree :data="treeGridData" ></el-tree>
        </el-form-item>
        <el-form-item class="addBtn">
          <el-button @click="roleAddVisible = false">取消</el-button>
          <el-button type="primary" @click="saveNewRole(roleAddForm.id)">保存</el-button>
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
        roleName: ""
      },
      roleAddFormRules: {
        roleName: [{ required: true, message: "请输入角色名", trigger: "blur" }]
      },
      roleAddVisible: false,
      //弹窗内权限列表数据
      treeGridData: [],
      // menuList: []，
      props: {},
      columns: [
        {
          label: "name",
          prop: "menuName",
          width: "auto"
        }
      ]
    };
  },

  created() {
    this.getList();
    this.getRoleOpt();
  },
  methods: {
    async getList() {
      await this.$http
        .get("/role/searchRole", { params: this.roleInfo })
        .then(res => {
          console.log("role", res);
          this.roleTableData = res.data.data[0].list;
        });
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
      this.getMenu();
    },
    //获取弹窗中的权限列表
    async getMenu() {
      await this.$http.get("/menu/getMenu").then(res => {
        console.log("tree", res);
        //易错点：表格只需直接赋值
        // this.menuList=res.data.data.forEach(item => {
        //   this.menuList.push(item.menuName);
        this.treeGridData = res.data.data;
      });
    }
  }
};
</script>