<template>
  <div>
    <h3>领导干部群体</h3>
    <el-row>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <div>市管一把手</div>
          </div>
          <div>
            <div>
              <span class="card1Count1">{{cardList1.count1}}</span>
              <span>人</span>
            </div>
            <div class="card1Count2">
              <span>同比上年</span>
              <img v-show="rate.rate1 =='0'" :src="equal" alt="img-equal" />
              <img v-show="rate.rate1 >'0'" :src="up" alt="img-up" />
              <img v-show="rate.rate1 <'0'" :src="down" alt="img-down" />
              <span>{{Math.abs(rate.rate1)*100+'%'}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>市管非一把手</span>
          </div>
          <div>
            <span class="card1Count1">{{cardList1.count2}}</span>
            <span>人</span>
          </div>
          <div class="card1Count2">
            <span>同比上年</span>
            <img v-show="rate.rate2 =='0'" :src="equal" alt="img-equal" />
            <img v-show="rate.rate2 >'0'" :src="up" alt="img-up" />
            <img v-show="rate.rate2 <'0'" :src="down" alt="img-down" />
            <span>{{Math.abs(rate.rate2)*100+'%'}}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <div>非市管初级</div>
          </div>
          <div class="card1Count2">
            <span class="card1Count1">{{cardList1.count3}}</span>
            <span>人</span>
          </div>
          <div class="card1Count2">
            <span>同比上年</span>
            <img v-show="rate.rate3 =='0'" :src="equal" alt="img-equal" />
            <img v-show="rate.rate3 >'0'" :src="up" alt="img-up" />
            <img v-show="rate.rate3 <'0'" :src="down" alt="img-down" />
            <span>{{Math.abs(rate.rate3)*100+'%'}}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <div>市管非一把手</div>
          </div>
          <div>
            <span class="card1Count1">{{cardList1.count4}}</span>
            <span>人</span>
          </div>
          <div class="card1Count2">
            <span>同比上年</span>
            <img v-show="rate.rate4 =='0'" :src="equal" alt="img-equal" />
            <img v-show="rate.rate4 >'0'" :src="up" alt="img-up" />
            <img v-show="rate.rate4 <'0'" :src="down" alt="img-down" />
            <span>{{Math.abs(rate.rate4)*100+'%'}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="custom">
      <h3>自定义群体</h3>
      <el-button type="primary" size="small" @click="addUnit">
        <i class="el-icon-plus"></i>自定义群体
      </el-button>
    </div>
    <el-row>
      <div v-for="(item,index) in groundList" :key="index">
        <el-col :span="6">
          <!-- <el-card :class="{'nextGround':display}"> -->
            <el-card>
            <div slot="header">
              <span>{{item.groupName}}</span>
            </div>
            <div>
              <span class="card1Count1">{{item.personCount}}</span>
              <span>人</span>
            </div>
            <div class="card1Count2">
              <a>编辑</a>
              <a>删除</a>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
    <div class="warn">
      <h3>预警信息</h3>
      <div>更多</div>
    </div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in tabPane"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <div v-for="(item,index) in warnList" :key="index">
          <el-link href underline>{{item.name}}{{item.post}}{{item.ranks}}{{item.deptName}}疑似违规</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--新建群体弹窗-->
    <el-dialog
      class="dialog"
      title="自定义群体"
      :visible.sync="unitAddVisible"
      width="470px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
    >
      <!--新增群体弹窗内容-->
      <el-form
        ref="unitFormRef"
        statue-icon
        :model="entity"
        :rules="unitFormRules"
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        size="small"
      >
        <el-form-item label="群体名称" prop="unitName" clearable>
          <el-input v-model="entity.entity.groupName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="entity.entity.type" clearable placeholder="请选择" @change="curTypeSel">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <div></div>
          </el-select>
        </el-form-item>
        <el-form-item v-show="unitShow" label="单位" placeholder="请搜索单位" clearable prop="unitName">
          <el-select
            v-model="entity.entity.list"
            multiple
            filterable
            placeholder="请输入搜索或单击选择"
            @change="unitSel"
          >
            <el-option
              v-for="item in unitOptions"
              :key="item.unitCode"
              :label="item.unitName"
              :value="item.unitCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="rankShow" label="级别" clearable prop="rankName">
          <el-select v-model="entity.entity.list" multiple filterable placeholder="请输入搜索或单击选择">
            <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
            <el-option
              v-for="(item,index) in rankOptions"
              :key="index"
              :label="item.rankName"
              :value="item.rankCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="addBtn">
          <el-button @click="unitAddVisible = false">取消</el-button>
          <el-button type="primary" @click="saveUnitAdd">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      unitAddVisible: false,
      equal: require("../assets/img/equal.png"),
      up: require("../assets/img/up.png"),
      down: require("../assets/img/down.png"),
      rate: {
        rate1: "",
        rate2: "",
        rate3: "",
        rate4: ""
      },
      cardInfo1: {
        deptId: 1,
        year: ""
      },
      cardList1: [],
      warnQuery: {
        deptId: 1,
        type: ""
      },
      warnList: [],
      tabPane: [
        { label: "房产预警", name: "0", type: "0" },
        { label: "涉及裸官", name: "1", type: "1" },
        { label: "疑似经商办企业", name: "2", type: "2" }
      ],
      activeName: "0",
      typeOptions: [
        { label: "单位", value: "1" },
        { label: "级别", value: "0" }
      ],
      unitOptions: [],
      rankOptions: [],
      selValId: "",
       operator: window.sessionStorage.getItem("userId"),
      entity: {
        entity:{
          //新建自定义群体要提交的表单
        groupName: "", //自定义群体名称
        // operator: "", //本地存储userId
        operator:window.sessionStorage.getItem("userId"), //本地存储userId，易错点:切记和deptId分开
        //  operator:'',
        //这里无法直接用operator: this.operator，this作用域不同
        type: "1", //单位1，级别0，这里是易错点：传送的是value，需要默认显示label的话，将value加上双引号即可
        list: []
        // rankName: [],
        }        
      },
      groundList:[],
      unitFormRules: {
        inputunitName: "",
        id: "",
        unitName: "",
        rankName: ""
      },
      value: "unit",
      unitShow: true,
      rankShow: false,
      checked: false,
      nextGround: {},
      deptId: window.sessionStorage.getItem("deptId"), 
      display:true,    
    };
  },
  created() {
    this.getCard1();
    this.getWarnInfo();
    // this.entity.entity.operator=this.operator;
    // debugger;
    // console.log('idddd',this.entity.entity.operator)
    this.getGround();
  },
  methods: {
    getCard1() {
      this.$http
        .get("/basic/usersInfoGroup", { params: this.cardInfo1 })
        .then(res => {
          console.log("卡片1", res);
          this.cardList1 = res.data.data;
          this.rate.rate1 = res.data.data.rate1;
          this.rate.rate2 = res.data.data.rate2;
          this.rate.rate3 = res.data.data.rate3;
          this.rate.rate4 = res.data.data.rate4;
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.warnQuery.type = tab.index;
      this.getWarnInfo();
    },
    getWarnInfo() {
      this.$http
        .get("/warn/indexWarnInfo", {
          params: this.warnQuery
        })
        .then(res => {
          console.log("卡片3", res);
          this.warnList = res.data.data.slice(0, 5);
        });
    },
    selectAll() {
      this.entity.rankName = [];
      if (this.checked) {
        this.entity.rankOptions.map(item => {
          this.entity.rankName.push(item.rankName);
        });
      } else {
        this.entity.rankName = [];
      }
    },
    changeSelect(val) {
      if (val.length === this.unitAddForm.rankOptions.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    addUnit() {
      this.unitAddVisible = true;
      //获取单位列表
      this.$http
        .get("/index/findUnitCode", {
          params: {
            deptId: this.deptId,
            unitName: ""
          }
        })
        .then(res => {
          console.log("单位", res);
          console.log("id", this.deptId);
          this.unitOptions = res.data.data;
        });
      //获取级别列表
      this.$http
        .get("/index/findUnitCodeOrRankId", {
          params: {
            deptId: this.deptId,
            type: "" //旧级别：0，新级别：1
          }
        })
        .then(res => {
          console.log("级别", res);
          this.rankOptions = res.data.data;
        });
    },
    curTypeSel(selVal) {
      console.log("来", this.entity.type);
      this.selValId = selVal;
      if (this.selValId == 1) {
        this.unitShow = true;
        this.rankShow = false;
        this.entity.entity.type = selVal;
      }
      if (this.selValId == 0) {
        this.rankShow = true;
        this.unitShow = false;
        this.entity.entity.type = selVal;
      }
    },
    //1.先在页面新建占位符表单nextGround
    //2.建立要提交的表单entity
    //3.把表单entity给push进nextGround
    //4.v-for渲染nextGround
    unitSel(selVal) {
      console.log("选中单位code", selVal);
      // this.entity.list.push(selVal);
      console.log("选中单位code1", this.entity.list);
    },
    saveUnitAdd() {
      this.$http.post("/index/newCustomizeGroup", this.entity).then(res => {
        // console.log(res);
        // if (res.data.status == 200) {
        console.log(res);
        // this.entity.push(this.nextGround);
        this.$message.success(res.data.message);
        this.unitAddVisible = false;
        this.display=false;
        // }
      });
    },
    getGround(){
      this.$http.get('/index/getCustomizeGroup',{
        params:{
userId:window.sessionStorage.getItem("userId")
        }
      }).then(res=>{
        console.log(res);
        this.groundList=res.data.data
      })
    },
  }
};
</script>

<style lang="less">
.card1Count1 {
  font-size: 60px;
}
.card1Count2 {
  font-size: 10px;
}
.warn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // .addBtn{
  //   // height: 16px;
  //   text-align: center;
  // }
}
.nextGround{
  display:none;
}
</style>