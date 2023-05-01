<template>
    <div class="FooterMusic">
        <!-- 底部音乐组件的左侧，点击会调用updatesonglistmore函数，显示歌曲详细页 -->
        <div class="footerLeft" @click="showPopups">
            <!-- 歌曲图片 -->
            <img :src="playList[playListIndex].al.picUrl" alt="歌曲图片">
            <!-- 歌曲名字 -->
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑切换上下首噢</span>
            </div>
        </div>
        <!-- 底部组件的右部分 -->
        <div class="footerRight">
            <!-- 点击调用play函数，播放音乐，同时使用v-if来判断显示播放还是暂停按钮，isbtnShow在Vuex -->
            <svg class="icon3" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <svg class="icon3" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon3" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <!-- 使用audio，src接受传入的歌曲数据 -->
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <!-- 使用vant组件库中的详情页 ，与vuex里面的state的songlistmore这个布尔值进行绑定-->
        <van-popup v-model:show="songlistmore" position="right" :style="{ width: '100%', height: '100%' }">
            <!-- 在详情页中使用MusicDetail组件，并且向里面传入我当前的歌曲的信息，调用play函数，并且与vuex的按钮显示进行绑定 -->
            <MusicDetail :musiclist="playList[playListIndex]" :isbtnShow="isbtnShow" :play="play"
                :addDuration="addDuration" />
        </van-popup>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
// 导入歌曲详情页组件
import MusicDetail from '@/components/item/MusicDetail.vue'

export default {
    data() {
        return {
            //一开始的时间为0
            setInter: 0
        }
    },
    mounted() {
        //底部组件刚渲染成功后，就向vuex传递这首歌的数据
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    },
    computed: {
        //获取vuex里面的数据
        ...mapState(['playList', 'playListIndex', 'isbtnShow', 'songlistmore'])
    },
    updated() {
        //当有歌曲切换的时候，也向vuex传入数据，更新歌词
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id);
        //调用这个函数，也更新歌曲的完整时间
        this.addDuration()
    },
    methods: {

        play() {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                //改变播放按钮的状态
                this.updateIsbtnShow(false)
                //歌词的滚动，样式的显示，这里开始调用这个定时器，不断的更新vuex里面的state的时间
                this.updateTime()
            }
            else {
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                //清除updateTime()中调用的定时器
                clearInterval(this.setInter)
            }
        },
        addDuration() {
            //向vuex传入这个歌曲的完整时间
            this.updateDuration(this.$refs.audio.duration)
        },
        //调用这个函数，可以改变vuex里面songlistmore里的布尔值
        showPopups() {
            this.updatesonglistmore()
        },
        updateTime() {
            //使用一个定时器，不断的更新vuex里面的state的currentTime，把audio里面的目前时间传入进去
            this.setInter = setInterval(() => {
                this.updateCurrentTime(this.$refs.audio.currentTime)
            }, 500)
        },
        //将vuex中的mutations函数导入
        ...mapMutations(['updateIsbtnShow', 'updatesonglistmore', 'updateCurrentTime', 'updateDuration'])

    },
    //监听computed中接收的playListIndex和playList是否变化
    watch: {
        playListIndex() {
            //如果歌曲的index变化了，获取模板里的ref属性的audio，让他自动播放
            this.$refs.audio.autoplay = true;
            //改变按钮的状态，向vuex里的函数传入值
            if (this.$refs.audio.paused) {
                this.updateIsbtnShow(false)
            }
        },
        //如果歌单变化了，就让他自动播放，并且也改变播放状态
        playList() {
            if (this.isbtnShow) {
                this.updateIsbtnShow(false)
                this.$refs.audio.autoplay = true
            }
        }
    },
    components: {
        //注册子组件
        MusicDetail
    }
}
</script>
<style lang="less" scoped>
.FooterMusic {
    width: 100%;
    height: 1.4rem;
    background-color: white;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;

    .footerLeft {
        width: 79%;
        height: 100%;
        display: flex;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-right: 11px;
        }

        span {
            font-size: 13px;
            color: #999;
        }
    }

    .footerRight {
        width: 18%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon3 {
            width: 29px;
            height: 29px;
        }
    }
}
</style>