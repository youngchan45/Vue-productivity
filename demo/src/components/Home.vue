<template>
  <!-- <div> -->
  <!-- <navmenu></navmenu> -->
  <!-- <p @click="a">111</p> -->
  <!-- <router-view></router-view> -->
  <el-container class="homeContainer">
    <el-header class="topBarContainer">
      <div>
        <!-- <img :src="logo" alt /> -->
        <span>广州市政治生态感知应用平台（领导干部）</span>
      </div>
      <div class="topSet">
        <span>
          <i class="el-icon-user"></i>您好，用户A
        </span>
        <span @click="changePsw">修改密码</span>
        <span @click="loginOut">退出</span>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏菜单区域 -->
      <el-aside width="210px" height="100%">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          
        >
          <!-- <el-menu-item index="1">
            <template slot="title">
              <span>导航一</span>
            </template>           
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title">导航三</span>
          </el-menu-item>-->
          <!-- 一级菜单 -->
          <el-submenu :index="menuId+''"
          v-for="(item,menuId) in menuList"
          :key="menuId">
            <template slot="title">{{item.menuName}}</template>

            <el-menu-item
              :index="menuId+''"
              v-for="(item1,menuId) in item.childrens"
              :key="menuId"
            >{{item1.menuName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>Main</el-main>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
// import Navmenu from '../components/NavMenu/Navmenu'
export default {
  data() {
    return {
      menuList: []
    };
  },
  created() {
    this.getMenuList();
  },
  components: {
    // navmenu:Navmenu,
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    changePsw() {},
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async getMenuList() {
      await this.$http.get("menu/getMenu").then(res => {
        this.menuList = res.data.data;
        console.log(res);
      });
    }
    // async getUser(){
    //     await this.$http.get('login')
    // }
  }
};
</script>

<style lang="less" scoped>
.homeContainer {
  height: 100%;
}
// .el-header,
// .el-footer {
//   background-color: #b3c0d1;
// }
.el-aside {
  background-color: #545c64;
}

.el-main {
  background-color: #e9eef3;
}
.topBarContainer {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  // font-weight: 800;
  padding: 20px 20px;
  background-color: #545c64;
  color: #fff;
  // position: fixed;
  //     top:0px;
  //   width: 100%;
  //   min-height: 30px;
  //   overflow: hidden;
  .topSet {
    font-size: 14px;
    align-self: center;
    cursor: pointer;
    :hover {
      color: #ffd04b;
    }
    > * {
      padding: 0 16px;
    }
  }
}
</style>