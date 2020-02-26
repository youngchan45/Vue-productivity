<template>
  <div>
    <!--先判断是否拥有子菜单-->
    <!--没有子菜单，item项用el-menu-item建立-->
    <template v-if="item.childrens.length == 0">
      <el-menu-item :index="item.pageUrl+''">
        <template slot="title">
          <i :class="item.url"></i>
          {{item.menuName}}
        </template>
      </el-menu-item>
    </template>
    <!--有子菜单，item项用el-submenu建立-->
    <el-submenu v-else :index="item.pageUrl+''">
      <template slot="title">
        <i :class="item.url"></i>
        {{item.menuName}}
      </template>
      <!--子菜单沿用父菜单的循环方式，这里item项用el-menu-item建立是因为已经知道只有二级菜单-->
      <template v-for="child in item.childrens">
        <el-menu-item :key="child.menuId" :index="child.pageUrl+''">
          <template slot="title">
            <i :class="item.url"></i>
            {{child.menuName}}
          </template>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  width: 180px;
  // position: fixed;
  // top:30px;
}
</style>