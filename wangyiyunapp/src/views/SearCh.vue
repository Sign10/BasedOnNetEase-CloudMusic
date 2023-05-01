<template>
    <div>
        <!-- 搜索栏 -->
        <div class="searchTop">
            <!-- 点击该按钮返回上一级路由 -->
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <!-- 调用enterKey函数，获取搜索的结果 -->
            <input type="text" placeholder="結束バンド" v-model="searchKey" @keydown.enter="enterKey">
        </div>
            <!-- 搜索历史 -->
        <div class="searchHistory">
            <span class="searchSpan">历史</span>
            <!-- v-for获取存放在keyWord的搜索历史，点击调用searchHistory函数，获取相应的搜索记录 -->
            <span v-for="item in keyWordList" :key='item' class="spanKey" @click="searchHistory(item)">
                {{ item }}
            </span>
            <!-- 点击调用删除历史记录的函数，删除本地存储的历史纪录 -->
            <svg class="icon" aria-hidden="true" @click="deleteHistory">
                <use xlink:href="#icon-shanchu"></use>
            </svg>
        </div>
        <!-- 搜索结果的歌曲列表 -->
        <div class="itemList">
            <!-- v-for获取搜索结果并渲染 -->
            <div class="item" v-for="(item, i) in searchList" :key="item">
                <!-- 点击调用updateIndex函数，更新底部组件的播放状态和播放歌曲 -->
                <div class="itemLeft" @click="updateIndex(item)">
                    <span class="leftSpan">{{ i + 1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <span v-for="(item1, idx) in item.ar" :key="item1" class="singer">
                            {{ item1.name }}&nbsp;
                            {{ idx === item.ar.length - 1 ? "" : '/' }}&nbsp;
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getSearchBanner } from '@/requests/api/home'
export default {
    data() {
        return {
            //搜索记录
            keyWordList: [],
            //当前搜索的内容
            searchKey: '',
            //搜索结果
            searchList: []
        }
    },
    mounted() {
        //从locakStorage中调用存放的keyWord的内容，防止页面关闭后历史记录销售
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || []
    },
    methods: {
        //async获取搜索信息
        async enterKey() {
            //如果搜索栏不为空
            if (this.searchKey !== '') {
                //为搜索历史记录的头添加当前搜索的内容
                this.keyWordList.unshift(this.searchKey);
                //使用new Set创建一个对象，达到去重复的效果
                this.keyWordList = [...new Set(this.keyWordList)];
                if (this.keyWordList.length > 6) {
                    //大于六就删除末尾
                    this.keyWordList.pop()
                }
                //存放数据到localStorage
                localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))
                //导入当前搜索的内容到axios中的函数，然后获取相应的数据
                let res = await getSearchBanner(this.searchKey)
                // 将获取的的数据存入到searchList中
                this.searchList = res.data.result.songs
                // 完成上面的操作后清空
                this.searchKey = '';
            } else {
                alert('請輸入要搜索的內容')
            }
        },
        deleteHistory() {
            //删除本地存储的数据
            localStorage.removeItem('keyWordList');
            //重新赋值为空
            this.keyWordList = [];
        },
        async searchHistory(item) {
            //点击历史记录，也会获取相应的歌单数据
            let res = await getSearchBanner(item)
            this.searchList = res.data.result.songs
        },
        updateIndex(item) {
            // 点击搜索结果的歌曲，就会更新vuex中的数据，从而更新底部组件，达到自动播放的效果
            this.$store.commit('pushPlayList', item)
            this.$store.commit('updatePlayListIndex', this.$store.state.playList.length - 1)
        }
    }
}
</script>



<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;

    input {
        margin-left: .2rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: .1rem;
    }
}


.searchHistory {
    width: 100%;
    padding: .2rem;
    position: relative;

    .searchSpan {
        font-weight: 700;
    }


    .spanKey {
        padding: .1rem .2rem;
        background-color: rgb(185, 169, 169);
        border-radius: .4rem;
        margin: .1rem .2rem;
        display: inline-block;
    }


    .icon {
        width: .45rem;
        height: .45rem;
        position: absolute;
        right: .2rem;
    }

}

.itemList {

    padding: .24rem;
    margin-top: 12px;
    height: 30rem;

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
</style>