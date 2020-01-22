<template>
  <div class="container">
    <div class="archivesTitle">
      <div class="archivesTitle1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>档案管理</el-breadcrumb-item>
          <el-breadcrumb-item>社会关系</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button plain size="mini" @click="goBack">返回</el-button>
      </div>
      <div>
        <el-button plain size="mini" type="primary" @click="exportExcel">
          <i class="el-icon-upload el-icon--right"></i>导出excel
        </el-button>
        <el-button plain size="mini" @click="openUserDefine" type="success">自定义列</el-button>
        <el-dialog title="自定义列" :visible.sync="userDefinedVisible" class="userDialog">
          <!-- :style="{top:top+ &quot;px&quot;,left:left+ &quot;px&quot;}" -->

          <el-checkbox-group v-model="userDefinedChecked" class="flex">
            <el-checkbox v-for="(item,index) in userDefinedBox" :key="index" :label="item"></el-checkbox>
            <!-- <el-checkbox label="姓名"></el-checkbox>
            <el-checkbox label="与本人关系"></el-checkbox>
            <el-checkbox label="性别"></el-checkbox>
            <el-checkbox label="民族"></el-checkbox>
            <el-checkbox label="政治面貌"></el-checkbox>
            <el-checkbox label="工作单位"></el-checkbox>
            <el-checkbox label="婚姻状况"></el-checkbox>
            <el-checkbox label="身份证号"></el-checkbox>
            <el-checkbox label="户籍地址"></el-checkbox>
            <el-checkbox label="籍贯"></el-checkbox>
            <el-checkbox label="出生地"></el-checkbox>
            <el-checkbox label="参加工作地址"></el-checkbox>
            <el-checkbox label="专业技术职称"></el-checkbox>
            <el-checkbox label="入党时间"></el-checkbox>
            <el-checkbox label="手机号码"></el-checkbox>
            <el-checkbox label="职务"></el-checkbox>
            <el-checkbox label="级别"></el-checkbox>
            <el-checkbox label="是否市管干部"></el-checkbox>
            <el-checkbox label="是否本单位/下属单位党政一把手"></el-checkbox>
            <el-checkbox label="是否专职纪检(监察)干部"></el-checkbox>
            <el-checkbox label="任线级别时间"></el-checkbox>
            <el-checkbox label="分管部门(岗位职责)"></el-checkbox>-->
          </el-checkbox-group>
          <el-button plain size="mini" @click="userDefinedVisible = false">取消</el-button>
          <el-button type="primary" plain size="mini" @click="userDefinedVisible = false">确定</el-button>
        </el-dialog>
      </div>
    </div>
    <el-table
      ref="ownDataRef"
      :data="ownData"
      style="width: 100%"
      stripe
      border
      max-height="470px"
      show-overflow-tooltip
      id="relationTable"
    >
      <el-table-column label="姓名" prop="name" v-if="colData[0].istrue"></el-table-column>
      <el-table-column label="与本人关系" prop="political" v-if="colData[1].istrue"></el-table-column>
      <el-table-column label="性别" prop="sex" v-if="colData[2].istrue"></el-table-column>
      <el-table-column label="民族" prop="nationals" v-if="colData[3].istrue"></el-table-column>
      <el-table-column label="政治面貌" prop="political" v-if="colData[4].istrue"></el-table-column>
      <el-table-column label="工作单位" prop="unit_name" v-if="colData[5].istrue"></el-table-column>
      <el-table-column label="婚姻状况" prop="marital" v-if="colData[6].istrue"></el-table-column>
      <el-table-column label="身份证号" prop="idcard" v-if="colData[7].istrue"></el-table-column>
      <el-table-column label="户籍地址" prop="huji_adress" v-if="colData[8].istrue"></el-table-column>
      <el-table-column label="籍贯" prop="native_place" v-if="colData[9].istrue"></el-table-column>
      <el-table-column label="出生地" prop="birthday_place" v-if="colData[10].istrue"></el-table-column>
      <el-table-column label="参加工作地址" prop="unit_name" v-if="colData[11].istrue"></el-table-column>
      <el-table-column label="专业技术职称" prop="school_and_major" v-if="colData[12].istrue"></el-table-column>
      <el-table-column label="入党时间" prop="party_time" v-if="colData[13].istrue"></el-table-column>
      <el-table-column label="手机号码" prop="mobile" v-if="colData[14].istrue"></el-table-column>
      <el-table-column label="职务" prop="present_post" v-if="colData[15].istrue"></el-table-column>
      <el-table-column label="级别" prop="present_rank" v-if="colData[16].istrue"></el-table-column>
      <el-table-column label="是否市管干部" prop="city_leader" v-if="colData[17].istrue"></el-table-column>
      <el-table-column label="是否本单位/下属单位党政一把手" prop="leader" v-if="colData[18].istrue"></el-table-column>
      <el-table-column label="是否专职纪检(监察)干部" prop="censor_leader" v-if="colData[19].istrue"></el-table-column>
      <el-table-column label="任现级别时间" prop="unit_name" v-if="colData[20].istrue"></el-table-column>
      <el-table-column label="分管部门(岗位职责)" prop="duty" v-if="colData[21].istrue"></el-table-column>
      <el-table-column label="查看" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="goInfo(scope.row.dateYear,scope.row.idcard)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <table> -->
    <!-- <tr>
        <th>姓名</th>
        <th>与本人关系</th>
        <th>面貌</th>
        <th>工作单位</th>
        <th>职务</th>
        <th>级别</th>
        <th>查看</th>
    </tr>-->
    <!-- <tr v-for="(item,index) in ownInfo" :key="index"> -->
    <!--易错点！！！此处bug想了一小时 这个bug从以前刚学vue时就犯过错误，如果只是把数组里面的一个对象渲染到页面的话，是不需要用v-for循环的，直接把{{对象名.属性}}渲染进去就可以了-->
    <!-- <tr>
        <td>{{ownInfo.name}}</td>
        <td>&nbsp;</td>
        <td>{{ownInfo.present_post}}</td>
        <td>{{ownInfo.unit_name}}</td>
        <td>{{ownInfo.present_post}}</td>
        <td>{{ownInfo.present_rank}}</td>
        <td>
          <el-button
            type="primary"
            plain
            size="mini"
            @click="goInfo(item,$event)" 
          >详情</el-button>
        </td>
    </tr>-->
    <!-- <tr v-for="(item,index) in relationsData" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.relationship}}</td>
        <td>{{item.political}}</td>
        <td>{{item.unit_name}}</td>
        <td>{{item.present_post}}</td>
        <td>{{item.present_rank}}</td>
        <td>
          <el-button v-if="item.exsit==0" disabled plain size="mini">详情</el-button>
          <el-button
            v-if="item.exsit==1"
            type="primary"
            plain
            size="mini"
            @click="goInfo(scope.row.dateYear,scope.row.idcard)"
          >详情</el-button>
        </td>
      </tr>
    </table>-->
    <el-table
      ref="filterTable"
      :data="relationsData"
      style="width: 100%"
      stripe
      border
      max-height="470px"
      show-overflow-tooltip
      :show-header="false"
    >
      <el-table-column label="姓名" prop="name" v-if="colData[0].istrue"></el-table-column>
      <el-table-column label="与本人关系" prop="political" v-if="colData[1].istrue"></el-table-column>
      <el-table-column label="性别" prop="sex" v-if="colData[2].istrue"></el-table-column>
      <el-table-column label="民族" prop="nationals" v-if="colData[3].istrue"></el-table-column>
      <el-table-column label="政治面貌" prop="political" v-if="colData[4].istrue"></el-table-column>
      <el-table-column label="工作单位" prop="unit_name" v-if="colData[5].istrue"></el-table-column>
      <el-table-column label="婚姻状况" prop="marital" v-if="colData[6].istrue"></el-table-column>
      <el-table-column label="身份证号" prop="idcard" v-if="colData[7].istrue"></el-table-column>
      <el-table-column label="户籍地址" prop="huji_adress" v-if="colData[8].istrue"></el-table-column>
      <el-table-column label="籍贯" prop="native_place" v-if="colData[9].istrue"></el-table-column>
      <el-table-column label="出生地" prop="birthday_place" v-if="colData[10].istrue"></el-table-column>
      <el-table-column label="参加工作地址" prop="unit_name" v-if="colData[11].istrue"></el-table-column>
      <el-table-column label="专业技术职称" prop="school_and_major" v-if="colData[12].istrue"></el-table-column>
      <el-table-column label="入党时间" prop="party_time" v-if="colData[13].istrue"></el-table-column>
      <el-table-column label="手机号码" prop="mobile" v-if="colData[14].istrue"></el-table-column>
      <el-table-column label="职务" prop="present_post" v-if="colData[15].istrue"></el-table-column>
      <el-table-column label="级别" prop="present_rank" v-if="colData[16].istrue"></el-table-column>
      <el-table-column label="是否市管干部" prop="city_leader" v-if="colData[17].istrue"></el-table-column>
      <el-table-column label="是否本单位/下属单位党政一把手" prop="leader" v-if="colData[18].istrue"></el-table-column>
      <el-table-column label="是否专职纪检(监察)干部" prop="censor_leader" v-if="colData[19].istrue"></el-table-column>
      <el-table-column label="任现级别时间" prop="unit_name" v-if="colData[20].istrue"></el-table-column>
      <el-table-column label="分管部门(岗位职责)" prop="duty" v-if="colData[21].istrue"></el-table-column>
      <el-table-column label="查看" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="goInfo(scope.row.dateYear,scope.row.idcard)"
            v-if="scope.row.exsit==0"
            disabled
          >详情</el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            @click="goInfo(scope.row.dateYear,scope.row.idcard)"
            v-if="scope.row.exsit==1"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { eventBus} from '../../assets/Vuebus'
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      relationsData: [],
      ownData: [
        // {name:'111'}
      ],
      userDefinedVisible: false,
      // relationShow:true,
      //循环被选数组里面的每一项和表头数组里面对应的每一项，用indexOf处理，如果对应得到，则属性为true
      userDefinedChecked: [
        "姓名",
        "与本人关系",
        "性别",
        // "民族",
        "政治面貌"
        // "工作单位",
        // "婚姻状况",
        // "身份证号",
        // "户籍地址",
        // "籍贯",
        // "出生地",
        // "参加工作地址",
        // "专业技术职称",
        // "入党时间",
        // "手机号码",
        // "职务",
        // "级别",
        // "是否市管干部",
        // "是否本单位/下属单位党政一把手",
        // "是否专职纪检(监察)干部",
        // "任现级别时间",
        // "分管部门(岗位职责)"
      ],
      // top: "",
      // left: "",
      userDefinedBox: [
        "姓名",
        "与本人关系",
        "性别",
        "民族",
        "政治面貌",
        "工作单位",
        "婚姻状况",
        "身份证号",
        "户籍地址",
        "籍贯",
        "出生地",
        "参加工作地址",
        "专业技术职称",
        "入党时间",
        "手机号码",
        "职务",
        "级别",
        "是否市管干部",
        "是否本单位/下属单位党政一把手",
        "是否专职纪检(监察)干部",
        "任现级别时间",
        "分管部门(岗位职责)"
      ],
      colData: [
        { title: "姓名", istrue: true },
        { title: "与本人关系", istrue: true }, // true：初始化表格时显示这个表头列，false：不显示
        { title: "性别", istrue: false },
        { title: "民族", istrue: false },
        { title: "政治面貌", istrue: true },
        { title: "工作单位", istrue: true },
        { title: "婚姻状况", istrue: false },
        { title: "身份证号", istrue: false },
        { title: "户籍地址", istrue: false },
        { title: "籍贯", istrue: false },
        { title: "出生地", istrue: false },
        { title: "参加工作地址", istrue: false },
        { title: "专业技术职称", istrue: false },
        { title: "入党时间", istrue: false },
        { title: "手机号码", istrue: false },
        { title: "职务", istrue: true },
        { title: "级别", istrue: true },
        { title: "是否市管干部", istrue: false },
        { title: "是否本单位/下属单位党政一把手", istrue: false },
        { title: "是否专职纪检(监察)干部", istrue: false },
        { title: "任现级别时间", istrue: false },
        { title: "分管部门(岗位职责)", istrue: false }
      ]
    };
  },
  created() {
    this.getRelationsList();
    this.getOwnInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getRelationsList() {
      this.$http
        .get("/archive/relations", {
          params: {
            idcard: this.$route.query.idcard,
            dateYear: this.$route.query.dateYear
          }
        })
        .then(res => {
          console.log("亲戚", res);
          // this.relationsData = res.data.data;
          //如果没有亲戚列表，则不用加载亲戚列表，有的话就追加在ownList上
          if(res.data.data.length==0){
            return;
          }
          this.ownData.push(res.data.data);
        });
    },
    getOwnInfo() {
      // let a =this.$route[4]
      // this.$route[4].forEach(item=>{
      //依旧是老错误，只有一个对象的话 不需要循环 直接放进去；数组拿值才用下标 对象拿值用点
      this.ownData.push(this.$route.query);
      // })
      // this.ownData = this.$route.query;
      console.log("自己0", this.$route);
      console.log("自己1", this.$route.query);
      console.log("自己2", this.ownData[0]);
      // console.log("类型", typeof (this.ownData));
    },
    goInfo(dateYear, idcard) {
      this.$router.push(
        //path和query需要放在同一个对象里面
        {
          path: "/archive/infoPerson",
          query: {
            type: 0,
            idcard: idcard,
            dateYear: dateYear
          }
          // component: archivesinfo
        }
      );
      console.log("发送", idcard);
      console.log("发送", dateYear);
    },
    openUserDefine() {
      this.userDefinedVisible = true;
      // document.addEventListener('click', this.foo)
      // 获取鼠标点坐标
    },
    // foo() {
    //   this.top = event.clientY
    //   this.left = event.clientX
    //   // document.removeEventListener('click', this.foo) // 取消监听事件
    // }
    exportExcel() {
      this.$http
        .post("/archive/exportExcel", {
          // params:{
          module: 1,
          colum: [
            { key: "姓名", value: "name" },
            { key: "与本人关系", value: "relationship" },
            { key: "性别", value: "sex" },
            { key: "政治面貌", value: "political" }
          ],
          card: this.$route.query.idCard,
          year: this.$route.query.dateYear,
          deptId: window.sessionStorage.getItem("deptId"),
          userId: window.sessionStorage.getItem("userId"),
          dateYear: "",
          idCard: "",
          userName: "",
          rankName: "",
          area: "",
          carNum: "",
          estateNum: "",
          goboard: "",
          salary: "",
          button: "button1",
          condition: "",
          type: "",
          unitList: [],
          punishmentList: []
          // }
        })
        .then(res => {
          console.log("导出", res);
          /* out-table关联导出的dom节点 */
          var wb = XLSX.utils.table_to_book(
            document.querySelector("#relationTable")
          );
          /* get binary string as output */
          var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
          });
          try {
            FileSaver.saveAs(
              new Blob([wbout], { type: "application/octet-stream" }),
              "报告人社会关系图.xlsx"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
        });
    }
  },
  watch: {
    // userDefinedChecked(valArr) {
    //   var arr = this.userDefinedBox.filter(i => valArr.indexOf(i) < 0) // 未选中
    //   this.colData.filter(i => {
    //     if (arr.indexOf(i.title) !== -1) {
    //       i.istrue = false
    //     } else {
    //       i.istrue = true
    //     }
    //   })
    // },
    // 把userDefinedChecked的监听函数写到这里来
    //对value属性的监听会在value第一次变化后开始进行监听，如果我们想在创建时监听value，要使用 handler  和 immediate
    //注意语法
    //把
    userDefinedChecked: {
      handler: function(valArr) {
        // var arr = this.userDefinedBox.filter(i => valArr.indexOf(i) < 0); // 未选中
        this.colData.filter(i => {
          // debugger;
          if (valArr.indexOf(i.title) !== -1) {
            i.istrue = true;
          } else {
            i.istrue = false;
          }
        });
      },
      immediate: true
    }
    //
  }
};
</script>

<style lang='less' scoped>
.archivesTitle {
  display: flex;
  justify-content: space-between;
  .archivesTitle1 {
    display: flex;
    align-items: center;
  }
}
.userDialog {
  width: auto;
  // position: fixed;
}
.flex {
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow-y: scroll;
}

table {
  border: 1px solid rgb(233, 230, 230);
  border-collapse: collapse;

  tr {
    font-size: 13px;
    text-align: left;
    td {
      width: 120px;
      height: 60px;
      vertical-align: middle;
      position: relative;
    }
  }
}
</style>