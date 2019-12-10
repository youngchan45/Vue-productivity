<template>
  <div>
    <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>-->
    <el-table ref="filterTable" :data="tableData"  style="width: 100%" stripe border
     >
      <el-table-column type="index" label="#" align='center' width="40"></el-table-column>
      <el-table-column prop="username" label="账号" width="120"></el-table-column>
      <el-table-column prop="chinesename" label="真实姓名" width="120"></el-table-column>
      <el-table-column prop="deptName" label="部门" width="120" :filters="deptNameData"
      column-key='deptName'
      :filter-multiple="false"
        :filter-method="deptNameFilter"
        filter-placement="bottom-start"
      ></el-table-column>
      <!-- 插入一个模板template 加一个属性slot-scope，其中scoped.row代表这一行的数据 -->
      <el-table-column prop="roleName" label="角色" width="120" :filters="roleNameData" :filter-multiple="false"></el-table-column>
      <el-table-column
        prop="logintime"
        tyepe="date"
        label="最后登录时间"
        width="160"
        column-key="date"
        sortable
      ></el-table-column>
      <el-table-column
        prop="isGuoQi"
        label="状态"
        width="70"
        :filters="isGuoQiData"
        filter-placement="bottom-end"
        :filter-multiple="false"
      >
      <!-- 判断：停用启用，过期 锁定 -->
        <!-- <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template> -->
        <!-- <template slot-scope='scope'>
          
        </template> -->
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template>
          <el-button type="primary" plain size="mini">编辑</el-button>
          <el-button type="danger" plain size="mini">删除</el-button>
          <el-button type="success" plain size="mini">启用</el-button>
          <el-button type="info" plain size="mini">解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      deptNameData:[
        { text: '', value: '' }],
        roleNameData:[
{ text: '', value: '' }],
        isGuoQiData:[
{ text: '正常', value: '正常' }, 
{ text: '过期', value: '过期' }, 
{ text: '停用', value: '停用' },
{ text: '锁定', value: '锁定' }
        ],
      currentPage4: 4
    }
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
    async getTableList() {
      await this.$http
        .get("/usermanage/getUser", {
          params: {
            dept: "",
            role: "",
            state: "",
            pageIndex: 1,
            chinesename: "",
          }
        })
        .then(res => {
          console.log("表格数据", res);
          this.tableData = res.data.data[0].list;
        });
    },
    async getFliterDept(){
      await this.$http.get('/dept/getAllDept').then(res=>{
        console.log('部门',res);
        res.data.data.forEach(item=>{
          console.log(item.deptName)
          // this.deptNameData[0].text=item.deptName;
          // this.deptNameData[0].value=item.deptName;
          this.deptNameData.push({text:item.deptName,value:item.deptName})
        })
      })
    },
    async getFliterRole(){
      await this.$http.get('/role/getAllRole').then(res=>{
        console.log('角色',res);
        res.data.data.forEach(item=>{
           this.roleNameData.push({text:item.roleName,value:item.roleName})
        })
       }
      )
    },
    // handleSizeChange() {},
    // handleCurrentChange() {},
    // formatter(row) {
    //   return row.address;
    // },
    // filterTag(value, row) {
    //   return row.tag === value;
    // },
    deptNameFilter(value, row, column){
      const property = column["property"];
      // console.log('111',row[property])
      return row[property] === value;
    },

  }
};
</script>

<style lang='less' scoped>
.el-table{
  font-size:13px;
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td {
    color: #fff;
    background-color: #a2a4a7!important;
}
.el-table-filter__list{
  max-height: 100px;
    overflow: auto;
   }
</style>