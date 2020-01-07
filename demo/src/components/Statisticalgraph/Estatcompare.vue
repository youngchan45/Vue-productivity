<template>
  <div>
    <div>
      <div class="flex">
        <h5>房产</h5>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="建筑面积" name="first"></el-tab-pane>
          <el-tab-pane label="套数" name="second"></el-tab-pane>
        </el-tabs>
      </div>

      <div id="estat" style="width: 100%;height:300px; top:-40px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from '../../plugins/echarts'
export default {
  name: "estatcompare",
  data() {
    return {
      activeName: "first",
      index: 0
    };
  },
  mounted() {
    this.getEstat();
  },
  methods: {
    handleClick(tab) {
      console.log(tab.index);
      this.index = tab.index;
      this.getEstat();
    },
    getEstat() {
      this.$http
        .get("/archive/estateCompare", {
          params: {
            idcard: this.$route.query.idcard,
            dateYear: this.$route.query.dateYear,
            type: this.index
          }
        })
        .then(res => {
          console.log(res);
          var myChart = echarts.init(document.getElementById("estat"));
          if (this.index == 0) {
            var estatData = {
              tooltip: {
                trigger: "axis"
              },
              xAxis: {
                type: "category",
                data: res.data.data.data
              },
              yAxis: {
                type: "value",
                minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
              },
              series: []
            };
            res.data.data.series.forEach(item=>{
                estatData.series.push({name:item.name,data:item.data,type:'line',smooth:true})
            })
            myChart.setOption(estatData);
          } else {
            var estatData1 = {
              tooltip: {
                trigger: "axis"
              },
              xAxis: {
                type: "category",
                data: res.data.data.data
              },
              yAxis: {
                type: "value"
              },
              series: []
            };
            res.data.data.series.forEach(item=>{
                estatData1.series.push({name:item.name,data:item.data,type:'line',smooth:true})
            })
            myChart.setOption(estatData1);
          }
        });
    }
  }
};
</script>

<style lang='less' scoped>
.flex {
  display: flex;
}
</style>