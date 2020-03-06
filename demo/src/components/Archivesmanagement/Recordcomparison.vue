<template>
  <div>
    <h4>历年对比结果</h4>
    <div class="archivesTitle">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>档案管理</el-breadcrumb-item>
        <el-breadcrumb-item>历年对比</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button plain size="mini" @click="goBack">返回</el-button>
    </div>
    <el-card :body-style="{ padding: ' 0 10px' }">
      <h5>基础资料</h5>
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch type="card">
        <el-tab-pane label="职务" name="first">
          <el-table :data="postData" style="width: 100%">
            <el-table-column prop="dateYear" label="年份" width="180"></el-table-column>
            <el-table-column prop="posts" label="职务" width="180"></el-table-column>
            <el-table-column prop="ranks" label="职级" width="180"></el-table-column>
            <el-table-column label="上年对比" width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.compare==0">无变化</span>
                <span v-if="scope.row.compare>0" style="color:#11d396;">
                  <i class="el-icon-top"></i>
                  上升 {{scope.row.compare}} 个职级
                </span>
                <span v-if="scope.row.compare<0" style="color:red;">
                  <i class="el-icon-bottom"></i>
                  <!--涉及到负数时记得处理成绝对值-->
                  下降 {{Math.abs(scope.row.compare)}} 个职级
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="政治面貌" name="second">
          <el-table :data="politicals" style="width: 100%">
            <el-table-column prop="dateYear" label="年份" width="180"></el-table-column>
            <el-table-column prop="political" label="政治面貌" width="180"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="是否市管干部" name="third">
          <el-table :data="cityLeaders" style="width: 100%">
            <el-table-column prop="dateYear" label="年份" width="180"></el-table-column>
            <el-table-column prop="cityLeader" label="是否市管干部" width="180">
              <template slot-scope="scope">{{ scope.row.cityLeader==0?'否':'是'}}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="婚姻状况" name="fourth">
          <el-table :data="Maritals" style="width: 100%">
            <el-table-column prop="dateYear" label="年份" width="180"></el-table-column>
            <el-table-column prop="marital" label="婚姻状况" width="180"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工作单位" name="fifth">
          <el-table :data="units" style="width: 100%">
            <el-table-column prop="dateYear" label="年份" width="180"></el-table-column>
            <el-table-column prop="unitName" label="工作单位" width="180"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="分管部门" name="sixth">
          <el-table :data="duties" style="width: 100%">
            <el-table-column prop="dateYear" label="年份" width="180"></el-table-column>
            <el-table-column prop="duty" label="分管部门" width="180"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-card :body-style="{ padding: '10px' }">
      <abroadcompare></abroadcompare>
    </el-card>

    <div class="flex">
      <el-card :body-style="{ padding: '10px' }">
        <estatcompare></estatcompare>
      </el-card>
      <el-card :body-style="{ padding: '10px' }">
        <businesscompare></businesscompare>
      </el-card>
    </div>
  </div>
</template>

<script>
import Abroadcompare from "../Statisticalgraph/Abroadcompare";
import Estatcompare from "../Statisticalgraph/Estatcompare";
import Businesscompare from "../Statisticalgraph/Businesscompare";
export default {
  data() {
    return {
      postData: [],
      politicals: [],
      cityLeaders: [],
      Maritals: [],
      units: [],
      duties: [],
      activeName: "first",
      type: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/archive/infoCompare", {
        //params是格式  
          params: {
            //用query传，就用query接收
            idcard: this.$route.query.idcard,
            dateYear: this.$route.query.dateYear,
            type: this.type
          }
        })
        .then(res => {
          if (this.type == 0) {
            this.postData = res.data.data.post;
          } else if (this.type == 1) {
            this.politicals = res.data.data.politicals;
          } else if (this.type == 2) {
            this.cityLeaders = res.data.data.cityLeaders;
          } else if (this.type == 3) {
            this.Maritals = res.data.data.Maritals;
          } else if (this.type == 4) {
            this.units = res.data.data.units;
          } else {
            this.duties = res.data.data.duties;
          }
          console.log("表" + this.type, res);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    handleClick(currenTab) {
      console.log(currenTab);
      this.type = currenTab.index;
      this.getData();
    }
  },
  components: {
    abroadcompare: Abroadcompare,
    estatcompare: Estatcompare,
    businesscompare: Businesscompare
  }
};
</script>

<style lang='less' scoped>
.archivesTitle {
  display: flex;
  align-items: center;
}
// .flex{
//   display:flex;
//   // padding:0 10px;
// }
</style>