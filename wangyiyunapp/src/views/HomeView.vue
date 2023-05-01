<template>
 <TopNav/>
 <SwpierTop/>
 <IconList/>
 <MusicList/>
</template>
<script>
import TopNav from "@/components/home/TopNav";
import SwpierTop from "@/components/home/SwpierTop";
import IconList from "@/components/home/IconList.vue"
import MusicList from "@/components/home/MusicList.vue"
export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwpierTop,
    IconList,
    MusicList
  }
}
</script>
