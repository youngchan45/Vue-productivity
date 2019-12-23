<template>
  <div>
    <div class="filter">
      <span>角色</span>
      <el-select v-model="role" clearable placeholder="全部" size="mini">
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>权限</span>
      <el-input
        placeholder="请输入权限"
        prefix-icon="el-icon-search"
        v-model="power"
        clearable
        size="mini"
      ></el-input>
      <el-button size="mini" type="primary">搜索</el-button>
      <el-button size="mini" type="primary">新建角色</el-button>
    </div>
    <el-table
      ref="roleTable"
      :data="roleTableData"
      style="width: 100%"
      stripe
      border
      max-height="470px"
      show-overflow-tooltip
      :formatter="dateFormat"
    >
    <!--易错点：prop	对应列内容的字段名，也可以使用 property 属性 需与接口的字段对应 否则无法渲染-->
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色" ></el-table-column>
      <el-table-column prop="num" label="人数" ></el-table-column>
      <el-table-column prop="source" label="权限" ></el-table-column>
      <el-table-column prop="updateTime" type="date" label="修改时间"  sortable></el-table-column>
      <!-- 插入一个模板template 加一个属性slot-scope，其中scope.row代表这一行的数据;
      只要定义了作用域插槽，就会覆盖上面的prop，所以可以删掉prop-->

      <el-table-column label="操作" width="160">
        <!-- <template slot-scope="scope"> -->
        <el-button type="primary" plain size="mini">编辑</el-button>
        <el-button type="danger" plain size="mini">删除</el-button>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleInfo: {
        pageIndex:1,
        pagesize:10,
        roleName: "",
        menuName: "",
      },
      roleTableData: [],
      roleOptions: "",
      role: "",
      power: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      await this.$http
        .get("/role/searchRole",{params:this.roleInfo})
        .then(res => {
          console.log('role',res);
          this.roleTableData = res.data.data[0].list;
        });
    },
    //时间格式化 
      dateFormatter (row) {
        let datetime = row.time;
        if(datetime){
          datetime = new Date(datetime);
          let y = datetime.getFullYear() + '-';
          let mon = datetime.getMonth()+1 + '-';
          let d = datetime.getDate();
          return y + mon + d;
        }
        return ''
      }, 
  }
};
</script>