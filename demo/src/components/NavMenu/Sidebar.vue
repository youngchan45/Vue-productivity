<template>
  <div>
<!-- review的时候这里没看懂原理：没看懂的原因是以为按dom渲染，判断后只能渲染两个。
其实是：这里使用递归，而且两个template其实可以看做是一个template，然后每按顺序循环一个item，就拿这个item去if else里面比较 -->

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

  }
};
</script>