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

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" stretch>
      <el-tab-pane label="个人基本情况" class="inTabs" name="first">
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
                        <el-col :span="14">{{personList.techLevel}}</el-col>
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
          <div v-for="item in resumeList" :key="item.id">
            <el-card class="basic everyLine">
              <el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="10">起止时间</el-col>
                        <el-col
                          :span="14"
                        >{{item.beginTime | personTime}}-{{item.finishTime | personTime}}</el-col>
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
          <div v-for="item in familyList" :key="item.id">
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
          <el-card class="basic everyLine">
            <el-row>
              <el-col>
                <el-col :span="6">婚姻变化情况</el-col>
                <el-col :span="18">{{marriageChanges.length==0?'无变化':'有变化'}}</el-col>
              </el-col>
            </el-row>
            <div v-for="item in marriageChanges" :key="item.id">
              <el-row>
                <el-col>
                  <el-col :span="6">变化情况</el-col>
                  <el-col :span="6">{{item.changes }}</el-col>
                  <el-col :span="6">变化时间</el-col>
                  <el-col :span="6">{{item.changeTime |personTime}}</el-col>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <h4>本人持有因私出国（境）证件的情况</h4>
          <el-card class="basic everyLine">
            <el-row>
              <el-col :span="8">与上一年度相比有无变化</el-col>
              <el-col :span="16">{{documents.length=='0'?'无变化':'有变化'}}</el-col>
            </el-row>
          </el-card>
          <h4>本人因私出国（境）的情况</h4>
          <div v-for="item in abroadInfos" :key="item.id">
            <el-card class="basic everyLine">
              <el-row>
                <el-col>
                  <el-col :span="6">起止时间</el-col>
                  <el-col :span="6">{{item.startTime |personTime}}-{{item.endTime |personTime}}</el-col>
                  <el-col :span="6">所用护照/证件号码</el-col>
                  <el-col :span="6">{{item.idNumber}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">审批机构</el-col>
                  <el-col :span="6">{{item.appvoralUnit}}</el-col>
                  <el-col :span="6">所到国家（地区）</el-col>
                  <el-col :span="6">{{item.countryArea}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">出国（境）事由</el-col>
                  <el-col :span="6">{{item.abroadReason}}</el-col>
                  <el-col :span="6">委托待办机构</el-col>
                  <el-col :span="6">{{item.entrustUnit}}</el-col>
                </el-col>
              </el-row>
            </el-card>
          </div>
          <h4>子女与外国人、无国籍人、港澳以及台湾居民通婚的情况</h4>
          <el-card class="basic everyLine">
            <el-row>
              <el-col>
                <el-col :span="8">与上一年度相比有无变化</el-col>
                <el-col :span="16">{{childrenMarriageInfos.length==0?'无变化':'有变化'}}</el-col>
              </el-col>
            </el-row>
          </el-card>
          <div v-for="item in childrenMarriageInfos" :key="item.id">
            <el-card class="basic everyLine">
              <el-row>
                <el-col>
                  <el-col :span="6">子女称谓</el-col>
                  <el-col :span="6">{{item.relationship }}</el-col>
                  <el-col :span="6">子女姓名</el-col>
                  <el-col :span="6">{{item.name}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">子女配偶姓名</el-col>
                  <el-col :span="6">{{item.spouseName }}</el-col>
                  <el-col :span="6">国籍（地区）</el-col>
                  <el-col :span="6">{{item.nationality}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">工作（学习）单位</el-col>
                  <el-col :span="6">{{item.unitName }}</el-col>
                  <el-col :span="6">职务</el-col>
                  <el-col :span="6">{{item.post}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">登记时间</el-col>
                  <el-col :span="18">{{item.checkInTime |personTime }}</el-col>
                </el-col>
              </el-row>
            </el-card>
          </div>

          <h4>配偶、子女移居国（境）外的情况</h4>
          <el-card class="basic everyLine">
            <el-row>
              <el-col>
                <el-col :span="8">与上一年度相比有无变化</el-col>
                <el-col :span="16">{{familyLifeAbroads.length==0?'无变化':'有变化'}}</el-col>
              </el-col>
            </el-row>
          </el-card>
          <div v-for="item in familyLifeAbroads" :key="item.id">
            <el-card class="basic everyLine">
              <el-row>
                <el-col>
                  <!-- <el-col :span="6">子女称谓</el-col>
                    <el-col :span="6">{{item.relationship }}</el-col>
                    <el-col :span="6">子女姓名</el-col>
                  <el-col :span="6">{{item.name}}</el-col>-->
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <!-- <el-col :span="6">子女配偶姓名</el-col>
                    <el-col :span="6">{{item.spouseName }}</el-col>
                    <el-col :span="6">国籍（地区）</el-col>
                  <el-col :span="6">{{item.nationality}}</el-col>-->
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <!-- <el-col :span="6">工作（学习）单位</el-col>
                    <el-col :span="6">{{item.unitName }}</el-col>
                    <el-col :span="6">职务</el-col>
                  <el-col :span="6">{{item.post}}</el-col>-->
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <!-- <el-col :span="6">登记时间</el-col>
                  <el-col :span="18">{{item.checkInTime |personTime }}</el-col>-->
                </el-col>
              </el-row>
            </el-card>
          </div>

          <h4>配偶、子女虽未移居国（境）外，但连续在国（境）外工作、生活一年以上情况</h4>
          <el-card class="basic everyLine">
            <el-row>
              <el-col>
                <el-col :span="8">与上一年度相比有无变化</el-col>
                <el-col :span="16">{{immigrants.length==0?'无变化':'有变化'}}</el-col>
              </el-col>
            </el-row>
          </el-card>
          <div v-for="item in immigrants" :key="item.id">
            <el-card class="basic everyLine">
              <el-row>
                <el-col>
                  <!-- <el-col :span="6">子女称谓</el-col>
                    <el-col :span="6">{{item.relationship }}</el-col>
                    <el-col :span="6">子女姓名</el-col>
                  <el-col :span="6">{{item.name}}</el-col>-->
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <!-- <el-col :span="6">子女配偶姓名</el-col>
                    <el-col :span="6">{{item.spouseName }}</el-col>
                    <el-col :span="6">国籍（地区）</el-col>
                  <el-col :span="6">{{item.nationality}}</el-col>-->
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <!-- <el-col :span="6">工作（学习）单位</el-col>
                    <el-col :span="6">{{item.unitName }}</el-col>
                    <el-col :span="6">职务</el-col>
                  <el-col :span="6">{{item.post}}</el-col>-->
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <!-- <el-col :span="6">登记时间</el-col>
                  <el-col :span="18">{{item.checkInTime |personTime }}</el-col>-->
                </el-col>
              </el-row>
            </el-card>
          </div>

          <h4>配偶、子女及其配偶被司法机关追究刑事责任的情况</h4>
          <el-card class="basic everyLine">
            <el-row>
              <el-col>
                <el-col :span="8">与上一年度相比有无变化</el-col>
                <el-col :span="16">{{familyPunishs.length==0?'无变化':'有变化'}}</el-col>
              </el-col>
            </el-row>
          </el-card>
          <div v-for="item in familyPunishs" :key="item.id">
            <el-card class="basic everyLine">
              <el-row>
                <el-col>
                  <el-col :span="6">称谓</el-col>
                  <el-col :span="6">{{item.relationship }}</el-col>
                  <el-col :span="6">姓名</el-col>
                  <el-col :span="6">{{item.name}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">被追究的时间</el-col>
                  <el-col :span="6">{{item.punishTime |personTime }}</el-col>
                  <el-col :span="6">被追究的原因</el-col>
                  <el-col :span="6">{{item.punishReason}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">处理阶段</el-col>
                  <el-col :span="6">{{item.stage }}</el-col>
                  <el-col :span="6">处理结果</el-col>
                  <el-col :span="6">{{item.result}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <!-- <el-col :span="6">登记时间</el-col>
                  <el-col :span="18">{{item.checkInTime |personTime }}</el-col>-->
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="领导干部信息表(二)" name="third">
        <div>
          <h4>本人的工资及各类奖金、津贴、补贴等</h4>
          <el-card class="basic everyLine" v-for="(item,index) in incomesTwo" :key="index">
            <el-row>
              <el-col>
                <el-col :span="6">合计（万元/全年）</el-col>
                <el-col :span="6">{{item.total }}</el-col>
                <el-col :span="6">工资（含津贴、补贴）（万元/全年）</el-col>
                <el-col :span="6">{{item.basicInfoId}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">奖金（万元/全年）</el-col>
                <el-col :span="6">{{item.bonus }}</el-col>
                <el-col :span="6">其他（万元/全年）</el-col>
                <el-col :span="6">{{item.others}}</el-col>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <h4>本人从事讲学、写作、咨询、审稿、书画等劳务所得</h4>
        <el-card class="basic everyLine" v-for="(item,index) in otherIncomes" :key="index">
          <el-row>
            <el-col>
              <el-col :span="6">合计（万元/全年）</el-col>
              <el-col :span="6">{{item.total }}</el-col>
              <el-col :span="6">讲学（万元/全年）</el-col>
              <el-col :span="6">{{item.lecture}}</el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-col :span="6">写作（万元/全年）</el-col>
              <el-col :span="6">{{item.writing }}</el-col>
              <el-col :span="6">咨询（万元/全年）</el-col>
              <el-col :span="6">{{item.consultant}}</el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-col :span="6">审稿（万元/全年）</el-col>
              <el-col :span="6">{{item.review }}</el-col>
              <el-col :span="6">书画（万元/全年）</el-col>
              <el-col :span="6">{{item.painting}}</el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-col :span="6">其他（万元/全年）</el-col>
              <el-col :span="6">{{item.others }}</el-col>
            </el-col>
          </el-row>
        </el-card>
        <h4>本人、配偶、共同生活的子女为所有权人或者共有人的房产情况</h4>
        <el-card class="basic everyLine">
          <el-row>
            <el-col>
              <el-col :span="8">是否持有房产</el-col>
              <el-col :span="16">{{estateInfos.length==0?'否':'是'}}</el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-col :span="8">与上一年度相比有无变化</el-col>
              <el-col :span="16">{{estateInfos.length==0?'无变化':'有变化'}}</el-col>
            </el-col>
          </el-row>
        </el-card>
        <div v-for="(item,index) in estateInfos" :key="index">
          <el-card class="basic everyLine">
            <el-row>
              <el-col>
                <el-col :span="6">产权人</el-col>
                <el-col :span="6">{{item.name}}</el-col>
                <el-col :span="6">与本人关系</el-col>
                <el-col :span="6">{{item.relationship}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">产权共有人</el-col>
                <el-col :span="6">{{item.pName}}</el-col>
                <el-col :span="6">与本人关系</el-col>
                <el-col :span="6">{{item.relate}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">建筑面积（平方米）</el-col>
                <el-col :span="6">{{item.area}}</el-col>
                <el-col :span="6">产权性质</el-col>
                <el-col :span="6">{{item.attribute}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">产权来源（去向）</el-col>
                <el-col :span="6">{{item.source}}</el-col>
                <el-col :span="6">房产证号</el-col>
                <el-col :span="6">{{item.houseIdcard}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">交易时间</el-col>
                <el-col :span="6">{{item.tradeTime |personTime}}</el-col>
                <el-col :span="6">交易价格（万元）</el-col>
                <el-col :span="6">{{item.tradePrice}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">地址</el-col>
                <el-col :span="18">{{item.address}}</el-col>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <h4>配偶、子女及其配偶经商办企业的情况</h4>
        <el-card class="basic everyLine">
          <el-row>
            <el-col>
              <el-col :span="8">与上一年度相比有无变化</el-col>
              <el-col :span="16">{{familyBusinesses.length==0?'无变化':'有变化'}}</el-col>
            </el-col>
          </el-row>
        </el-card>
        <div v-for="(item,index) in familyBusinesses" :key="index">
          <el-card class="basic everyLine">
            <el-row>
              <el-col>
                <el-col :span="6">称谓</el-col>
                <el-col :span="6">{{item.relationship }}</el-col>
                <el-col :span="6">姓名</el-col>
                <el-col :span="6">{{item.name}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">统一社会信用代码/注册号</el-col>
                <el-col :span="6">{{item.companyIdcard }}</el-col>
                <el-col :span="6">市场主体名称</el-col>
                <el-col :span="6">{{item.companyName}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">成立日期</el-col>
                <el-col :span="6">{{item.startTime |personTime }}</el-col>
                <el-col :span="6">注册地</el-col>
                <el-col :span="6">{{item.registerPlace}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">经营地</el-col>
                <el-col :span="6">{{item.businesPlace }}</el-col>
                <el-col :span="6">市场主体类型</el-col>
                <el-col :span="6">{{item.topicType}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">资金数额（万元）</el-col>
                <el-col :span="6">{{item.fundAmount }}</el-col>
                <el-col :span="6">个人出资额（万元）</el-col>
                <el-col :span="6">{{item.provideFund}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">出资比例</el-col>
                <el-col :span="6">{{item.ratio }}</el-col>
                <el-col :span="6">备注</el-col>
                <el-col :span="6">{{item.remark}}</el-col>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <h4>本人、配偶、共同生活子女拥有汽车的情况</h4>
        <el-card class="basic everyLine">
          <el-row>
            <el-col>
              <el-col :span="8">与上一年度相比有无变化</el-col>
              <el-col :span="16">{{famityCars.length==0?'无变化':'有变化'}}</el-col>
            </el-col>
          </el-row>
        </el-card>
        <div v-for="(item,index) in famityCars" :key="index">
          <el-card class="basic everyLine">
            <el-row>
              <el-col>
                <el-col :span="6">称谓</el-col>
                <el-col :span="6">{{item.relationship }}</el-col>
                <el-col :span="6">车主姓名</el-col>
                <el-col :span="6">{{item.name}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">来源</el-col>
                <el-col :span="6">{{item.source }}</el-col>
                <el-col :span="6">汽车型号</el-col>
                <el-col :span="6">{{item.carType}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">汽车排量</el-col>
                <el-col :span="6">{{item.vehicleCapacity }}</el-col>
                <el-col :span="6">购买价格（人民币,万元）</el-col>
                <el-col :span="6">{{item.price}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">车牌号码</el-col>
                <el-col :span="18">{{item.carIdcard }}</el-col>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="领导干部信息表(三)" name="fourth">
        <h4>述责述廉情况表</h4>
        <h4>主动上交贵重物品清单</h4>
        <h4>操办婚丧喜庆事宜情况</h4>
        <!-- <div v-for="item in estateInfos" :key="item.id">
            <el-card class="basic everyLine">
              <el-row>
                <el-col>
                  <el-col :span="6">产权人</el-col>
                  <el-col :span="6">{{item.name}}</el-col>
                  <el-col :span="6">与本人关系</el-col>
                  <el-col :span="6">{{item.relationship}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">产权共有人</el-col>
                  <el-col :span="6">{{item.pName}}</el-col>
                  <el-col :span="6">与本人关系</el-col>
                  <el-col :span="6">{{item.relate}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">建筑面积（平方米）</el-col>
                  <el-col :span="6">{{item.area}}</el-col>
                  <el-col :span="6">产权性质</el-col>
                  <el-col :span="6">{{item.attribute}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">产权来源（去向）</el-col>
                  <el-col :span="6">{{item.source}}</el-col>
                  <el-col :span="6">房产证号</el-col>
                  <el-col :span="6">{{item.houseIdcard}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">交易时间</el-col>
                  <el-col :span="6">{{item.tradeTime |personTime}}</el-col>
                  <el-col :span="6">交易价格（万元）</el-col>
                  <el-col :span="6">{{item.tradePrice}}</el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-col :span="6">地址</el-col>
                  <el-col :span="18">{{item.address}}</el-col>
                </el-col>
              </el-row>
            </el-card>
        </div>-->
        <h4>被谈话函询情况</h4>
        <div v-for="(item,index) in talkInquirys" :key="index">
          <el-card class="basic everyLine">
            <h5>被谈话函询情况({{index+1}})</h5>
            <el-row>
              <el-col>
                <el-col :span="6">谈话函询时间</el-col>
                <el-col :span="6">{{item.talkTime |personTime}}</el-col>
                <el-col :span="6">谈话函询类型</el-col>
                <el-col :span="6">{{item.type}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">谈话人（函询单位）</el-col>
                <el-col :span="18">{{item.talkerOrUnit }}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">主要问题</el-col>
                <el-col :span="18">{{item.problem}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">本人说明及认识</el-col>
                <el-col :span="18">{{item.understand }}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">附件名称</el-col>
                <el-col :span="6">{{item.attachName }}</el-col>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <h4>被诫勉谈话情况</h4>
        <div v-for="(item,index) in admonishs" :key="index">
          <el-card class="basic everyLine">
            <h5>被谈话函询情况({{index+1}})</h5>
            <el-row>
              <el-col>
                <el-col :span="6">被诫勉时间</el-col>
                <el-col :span="6">{{item.time |personTime }}</el-col>
                <el-col :span="6">诫勉方式</el-col>
                <el-col :span="6">{{item.type}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">谈话人（实施诫勉单位）</el-col>
                <el-col :span="6">{{item.talkerOrUnit }}</el-col>
                <el-col :span="6">谈话人职务</el-col>
                <el-col :span="6">{{item.post}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">诫勉认定事实</el-col>
                <el-col :span="18">{{item.facts}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">本人认识</el-col>
                <el-col :span="18">{{item.understand }}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">附件名称</el-col>
                <el-col :span="6">{{item.attachName }}</el-col>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <h4>被党纪政务处分情况</h4>
        <div v-for="(item,index) in sanctions" :key="index">
          <el-card class="basic everyLine">
            <h5>违纪处分情况({{index+1}})</h5>
            <el-row>
              <el-col>
                <el-col :span="6">党纪处分类型</el-col>
                <el-col :span="6">{{item.dtype}}</el-col>
                <el-col :span="6">政务处分类型</el-col>
                <el-col :span="6">{{item.ztype}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">党纪处分时间</el-col>
                <el-col :span="6">{{item.dtime |personTime }}</el-col>
                <el-col :span="6">政务处分时间</el-col>
                <el-col :span="6">{{item.ztime |personTime }}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">违纪及具体处理情况</el-col>
                <el-col :span="18">{{item.facts}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col :span="6">附件名称</el-col>
                <el-col :span="18">{{item.attachName }}</el-col>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <h4>领导干部个人认为需要报告的其他事项</h4>
      </el-tab-pane>
    </el-tabs>
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
      type: 0,
      //表一
      personList: [],
      resumeList: [],
      familyList: [],
      //表二
      childrenMarriageInfos: [],
      familyPunishs: [],
      documents: [],
      marriageChanges: [],
      familyLifeAbroads: [],
      abroadInfos: [],
      immigrants: [],
      //表三
      incomesTwo: [],
      famityCars: [],
      estateInfos: [],
      otherIncomes: [],
      familyBusinesses: [],
      //表四
      dutyHonests: [],
      goodsItems: [],
      weddingsFunerals: [],
      admonishs: [],
      items: [],
      talkInquirys: [],
      sanctions: [],
      remarks: []
    };
  },
  created() {
    // this.getQuery();
    this.getBasicInfo();
  },
  methods: {
    handleClick(tab) {
      console.log(tab.index);
      this.type = tab.index;
      this.getBasicInfo();
    },
    // getQuery() {
    //   this.type = this.$route.query.type;
    //   this.idcard = this.$route.query.idcard;
    //   this.dateYear = this.$route.query.dateYear;
    //   console.log("接收", this.idcard);
    //   console.log("接收", this.dateYear);
    // },
    async getBasicInfo() {
      await this.$http
        .get("/archive/infoPerson", {
          params: {
            type: this.type,
            idcard: this.$route.query.idcard,
            dateYear: this.$route.query.dateYear
          }
        })
        .then(res => {
          //表一
          if (this.type == 0) {
            this.personList = res.data.data.person;
            this.resumeList = res.data.data.resume;
            this.familyList = res.data.data.family;
          }

          //表二
          if (this.type == 1) {
            this.childrenMarriageInfos = res.data.data.childrenMarriageInfos;
            this.familyPunishs = res.data.data.familyPunishs;
            this.documents = res.data.data.documents;
            this.marriageChanges = res.data.data.marriageChanges;
            this.familyLifeAbroads = res.data.data.familyLifeAbroads;
            this.abroadInfos = res.data.data.abroadInfos;
            this.immigrants = res.data.data.immigrants;
          }
          //表三
          if (this.type == 2) {
            this.incomesTwo = res.data.data.incomes;
            this.famityCars = res.data.data.famityCars;
            this.estateInfos = res.data.data.estateInfos;
            this.otherIncomes = res.data.data.otherIncomes;
            this.familyBusinesses = res.data.data.familyBusinesses;
          }
          //表四
          else {
            this.dutyHonests = res.data.data.dutyHonests;
            this.goodsItems = res.data.data.goodsItems;
            this.weddingsFunerals = res.data.data.weddingsFunerals;
            this.admonishs = res.data.data.admonishs;
            this.items = res.data.data.items;
            this.talkInquirys = res.data.data.talkInquirys;
            this.sanctions = res.data.data.sanctions;
            this.remarks = res.data.data.remarks;
          }
          console.log("表" + this.type + "详情", res);
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
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