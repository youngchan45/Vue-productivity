<template>
  <div>
    <el-tree
      :data="menuData"
      node-key="id"
      @node-click="handleNodeClick"
      highlight-current
      default-expand-all
      ref="tree"
      :expand-on-click-node="false"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuData: []
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
        for (let i = 0; i < res.data.data.length; i++) {
          let obj = {
            label: res.data.data[i].menuName,
            children: []
          };
          this.menuData.push(obj);
        }
        
        for (let i = 0; i < res.data.data.length; i++) {
          for (let j = 0; j < res.data.data[i].childrens.length; j++) {
            let childObj = {
              label: res.data.data[i].childrens[j].menuName,
              children: []
            };
            this.menuData[i].children.push(childObj);
            console.log('look',res.data.data[6].childrens[2].menuName)
          }
        }
      });
    }
  }
};
</script>