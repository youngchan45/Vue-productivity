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
    <div class="warn">
      <h3>预警信息</h3>
      <div>更多</div>
    </div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabPane" :key="index" :label="item.label" :name='item.name'>
        <div v-for="(item,index) in warnList" :key="index">
          <el-link
            href=""
            underline
          >{{item.name}}{{item.post}}{{item.ranks}}{{item.deptName}}疑似违规</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      warnQuery0: {
        deptId: 1,
        type: 0,
      },
      warnQuery1: {
        deptId: 1,
        type: 1,
      },
      warnList: [],
      tabPane: [
        { label: "房产预警", name:'0', type: 0 },
        { label: "涉及裸官", name:'1', type: 1 },
        { label: "疑似经商办企业", name:'2', type: 2 }
      ],
      activeName: '0'
    };
  },
  created() {
    this.getCard1();
    this.getWarnInfo0();
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
     methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }},
    getWarnInfo0() {
      this.$http
        .get("/warn/indexWarnInfo", {
          params: this.warnQuery0
        })
        .then(res => {
          console.log("卡片3", res);
          this.warnList = res.data.data;
        });
    }
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
</style>