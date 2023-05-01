import service from "..";

//获取某个歌单的信息和数据
export function getMusicItemList(data){
    return service({
        method:'GET',
        url:`/playlist/detail?id=${data}`
    })
}

//获取某个歌单中的歌曲数据和列表
export function getItemList(data){
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${data}&limit=20&offset=0`
    })
}

// 获取歌词
export function getMusicLyric(data){
    return service({
        methods:'GET',
        url:`/lyric?id=${data}`
    })
}