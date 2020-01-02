<template>
  <div class="container">
    <div class="archivesTitle">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>档案管理</el-breadcrumb-item>
        <el-breadcrumb-item>档案详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button plain size="mini" @click="goBack">返回</el-button>
    </div>
    <div class="title0">
      <div class="title1">
        <h3>{{2019}}</h3>
        <img :src="calendar" alt="calendar" class="calendarPng" />
        <h3>年度档案</h3>
      </div>
      <div>
        <el-button type="primary" size="mini">
          导出PDF
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
    </div>
    <el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" stretch>
        <el-tab-pane label="个人基本情况" name="first" class="inTabs">
          <div>
            <h4>基础资料</h4>
            <el-card class="basic everyLine">
              <el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">姓名</el-col>
                        <el-col :span="14">{{personList.name}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">民族</el-col>
                        <el-col :span="14">{{personList.nationals}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">婚姻状况</el-col>
                        <el-col :span="14">{{personList.marital}}</el-col>
                      </el-row>
                    </el-col>

                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">性别</el-col>
                        <el-col :span="14">{{personList.sex==1?'男':'女'}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">政治面貌</el-col>
                        <el-col :span="14">{{personList.name}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">身份证</el-col>
                        <el-col :span="14">{{personList.idcard}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                  <el-col :span="3">
                    <div class="photo">
                      <img :src="personList.photoPath" alt="个人证件照" />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="24">
                      <el-row>
                        <el-col :span="5">工作单位</el-col>
                        <el-col :span="19">{{personList.unitName}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="5">户籍地址</el-col>
                        <el-col :span="19">{{personList.hujiAdress}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="12">
                      <div class="everyLine">
                        <el-row>
                          <el-col :span="10">籍贯</el-col>
                          <el-col :span="14">{{personList.nativePlace}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">参加工作时间</el-col>
                          <el-col :span="14">{{personList.positionTime |personTime}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">入党时间</el-col>
                          <el-col :span="14">{{personList.partyTime|personTime}}</el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="everyLine">
                        <el-row>
                          <el-col :span="10">出生地</el-col>
                          <el-col :span="14">{{personList.nativePlace}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">专业技术职称</el-col>
                          <el-col :span="14">{{personList.name}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">手机号码</el-col>
                          <el-col :span="14">{{personList.mobile}}</el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-col>
                </el-row>
              </el-row>
            </el-card>
            <h4>工作职责</h4>
            <el-card class="basic everyLine">
              <el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">现任职务</el-col>
                        <el-col :span="14">{{personList.presentPost}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">是否市管干部</el-col>
                        <el-col :span="14">{{personList.cityLeader==0?'否':'是'}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          是否专职纪检
                          （监察）干部
                        </el-col>
                        <el-col :span="14">{{personList.censorLeader==0?'否':'是'}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">分管部门（岗位职责）</el-col>
                        <el-col :span="14">{{personList.duty}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">岗位风险类型</el-col>
                        <el-col :span="14">{{personList.riskType}}</el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">现级别</el-col>
                        <el-col :span="14">{{personList.presentRank}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">任现职级时间</el-col>
                        <el-col :span="14">{{personList.prePostTime | personTime}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          是否本单位/下属单位
                          党政一把手
                        </el-col>
                        <el-col :span="14">{{personList.leader==0?'否':'是'}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                </el-row>
              </el-row>
            </el-card>
            <h4>个人履历</h4>
            <el-card class="basic everyLine">
              <el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">最高学历</el-col>
                        <el-col :span="14">{{personList.higestEducation}}</el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">毕业学校与专业</el-col>
                        <el-col :span="14">{{personList.schoolAndMajor}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                </el-row>
              </el-row>
            </el-card>
            <div v-for="(item,index) in resumeList" :key='index'>
              <el-card class="basic everyLine">
                <el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="10">起止时间</el-col>
                          <el-col :span="14">{{item.beginTime | personTime}}-{{item.finishTime | personTime}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">
                            职务/所学专业和
                            所获学历学位
                          </el-col>
                          <el-col :span="14">{{item.persitionAndLevel}}</el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="10">工作/学习单位</el-col>
                          <el-col :span="14">{{item.unitName}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">级别</el-col>
                          <el-col :span="14">{{item.level}}</el-col>
                        </el-row>
                      </el-col>
                    </el-col>
                  </el-row>
                </el-row>
              </el-card>
            </div>
            <h4>父母、配偶及其父母、子女及其配偶情况</h4>
            <div v-for="(item,index) in familyList" :key="index">
              <el-card class="basic everyLine">
                <el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="10">称谓</el-col>
                          <el-col :span="14">{{item.relationship}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">姓名</el-col>
                          <el-col :span="14">{{item.name}}</el-col>
                        </el-row>
                      </el-col>
                      <el-row>
                        <el-col :span="12">
                          <el-row>
                            <el-col :span="10">是否共同生活</el-col>
                            <el-col :span="14">{{item.unitLocation=='0'?'否':'是'}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="10">政治面貌</el-col>
                            <el-col :span="14">{{item.political}}</el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-row>
                      <el-col :span="21">
                        <el-col :span="24">
                          <el-row>
                            <el-col :span="5">工作/学习单位</el-col>
                            <el-col :span="19">{{item.unitName}}</el-col>
                          </el-row>
                        </el-col>
                      </el-col>
                    </el-row>
                  </el-row>
                </el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">现任职务</el-col>
                        <el-col :span="14">{{item.post}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">证件名称</el-col>
                        <el-col :span="14">{{item.idcardType}}</el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">单位性质</el-col>
                        <el-col :span="14">{{item.unitType}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">证件号码</el-col>
                        <el-col :span="14">{{item.idcard}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="领导干部信息表(一)" name="second">
          <div>
            <h4>本人的婚姻变化情况</h4>
            <div v-for="(item,index) in childrenMarriageInfos" :key='index'>
              <el-card class="basic everyLine">
                <el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="10">姓名</el-col>
                          <el-col :span="14">{{item.name}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">民族</el-col>
                          <el-col :span="14">{{personList.nationals}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">婚姻状况</el-col>
                          <el-col :span="14">{{personList.marital}}</el-col>
                        </el-row>
                      </el-col>
  
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="10">性别</el-col>
                          <el-col :span="14">{{personList.sex==1?'男':'女'}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">政治面貌</el-col>
                          <el-col :span="14">{{personList.name}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">身份证</el-col>
                          <el-col :span="14">{{personList.idcard}}</el-col>
                        </el-row>
                      </el-col>
                    </el-col>
                    <el-col :span="3">
                      <div class="photo">
                        <img :src="personList.photoPath" alt="个人证件照" />
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-col :span="24">
                        <el-row>
                          <el-col :span="5">工作单位</el-col>
                          <el-col :span="19">{{personList.unitName}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="5">户籍地址</el-col>
                          <el-col :span="19">{{personList.hujiAdress}}</el-col>
                        </el-row>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-col :span="12">
                        <div class="everyLine">
                          <el-row>
                            <el-col :span="10">籍贯</el-col>
                            <el-col :span="14">{{personList.nativePlace}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="10">参加工作时间</el-col>
                            <el-col :span="14">{{personList.positionTime |personTime}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="10">入党时间</el-col>
                            <el-col :span="14">{{personList.partyTime|personTime}}</el-col>
                          </el-row>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="everyLine">
                          <el-row>
                            <el-col :span="10">出生地</el-col>
                            <el-col :span="14">{{personList.nativePlace}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="10">专业技术职称</el-col>
                            <el-col :span="14">{{personList.name}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="10">手机号码</el-col>
                            <el-col :span="14">{{personList.mobile}}</el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-col>
                  </el-row>
                </el-row>
              </el-card>
            </div>
            <h4>本人持有因私出国（境）证件的情况</h4>
            <el-card class="basic everyLine">
              <el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">现任职务</el-col>
                        <el-col :span="14">{{personList.presentPost}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">是否市管干部</el-col>
                        <el-col :span="14">{{personList.cityLeader==0?'否':'是'}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          是否专职纪检
                          （监察）干部
                        </el-col>
                        <el-col :span="14">{{personList.censorLeader==0?'否':'是'}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">分管部门（岗位职责）</el-col>
                        <el-col :span="14">{{personList.duty}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">岗位风险类型</el-col>
                        <el-col :span="14">{{personList.riskType}}</el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">现级别</el-col>
                        <el-col :span="14">{{personList.presentRank}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">任现职级时间</el-col>
                        <el-col :span="14">{{personList.prePostTime | personTime}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          是否本单位/下属单位
                          党政一把手
                        </el-col>
                        <el-col :span="14">{{personList.leader==0?'否':'是'}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                </el-row>
              </el-row>
            </el-card>
            <h4>本人因私出国（境）的情况</h4>
            <el-card class="basic everyLine">
              <el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">最高学历</el-col>
                        <el-col :span="14">{{personList.higestEducation}}</el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">毕业学校与专业</el-col>
                        <el-col :span="14">{{personList.schoolAndMajor}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                </el-row>
              </el-row>
            </el-card>
            <div v-for="(item,index) in resumeList" :key='index'>
              <el-card class="basic everyLine">
                <el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="10">起止时间</el-col>
                          <el-col :span="14">{{item.beginTime | personTime}}-{{item.finishTime | personTime}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">
                            职务/所学专业和
                            所获学历学位
                          </el-col>
                          <el-col :span="14">{{item.persitionAndLevel}}</el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="10">工作/学习单位</el-col>
                          <el-col :span="14">{{item.unitName}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">级别</el-col>
                          <el-col :span="14">{{item.level}}</el-col>
                        </el-row>
                      </el-col>
                    </el-col>
                  </el-row>
                </el-row>
              </el-card>
            </div>
            <h4>子女与外国人、无国籍人、港澳以及台湾居民通婚的情况</h4>
            <div v-for="(item,index) in familyList" :key="index">
              <el-card class="basic everyLine">
                <el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="10">称谓</el-col>
                          <el-col :span="14">{{item.relationship}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">姓名</el-col>
                          <el-col :span="14">{{item.name}}</el-col>
                        </el-row>
                      </el-col>
                      <el-row>
                        <el-col :span="12">
                          <el-row>
                            <el-col :span="10">是否共同生活</el-col>
                            <el-col :span="14">{{item.unitLocation=='0'?'否':'是'}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="10">政治面貌</el-col>
                            <el-col :span="14">{{item.political}}</el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-row>
                      <el-col :span="21">
                        <el-col :span="24">
                          <el-row>
                            <el-col :span="5">工作/学习单位</el-col>
                            <el-col :span="19">{{item.unitName}}</el-col>
                          </el-row>
                        </el-col>
                      </el-col>
                    </el-row>
                  </el-row>
                </el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">现任职务</el-col>
                        <el-col :span="14">{{item.post}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">证件名称</el-col>
                        <el-col :span="14">{{item.idcardType}}</el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">单位性质</el-col>
                        <el-col :span="14">{{item.unitType}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">证件号码</el-col>
                        <el-col :span="14">{{item.idcard}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="领导干部信息表(二)" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="领导干部信息表(三)" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calendar: require("../../assets/img/calendar.png"),
      // type: "",
      // idcard: "",
      // dateYear: "",
      activeName: "first",
      personList: [],
      resumeList: [],
      familyList: [],
      type:0,
      childrenMarriageInfos:[],
    };
  },
  created() {
    // this.getQuery();
    this.getBasicInfo();
  },
  methods: {
    handleClick(tab) {
      console.log(tab.index);
      this.type=tab.index
    },
    // getQuery() {
    //   this.type = this.$route.query.type;
    //   this.idcard = this.$route.query.idcard;
    //   this.dateYear = this.$route.query.dateYear;
    //   console.log("接收", this.idcard);
    //   console.log("接收", this.dateYear);
    // },
    getBasicInfo() {
      this.$http
        .get("/archive/infoPerson", {
          params: {
            type: this.type,
            idcard: this.$route.query.idcard,
            dateYear: this.$route.query.dateYear
          }
        })
        .then(res => {
          console.log("详情", res);
          console.log("身份证", this.$route.query.idcard);
          this.personList = res.data.data.person;
          this.resumeList = res.data.data.resume;
          this.familyList = res.data.data.family;
          this.childrenMarriageInfos=res.data.data.childrenMarriageInfos
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
  //   watch: {
  //       "$route":'getQuery'
  //   },
};
</script>

<style lang='less' scoped>
.container {
  padding: 0 130px;
  // min-width: 980px;
  overflow-x: scroll;
  .basic {
    font-size: 13px;
  }

  .photo {
    border: 1px solid #000;
    width: 100%;
    height: 100%;
  }
  .title0 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title1 {
      display: flex;
      align-items: center;
      .calendarPng {
        width: 26px;
        height: 26px;
        padding: 0 10px;
      }
    }
  }
  .archivesTitle {
    display: flex;
    align-items: center;
  }
  .everyLine {
    line-height: 40px;
  }
}
</style>