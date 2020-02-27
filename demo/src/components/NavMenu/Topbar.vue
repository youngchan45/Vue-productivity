<template>
  <div class="container">
    <el-header class="topBarContainer">
      <div>
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
      width="35%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="showClose"
    >
      <!--弹窗内容-->
      <el-form ref="pswFormRef" statue-icon :model="pswForm" :rules="pswFormRules" :inline="true">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      deptName1: window.sessionStorage.getItem("deptName"),
      chineseName1: window.sessionStorage.getItem("chineseName"),
      visible: false,
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
      }
    };
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
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  background-color: #545c64;
  color: #fff;
  font-size: 20px;
}
.topBarContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.topSet > * {
  padding: 0 5px;
  font-size: 14px;
}
</style>