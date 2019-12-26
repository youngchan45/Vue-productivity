<template>
  <div>
    <div class="filter">
      <span>字典名称</span>
      <el-input
        placeholder="字典名称"
        prefix-icon="el-icon-search"
        v-model="dictName"
        clearable
        @clear="getDictList"
        size="mini"
      ></el-input>
      <el-button size="mini" type="primary" @click="getDictList">搜索</el-button>
      <el-button size="mini" type="primary" @click="addDict">新建字典</el-button>
    </div>

    <el-table ref="dictTable" :data="dictList" style="width: 100%" stripe border max-height="470px">
      <el-table-column type="index" label="#" align="center" width="40"></el-table-column>
      <el-table-column prop="dictName" label="字典名称" width="160"></el-table-column>
      <el-table-column prop="dictRemark" label="字典备注" width="70"></el-table-column>
      <el-table-column prop="createTime" type="date" label="更新时间" width="190" sortable>
        <template slot-scope="scope">{{scope.row.createTime | timeset}}</template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="info" plain size="mini" @click="viewDict(scope.row.id)">查看</el-button>
          <el-button type="primary" plain size="mini" @click="editDict(scope.row.id)">编辑</el-button>
          <el-button type="danger" plain size="mini">删除</el-button>
        </template>
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
      class="dialog"
      title="新建字典"
      :visible.sync="dictAddVisible"
      width="470px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
    >
      <!--新增字典弹窗内容-->
      <el-form
        ref="dictFormRef"
        statue-icon
        :model="dictAddForm"
        :rules="dictFormRules"
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        size="small"
      >
        <el-form-item label="字典名称" prop="dictName" clearable>
          <el-input v-model="dictAddForm.dictName"></el-input>
        </el-form-item>
        <el-form-item label="字典备注">
          <el-input
            type="textarea"
            :rows="2"
            v-model="dictAddForm.dictRemark"
            size="medium"
            resize="none"
          ></el-input>
        </el-form-item>
        <div>
          <el-form-item label="字典项名称" clearable>
            <el-input v-model="dictAddForm.dictChildName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="排序号" clearable>
            <el-input v-model="dictAddForm.sort" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="字典项备注" clearable>
            <el-input v-model="dictAddForm.dictChilRemark" size="mini"></el-input>
          </el-form-item>
        </div>
        <el-form-item class="addBtn">
          <el-button @click="dictAddVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDict">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dictList: [],
      dictName: "",
      pageIndex: 1,
      dictAddForm: {
        dictName: "",
        dictRemark: "",
        dictChildName: "",
        sort: "",
        dictChilRemark: ""
      },
      dictFormRules: {
        dictName: [{ required: true, message: "请输入字典名", trigger: "blur" }]
      },
      dictAddVisible: false
    };
  },
  created() {
    this.getDictList();
  },
  methods: {
    getDictList() {
      this.$http
        .get("/dict/getAllDict", {
          params: { dictName: this.dictName, pageIndex: this.pageIndex }
        })
        .then(res => {
          console.log(res);
          this.dictList = res.data.data[0].list;
        });
    },
    addDict() {
      this.dictAddVisible = true;
    },
    saveDict() {      
          this.$http
            .post("/dict/newDict", {params:this.dictAddForm})
            .then(res => {
              if (!res.status == 200) {
                return this.$message.error("新建字典失败");
              }
              this.$message.success("新建字典成功");
            });
          this.dictAddVisible = false;
          this.getDictList();
    }
  }
};
</script>

<style lang="less" scope>
.dictChild {
  display: flex;
}
</style>