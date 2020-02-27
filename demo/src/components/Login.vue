<template>
  <div class="container">
    <div class="loginBox">
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username" clearable>
            <i slot="suffix" class="el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model="loginForm.password"
            clearable
            @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="onSubmit" @click="onSubmit" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // //记住密码复选框默认为否
      // checked: false,
      //登录表单的数据绑定对象
      loginForm: {
        username: "jackchen",
        password: "123456"
      },
      //登录表单的验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度至少6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log(this)
      //登录前表单预验证
      this.$refs.loginFormRef.validate(async valid => {
        //console.log(valid);
        if (!valid) return;
        //解构赋值data
        // const { data: res } = await this.$http.post("login", this.loginForm);
        const res = await this.$http.post("login", this.loginForm);
        console.log("------login", res);

        if (res.status !== 200) {
          this.$message.error("登录失败");
        } else {
          window.sessionStorage.setItem("token", res.data.data.token);
          window.sessionStorage.setItem("userId", res.data.data.userId);
          window.sessionStorage.setItem("deptName", res.data.data.deptName);
          window.sessionStorage.setItem(
            "chineseName",
            res.data.data.chineseName
          );
          window.sessionStorage.setItem("changePw", res.data.data.changePw);
          window.sessionStorage.setItem("deptId", res.data.data.deptId);
          this.$message.success("登录成功");
          this.$router.push("/home/index");
        }
      });

      // //保存密码
      // keepPsw() {},
      // //忘记密码
      // forgetPsw() {}
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #236795;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginBox {
    width:20%;
    background-color: #fff;
    min-height: 180px;
    min-width: 250px;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    justify-content: center;
  align-items: center;
    .loginForm{
      display: flex;
      flex-direction: column;
    justify-content: center;
  align-items: center;
    }
    .el-button{
      width:220px;
    }

  }
}
</style>