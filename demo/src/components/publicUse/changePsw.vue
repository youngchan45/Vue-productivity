<template>
  <div>
    <el-dialog title="修改密码" modal :visible.sync="ModelState" :close-on-click-modal='false' :close-on-press-escape='false'
    :show-close='false'
    v-model="ModelState" 
    >
    111111
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" >取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ModelState: {
      type: Boolean,
      default: false
    },
    };
  },
  props:[
      'invitor',
  ],
  watch:{
    //   invitor(cur){//监听invitor值的变化
    //     console.log('currentVal:'+cur)
    //     if(cur == true){//当父组件传递值为true是，则显示
    //        this.showing = true;
    //     }else{
    //         this.showing = false;
    //     }
    //   },
    },
  methods: {
      ok () {this.$emit("closeModal", false);
        this.$Message.info('Clicked ok');
    },
    cancel () {
        this.$emit("closeModal", false);
    },
    //   hide(){
    //       this.$emit('changingType','false');//调用父组件的自定义事件，并传值
    //     if(this.invitor == true){//当父组件传递值为true是，则显示
    //        this.showing = true;
    //     }else{
    //         this.showing = false;
    //     }
    //   }
  }
};
</script>

<style lang="less" scoped>
</style>