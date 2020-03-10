<template>
  <div class="container">
    <el-tree
      :data="menuData"
      :props="treeProps"
      node-key="id"
      highlight-current
      default-expand-all
      ref="tree"
      :expand-on-click-node="false"
      draggable
      :allow-drop="moveMenu"
    ></el-tree>
    <div>
      <el-button @click="editMenu">编辑</el-button>
      <el-button @click="delMenu">删除</el-button>
      <el-button @click="resetMenu">重置</el-button>
      <el-button @click="saveMenu">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuData: [],
      treeProps: {
        label: "menuName",
        children: "childrens"
      },
      isEidt: false
    };
  },
  created() {
    this.getTree();
  },
  methods: {
    handleNodeClick(data, node, vuecomponent) {
      console.log(
        "data:",
        data,
        "\n",
        "node:",
        node,
        "\n",
        "vuecomponent",
        vuecomponent
      );
      this.test = data;
    },
    async getTree() {
      await this.$http.get("/menu/getMenu").then(res => {
        console.log("look", res.data.data);
        this.menuData = res.data.data;
        // if(res.status!=200){
        //     this.$message.error('获取菜单失败');
        //     // return;
        // }
        // this.menuData.label=res.data.data.menuName
        // res.data.data.forEach(item=>{
        //     // if(item.childrens==0){
        //         this.menuData.push({label:item.menuName,children:item.childrens})
        //     // }
        // })
        //         for(var i=0;i<res.data.data.length;i++){
        // this.menuData[i].label=res.data.data[i].label;
        // this.menuData[i].children=res.data.data[i].children;
        //         }
        // for(var i =0; i<res.data.data.length;i++){
        //   for(var j=0;j<res.data.data.length;j++){
        //     this.menuList[i].label=res.data.data[i].menuName;
        //     this.menuList[i].children=res.data.data[i].childrens;
        //     this.menuList[i].children[j].label=res.data.data[i].childrens[j].menuName;
        //     this.menuList[i].children[j].children=res.data.data[i].childrens[j].childrens;
        //   }
        // }

        //不可删！！！！！
        // for (let i = 0; i < res.data.data.length; i++) {
        //   let obj = {
        //     label: res.data.data[i].menuName,
        //     children: []
        //   };
        //   this.menuData.push(obj);
        // }

        // for (let i = 0; i < res.data.data.length; i++) {
        //   for (let j = 0; j < res.data.data[i].childrens.length; j++) {
        //     let childObj = {
        //       label: res.data.data[i].childrens[j].menuName,
        //       children: []
        //     };
        //     this.menuData[i].children.push(childObj);
        //     // console.log("look", res.data.data[6].childrens[2].menuName);
        //
        //   }
        // }
      });
    },
    editMenu() {
      this.isEidt = true;
      this.$message.info("请拖曳编辑菜单顺序");
    },
    moveMenu(moveNode, inNode, type) {
      console.log("所拖对象的ID", moveNode);
       console.log("移入对象的ID", inNode);
       console.log("type", type);

      let moveNodeLength = moveNode.data.sort.toString().length;
      let inNodeLength = inNode.data.sort.toString().length;
      let moveNodeOne = moveNode.data.sort.toString().substring(0, 1);
      let inNodeOne = inNode.data.sort.toString().substring(0, 1);
          console.log("----",moveNodeOne,inNodeOne)
      
      if (moveNodeLength === inNodeLength) {
        if (moveNodeOne !== inNodeOne) {
          return type === "prev";
        }
      } else {
        // 不同级进行处理
      }

      //自己的子级只能在内部移动\
      // if (moveNodeOne === inNodeOne) {
      //     return type === "prev";
      //   }else{
      //     //Dictionarymanagement.vuereturn \
      //     return false;
      //   }
      if (moveNodeLength === inNodeLength) {
        if (moveNodeOne === inNodeOne) {
          return type === "prev";
        }else{
        return ;
      }
      } else {
        // 不同级进行处理
      }

      //子级不能去别人的子级
    },
    // moveMenu(moveNode, inNode, type) {
    //   console.log("所拖对象的ID", moveNode.data.sort);
    //   console.log("移入对象的ID", inNode.data.sort);
    //   console.log("sort长度", moveNode.data.sort.toString().length);
    //   console.log(
    //     "截取移动ID第一位",
    //     moveNode.data.sort.toString().substring(0, 1)
    //   );
    //   console.log(
    //     "截取插入ID第一位",
    //     inNode.data.sort.toString().substring(0, 1)
    //   );
    //   let moveNodeLength = moveNode.data.sort.toString().length;
    //   let inNodeLength = inNode.data.sort.toString().length;
    //   let moveNodeOne = moveNode.data.sort.toString().substring(0, 1);
    //   let inNodeOne = inNode.data.sort.toString().substring(0, 1);
    //   //应该先判断移动的节点是父级还是子级！
    //   // 1. 父级只能在一级移动 （ID.leng=1）{按照顺序改变自己和子级ID}
    //   // if (moveNodeLength === 1 && inNodeLength === 1) {
    //   //   // 返回true可拖曳
    //   //   return type !== "inner";
    //   // } else {
    //   //   this.$message.error("只能同级");
    //   // }
    //   if (moveNodeLength === 1) {
    //     // 1.移入的是别人的父级
    //     if (inNodeLength === 1) {
    //       return type !== "inner";
    //     } else {
    //       // 2.移入的是别人的子级
    //       //  this.$message.error("只能同级");
    //       // return
    //     }
    //   }
    //   // 2. 子级只能在二级且在自己的父级中移动 （ID.length=2&&邻近子级ID和自己的ID的第一个数字相同）{按照顺序改变自己ID}
    //   //先让他不能出去，再让他只能在里面移动
    //   // if (moveNodeOne === inNodeOne) {
    //   //   if (moveNodeLength === 2 && inNodeLength === 2) {
    //   //     return type !== "inner";
    //   //     // } else {
    //   //     //   this.$message.error("不可跨级");
    //   //     //   }
    //   //     // }else{
    //   //     //   this.$message.error("不可跨级");
    //   //     // }
    //   //   }
    //   // } else {
    //   //   this.$message.error("不可跨级");
    //   // }
    //   if (moveNodeLength === 2) {
    //     // 1.移入的是别人的父级和子级
    //     if (moveNodeOne !== inNodeOne) {
    //       // this.$message.error("不可跨级");
    //       // return type!=="next"&&"inner"&&"prev"
    //     }else if(inNodeLength === 1&&moveNodeOne === inNodeOne){
    //       // 2.移入的是自己的父级
    //       // return type == "inner"
    //     }
    //   }
    // },
    delMenu() {},
    resetMenu() {},
    saveMenu() {}
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
}
.el-tree {
  padding: 0 100px 0 50px;
}
</style>