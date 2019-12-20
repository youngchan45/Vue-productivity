
<template>
  <div>
    <el-tree ref="expandMenuList" class="expand-tree"
         :data="setTree"
         highlight-current         
         :expand-on-click-node="false"
         :render-content="renderContent"
         @node-click="handleNodeClick">
</el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setTree:[],
    }
  },
  created(){
this.getDataList();
  },
methods: {
  handleNodeClick(data,node, vuecomponent) {
      console.log('data:',  data,'\n' ,'node:', node, '\n', 'vuecomponent',vuecomponent);
      this.test = data;
    },
  getDataList(){
  this.loading = true;   //element loading加载
  this.$http.get('/organization/getTree').then(res => {
    this.loading = false;
    if (res.data.status) {
      this.setTree= res.data.data
      let dataArray = [];
        this.setTree.forEach(function (data) {
        if(data.enabled==true){
             let superiorId = data.superiorId;
              if (superiorId == 0) {
                 let objTemp = {
                    deptId: data.deptId,
                    deptName: data.deptName,
                    // order: data.order,
                    superiorId: superiorId,
                 }
                 dataArray.push(objTemp);
              }
           }
       })
       this.data2treeDG(this.setTree, dataArray)
      console.log('树',res)
    }
  });
},
     data2treeDG(setTree, dataArray) {
          for (let j = 0; j < dataArray.length; j++) {
               let dataArrayIndex = dataArray[j];
               let childrenArray = [];
               let deptId = dataArrayIndex.deptId;
               for (let i = 0; i < setTree.length; i++) {
                    let setTree = setTree[i];
                    if(setTree.enabled==true){
                          let superiorId = setTree.superiorId;
                          if (superiorId == deptId) {//判断是否为儿子节点
                          let objTemp = {
                             deptId: setTree.deptId,
                             name: setTree.name,                           
                             superiorId: setTree.superiorId,
                         }
                       childrenArray.push(objTemp);
                    }
                }
         }
           dataArrayIndex.children = childrenArray;
           if (childrenArray.length > 0) {//有儿子节点则递归
                  this.data2treeDG(setTree, childrenArray)
           }
      }
     this.setTree = dataArray;
     return dataArray;
   },
   showOrEdit(data) {
      debugger;
           if (this.isEdit) {
                  return <input type="text" style="width:80px" value={data.Name} on-blur={ev => this.edit_sure(ev, data)}/>
            }
            else{
                 return <span>{data.Name}</span>
            }
       },
       renderContent(h, {node, data}) {
            if(data.enabled==true&&data.parentId==0){
              return (
              <span>
                 <span>
                     { this.showOrEdit(data) }
                 </span>
                 <span style="margin-left: 15px;">
                      <i class="el-icon-plus" on-click={ () => this.NodeAdd(node, data) }></i>
                </span>
              </span>)
           }
           else if(data.enabled==true&&data.parentId!=0){
            return (
              <span>
                 <span>
                     { this.showOrEdit(data) }
                </span>
             </span>)
            }
           else {
              return (
               <span>
                 <span style="color: red;">
                     { this.showOrEdit(data) }
                 </span>
               </span>)
             }
       }
  }
}
</script>