<template>
  <div>
    <div class="flex">
      <div>
        <span>预警名称</span>
        <el-input
          placeholder="请输入关键词"
          prefix-icon="el-icon-search"
          v-model="searchInfo.warnName"
          clearable
          @clear="getWaringList"
          size="mini"
        ></el-input>
        <el-button @click="getWaringList" size="mini" type="primary">搜索</el-button>
      </div>
      <div>
        <el-button @click="warningDialog" size="mini" type="primary">新建预警</el-button>
      </div>
    </div>
    <el-table
      :data="waringData0"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="officialType" label="预警类型" width="180"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="warnName" label="预警名称"></el-table-column>
      <el-table-column prop="conditions" label="预警条件"></el-table-column>
      <el-table-column prop="content" label="预警内容"></el-table-column>
      <!-- <p v-for="(item,index) in waringData.warnConditions " :key="index">
        <el-table-column prop="item.conditions" label="预警条件"></el-table-column>
        <el-table-column prop="item.content" label="预警内容"></el-table-column>
      </p>-->
    </el-table>

    <!--新建弹窗-->
    <el-dialog
      title="新建预警"
      :visible.sync="warningAddVisible"
      width="670px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
    >
      <!--新增弹窗内容-->
      <el-form
        ref="warningAddFormRef"
        statue-icon
        :model="addInfo"
        :rules="warningAddFormRules"
        :inline="true"
        class="demo-form-inline hhhh"
        label-width="100px"
        size="small"
      >
        <el-form-item label="预警名称" prop="chinesename" clearable>
          <el-input v-model="addInfo.warnName"></el-input>
        </el-form-item>

        <div class="inline">
          <el-form-item label="产权性质">
            <el-radio v-model="addInfo.warnConditions[0].selects" label="1">是</el-radio>
            <el-radio v-model="addInfo.warnConditions[0].selects" label="2">非</el-radio>
          </el-form-item>

          <el-form-item>
            <el-select v-model="addInfo.warnConditions[0].content" placeholder="请选择产权性质">
              <el-option
                v-for="(item,index) in propertyRightOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="地址">
          <el-select v-model="addInfo.warnConditions[1].content" placeholder="请选择" size="small">
            <el-option
              v-for="item in provinceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="addInfo.warnConditions[1].content" placeholder="请选择" size="small">
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="建筑面积(m²)" class="el_font_size">
          <el-input v-model="area.area1" type="number" size="small"></el-input>至
          <el-input v-model="area.area2" type="number" size="small"></el-input>
        </el-form-item>

        <el-form-item label="交易价格(万元)">
          <el-input v-model="trade.trade1" type="number" size="small"></el-input>至
          <el-input v-model="trade.trade2" type="number" size="small"></el-input>
        </el-form-item>

        <el-form-item label="数量(套)">
          <el-input v-model="num.num1" type="number" size="small"></el-input>至
          <el-input v-model="num.num2" type="number" size="small"></el-input>
        </el-form-item>

        <el-form-item class="addBtn">
          <el-button @click="warningAddVisible = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
      waringData0: [
        {
          officialType: "裸官",
          warnName: "疑似裸官预警",
          conditions: "配偶已移居国外",
          content: "*"
        },
        {
          officialType: "裸官",
          warnName: "疑似裸官预警",
          //   warnConditions: [
          //     {
          conditions: "所有子女均移居国外",
          content: "*"
          // }
          //   ]
        },
        {
          officialType: "涉及经商办企业",
          warnName: "涉及经商办企业预警",
          conditions:
            "配偶、子女、子女的配偶三种身份中只要任意一种有创建经商办企业，则符合条件",
          content: "*"
        }
      ],
      searchInfo: { id: "", warnName: "" },
      addInfo: {
        id: "",
        warnName: "",
        type: 0,
        createTime: new Date()  ,
        updateTime: new Date(),
        userId: window.sessionStorage.getItem("userId"),
        warnConditions: [
          {
            id: "",
            selects: "1",
            conditions: "产权性质",
            content: "全部",
            warnId: ""
          },
          {
            id: "",
            selects: "",
            conditions: "地址",
            content: "",
            warnId: ""
          },
          {
            id: "",
            selects: "",
            conditions: "建筑面积",
            content: this.areaStrings,
            warnId: ""
          },
          {
            id: "",
            selects: "",
            conditions: "交易价格",
            content: this.tradeStrings,
            warnId: ""
          },
          {
            id: "",
            selects: "",
            conditions: "数量",
            content: this.numStrings,
            warnId: ""
          }
        ]
      },
      areaStrings: "",
      area: {
        area1: "",
        area2: ""
      },
      tradeStrings: "",
      trade: {
        trade1: "",
        trade2: ""
      },
      numStrings: "",
      num: {
        num1: "",
        num2: ""
      },
      propertyRightOptions: [],
      provinceOptions: [],
      cityOptions: [],
      warningAddVisible: false,
      newWarning: {
        warnName: ""
      },
      warningAddFormRules: {}
    };
  },
  created() {
    this.getWaringList();
  },
  methods: {
    getWaringList() {
      this.$http
        .get("/warn/searchWarn", {
          params: {
            warnName: "",
            id: ""
          }
        })
        .then(res => {
          console.log("预警列表", res);
          res.data.data.forEach(item => {
            this.waringData0.push(item);
          });
          for (var i = 0; i++; i < res.data.data.length) {
            for (var j = 0; j++; j < i) {
              this.waringData0[i].conditions =
                res.data.data[i].warnConditions[j].conditions;
            }
          }
        });
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    warningDialog() {
      this.warningAddVisible = true;
      this.getPropertyRight();
      //   this.getAddress();
    },
    getPropertyRight() {
      this.$http.get("/warn/getDict").then(res => {
        res.data.data.forEach(item => {
          this.propertyRightOptions.push({ label: item, value: item });
        });
      });
    },
    // getAddress() {
    //   this.$http.get("/warn/getProvinceInfo").then(res => {
    //     console.log("省份城市", res);
    //     res.data.data.provinces.forEach(item => {
    //       this.provinceOptions.push({
    //         label: item.provinceName,
    //         value: item.provinceName
    //       });
    //     });
    //     // let provinceArr=[];
    //     // res.data.data.provinces.forEach(item=>{
    //     //     provinceArr.push(item)
    //     //     console.log('城市第一步',provinceArr)
    //     // })
    //     // res.data.data.provinces.citys.forEach(item=>{
    //     //     this.cityOptions.push({label:item.citysName,value:item.citysName})
    //     // })
    //   });
    // },
    // createTime(){
    //   let newDate = new Date() | timeset;
    //   this.addInfo.createTime=newDate;
    // },
    save() {
      //易错点：不能直接把this.area赋值给content
      this.areaStrings = this.area.area1 + "-" + this.area.area2;
      this.addInfo.warnConditions[2].content = this.areaStrings;
      this.tradeStrings = this.trade.trade1 + "-" + this.trade.trade2;
      this.addInfo.warnConditions[3].content = this.areaStrings;
      this.numStrings = this.num.num1 + "-" + this.num.num2;
      this.addInfo.warnConditions[4].content = this.areaStrings;
      console.log(this.addInfo)
    }
  }
};
</script>

<style lang='less' scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
.el_font_size > label{
  font-size: 12px !important;
}
.inline {
  display: flex;
}
</style>