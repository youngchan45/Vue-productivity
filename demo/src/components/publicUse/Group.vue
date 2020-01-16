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
              <!--新知识点，不用执着于使用css实现悬浮显示整个文字，直接用title属性-->
              <span :title="item.groupName">{{item.groupName | ellipsis }}</span>
            </div>
            <div>
              <span class="card1Count1">{{item.personCount}}</span>
              <span>人</span>
            </div>
            <div class="card1Count2">
              <!--易错点：传送id的时候 不一定要传送绑定在表单上的数据，只要后台有返回这个数据，就可以用item.xx传过去，或者直接传item-->
              <a @click="showEdit(item.groupId)">编辑</a>
              <a @click="showDel(item.groupId)">删除</a>
              <!-- <el-popover placement="top" width="160" v-model="visible">
                <p>确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                </div>
                <el-button slot="reference">删除</el-button>
              </el-popover>-->
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>

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
        ref="unitAddFormRef"
        statue-icon
        :model="entity"
        :rules="unitFormRules"
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        size="small"
      >
        <el-form-item label="群体名称" prop="groupName" clearable>
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
        <el-form-item v-show="unitShow" label="单位" placeholder="请搜索单位" clearable>
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
        <el-form-item v-show="rankShow" label="级别" clearable>
          <el-select
            v-model="entity.entity.list"
            multiple
            filterable
            placeholder="请输入搜索或单击选择"
            @change="rankSel"
          >
            <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
            <el-option
              v-for="item in rankOptions"
              :key="item.rankId"
              :label="item.rankName"
              :value="item.rankId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="addBtn">
          <el-button @click="cancelUnitAdd">取消</el-button>
          <el-button type="primary" @click="saveUnitAdd">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--编辑群体弹窗-->
    <el-dialog
      class="dialog"
      title="自定义群体"
      :visible.sync="unitEditVisible"
      width="470px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
    >
      <!--编辑群体弹窗内容-->
      <el-form
        statue-icon
        :model="editEntity"
        :rules="unitFormRules"
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        size="small"
      >
        <el-form-item label="群体名称" prop="groupName" clearable>
          <el-input v-model="editEntity.entity.groupName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            disabled
            v-model="editEntity.entity.type"
            clearable
            placeholder="请选择"
            @change="curTypeSel"
          >
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
            v-model="editEntity.entity.list"
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
        <el-form-item v-show="rankShow" label="级别" prop="rankName">
          <el-select v-model="editEntity.entity.list" multiple filterable placeholder="请输入搜索或单击选择">
            <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
            <el-option
              v-for="item in rankOptions"
              :key="item.rankId"
              :label="item.rankName"
              :value="item.rankId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="addBtn">
          <el-button @click="unitEditVisible = false">取消</el-button>
          <el-button type="primary" @click="saveUnitEdit">保存</el-button>
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
      equal: require("../../assets/img/equal.png"),
      up: require("../../assets/img/up.png"),
      down: require("../../assets/img/down.png"),
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
      
      
      typeOptions: [
        { label: "单位", value: "1" },
        { label: "级别", value: "0" }
      ],
      unitOptions: [],
      rankOptions: [],
      selValId: "",
      operator: window.sessionStorage.getItem("userId"),
      entity: {
        entity: {
          //新建自定义群体要提交的表单
          groupName: "", //自定义群体名称
          // operator: "", //本地存储userId
          operator: window.sessionStorage.getItem("userId"), //本地存储userId，易错点:切记和deptId分开
          //  operator:'',
          //这里无法直接用operator: this.operator，this作用域不同
          type: "1", //单位1，级别0，这里是易错点：传送的是value，需要默认显示label的话，将value加上双引号即可
          list: []
          // rankName: [],
        }
      },
      groundList: [],
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
      display: true,
      unitEditVisible: false,
      editEntity: {
        entity: {
          //编辑自定义群体要提交的表单
          groupId: "",
          groupName: "",
          operator: window.sessionStorage.getItem("userId"),
          type: "1",
          list: []
        }
      },
      unitAddFormRef: {
        groupName: ""
      }
    };
  },
  created() {
    this.getCard1();
    
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
    selectAll() {
      this.entity.entity.list = [];
      if (this.checked) {
        this.rankOptions.map(item => {
          this.entity.entity.list.push(item.rankId);
        });
      } else {
        this.entity.entity.list = [];
      }
    },
    changeSelect(val) {
      if (val.length === this.rankOptions.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    getAllUnit() {
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
    },
    getAllRank() {
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
    addUnit() {
      this.unitAddVisible = true;
      this.getAllUnit();
      this.getAllRank();
    },
    curTypeSel(selVal) {
      console.log("来", this.entity.entity.type);
      this.selValId = selVal;
      if (this.selValId == 1) {
        this.entity.entity.list = [];
        this.unitShow = true;
        this.rankShow = false;
        this.entity.entity.type = selVal;
      }
      if (this.selValId == 0) {
        this.entity.entity.list = [];
        this.rankShow = true;
        this.unitShow = false;
        this.entity.entity.type = selVal;
      }
    },
    //易错点：错误想法
    //1.先在页面新建占位符表单nextGround
    //2.建立要提交的表单entity
    //3.把表单entity给push进nextGround
    //4.v-for渲染nextGround
    //正确想法
    //1.直接把要提交的对象post过去
    //2.重新提交刷新页面即可（就跟表格的新增一样）
    unitSel(selVal) {
      //1.新建群体传送的是list:['unitCode']
      //2.编辑群体获取的是list:[{unitName:'',unitCode:''}]
      //3.下拉框里面传送的是list:['unitCode']
      //4.编辑接口和新建接口所需要传送的数据类型不同。。。所以编辑中的下拉框所提交的数据类型得另写一个
      console.log("选中单位code", selVal);
      console.log("选中单位code1", this.editEntity.entity.list);
    },
    rankSel(selVal) {
      console.log("选中级别id", selVal);
      // console.log("选中级别id1", this.editEntity.entity.unitList);
    },
    saveUnitAdd() {
      this.$http.post("/index/newCustomizeGroup", this.entity).then(res => {
        console.log(res);
        this.$message.success(res.data.message);
        this.entity.entity.groupName = "";
        this.entity.entity.list = [];
        this.unitAddVisible = false;
        this.display = false;
        this.getGround();
      });
    },
    cancelUnitAdd() {
      // console.log(this.$refs.unitFormRef.resetFields)
      // this.$refs.unitAddFormRef.resetFields();
      // this.$nextTick(() => {
      //   this.$refs.unitAddFormRef.resetFields();
      // });
      this.unitAddVisible = false;
      this.entity.entity.groupName = "";
      this.entity.entity.list = [];
    },
    showDel(id) {
      // this.$http.delete("/index/deleteCustomizeGroup/" + id).then(res => {
      //   if (res.status === 200) {
      //     this.$message.success(res.data.message);
      //     this.getGround();
      //   }
      // });
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete("/index/deleteCustomizeGroup/" + id).then(res => {
            // console.log('删除',res)
            if (!res.status === 200) {
              return this.$message.error("删除失败");
            }
            this.$message.success("删除成功");
            this.getGround();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getGround() {
      this.$http
        .get("/index/getCustomizeGroup", {
          params: {
            userId: window.sessionStorage.getItem("userId")
          }
        })
        .then(res => {
          console.log(res);
          this.groundList = res.data.data;
        });
    },
    showEdit(id) {
      this.unitEditVisible = true;
      this.getAllUnit();
      this.getAllRank();
      this.$http
        .get("/index/getCustomizeGroupById/" + id, this.editEntity)
        .then(res => {
          // this.curTypeSel();
          console.log("编辑", id);
          // this.editEntity.entity=res.data.data
          this.editEntity.entity.groupName = res.data.data.groupName;
          this.editEntity.entity.groupId = res.data.data.id;
          this.editEntity.entity.type = res.data.data.type;
          if (res.data.data.type == 1) {
            this.unitShow = true;
            this.rankShow = false;
            //绑定已选单位
            // res.data.data.list.forEach(item => {
            //易错点：要看清楚框架里面需要的是什么数据格式，接口返回的又是什么数据格式，像这里 下拉框需要的格式是字符串数组['unitCode',]，而接口返回的是对象数组[{name:'',unitCode:';}],而我们只需要unitCode，所以这里应该只传递其中的item.unitCode，而不是把整个list传递进去这样的弊端是，返回的数据组每一个都需要单独赋值
            // console.log(item)
            let unitArr1 = [];
            let unitArr2 = [];
            // let unitArr2=[];
            res.data.data.list.forEach(item => {
              unitArr1.push(item.unitCode);
              console.log("1234345", item.unitCode);
            });
            unitArr1.forEach(item => {
              unitArr2.push(item);
            });
            this.editEntity.entity.list = unitArr2;
            console.log("已选单位code", unitArr2);

            // );
            console.log("!!!!!!", this.editEntity.entity.list);
            console.log("groupId", this.editEntity.entity.groupId);
          }
          if (res.data.data.type == 0) {
            this.unitShow = false;
            this.rankShow = true;
            //绑定已选级别
            let rankArr = [];
            res.data.data.list.forEach(item => {
              rankArr.push(parseInt(item));
            });
            rankArr.forEach(item => {
              this.editEntity.entity.list.push(item.rankId);
              console.log(item);
            });
            let arr1 = []; //存放接口返回的rankId
            let arr2 = []; //存放处理成数字的rankId
            res.data.data.list.forEach(item => {
              arr1.push(item.rankId);
            });
            console.log("1111", arr1);
            arr1.forEach(item => {
              arr2.push(parseInt(item));
            });
            console.log("2222", arr2);
            this.editEntity.entity.list = arr2;
            // this.editEntity.entity.list=res.data.data.list
            console.log("??????", this.editEntity.entity.list);
            console.log("groupId", this.editEntity.entity.groupId);
            // }
          }
        });
    },
    saveUnitEdit() {
      this.$http
        .post("/index/updateCustomizeGroup", this.editEntity)
        .then(res => {
          console.log("groupId", this.editEntity.entity.groupId);
          console.log("修改", res);
          if (res.status === 200) {
            this.$message.success(res.data.message);
            this.unitEditVisible = false;
            this.getGround();
          }
        });
    }
  }
};
</script>

<style lang='less' scoped>
.card1Count1 {
  font-size: 60px;
}
.card1Count2 {
  font-size: 10px;
}
.nextGround {
  display: none;
}
.custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>