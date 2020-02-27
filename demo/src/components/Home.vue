<template>
  <!-- 总容器 -->
  <el-container class="home">
    <!-- 顶部容器 -->
    <el-container class="top">
      <topbar></topbar>
    </el-container>
    <!-- 下半部分容器 -->
    <!-- 新知识！！！！：如何控制页面在里面滚动
    1. （父级）大总体设置overflow:hidden
    2.（子级孙级都可以）需要内部滚动的区域设置overflow:auto-->
    <el-container class="bottom">
      <!-- 侧边栏菜单区域 -->
      <el-aside width="180px" class="left">
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
        <!-- 自定义组件名首字母大写，但用在标签里面用时，则只能识别小写，再因为这个词是由两个单词组成，为了语义化所以用-连接，合起来的话不容易看 -->
          <sidebar-item v-for="menu in menuList" :key="menu.pageUrl" :item="menu" />
        </el-menu>
      </el-aside>
      <!-- 左边主体区域 -->
      <el-container class="right">
        <!-- 内容区域 -->
        <el-card class="main">
          <router-view></router-view>
        </el-card>
        <!-- 脚部区域 -->
        <el-footer
          style="height: 38px;"
        >Copyright© GZPC All Rights Reserved 广州市纪委 版权所有 粤ICP备05052239号-1</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import SidebarItem from "./NavMenu/Sidebar";
import Topbar from "./NavMenu/Topbar";
export default {
  data() {
    return {
      menuList: [],
      activePath: ""
    };
  },
  name: "Sidebar",
  components: { SidebarItem, Topbar },
  created() {
    this.getMenuList();
    // this.forcedToModify();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    async getMenuList() {
      await this.$http.get("menu/getMenu").then(res => {
        this.menuList = res.data.data;
        console.log("导航栏", res);
      });
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  min-width:860px;
  display: flex;
  flex-direction: column;
}
.top {
  width: 100%;
}
.bottom {
  display: flex;
  height: clac(100% -60px);
  overflow: hidden;
}

.left {
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-menu {
  overflow-x: hidden;
  overflow-y: auto;
}

// 必须记住：新知识点！！设置页面滚动但不显示滚动条！！
.el-menu::-webkit-scrollbar {
  width: 0;
}

.right {
  height: clac(100% - 60px);
}

.main {
  height: clac(100% - 60px - 38px);
  overflow: auto;
}

.main::-webkit-scrollbar {
  width: 0;
}
.el-footer {
  color: #999;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>