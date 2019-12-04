<template>
  <div class="topBarContainer">
    <div>
      <!-- <img :src="logo" alt /> -->
      <span>广州市政治生态感知应用平台（领导干部）</span>
    </div>
    <div class="topSet">
      <span>
        <i class="el-icon-location"></i>您好，用户A
      </span>
      <span @click="changePsw">修改密码</span>
      <span @click="loginOut">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   logo: require("../../assets/img/u335.png")
    };
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    changePsw() {}
  }
};
</script>

<style lang="less" scoped>
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
  width: 100%;
  min-height: 30px;
  overflow: hidden;
  .topSet {
    font-size: 14px;
    align-self: center;
    cursor: pointer;
    :hover {
      color: #ffd04b;
    };
    >*{
        padding: 0 16px;
        }
    
  }
}
</style>