import { createStore } from 'vuex'
import { getMusicLyric } from '@/requests/api/item'
export default createStore({
  state: {
    //底部组件中默认的歌单数据
    playList: [{
      al: {
        id: 19243,
        name: "吻别",
        pic: 109951166032666620,
        picUrl: "https://p2.music.126.net/8cxEF5lBfKLWbAqrF0yVmg==/109951166032666632.jpg",
        pic_str: "109951166032666632",
      },
      id: 190449,
      name: '吻别',
      ar: [{ name: '张学友' }]
    }],
    playListIndex: 0, //默认的歌曲下标为0
    isbtnShow: true,  //按钮显示为真，默认显示暂停按钮
    songlistmore: false,  //默认不显示歌曲详情页
    lyricList: {},    
    currentTime: 0,   //歌词滚动中的目前的时间
    duration: 0,    //一首歌的完整时间
    isLogin: false, //判断是否已经登录
    isFooterMusic: true //底部音乐组件是否显示
  },
  mutations: {
    //改变播放按钮的状态
    updateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    //在搜索页面，点击歌曲，push到歌单的最后一项
    pushPlayList(state, value) {
      state.playList.push(value)
    },
    //更新state的playList，也就是歌单
    updatePlayList(state, value) {
      state.playList = value
    },
    //更新state的playListIndex，就是歌曲的序列
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    //歌曲详情页的显示
    updatesonglistmore(state) {
      state.songlistmore = !state.songlistmore
    },
    //将歌词存入state中
    updateLyricList(state, value) {
      state.lyricList = value
    },
    //定时器对时间的更新
    updateCurrentTime(state, value) {
      state.currentTime = value;
    },
    //更新歌曲的完整时间
    updateDuration(state, value) {
      state.duration = value
    }
  },
  actions: {
    async getLyric(context, value) {
      //通过封装的axios函数，异步获取歌词
      let res = await getMusicLyric(value)
      //将获取到的歌词传入mutations中的updateLyricList函数
      context.commit('updateLyricList', res.data.lrc);
    }
  }

})
