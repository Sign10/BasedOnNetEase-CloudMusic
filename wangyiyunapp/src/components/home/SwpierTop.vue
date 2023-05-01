<template>
  <div id="swiperTop">
    <!-- 使用vant组件库的轮播图 -->
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
//导入axios中封装的函数
import { getBanner } from '@/requests/api/home.js'
import { reactive, onMounted } from 'vue'
export default {
  setup() {
    const state = reactive({
      images: []
    });
    onMounted(async () => {
      let res = await getBanner();
      state.images = res.data.banners
    });
    return { state };
  },
};
</script>
<style lang="less">
#swiperTop {
  margin: 2px;

  .van-swipe {
    width: 100%;
    height: 3rem;

    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
      }
    }

    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>