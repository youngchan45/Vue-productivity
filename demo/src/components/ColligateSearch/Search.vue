<template>
  <div>
    <h2>快速搜索</h2>
    <div class="search">
      <quick-search @onGetList="getDataList"></quick-search>
      <el-button size="small" type="text" @click="advancedShow">高级搜索</el-button>
    </div>
    <!-- 熟记动态css语法 -->
    <div>
      <div :class="{'advancedSearch':display}">
        <h2>高级搜索</h2>
        <el-form
          ref="searchRef"
          :model="archivesQuery"
          :rules="advancedRules"
          label-width="100px"
          class="demo-form-inline"
        >
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="archivesQuery.userName" placeholder="请输入姓名" size="small"></el-input>
          </el-form-item>
          <el-form-item label="房产面积">
            <el-col :span="11">
              <el-form-item prop="area1">
                <el-input v-model="area.area1" placeholder="请输入面积" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">至</el-col>
            <el-col :span="11">
              <el-form-item prop="area2">
                <el-input v-model="area.area2" placeholder="请输入面积" size="small" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="房产数量" prop="estateNum">
            <el-input v-model="estate.estate1" placeholder="请输入数量" size="small" type="number"></el-input>至
            <el-input v-model="estate.estate2" placeholder="请输入数量" size="small" type="number"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="idCard">
            <el-input v-model="archivesQuery.idCard" placeholder="请输入内容" size="small"></el-input>
          </el-form-item>
          <el-form-item label="汽车数量" prop="car">
            <el-input v-model="car.car1" placeholder="请输入数量" size="small" type="number"></el-input>至
            <el-input v-model="car.car2" placeholder="请输入数量" size="small" type="number"></el-input>
          </el-form-item>
          <el-form-item label="奖金金额" prop="salary">
            <el-input v-model="salary.salary1" placeholder="请输入金额" size="small" type="number"></el-input>至
            <el-input v-model="salary.salary2" placeholder="请输入金额" size="small" type="number"></el-input>
          </el-form-item>
          <el-form-item label="级别" prop="rank">
            <el-select
              v-model="archivesQuery.rankList"
              multiple
              filterable
              clearable
              placeholder="请输入搜索或单击选择"
              @change="currenRankSel"
            >
              <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
              <el-option
                v-for="(item,index) in rankOptions"
                :key="index"
                :label="item.rankName"
                :value="item.rankName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出境次数" prop="goboard">
            <el-input v-model="goboard.goboard1" placeholder="请输入数字" size="small" type="number"></el-input>至
            <el-input v-model="goboard.goboard2" placeholder="请输入数字" size="small" type="number"></el-input>
          </el-form-item>
          <el-form-item label="工作单位" placeholder="请搜索单位" clearable prop="unit">
            <el-select
              v-model="archivesQuery.unitList"
              multiple
              filterable
              placeholder="请输入搜索或单击选择"
            >
              <el-option
                v-for="item in unitOptions"
                :key="item.unitId"
                :label="item.unitName"
                :value="item.unitCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="谈话处分" prop="punishment">
            <el-checkbox-group v-model="archivesQuery.punishmentList" @change="checkedBox">
              <el-checkbox label="1">谈话函询</el-checkbox>
              <el-checkbox label="2">诫勉谈话</el-checkbox>
              <el-checkbox label="3">党纪政务处分</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="年份" prop="dateYear">
            <el-select
              v-model="archivesQuery.dateYear"
              @change="currenYearSel"
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
            <!--知识点： 传送一个字符串参数：@click="getAdvancedList('button2')" -->
            <el-button @click="getAdvancedList" type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div :class="{'searchDisplay':searchDisplay}">
      <div class="titleFlex">
        <h2>搜索结果</h2>
        <div>
          <el-button plain size="mini" type="primary">
            <i class="el-icon-upload el-icon--right"></i>导出excel
          </el-button>
          <el-button plain size="mini" @click="openUserDefine" type="success">自定义列</el-button>
        </div>
      </div>
      <el-dialog title="自定义列" :visible.sync="userDefinedVisible" class="userDialog">
        <!-- :style="{top:top+ &quot;px&quot;,left:left+ &quot;px&quot;}" -->
        <el-checkbox-group v-model="userDefinedChecked" class="flex">
          <el-checkbox v-for="(item,index) in userDefinedBox" :key="index" :label="item"></el-checkbox>
        </el-checkbox-group>
      </el-dialog>
      <el-table
        ref="filterTable"
        :data="archivesTableData"
        style="width: 100%"
        stripe
        border
        max-height="470px"
        show-overflow-tooltip
      >
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column label="姓名" prop="name" v-if="colData[0].istrue"></el-table-column>
        <el-table-column label="与本人关系" prop="political" v-if="colData[1].istrue"></el-table-column>
        <el-table-column label="性别" prop="sex" v-if="colData[2].istrue"></el-table-column>
        <el-table-column label="民族" prop="nationals" v-if="colData[3].istrue"></el-table-column>
        <el-table-column label="政治面貌" prop="political" v-if="colData[4].istrue"></el-table-column>
        <el-table-column label="工作单位" prop="unit_name" v-if="colData[5].istrue"></el-table-column>
        <el-table-column label="婚姻状况" prop="marital" v-if="colData[6].istrue"></el-table-column>
        <el-table-column label="身份证号" prop="idcard" v-if="colData[7].istrue"></el-table-column>
        <el-table-column label="户籍地址" prop="huji_adress" v-if="colData[8].istrue"></el-table-column>
        <el-table-column label="籍贯" prop="native_place" v-if="colData[9].istrue"></el-table-column>
        <el-table-column label="出生地" prop="birthday_place" v-if="colData[10].istrue"></el-table-column>
        <el-table-column label="参加工作地址" prop="unit_name" v-if="colData[11].istrue"></el-table-column>
        <el-table-column label="专业技术职称" prop="school_and_major" v-if="colData[12].istrue"></el-table-column>
        <el-table-column label="入党时间" prop="party_time" v-if="colData[13].istrue"></el-table-column>
        <el-table-column label="手机号码" prop="mobile" v-if="colData[14].istrue"></el-table-column>
        <el-table-column label="职务" prop="present_post" v-if="colData[15].istrue"></el-table-column>
        <el-table-column label="级别" prop="present_rank" v-if="colData[16].istrue"></el-table-column>
        <el-table-column label="是否市管干部" prop="city_leader" v-if="colData[17].istrue"></el-table-column>
        <el-table-column label="是否本单位/下属单位党政一把手" prop="leader" v-if="colData[18].istrue"></el-table-column>
        <el-table-column label="是否专职纪检(监察)干部" prop="censor_leader" v-if="colData[19].istrue"></el-table-column>
        <el-table-column label="任现级别时间" prop="unit_name" v-if="colData[20].istrue"></el-table-column>
        <el-table-column label="分管部门(岗位职责)" prop="duty" v-if="colData[21].istrue"></el-table-column>
        <el-table-column label="查看" align="center" width="260" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="mini"
              @click="goInfo(scope.row.dateYear,scope.row.idcard)"
            >详情</el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              @click="goComparison(scope.row.dateYear,scope.row.idcard)"
            >历年对比</el-button>
            <el-button type="primary" plain size="mini" @click="goRelations(scope.row)">社会关系</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="archivesQuery.pageIndex"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paging.totalRow"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import quickSearch from "../publicUse/Quicksearch";
