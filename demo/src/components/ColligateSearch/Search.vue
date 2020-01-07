<template>
  <div>
    <div class="filter">
      <h2>快速搜索</h2>
      <el-select
        v-model="archivesQuery.searchSel"
        @change="currenSel"
        clearable
        placeholder="全部"
        size="small"
        @clear="getList"
      >
        <el-option
          v-for="item in searchOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          size="small"
        ></el-option>
      </el-select>
      <el-input
        placeholder="请输入关键字"
        v-model="archivesQuery.condition"
        clearable
        size="small"
        @clear="getList"
      ></el-input>
      <el-button size="small" type="primary" @click="getList">查询</el-button>
      <el-button size="small" type="text" @click="getList">高级搜索</el-button>
    </div>

    <div>
      <h2>高级搜索</h2>

      <el-form ref="searchFormRef" :model="searchForm" label-width="80px" class="demo-form-inline" >
        <el-form-item label="姓名">
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-form-item>
        <el-form-item label="房产面积">
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>至
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>
        </el-form-item>
        <el-form-item label="房产数量">
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>至
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-form-item>
        <el-form-item label="汽车数量">
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>至
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>
        </el-form-item>
        <el-form-item label="奖金金额">
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>至
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-form-item>
        <el-form-item label="出境次数">
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>至
          <el-input v-model="input" placeholder="请输入内容" size="small" type="number"></el-input>
        </el-form-item>
        <el-form-item label="工作单位">
          <el-button size="small" type="text" @click="getList">单位列表</el-button>
        </el-form-item>
        <el-form-item label="谈话处分">
          <el-checkbox-group v-model="userDefinedChecked" class="flex">
            <el-checkbox label="谈话函询"></el-checkbox>
            <el-checkbox label="诫勉谈话"></el-checkbox>
            <el-checkbox label="党纪政务处分"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="年份">
          <el-select
            v-model="archivesQuery.searchSel"
            @change="currenSel"
            clearable
            placeholder="全部"
            size="small"
            @clear="getList"
          >
            <el-option
              v-for="item in searchOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              size="small"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        searchForm:{},
      searchOpts: [
        //1 全部
        { label: "姓名", value: "2" },
        { label: "身份证", value: "3" },
        { label: "工作单位", value: "4" },
        { label: "级别", value: "5" }
      ],
      input:'',
      userDefinedChecked:[],
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
      }
    };
  },
  methods: {
    getList() {
      this.$http
        .get("/query/complexQuery", {
          params: this.archivesQuery
        })
        .then(res => {
          this.archivesTableData = res.data.data[0].list;
          this.paging = res.data.data[0];
          console.log(this.archivesTableData);
        });
    },
    currenSel(selVal) {
      this.searchSel = selVal;
      console.log("sel", selVal);
    }
  }
};
</script>

<style lang='less' scoped>
</style>