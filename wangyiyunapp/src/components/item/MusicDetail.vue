<template>
    <div>
        <!-- 详情页的背景图片 -->
        <img :src="musiclist.al.picUrl" alt="背景图片" class="bgimg">
        <!-- 详情页的头部 -->
        <div class="detailTop">
            <!-- 头部的左方 -->
            <div class="topleft">
                <!-- 点击调用backHome函数，回到主页面 -->
                <svg class="icon3" aria-hidden="true" @click="backHome">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <!-- 在歌曲详情页中显示歌手名和歌曲名的地方 -->
                <div class="leftMarquee">
                    <!-- 对歌曲名使用插件走马灯 -->
                    <Vue3Marquee class="marquee">{{ musiclist.name }}</Vue3Marquee>

                    <div class="sonMarquee">
                        <!-- 这里显示的是歌手名，并且判断为最后一个歌手时后面就不加斜杠 -->
                        <span v-for='(item, idx) in musiclist.ar' :key="item" class="arname">
                            {{ item.name }}
                            {{ idx === musiclist.ar.length - 1 ? "" : "/" }}
                        </span>
                        <svg class="icon2" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou1"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="topright">
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
        </div>
        <!-- 这里显示非歌词的板块，就是显示音乐磁盘和磁针的部分，点击改变data中设定的布尔值 -->
        <div class="detailContent" v-show="!isLyricShow" @click="isLyricShow = true">
            <!-- 单向绑定class，如果为播放状态，就使用active样式 -->
            <img src="@/assets/needle-ab.png" alt="磁针" class="img_needle" :class="{ img_needle_active: !isbtnShow }">
            <img src="@/assets/cd.png" alt="磁盘" class="img_cd">
            <!-- 使用vuex的布尔值，根据布尔值来选择样式 -->
            <img :src="musiclist.al.picUrl" alt="歌曲封面" class="img_ar"
                :class="{ img_ar_active: !isbtnShow, img_ar_pause: isbtnShow }">
        </div>
        <!-- 歌词的显示板块，点击改变相应数据的布尔值，从而影响v-show -->
        <div class="Musiclyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow = false">
            <!-- v-for遍历getLyric函数中获取的歌词信息，并设定如果当前时间小于下一首的歌词时间但是大于目前歌词的时间，就高亮显示 -->
            <p v-for="(item, i) in getLyric.arr" :key=item
                :class="{ active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.next) }">
                {{ item.lrc }}
            </p>
        </div>

        <div class="detailFooter">
            <div class="footerTop">
                <svg class="icon5" aria-hidden="true">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <svg class="icon5" aria-hidden="true">
                    <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
                </svg>
                <svg class="icon5" aria-hidden="true">
                    <use xlink:href="#icon-yinlechangpian"></use>
                </svg>
                <svg class="icon5" aria-hidden="true">
                    <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
                </svg>
                <svg class="icon5" aria-hidden="true">
                    <use xlink:href="#icon-liebiao-"></use>
                </svg>
            </div>

            <div class="footerContent">
                <!-- 进度条，范围最大值单向绑定到vuex的数值，与当前时间进行双向绑定，进度条随歌曲时间移动 -->
                <input type="range" class="range" min=0 :max="duration" v-model="currentTime" step="0.05">
            </div>
            <div class="footer">
                <svg class="icon5" aria-hidden="true">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                <!-- 点击调用goPlay函数，传入数值-1，然后上一首歌曲播放 -->
                <svg class="icon5" aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <svg class="icon5 spc" aria-hidden="true" v-if="isbtnShow" @click="play">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <svg class="icon5 spc" aria-hidden="true" v-else @click="play">
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <!-- 下一首歌曲的播放 -->
                <svg class="icon5" aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon5" aria-hidden="true">
                    <use xlink:href="#icon-zu"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            //设定歌词是否展示的布尔值，默认不展示歌词
            isLyricShow: false
        }
    },
    computed: {
        //接受vuex中的state数据，进行调用和更改
        ...mapState(['lyricList', 'currentTime', 'playListIndex', 'playList', 'duration']),
        getLyric() {
            //如果歌词存在，就执行下面的判断
            if (this.lyricList.lyric) {
                //将歌词进行一个正则划分，通过map遍历方法，返回分钟，秒数，毫秒，和歌词部分
                let arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3);
                    let sec = item.slice(4, 6);
                    let mill = item.slice(7, 10);
                    let lrc = item.slice(11, item.length);
                    //整合全部时间
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
                    //如果出现毫秒不是时间的情况，就改变slice获取的部分
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9);
                        lrc = item.slice(10, item.length);
                        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
                    }
                    //导出各个时间
                    return { min, sec, mill, lrc, time }
                })

                //遍历arr这个对象数组
                arr.forEach((item, i) => {
                    //如果这个i是最后一首歌，就为其对象中添加item.next，并设定为1000
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.next = 10000000
                    } else {
                        //如果不是最后一首歌，就为当前的item添加对象item.next，并设定其值为下一首歌的时间
                        item.next = arr[i + 1].time
                    }
                })
                //导出arr
                return { arr }
                
            }
            
        }

    },
    mounted() {
        //页面开始就调用从底部组件传过来的函数，也就是更新vux中的歌曲最终长度的信息
        this.addDuration()
        console.log(this.getLyric.arr,'这是arr');
        
    },
    watch: {
        //监听currentTime，就是当前时间，如果他发生了变化，就处理相应的事件
        currentTime(val) {
            let p = document.documentElement.querySelector('p.active');
            // if (p.offsetTop > 300 && p) {
            //     this.$refs.musicLyric.scrollTop = p.offsetTop - 300
            // }
            

            //如果当前时间等于歌曲完整时间，就进行歌曲的下一首切换
            if (val === this.duration) {
                if (this.playListIndex === this.playList.length - 1) {
                    this.updatePlayListIndex(0)
                    this.play()
                } else {
                    this.updatePlayListIndex(this.playListIndex + 1)
                }
            }
        }
    },
    components: {
        //走马灯组件
        Vue3Marquee
    },
    methods: {
        backHome() {
            //调用这个函数，让vuex里面的歌曲详情页的布尔值取反，就是关闭歌曲详情页
            this.updatesonglistmore();
            //显示歌曲的磁盘
            this.isLyricShow = false
        },
        //接受一个数值
        goPlay(num) {
            let index = this.playListIndex + num
            if (index < 0) {
                //返回到最后一首歌
                index = this.playList.length - 1;
            } else if (index = this.playList.length - 1) {
                //返回到第一首歌
                index = 0
            }
            //向vuex函数导入数据，更新底部组件的index，可以自动播放
            this.updatePlayListIndex(index)
        },
        //导入vuex中的函数
        ...mapMutations(['updatesonglistmore', 'updatePlayListIndex'])
    },
    //接受在底部全局音乐组件传入过来的数据，有play函数，指定歌曲，按钮是否显示，还有歌曲的完整时间
    props: ['musiclist', 'play', 'isbtnShow', 'addDuration']
}
</script>

