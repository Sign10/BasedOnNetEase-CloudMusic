<template>
    <div class="topNav">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
        <div class="topContent">
            <!-- 点击跳转到/login下的路由 -->
            <span @click="$router.push('/login')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="topRight">
            <!-- 点击按钮跳转到/search下的路由 -->
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<style lang="less" scoped>
.topNav {
    width: 100%;
    height: 1rem;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .topContent {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        font-size: .36rem;

        .active {
            font-weight: bold;
        }
    }
}
</style>