import { validCname, validIdCard } from "../../rules.js";
export default {
  data() {
    // var checkArea = (rule, value, callback) => {
    //   console.log(rule, value, callback);
    //   if (this.area.area1 && this.area.area2) {
    //     if (this.area.area1 > this.area.area2) {
    //       callback();
    //     }
    //   }
    // };
    return {
      checked: false,
      searchForm: {},
      rankOptions: [],
      unitOptions: [],
      // searchSel: "",
      rankListArr: "",
      searchDisplay: true,
      paging: "",
      archivesQuery: {
        userId: window.sessionStorage.getItem("userId"),
        deptId: window.sessionStorage.getItem("deptId"),
        dateYear: "2019",
        idCard: "",
        userName: "",
        rankList: [],
        area: "",
        carNum: "",
        estateNum: "",
        goboard: "",
        salary: "",
        punishmentList: [],
        unitList: [],
        button: "button2",
        type: 1, //搜索下拉框
        condition: "", //搜索框里的关键词
        pageIndex: 1,
        pagesize: 10
      },
      area: {
        area1: "",
        area2: ""
      },
      estate: {
        estate1: "",
        estate2: ""
      },
      car: {
        car1: "",
        car2: ""
      },
      salary: {
        salary1: "",
        salary2: ""
      },
      goboard: {
        goboard1: "",
        goboard2: ""
      },
      years: [
        // {label:'2018',value:0},
        // {label:'2019',value:1}
      ],
      archivesTableData: [],
      userDefinedVisible: false,
      //循环被选数组里面的每一项和表头数组里面对应的每一项，用indexOf处理，如果对应得到，则属性为true
      userDefinedChecked: ["姓名", "与本人关系", "性别", "民族", "政治面貌"],
      // top: "",
      // left: "",
      userDefinedBox: [
        "姓名",
        "与本人关系",
        "性别",
        "民族",
        "政治面貌",
        "工作单位",
        "婚姻状况",
        "身份证号",
        "户籍地址",
        "籍贯",
        "出生地",
        "参加工作地址",
        "专业技术职称",
        "入党时间",
        "手机号码",
        "职务",
        "级别",
        "是否市管干部",
        "是否本单位/下属单位党政一把手",
        "是否专职纪检(监察)干部",
        "任现级别时间",
        "分管部门(岗位职责)"
      ],
      colData: [
        { title: "姓名", istrue: true },
        { title: "与本人关系", istrue: true }, // true：初始化表格时显示这个表头列，false：不显示
        { title: "性别", istrue: false },
        { title: "民族", istrue: false },
        { title: "政治面貌", istrue: true },
        { title: "工作单位", istrue: true },
        { title: "婚姻状况", istrue: false },
        { title: "身份证号", istrue: false },
        { title: "户籍地址", istrue: false },
        { title: "籍贯", istrue: false },
        { title: "出生地", istrue: false },
        { title: "参加工作地址", istrue: false },
        { title: "专业技术职称", istrue: false },
        { title: "入党时间", istrue: false },
        { title: "手机号码", istrue: false },
        { title: "职务", istrue: true },
        { title: "级别", istrue: true },
        { title: "是否市管干部", istrue: false },
        { title: "是否本单位/下属单位党政一把手", istrue: false },
        { title: "是否专职纪检(监察)干部", istrue: false },
        { title: "任现级别时间", istrue: false },
        { title: "分管部门(岗位职责)", istrue: false }
      ],
      display: true,
      advancedRules: {
        //只能输入中文；最多4个字符
        userName: [
          // {
          //   pattern: /^[\u2E80-\u9FFF]+$/,
          //   message: "只能输入中文",
          //   trigger: "blur"
          // },
          // { max: 4, message: "最多4个汉字", trigger: "blur" }，
          { validator: validCname, trigger: "blur" }
        ],
        //只能输入数字；最小大于0；if两个框都有数字，则第二个框必须大于第一个框
        //易错点：这里的面积是由两条输入框组成的合集，不能在两条输入框的父框上面加prop，得加在两条子框
        // area: [
        //   {
        //     validator: checkArea,
        //     message: "请输入正确顺序的数字范围",
        //     trigger: "blur"
        //   }
        // ],
        area1: [
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        area2: [{ pattern: /^\d+$/, message: "只能输入数字", trigger: "blur" }],
        //只能输入数字；最小大于0；if两个框都有数字，则第二个框必须大于第一个框
        estateNum: [{}],
        //统一身份证验证规则
        idCard: [
          // {
          //   pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
          //   message: "请输入正确的身份证号码",
          //   trigger: "blur"
          // },
          {
            validator: validIdCard,
            trigger: "blur"
          }
        ],
        //只能输入数字；最小大于0；if两个框都有数字，则第二个框必须大于第一个框
        car: [{}],
        //只能输入数字；最小大于0；if两个框都有数字，则第二个框必须大于第一个框
        salary: [],
        rank: [],
        //只能输入数字；最小大于0；if两个框都有数字，则第二个框必须大于第一个框
        goboard: [],
        unit: [{}],
        punishment: [{}],
        dateYear: [{}]
      }
    };
  },

  components: { quickSearch },
  created() {
    this.getYear();
    this.addUnit();
  },
  methods: {
    getDataList(data) {
      console.log("----", data);
      //易错点：get格式 get("url",{params:data});  post格式 post("url",data)
      this.$http.get("/query/complexQuery", { params: data }).then(res => {
        console.log("搜索结果1", res);
        this.archivesTableData = res.data.data[0].list;
        this.searchDisplay = false;
        this.paging = res.data.data[0];
      });
    },
    getAdvancedList() {
      //这里的三个列表数据需要转换成字符串(接口要求)，但不能在data里面直接转换，因为data里面是对数据的声明、格式设定和默认值。或者直接把参数全部带过去，但这样列表太长。其实这里修改很简单，在函数里面先转换，然后再对接接口即可。
      this.archivesQuery.rankList = JSON.stringify(this.archivesQuery.rankList);
      this.archivesQuery.punishmentList = JSON.stringify(
        this.archivesQuery.punishmentList
      );
      this.archivesQuery.unitList = JSON.stringify(this.archivesQuery.unitList);
      if (this.area.area1 === "" && this.area.area2 === "") {
        this.archivesQuery.area = "";
      } else {
        this.archivesQuery.area = `${this.area.area1}-${this.area.area2}`;
      }
      //易错点：在这里报错提示"Required String parameter 'area' is not present" 是因为我又将data的archivesQuery里的一些参数改了名字，但这些参数是后台设定好的，这里要注意，可以先从后台拿回需要的数据，然后在data里面定义;如果有其他报错，可考虑是否数据格式问题，比如需要字符串，但传过去是数组等等
      this.$http
        .get("/query/complexQuery", { params: this.archivesQuery })
        .then(res => {
          console.log("搜索结果2", res);
          this.archivesTableData = res.data.data[0].list;
          this.searchDisplay = false;
          this.paging = res.data.data[0];
        });
      //知识点：//假设res为一个请求返回的结果
      // let res={
      //     status:200,
      //     id:12,
      //     data:[{name:'Bob'},{name:'Shuang Dan'}]
      // }

      // es6一行搞定
      // let {status,id,data}=res;

      // es5
      // var status=res.status;
      // var id=res.id;
      // var data=res.data;

      /*this.$http
        .get("/query/complexQuery", {
          params: this.archivesQuery
          // params:
          // {
          // userId: window.sessionStorage.getItem("userId"),
          // deptId: window.sessionStorage.getItem("deptId"),
          // dateYear: this.archivesQuery.dateYear,
          // idCard: this.archivesQuery.idCard,
          // userName: this.archivesQuery.userName,
          // rankList: JSON.stringify(this.archivesQuery.rankList),
          // area: this.archivesQuery.area,
          // carNum: this.archivesQuery.carNum,
          // estateNum: this.archivesQuery.estateNum,
          // goboard: this.archivesQuery.goboard,
          // salary: this.archivesQuery.salary,
          // punishmentList: JSON.stringify(
          //   this.archivesQuery.punishmentList
          // ),
          // unitList: JSON.stringify(this.archivesQuery.unitList),
          // button: 'button2',
          // type: 1, //搜索下拉框
          // condition: this.archivesQuery.condition, //搜索框里的关键词
          // pageIndex: 1,
          // pagesize: 10
          //  }
        })
        .then(res => {
          console.log("搜索结果2", res);
          // this.archivesTableData = res.data.data[0].list;
          // console.log("btn", this.archivesQuery.button);
          //1.把点击搜索之后返回的数据保存起来archivesTableData
          //2.搜索结果界面v-for渲染archivesTableData
          this.archivesTableData = res.data.data[0].list;
          this.paging = res.data.data[0];
          this.searchDisplay = false;
          console.log("搜索结果3", this.archivesTableData);
        });*/
    },
    checkedBox(selVal) {
      console.log("已勾选", selVal);
      // console.log("已勾选组合", this.archivesQuery.punishmentList);
    },
    currenYearSel(selVal) {
      // this.searchSel = selVal;
      console.log("sel", selVal, this.archivesQuery.dateYear);
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
    },
    currenRankSel(val) {
      // this.archivesQuery.rankList = val;
      console.log("已选------", this.archivesQuery.rankList);
      console.log("已选1", val);
      // this.archivesQuery.rankList.push(val)
    },
    handleSizeChange(newSide) {
      console.log("每页条", newSide);
      this.archivesQuery.pagesize = newSide;
      this.getList();
    },
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`);
      this.archivesQuery.pageIndex = newPage;
      this.getList();
    },
    openUserDefine() {
      this.userDefinedVisible = true;
    },
    goInfo(dateYear, idcard) {
      this.$router.push(
        //path和query需要放在同一个对象里面
        {
          path: "/archive/infoPerson",
          query: {
            type: 0,
            idcard: idcard,
            dateYear: dateYear
          }
          // component: archivesinfo
        }
      );
      console.log("发送", idcard);
      console.log("发送", dateYear);
    },
    goComparison(dateYear, idcard) {
      this.$router.push({
        path: "/archive/recordcomparison",
        query: {
          type: 0,
          idcard: idcard,
          dateYear: dateYear
        }
      });
    },
    goRelations(row) {
      this.$router.push({
        path: "/archive/socialRelations",
        query: row
      });
    },
    advancedShow() {
      this.display = !this.display;
    }
  },
  watch: {
    userDefinedChecked: {
      //1.给表格里的每一列增加v-if，定义一个容器colData放置所有列
      //2.监听自定义列框里面的选项，把自定义列里的选项数组传递过来
      //3.使用filter()方法，把colData里的每一项title和自定义列里的选项数组进行比较
      //3.1如果coldata里的title也存在于用户操作的自定义列框中，则coldata的另一个属性istrue也就是控制列v-if为true，列表显示
      //3.2如果coldata里的title没有在用户操作的自定义列框中，则代表用户没有选中，因为自定义列框checkbox的原理是，被选中的选项才会进入checkbox中
      handler: function(valArr) {
        this.colData.filter(i => {
          if (valArr.indexOf(i.title) !== -1) {
            i.istrue = true;
          } else {
            i.istrue = false;
          }
        });
      },
      immediate: true
    }
  }
};
</script>

<style lang='less' scoped>
.searchDisplay,
.advancedSearch {
  display: none;
}
.search {
  display: flex;
  > * {
    padding-right: 10px;
  }
}
.titleFlex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex {
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow-y: scroll;
}
</style>