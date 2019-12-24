<template>
    <div>
        <el-tree
            :data="data"
            node-key="id"
            :props="defaultProps"
            @node-click="handleNodeClick"
            highlight-current
            default-expand-all
            ref="tree"
            :expand-on-click-node="false"
          >
          </el-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data:[],
        }
    },
    methods: {
        handleNodeClick(data,node, vuecomponent) {
      console.log('data:',  data,'\n' ,'node:', node, '\n', 'vuecomponent',vuecomponent);
      this.test = data;
    },
    },
}
</script>