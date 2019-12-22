<template>
  <div>
    <el-tree
      :data="treeData"
      node-key="id"
      @node-click="handleNodeClick"
      highlight-current
      default-expand-all
      ref="tree"
      :expand-on-click-node="false"
      draggable
    >
      <!-- <span slot-scope="{ node }">
        <span>{{ node.label }}</span>
      </span>-->
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: []
    };
  },
  created() {
    this.getList();
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
    getList() {
      this.$http.get("/menu/getMenu").then(res => {
        // if (!res.status === 200) {
        //   this.$message.error("获取菜单失败");
        // }
        // res.data.data.forEach(item => {
        //   this.treeData.push({
        //     label: item.menuName,
        //     children: item.childrens

        //   });
        //   this.item.childrens.forEach(chilItem => {
        //   this.treeData.children.push({ label: chilItem.menuName });
        // });
        // }

        // );

        //for
        for (var i = 0; i < res.data.data.length; i++) {
          this.treeData.push({
            label: res.data.data[i].menuName,
            children: res.data.data[i].childrens
          });
          for (var j = 0; j < res.data.data[i].childrens.length; j++) {
            this.treeData.children.push({
              label: this.childrens[j].menuName
            });
          }
        }
      });
    }
  }
};
</script>