<style lang="less" scoped>
.bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
}

.detailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;

    .topleft {
        width: 90%;
        display: flex;
        align-items: center;

        .leftMarquee {
            height: 100%;
            margin-left: 0.4rem;

            span {
                color: #999;

            }

            .sonMarquee {
                display: flex;
                align-items: center;

                .arname {
                    color: black
                }
            }
        }

        .marquee {
            width: 100%;
        }
    }

    .icon3 {
        width: 0.55rem;
        height: 0.55rem;
    }

    .icon2 {
        width: 0.35rem;
        height: 0.35rem;
        fill: #999;
    }

    .icon1 {
        width: .5rem;
        height: .5rem;
    }
}

.Musiclyric {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .2rem;
    overflow: scroll;

    p {
        color: rgb(190, 181, 181);
        margin-bottom: .4rem;
    }

    .active {
        color: #fff;
        font-size: .5rem;
        transition: .5s;
    }

}

.detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transition: all 2s;

        transform-origin: 0 0;
        transform: rotate(-13deg);

    }

    .img_needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transition: all 2s;

        transform-origin: 0 0;
        transform: rotate(0deg);

    }

    .img_cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }

    .img_ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_ar 30s linear infinite;
    }

    .img_ar_active {
        animation-play-state: running;
    }

    .img_ar_pause {
        animation-play-state: paused;
    }

    @keyframes rotate_ar {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }

    }

}

.detailFooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: .2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footerTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon5 {
            width: .6rem;
            height: .6rem;
            fill: rgb(245, 245, 245)
        }
    }

    .footerContent {
        .range {
            width: 100%;
            height: .06rem;
        }
    }

    .footer {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon5 {
            width: .6rem;
            height: .6rem;
            fill: rgb(245, 245, 245);
        }

        .spc {
            width: .95rem;
            height: .95rem;
            fill: rgb(245, 245, 245);
        }

    }
}
</style>