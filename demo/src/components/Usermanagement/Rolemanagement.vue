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
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      stripe
      border
      max-height="470px"
    >
      <el-table-column type="index" label="#" align="center" width="40"></el-table-column>
      <el-table-column prop="username" label="角色" width="160"></el-table-column>
      <el-table-column prop="chinesename" label="人数" width="70"></el-table-column>
      <el-table-column prop="deptName" label="权限" width="260"></el-table-column> 
      <el-table-column prop="logintime" type="date" label="修改时间" width="190" sortable></el-table-column>
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
    </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData:[],
            roleOptions:'',
            role:'',
            power:'',
        }
    },
}
</script>