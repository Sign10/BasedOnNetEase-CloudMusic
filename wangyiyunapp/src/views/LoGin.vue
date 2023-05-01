<template>
    <div class="login">
        <div class="loginTop">歡迎登錄</div>
    
    <div class="loginContent">
        <input type="text" name="phone" class="phone" placeholder="請輸入手機號碼">
        <input type="text" name="password"   class="password" placeholder="請輸入密碼">
        <button class="btn">登錄</button>
    </div>
</div>
</template>

<style lang="less" scoped>
    
.login{
    width: 100%;
    height: 13.34rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;

    .loginTop{
        margin-top: 1rem;
        font-size: 1rem;
        // color: white;
    }

    .loginContent{
        width: 100%;
        height: 6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin-top: 2rem;


        .phone,.password{
            width: 5rem;
            height: 1rem;
            border: .02rem solid #999;
        }

        .btn{
            width: 2rem;
            height: .6rem;
        }

    }

}
</style>


<script>


</script>


