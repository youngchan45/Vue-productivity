<template>
  <div>
    <div id="main" style="width: 800px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Abroadcompare",
  data() {
    return {};
  },
  created() {},
  //需要等页面上的元素被渲染后才加载图表
  mounted() {
    this.getAbroad();
  },
  methods: {
    getAbroad() {
      this.$http
        .get("/archive/abroadCompare", {
          params: {
            //易错点：忘记加query
            idcard: this.$route.query.idcard,
            dateYear: this.$route.query.dateYear
          }
        })
        .then(res => {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main"));
          // 指定图表的配置项和数据
          var abroadData = {
            title: {
              text: "因私出入境"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "line" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis: {
              type: "category",
              // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
              data: res.data.data.data
            },
            yAxis: {
              type: "value"
            },
            series: []
          };
          res.data.data.series.forEach(item => {
            abroadData.series.push({ name: item.name, data: item.data, type: "bar" });
          });
          //易错点：忘记加query
          console.log("idcard", this.$route.query.idcard);
          console.log(res);
          myChart.setOption(abroadData);
        });
    }
  }
};
</script>