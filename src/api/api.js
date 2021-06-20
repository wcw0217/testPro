import request from '@/plugins/axios'

// 登录
export function fetchToken (data) {
  return request({
    url: '/registrations',
    method: 'get',
    data: data
  })
}

// 上传
export function uploadToken (data) {
  return request({
    url: '/upload_tokens',
    method: 'get',
    data: data
  })
}

//参保人信息
export function insuranceInfo (data) {
  return request({
    url: '/insurance',
    method: 'get',
    data: data
  })
}

