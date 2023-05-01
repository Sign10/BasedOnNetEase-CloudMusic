<template>
    <!-- 点击歌单后，下面所显示的歌曲列表 -->
    <div class="itemMusicList">
        <!-- 歌曲列表的头部 -->
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-bofanganniu"></use>
                </svg>
                <span>
                    播放全部<span class="many">(共{{ itemList.length }}首)</span>
                </span>
            </div>
            <div class="listRight">
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{ Count }})</span>
            </div>
        </div>
        <!-- 歌曲列表 -->
        <div class="itemList">
            <!-- 将接受到的item的数据通过v-for赋值给item -->
            <div class="item" v-for="(item, i) in itemList" :key="item">
                <!-- 点击歌曲就会调用函数，将这个歌曲的index和歌单的列表传给vuex -->
                <div class="itemLeft" @click="playMusic(i)">
                    <span class="leftSpan">{{ i + 1 }}</span>
                    <!-- 下面是歌曲的名字和作者用户名 -->
                    <div>
                        <p>{{ item.name }}</p>
                       
                        <span v-for="(item1, idx) in item.ar" :key="item1" class="singer">
                            {{ item1.name }}&nbsp;
                            <!-- 对歌手的名字坐判断，如果是最后一个歌手就不加斜杠 -->
                            {{ idx === item.ar.length - 1 ? "" : '/' }}&nbsp;
                            
                        </span>
                    </div>
                </div>
                <div class="itemRight">
                    <!-- 判断是否有mv，如果有就加上mv图标 -->
                    <svg class="iconbofang" aria-hidden="true" v-if='item.mv != 0'>
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="iconliebiao" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapMutations } from 'vuex'
export default {
    // 接受父组件传过来的歌单中歌曲的列表和音乐的收藏数
    props: ['itemList', 'Count'],
    methods: {
        playMusic(i) {
            //传递歌单列表和Index，改变vuex中的state的值，这里使用的是mutations里的函数
            this.updatePlayList(this.itemList)
            this.updatePlayListIndex(i)
        },
        //将vuex中的mutations函数方法导入
        ...mapMutations(['updatePlayList', 'updatePlayListIndex']),
    },
}
</script>
<style lang="less" scoped>
.itemMusicList {
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    border-top-right-radius: 0.4rem;
    border-top-left-radius: 0.4rem;


    .itemListTop {
        height: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .listLeft {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                margin-right: .32rem;
            }

            .many {
                font-size: 13px;
                color: gray;
            }
        }

        .listRight {
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: red;
            border-radius: 30px;
            padding: 10px;

            svg {
                fill: white;
                margin-right: 5px;
                width: 16px;
                height: 16px;
                font-weight: bold;
            }

            span {
                color: white;
            }
        }

        .icon1 {
            width: .5rem;
            height: .5rem;
        }
    }

    .itemList {
        margin-top: 12px;

        .item {
            display: flex;
            justify-content: space-between;
            margin-top: .16rem;
            margin-bottom: 30px;

            .itemLeft {
                display: flex;
                align-items: center;

                .leftSpan {
                    margin-right: .3rem;
                }

                p {
                    margin-bottom: 3px;
                }

                .singer {
                    font-size: 13px;
                    color: gray
                }
            }

            .itemRight {
                svg {
                    width: 25px;
                    height: 25px;
                    fill: gray;
                }

                .iconbofang {
                    margin-right: 20px;
                }
            }
        }
    }
}</style>