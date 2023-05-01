<template>
  <!-- 显示“/”目录下的路由，也就是home -->
  <router-view />
  <!-- 全局的底部组件，并使用了vuex里的属性进行显示判断 -->
  <FooterMusic v-show="$store.state.isFooterMusic" />
</template>
<script>
//导入底部音乐组件
import FooterMusic from "@/components/item/FooterMusic"  
export default {
  components: {
    FooterMusic
  }
}
</script>
<style lang="less" >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: 0.5rem;
  height: 0.5rem
}

a {
  color: black;
}
</style>
