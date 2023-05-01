
import axios from 'axios';
//创建一个axios实例，配置基本设置
let service=axios.create({
    baseURL:'http://localhost:3000/',//本地服务器的地址
    timeout:3000
})
//导出实例
export default service