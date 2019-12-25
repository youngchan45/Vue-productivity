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
        if(res.status!=200){
            this.$message.error('获取菜单失败');
            // return;
        }
        this.menuData=res.data.data
        res.data.data.forEach(item=>{
            // if(item.childrens==0){           
                this.menuData.push({label:item.menuName,children:item.childrens})                
            // }
        })
//         for(var i=0;i<res.data.data.length;i++){
// this.menuData[i].label=res.data.data[i].label;
// this.menuData[i].children=res.data.data[i].children;
//         }
      });
    }
  }
};
</script>