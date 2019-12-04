<template>
    <div class="allContainer">
        <topbar></topbar>
        <sidebar></sidebar>
    </div>
</template>

<script>
import Topbar from './Topbar'
import Sidebar from './Sidebar'
export default {
    components:{
        //忘记加引号
        'topbar':Topbar,
        'sidebar':Sidebar,
    }
}
</script>

<style lang="less" scoped>
    .allContainer{
        display: flex;
        flex-direction: column;
    }
</style>
