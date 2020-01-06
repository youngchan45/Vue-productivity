<template>
  <div>
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Abroadcompare",
  created() {},
  //需要等页面上的元素被渲染后才加载图表
  mounted() {
    this.getAbroad();
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 指定图表的配置项和数据
    var option = {
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
        data: []
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "直接访问",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight"
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: "联盟广告",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight"
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    };
    myChart.setOption(option);
  },
  methods: {
    getAbroad() {
      this.$http
        .get("/archive/abroadCompare", {
          params: {
            idcard: this.$route.idcard,
            dateYear: this.$route.dateYear
          }
        })
        .then(res => {
          //易错点：忘记加query
          console.log("dateYear", this.$route.query.dateYear);
          console.log(res);
          //   this.option=res.data.data.series
          //   this.option.xAxis.data=res.data.data.data
          //    console.log('出入境',this.option.xAxis)
        });
    }
  }
};
</script>