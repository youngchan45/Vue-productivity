<template>
  <div>
    <div slot="header" class="clearfix">
      <h3>组织架构</h3>
      <el-col :span="12">
        <el-card>
          <el-tree
            :data="data"
            node-key="id"
            :props="defaultProps"
            @node-click="handleNodeClick"
            highlight-current
            default-expand-all
            :default-expanded-keys="[0]"
            ref="tree"
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="orgInfo">
            <div>
              <span>部门名称</span>
              <span>{{this.data[0].label}}</span>
            </div>
            <div>
              <span>部门负责人</span>
              <span>{{this.data[0].deptLeader}}</span>
            </div>
            <div>
              <span>上级部门名称</span>
              <span>{{this.data[0].superiorId}}</span>
            </div>
            <div>
              <span>所在层级</span>
              <span>{{this.data[0].level}}</span>
            </div>
            <div>
              <span>部门联系人</span>
              <span>{{this.data[0].deptContactor}}</span>
            </div>
            <div>
              <span>部门电话</span>
              <span>{{this.data[0].deptPhoneNum}}</span>
            </div>
            <div>
              <span>部门地址</span>
              <span>{{this.data[0].deptLocation}}</span>
            </div>
            <div>
              <span>备注</span>
              <span>{{this.data[0].remark}}</span>
            </div>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
              </span>
            </span>
          </div>
          <div class="btnPosition">
            <el-button type="primary" size="small" @click="getCheckedKeys">分配单位权限</el-button>
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
          deptId: 1,
          label: "1级",
          deptName: "部门名称11",
          superiorId: null,
          deptLeader: "部门负责人11",
          // superiorId:"上级部门名称11",
          level: "所在层级11",
          deptContactor: "部门联系人11",
          deptPhoneNum: "部门电话11",
          deptLocation: "部门地址11",
          remark: "备注11",
          children: [
            {
              deptId: 2,
              label: "2级",
              deptName: "部门名称22",
              superiorId: 1,
              deptLeader: "部门负责人22",
              // superiorId:"上级部门名称22",
              level: "所在层级22",
              deptContactor: "部门联系人22",
              deptPhoneNum: "部门电话22",
              deptLocation: "部门地址22",
              remark: "备注22",
              children: [
                {
                  deptId: 3,
                  label: "3级",
                  deptName: "部门名称33",
                  superiorId: 2,
                  deptLeader: "部门负责人33",
                  // superiorId:"上级部门名称33",
                  level: "所在层级33",
                  deptContactor: "部门联系人33",
                  deptPhoneNum: "部门电话33",
                  deptLocation: "部门地址33",
                  remark: "备注33"
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
      test: "",
      arr: [{ data: "", eptId: "", superiorId: "", deptName: "" }]
    };
  },
  created() {
    this.getTree();
    // this.getCheckedNodes();
  },
  methods: {
    handleNodeClick(data,node, vuecomponent) {
      console.log('data:',  data,'\n' ,'node:', node, '\n', 'vuecomponent',vuecomponent);
      this.test = data;
    },
    getCheckedKeys() {
      console.log("获取", this.$refs.tree.getCheckedKeys());
    },
    async getTree() {
      await this.$http.get("/organization/getTree").then(res => {
        console.log("树", res);
        this.arr = res.data.data; //一团不分层的组织架构数组
        // res.data.data.forEach(item => {
        //   this.orgData.push({ label: item.deptName });
        // });
        let parent = [];
        //循环这一团数组
        for (let i = 0; i < this.arr.length; i++) {
          this.arr.deptId = res.data.data[i].deptId; //1
          this.arr.superiorId = res.data.data[i].superiorId; //null
          this.arr.deptName = res.data.data[i].deptName; //市纪委
          this.arr.deptLeader = res.data.data[i].deptLeader;
          this.arr.deptContactor = res.data.data[i].deptContactor;
          this.arr.level = res.data.data[i].level;
          this.arr.deptLocation = res.data.data[i].deptLocation;
          this.arr.deptPhoneNum = res.data.data[i].deptPhoneNum;
          this.arr.remark = res.data.data[i].remark;
          if (this.arr.superiorId !== null) return;
          let obj = {
            label: this.arr.deptName,
            deptId: this.arr.deptId,
            superiorId: this.arr.superiorId,
            deptLeader: this.arr.deptLeader,
            deptContactor: this.arr.deptContactor,
            level: this.arr.level,
            deptLocation: this.arr.deptLocation,
            deptPhoneNum: this.arr.deptPhoneNum,
            remark: this.arr.remark,
            children: []
          };
          parent.push(obj); //数组加数组值
          // console.log('父亲0',parent)
          //把父亲顶级放进去
          this.data = parent;
          console.log("父亲0", this.data[i].label);
        }
      });
      // this.children(this.data);
      // children(parent)
    },

    // children(parent) {
    //   this.$http.get("/organization/getTree").then(res => {
    //     console.log("子树", res);
    //     this.arr = res.data.data; //一团不分层的组织架构数组
    //     // res.data.data.forEach(item => {
    //     //   this.orgData.push({ label: item.deptName });
    //     // });
    //     // let parent = [];
    //   if (this.arr.length != 0) {
    //     for (let i = 0; i < parent.length; i++) {
    //       for (let j = 0; j < this.arr.length; j++) {
    //         if (parent[i].deptId == this.arr[j][superiorId]) {
    //           let obj = {
    //             label: this.arr[j][name],
    //             deptId: this.arr[j][deptId],
    //             children: []
    //           };
    //           parent[i].children.push(obj);
    //         }
    //       }
    //     }
    //     // children(parent[i].children);
    //   }
    //   return parent;
    //   })
    // },

    //新增下级部门
    append(data) {
      const newChild = { id: "3", label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    //删除下级部门
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.deptid);
      children.splice(index, 1);
    }
  }
};
</script>

<style scoped lang='less'>
h3 {
  text-align: center;
}
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
