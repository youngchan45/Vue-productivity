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
        <el-button plain size="mini" type="primary" @click="goBack">
          <i class="el-icon-upload el-icon--right"></i>导出excel
        </el-button>
        <el-button plain size="mini" @click="userDefinedVisible = true" type="success">自定义列</el-button>
        <el-dialog title="自定义列" :visible.sync="userDefinedVisible" class="userDialog">
          <el-checkbox-group v-model="userDefinedChecked" class="flex">
            <el-checkbox label="姓名"></el-checkbox>
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
            <el-checkbox label="分管部门(岗位职责)"></el-checkbox>
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
    >
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="与本人关系" width="120"></el-table-column>
      <el-table-column label="面貌" prop="political" width="100"></el-table-column>
      <el-table-column label="工作单位" prop="unit_name" width="120"></el-table-column>
      <el-table-column label="职务" prop="present_post" width="120"></el-table-column>
      <el-table-column label="级别" prop="present_rank" width="120"></el-table-column>
      <el-table-column label="查看" align="center" width="260">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="goInfo(scope.row.dateYear,scope.row.idcard)"
          >详情</el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            @click="goComparison(scope.row.dateYear,scope.row.idcard)"
          >历年对比</el-button>
          <el-button type="primary" plain size="mini" @click="goRelations(scope.row)">社会关系</el-button>
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
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="与本人关系" prop="relationship" width="120"></el-table-column>
      <el-table-column label="面貌" prop="political" width="100"></el-table-column>
      <el-table-column label="工作单位" prop="unit_name" width="120"></el-table-column>
      <el-table-column label="职务" prop="present_post" width="120"></el-table-column>
      <el-table-column label="级别" prop="present_rank" width="120"></el-table-column>
      <el-table-column label="查看" align="center" width="260">
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
export default {
  data() {
    return {
      relationsData: [],
      ownData: [
        // {name:'111'}
      ],
      userDefinedVisible: false,
      userDefinedChecked: [
        "姓名",
        "与本人关系",
        "政治面貌",
        "工作单位",
        "职务",
        "级别"
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
          this.relationsData = res.data.data;
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
    }
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
  width: 500px;
  position: fixed;
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