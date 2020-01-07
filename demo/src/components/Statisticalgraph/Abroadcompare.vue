<template>
  <div>
    <h5>因私出入境</h5>
    <div id="abroad" style="width: 100%;height:250px;"></div>
  </div>
</template>

<script>
// import echarts from "echarts";
// var echarts = require('echarts')
// require('echarts/lib/chart/bar')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
import echarts from '../../plugins/echarts'
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
          var myChart = echarts.init(document.getElementById("abroad"));
          // 指定图表的配置项和数据
          var abroadData = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "line" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            // legend: {
            //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            // },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: {
              type: "category",
              // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              data: res.data.data.data
            },
            yAxis: {
              type: "value",
              min: 0,
              max: function(value) {
                return value.max;
              },
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              name: "次"
            },
            series: [],
            barMaxWidth:'30%',
          };
          res.data.data.series.forEach(item => {
            abroadData.series.push({
              name: item.name,
              data: item.data,
              type: "bar",
              stack: "总量",
              label: {
                show: true,
                position: 'inside'
            },
            });
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