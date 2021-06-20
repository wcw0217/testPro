import axios from 'axios'
// import router from '@/router'
import VueCookies from 'vue-cookies';
import { Toast } from 'vant';
// 创建一个错误
function errorCreate(msg) {
  Toast(msg);
}
function load(msg) {
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: msg
  })
}

// window.location.origin 兼容IE
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
// 401只返回一次错误消息
let overdue = true
// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API : window.location.origin,
  timeout: 600000,// 请求超时时间,
  withCredentials: true,
})
axios.defaults.headers = {
  "Content-Type": 'application/json'
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['Private-Token'] = VueCookies.get('token');
    load('请稍等...')
    return config
  },
  error => {
    // 发送失败
    // console.log(error)
    errorCreate('请求超时!');
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    Toast.clear();
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios;
        default:
          errorCreate(dataAxios.msg);
          return dataAxios;
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 450: error.message = '会话已失效'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorCreate(error)
    Toast.clear();
    return Promise.reject(error)
  }
)

export default service