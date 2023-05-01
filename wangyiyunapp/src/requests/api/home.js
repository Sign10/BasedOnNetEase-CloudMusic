import service from ".." 

//获取首页轮播图的数据
export function getBanner(){
    return service({
        method:"GET",
        url:"/banner?type=2",
    })
}

//获取歌单的数据，十个歌单
export function getMusicList(){
    return service({
        method:"GET",
        url:"/personalized?limit=10",
    }) 
}

//搜索接口
export function getSearchBanner(data){
    return service({
        methods:'GET',
        url:`/cloudsearch?keywords=${data}`
    })

}