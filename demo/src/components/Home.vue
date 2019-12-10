<template>
  <!-- <navmenu></navmenu> -->
  <!-- <router-view></router-view> -->
  <el-container class="homeContainer">
    <el-header class="topBarContainer">
      <div>
        <!-- <img :src="logo" alt /> -->
        <span>广州市政治生态感知应用平台（领导干部）</span>
      </div>
      <div class="topSet">
        <span>
          <i class="el-icon-user"></i>
          您好，({{this.deptName1}}){{this.chineseName1}}
        </span>
        <span @click="changePsw">修改密码</span>

        <el-popover placement="top" width="160" v-model="visible">
          <p>确定要退出平台吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="loginOut">确定</el-button>
          </div>
          <span slot="reference">退出</span>
        </el-popover>
      </div>
    </el-header>
    <!--按钮身上有个事件，点击时把布尔值传递给子组件，子组件身上也有个布尔参数，但这个参数取决于子组件传过来的布尔值-->
    <el-container>
      <!-- 侧边栏菜单区域 -->
      <el-aside width="180px" height="100%">
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.pageUrl+''" v-for="(item,menuId) in menuList" :key="menuId">
            <template slot="title">{{item.menuName}}</template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="item1.pageUrl+''"
              v-for="(item1,menuId1) in item.childrens"
              :key="menuId1"
              @click='saveNavState(item1.pageUrl+"")'
            >{{item1.menuName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-card class="box-card">
            <router-view></router-view>
          </el-card>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
    <el-dialog
      title="提示"
      :visible.sync="dialogFormVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <!--弹窗内容-->
      <span>新用户强制改密码</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="tishi">去改密码</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible1"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="showClose"
    >
      <!--弹窗内容-->
      <el-form ref="pswFormRef" statue-icon :model="pswForm" :rules="pswFormRules">
        <el-form-item label="旧密码" prop="oldpass">
          <el-input v-model="pswForm.oldpass" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input v-model="pswForm.newpass" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input v-model="pswForm.checkpass" clearable></el-input>
        </el-form-item>
        <!-- <span slot="footer" class="dialog-footer"> -->
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
        </el-form-item>
      </el-form>
      <!-- </span> -->
    </el-dialog>
  </el-container>
</template>

<script>
// import changePsw from "./publicUse/changePsw";
// import Navmenu from '../components/NavMenu/Navmenu'
export default {
  data() {
    return {
      visible: false,
      menuList: [],
      deptName1: window.sessionStorage.getItem("deptName"),
      chineseName1: window.sessionStorage.getItem("chineseName"),
      dialogFormVisible: false,
      dialogFormVisible1: false,
      showClose: false,
      pswForm: {
        oldpass: "",
        newpass: "",
        checkpass: ""
      },
      pswFormRules: {
        oldpass: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur"
          },
          {
            min: 8,
            message: "长度至少为8个字符",
            trigger: "blur"
          }
        ],
        newpass: [
          { required: true, message: "请输入新密码" },
          {
            min: 8,
            message: "长度至少为8个字符",
            trigger: "blur"
          }
        ],
        checkpass: [
          { required: true, message: "请再次输入新密码" },
          {
            min: 8,
            message: "长度至少为8个字符",
            trigger: "blur"
          }
        ]
      },
      //       var validatePass1=(rule,value,callback)=>{
      //         var a =(?=.*?[0-9])
      //         if((?=.*?[0-9])){
      // callback(new Error('请输入密码'))
      // ),
      //         })
      activePath:'',
    };
  },
  created() {
    this.getMenuList();
    // this.forcedToModify();
    this.activePath=window.sessionStorage.getItem(
      'activePath'
    )
  },
  components: {
    // navmenu:Navmenu,
    // changepsw: changePsw
  },
  methods: {
    tishi() {
      this.dialogFormVisible = false;
      this.dialogFormVisible1 = true;
    },
    changePsw() {
      this.dialogFormVisible1 = true;
      this.showClose = true;
    },
    //重置修改密码表单
    resetForm() {
      // console.log("重置", this);
      this.$refs.pswFormRef.resetFields();
    },
    // showlDialog(data){
    //       console.log(data)
    //     if(data == 'false'){
    //       this.isShow = false;
    //     }else{
    //       this.isShow = true;
    //     }
    //      console.log('是否弹窗布尔',this.isShow)
    // },
    // oppenModel () {
    //   this.showModel = true
    // },
    // closeModel (res) {
    //   this.showModel = res
    // },
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    forcedToModify() {
      //changePw为0是新用户，修改保存后changePw为1
      var oldNewUser = window.sessionStorage.getItem("changePw");
      if (oldNewUser == 0) {
        this.dialogFormVisible = true;
        console.log(typeof oldNewUser);
      } else {
        this.dialogFormVisible = true;
      }
      // console.log('弹窗')
    },
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    async getMenuList() {
      await this.$http.get("menu/getMenu").then(res => {
        this.menuList = res.data.data;
        console.log(res);
      });
    },
    saveNavState(activePath){
window.sessionStorage.setItem('activePath',activePath)
    }
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

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .box-card {
    width: 480px;
  }
  
}
</style>