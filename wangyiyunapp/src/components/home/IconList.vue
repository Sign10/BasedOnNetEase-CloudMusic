<template>
    <!-- 设置Home下的图标列表 -->
    <div class="IconList">
        <div class="IconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="IconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhibo"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="IconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="IconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>
<style lang="less" scoped>
.IconList {
    widows: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .IconItem {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        svg {
            width: 1rem;
            height: 1rem;
        }
    }
}
</style>