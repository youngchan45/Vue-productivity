<template>
  <div>
    <h5>经商办企业</h5>
    <div id="business" style="width: 100%;height:300px; top:-40px;"></div>
  </div>
</template>

<script>
import echarts from "../../plugins/echarts";
export default {
  name: "businesscompare",
  data() {
    return {};
  },
  mounted() {
    this.getBusiness();
  },
  methods: {
    getBusiness() {
      this.$http
        .get("/archive/businessCompare", {
          params: {
            idcard: this.$route.query.idcard,
            dateYear: this.$route.query.dateYear
          }
        })
        .then(res => {
          console.log(res);
          var myChart = echarts.init(document.getElementById("business"));
          var businessData = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "line"
              }
            },
            xAxis: {
              type: "category",
              data: res.data.data.data
            },
            yAxis: {
              type: "value",
              name:'个'
            },
            series: [ ],
            barMaxWidth:'30%',
            minInterval:1,
          };
          res.data.data.series.forEach(item=>{
              businessData.series.push({name:item.name,data:item.data,type:'bar'})
          })
          myChart.setOption(businessData);
        });
    }
  }
};
</script>