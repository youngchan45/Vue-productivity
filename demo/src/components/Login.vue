<template>
  <div class="loginContainer">
    <div class="loginBox">
      <el-form label-width="0px" :model="loginForm" :rules="loginFormRules" ref="loginFormRef" >
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username" clearable>
            <i slot="suffix" class="el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" show-password v-model="loginForm.password" clearable></el-input>
        </el-form-item>
        <!-- <div class="keep">
          <el-checkbox v-model="checked" @click="keepPsw">记住密码</el-checkbox>
          <span class="forgetPsw" @click="forgetPsw">忘记密码</span>
        </div>-->
        <el-form-item>
          <el-button type="primary" block class="onSubmit" @click="onSubmit">登录</el-button>
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
        console.log("------login",res );

        if (res.status !== 200) {
          this.$message.error("登录失败");
        } else {
          window.sessionStorage.setItem("token", res.data.data.token);
          window.sessionStorage.setItem("userId", res.data.data.userId);
          window.sessionStorage.setItem("deptName", res.data.data.deptName);
          window.sessionStorage.setItem("chineseName", res.data.data.chineseName);
          window.sessionStorage.setItem("changePw",res.data.data.changePw)
          this.$message.success("登录成功");
          this.$router.push("/home");
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
.loginContainer {
  background-color: #236795;
  height: 100%;

  display: flex;
  justify-content: center;
  .loginBox {
    background-color: aliceblue;
    min-width: 20%;
    min-height: 20%;
    border-radius: 4px;
    align-self: center;
    padding: 2%;
    .onSubmit {
      width: 100%;
    }
  }
}
// .keep {
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 30px;
//   .forgetPsw {
//     font-size: 14px;
//     color: red;
//     cursor: pointer;
//   }
// }
</style>