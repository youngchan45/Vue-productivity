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
          :key="item.label"
          :label="item.label"
          :value="item.label"
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
      <el-button size="small" type="primary" @click="getList(btnType =button1)">查询</el-button>
      <el-button size="small" type="text" @click="getList">高级搜索</el-button>
    </div>

    <div>
      <h2>高级搜索</h2>
      <el-form ref="searchRef" :model="archivesQuery" label-width="80px" class="demo-form-inline">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="archivesQuery.userName" placeholder="请输入内容" size="small"></el-input>
        </el-form-item>
        <el-form-item label="房产面积" prop="area">
          <el-input v-model="archivesQuery.area" placeholder="请输入内容" size="small" type="number"></el-input>至
          <el-input v-model="archivesQuery.area" placeholder="请输入内容" size="small" type="number"></el-input>
        </el-form-item>
        <el-form-item label="房产数量" prop="estateNum">
          <el-input
            v-model="archivesQuery.estateNum"
            placeholder="请输入内容"
            size="small"
            type="number"
          ></el-input>至
          <el-input
            v-model="archivesQuery.estateNum"
            placeholder="请输入内容"
            size="small"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard">
          <el-input v-model="archivesQuery.idCard" placeholder="请输入内容" size="small"></el-input>
        </el-form-item>
        <el-form-item label="汽车数量" prop="carNum">
          <el-input v-model="archivesQuery.carNum" placeholder="请输入内容" size="small" type="number"></el-input>至
          <el-input v-model="archivesQuery.carNum" placeholder="请输入内容" size="small" type="number"></el-input>
        </el-form-item>
        <el-form-item label="奖金金额" prop="salary">
          <el-input v-model="archivesQuery.salary" placeholder="请输入内容" size="small" type="number"></el-input>至
          <el-input v-model="archivesQuery.salary" placeholder="请输入内容" size="small" type="number"></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="rankList">
          <el-select v-model="archivesQuery.rankList" multiple filterable placeholder="请输入搜索或单击选择">
            <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
            <el-option
              v-for="(item,index) in rankOptions"
              :key="index"
              :label="item.rankName"
              :value="item.rankId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出境次数" prop="goboard">
          <el-input v-model="archivesQuery.goboard" placeholder="请输入内容" size="small" type="number"></el-input>至
          <el-input v-model="archivesQuery.goboard" placeholder="请输入内容" size="small" type="number"></el-input>
        </el-form-item>
        <el-form-item label="工作单位" placeholder="请搜索单位" clearable prop="unitList">
          <el-select v-model="archivesQuery.unitList" multiple filterable placeholder="请输入搜索或单击选择">
            <el-option
              v-for="item in unitOptions"
              :key="item.unitId"
              :label="item.unitName"
              :value="item.unitId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="谈话处分" prop="punishmentList">
          <el-checkbox-group v-model="archivesQuery.punishmentList" class="flex" @change="checkedBox">
            <el-checkbox label="谈话函询"></el-checkbox>
            <el-checkbox label="诫勉谈话"></el-checkbox>
            <el-checkbox label="党纪政务处分"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="年份" prop="searchSel">
          <el-select
            v-model="archivesQuery.dateYear"
            @change="currenSel"
            clearable
            placeholder="全部"
            size="small"
          >
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              size="small"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetSearch" plain type="primary">重置</el-button>
          <el-button @click="getList(btnType)" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      searchForm: {},
      searchOpts: [
        //1 全部
        { label: "姓名", value: "2" },
        { label: "身份证", value: "3" },
        { label: "工作单位", value: "4" },
        { label: "级别", value: "5" }
      ],
      userDefinedChecked: [],
      rankOptions: [],
      unitOptions: [],
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
        punishmentList: [],
        unitList: "",
        button: "button1",
        type: 1, //搜索下拉框
        condition: "", //搜索框里的关键词
        pageIndex: 1,
        pagesize: 10
      },
      years: [
        // {label:'2018',value:0},
        // {label:'2019',value:1}
      ]
    };
  },
  created() {
    this.getYear();
    this.addUnit();
  },
  methods: {
    getList(btnType) {
      if (btnType == "button1") {
        this.archivesQuery.button = "button1";
        this.$http
          .get("/query/complexQuery", {
            params: this.archivesQuery
          })
          .then(res => {
            this.archivesTableData = res.data.data[0].list;
            this.paging = res.data.data[0];
            console.log("btn", this.archivesQuery.button);
          });
      } else {
        this.archivesQuery.button = "button2";
        this.$http
          .get("/query/complexQuery", {
            params: this.archivesQuery
          })
          .then(res => {
            this.archivesTableData = res.data.data[0].list;
            this.paging = res.data.data[0];
            console.log("btn", this.archivesQuery.button);
          });
      }
    },
    checkedBox(selVal){
      console.log('已勾选',selVal)
      console.log('已勾选组合',this.archivesQuery.punishmentList)
    },

    currenSel(selVal) {
      this.searchSel = selVal;
      console.log("sel", selVal);
    },
    getYear() {
      this.$http.get("/basic/getSearchDate").then(res => {
        console.log("返回", res);

        res.data.data.forEach(item => {
          this.years.push({ label: item, value: item });
          console.log("forEach", this.years);
        });

        // for(var i =0; i<res.data.data.length;i++){
        //   this.years.push(res.data.data[i])
        //   console.log('for',this.years)
        // }
      });
    },
    resetSearch() {
      //易错点：表单重置对应prop,prop是加在form-item上！resetFidles忘记加Fields
      this.$refs.searchRef.resetFields();
      this.rankOptions = [];
      this.unitOptions = [];
      this.archivesQuery = {};
      this.archivesQuery.punishmentList = [];
    },
    addUnit() {
      //获取单位列表
      var deptId = window.sessionStorage.getItem("deptId");
      this.$http
        .get("/index/findUnitCode", {
          params: {
            deptId: deptId,
            unitName: ""
          }
        })
        .then(res => {
          console.log("单位", res);
          console.log("id", deptId);
          this.unitOptions = res.data.data;
        });
      //获取级别列表
      this.$http
        .get("/index/findUnitCodeOrRankId", {
          params: {
            deptId: deptId,
            type: "" //旧级别：0，新级别：1
          }
        })
        .then(res => {
          console.log("级别", res);
          this.rankOptions = res.data.data;
        });
    },
    selectAll() {
      this.archivesQuery.rankList = [];
      if (this.checked) {
        this.rankOptions.map(item => {
          this.archivesQuery.rankList.push(item.rankName);
        });
      } else {
        this.archivesQuery.rankList = [];
      }
    },
    changeSelect(val) {
      if (val.length === this.rankOptions.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  }
};
</script>

<style lang='less' scoped>
</style>