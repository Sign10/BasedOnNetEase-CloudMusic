<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">
                发现好歌单
            </div>
            <div class="more">
                查看更多
            </div>
        </div>
        <div class="MusicContent">
            <!-- 调用vant组件库中的轮播图 -->
            <van-swipe :loop="false" :width="130" class="my-swipe" :show-indicators="false">
                <!-- 读取数据musicList中的歌单数据 -->
                <van-swipe-item v-for="item in state.musicList" :key="item">
                    <!-- 设置点击的路由跳转，跳转到view视图的itemMusic，并传值item里的id属性 -->
                    <router-link :to="{
                            path: '/ItemMusic',
                            query: { id: item.id }
                        }">
                        <!-- 设置每一个歌单的盒子模型 -->
                        <div class="fatherswiper">
                            <div class="swipe1">
                                <img :src="item.picUrl" alt="歌单图片">
                                <!-- 歌单播放的计数 -->
                                <span class="playCount">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-gl-play-copy"></use>
                                    </svg>
                                    <!-- 调用函数，让数字变得简洁 -->
                                    {{ changeCount(item.playCount) }}
                                </span>
                            </div>
                            <!-- 显示歌单名字 -->
                            <span class="name">{{ item.name }}</span>
                        </div>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
//导入axios中封装的函数，获取api
import { getMusicList } from '@/requests/api/home.js'
import { reactive, onMounted, } from 'vue'
export default {

    /*   Vue2写法
    data() {
        return {
            musicList: [],
        }
    },
    methods: {
        async getGedan() {
            let res = await getMusicList()
            this.musicList = res.data.result
        },
        changeCount(num) {
            if (num >= 1000000000) {
                return (num / 1000000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
    },
    mounted() {
        this.getGedan()
    }

    */
    setup() {
        const state = reactive({
            //给一个数组装载
            musicList: [],
        })
        //数字简略显示的函数
        function changeCount(num) {
            if (num >= 1000000000) {
                return (num / 1000000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
        //从封装的axios中获取歌单数据
        onMounted(async () => {
            let res = await getMusicList()
            //将获取到的歌单数据赋值到state里的musicList
            state.musicList = res.data.result

        }
        )

        //导出数据和函数
        return { state, changeCount }
    }
}
</script>
<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;

    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }

        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }

    .MusicContent {
        position: relative;
        width: 100%;
        height: 4rem;

        .my-swipe {
            height: 100%;
            width: 100%;

            .fatherswiper {
                height: 100%;
                padding-right: .2rem;
                width: 100%;
            }

            .swipe1 {
                display: flex;
                flex-direction: row-reverse;
            }

            img {
                width: 100%;
                height: 2.5rem;
                border-radius: 0.4rem;
                z-index: 1;
            }

            .playCount {
                position: absolute;
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 15px;
                margin: .04rem .18rem 0 0;

                svg {
                    width: .34rem;
                    height: .34rem;
                    color: white;
                }
            }

            .name {
                font-size: .26rem;
            }
        }
    }
}
</style>