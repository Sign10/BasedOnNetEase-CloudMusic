<template>
    <!-- 歌单列表的头部 -->
    <div class="itemMusicTop">
        <!-- 背景图片 -->
        <img :src="playlist.coverImgUrl" alt="背景图片" class="bgimg">
        <div class="itemLeft">
            <!-- 点击该按钮路由返回上一个界面 -->
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
    </div>
    <!-- 歌单信息的介绍 -->
    <div class="itemMusicmiddle">
        <!-- 歌单播放计数 -->
        <span class="playCount">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-play-copy"></use>
            </svg>
            {{ changeCount(playlist.playCount) }}
        </span>
        <!-- 歌单图片 -->
        <img :src="playlist.coverImgUrl" alt="歌单图片" class="bgimg2">
        <!-- 歌单介绍 -->
        <div class="musiccontent">
            <!-- 歌单名字 -->
            <span class="listname">{{ playlist.name }}</span>
            <!-- 作者名字和头像 -->
            <div class="listmsg">
                <img :src="playlist.creator.avatarUrl" alt="作者头像" class="bgimg3">
                <span class="listavatarname">{{ playlist.creator.nickname }}</span>
            </div>
            <!-- 歌单介绍 -->
            <span class="description">{{ playlist.description }}</span>
        </div>
    </div>
    <!-- icon列表 -->
    <div class="iconall">
        <div class="iconl">
            <svg class="icon1" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <span>{{ playlist.commentCount }}</span>
        </div>
        <div class="iconl">
            <svg class="icon2" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{ playlist.shareCount }}</span>
        </div>
        <div class="iconl">
            <svg class="icon3" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="iconl">
            <svg class="icon4" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
</template>
<script>
export default {
    setup(props) {
        if (props.playlist.creator = "") {
            //获取本地信息，防止刷新后，异步请求的速度慢于DOM渲染的速度
            props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator
        }

        // 该函数能够让数字简写
        function changeCount(num) {
            if (num >= 1000000000) {
                return (num / 1000000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
        return { changeCount }
    },
    //接受view视图中传入的歌单的基本信息
    props: ['playlist'],
}
</script>
<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .itemLeft,
    .itemRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.2rem;

        span {
            font-size: 20px;
            color: white;
            text-shadow: 0px 0px 5px rgb(72, 72, 72);
        }

        .icon {
            fill: white;
        }
    }

    .bgimg {
        width: 100%;
        height: 8rem;
        position: fixed;
        z-index: -1;
        left: 0;
        top: 0;
        filter: blur(.6rem);
    }
}

.itemMusicmiddle {
    margin-top: 35px !important;
    margin: .2rem;
    display: flex;
    height: 140px;
    overflow: hidden;
    position: relative;

    .playCount {
        color: white;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        left: .86rem;
        text-shadow: 0px 0px 5px rgb(72, 72, 72);

        svg {
            width: .34rem;
            height: .34rem;
        }
    }

    .bgimg2 {
        width: 35%;
        height: 94%;
        border-radius: .2rem;
    }

    .listname {
        text-shadow: 0px 0px 5px rgb(72, 72, 72);
        color: white;
    }

    .musiccontent {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 0rem !important;
        margin-right: 0rem !important;
        margin: .2rem;

        .listmsg {
            display: flex;
            margin-top: .2rem;
            align-items: center;

            .listavatarname {
                color: rgb(255, 255, 255);
                text-shadow: 0px 0px 5px rgb(72, 72, 72);
            }

            .bgimg3 {
                width: .7rem;
                height: .7rem;
                border-radius: .35rem;
                margin-right: .1rem;
            }
        }

        .description {
            height: 65px;
            margin-top: .14rem;
            width: 100%;
            font-size: .24rem;
            color: rgb(246, 246, 246);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            text-shadow: 0px 0px 5px rgb(72, 72, 72);
        }
    }
}

.iconall {
    justify-content: space-around;
    display: flex;
    width: 100%;
    margin-top: .7rem;
    height: 85px;

    svg {
        height: .6rem;
        width: .6rem;
        fill: white;
        margin-bottom: 8px;
    }

    .iconl {
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
            color: white;
            text-shadow: 0px 0px 5px rgb(72, 72, 72);
        }
    }
}
</style>