<template>
  <div>
    <div slot="header" class="clearfix">
      <h3>组织架构</h3>
      <el-col :span="12">
        <el-card>
          <el-tree
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
            highlight-current
            default-expand-all
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="orgInfo">
            <div>
              <span>部门名称</span>
              <span>{{this.arr.deptName}}</span>
            </div>
            <div>
              <span>部门负责人</span>
              <span>{{this.data[0].label}}</span>
            </div>
            <div>
              <span>上级部门名称</span>
              <span>{{this.test.label}}</span>
            </div>
            <div>
              <span>所在层级</span>
              <span>{{this.test.id}}</span>
            </div>
            <div>
              <span>部门联系人</span>
              <span>{{this.test.deptLeader}}</span>
            </div>
            <div>
              <span>部门电话</span>
              <span>111111</span>
            </div>
            <div>
              <span>部门地址</span>
              <span>111111</span>
            </div>
            <div>
              <span>备注</span>
              <span>111111</span>
            </div>
          </div>
          <div class="btnPosition">
            <el-button type="primary" size="small">分配单位权限</el-button>
            <el-button type="primary" size="small">新建下级</el-button>
            <el-button type="primary" size="small">新建同级</el-button>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="primary" size="small">删除</el-button>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          deptLeader:'部门负责人11',
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      arr: [],
      test: ""
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.test = data;
    },

    async getTree() {
      await this.$http.get("/organization/getTree").then(res => {
        console.log("树", res);
        this.arr = res.data.data[0];
        // res.data.data.forEach(item => {
        //   this.orgData.push({ label: item.deptName });
        // });
      });
    }

    //     // 循环出父节点
    //     toTreeData(data,id,level,name) {
    // // 建立个树形结构,需要定义个最顶层的父节点，pid是0
    // let parent = [];
    // for (let i = 0; i < data.length; i++) {
    // // console.log(data[i][pid])
    // if(data[i][level] !== 0){
    // }else{
    // let obj = {
    // label: data[i][name],
    // id: data[i][id],
    // children: []
    // };
    // parent.push(obj);//数组加数组值
    // }
    // }
    // children(parent)
    // // 调用子节点方法,参数为父节点的数组
    // children(parent) {
    // // console.log(parent)
    // if (data.length !== 0) {
    // for (let i = 0; i < parent.length; i++) {
    // for (let j = 0; j < data.length; j++) {
    // if (parent[i].id == data[j][level]){
    // let obj = {
    // label: data[j][name],
    // id: data[j][id],
    // children: []
    // };
    // parent[i].children.push(obj);
    // }
    // }
    // children(parent[i].children);
    // }
    // }
    // }
    // return parent;
    // },

    // //树形列表
    // getTreeData() {
    // getTreeMenu('').then(res => {
    // this.loading = false;
    // let treeList = res.result;
    // const userStr = JSON.parse(treeList);//从一个字符串中解析出json对象
    // this.treeData = toTreeData(userStr,"id","level","name")
    // //this.chils = JSON.stringify(result, null, '\t');//从一个对象解析出字符串
    // })
    // },
  },
  created() {
    this.getTree();
  }
};
</script>
<style scoped lang='less'>
.orgInfo {
  font-size: 14px;
  div {
    padding: 10px 0;
    width: 100%;
    display: flex;
    span {
      margin-right: 10px;
      width: 50%;
    }
  }
  .btnPosition {
    display: flex;
  }
}
</style>
