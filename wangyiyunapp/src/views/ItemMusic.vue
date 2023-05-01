<template>
    <!-- 向头部传入歌单的数据和基本信息 -->
    <ItemMusicTop :playlist="state.playlist"/>
    <!-- 传入传入歌曲的列表和歌单的播放计数 -->
    <ItemMusicList :itemList="state.itemList" :Count="state.playlist.subscribedCount" />
</template>
<script>
//引入方法
import { onMounted,reactive } from 'vue';
import { useRoute } from 'vue-router';
//导入axios中封装的函数方法
import { getMusicItemList ,getItemList} from '@/requests/api/item';
//导入组件
import ItemMusicTop from '@/components/item/ItemMusicTop'
import ItemMusicList from '@/components/item/ItemMusicList'
export default {
    setup() {
        const state = reactive({
            playlist: {},
            itemList:[]
        })
        onMounted(async () => {
            // 使用useRoute方法，获取到传入的数值id
            let id = useRoute().query.id
            //将id传入axios中的函数，异步获取歌单的数据与歌单的歌曲列表
            let res = await getMusicItemList(id);
            let result = await getItemList(id);

            // 将获取的数据存好
            state.playlist = res.data.playlist
            state.itemList=result.data.songs

            //将数据保存至会话存储空间，并转换为JSON格式
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        })
        
        return { state }
    },
    components:{
        //子组件
        ItemMusicTop,
        ItemMusicList,
    }
}
</script>