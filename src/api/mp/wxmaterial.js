import request from '@/router/axios'

export function getPage(query) {
  return request({
    url: '/mp/wxmaterial/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/mp/wxmaterial/materialNews',
    method: 'post',
    data: obj
  })
}

export function materialNewsUpdate(obj) {
  return request({
    url: '/mp/wxmaterial/materialNews',
    method: 'put',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/mp/wxmaterial/' + id,
    method: 'get'
  })
}

export function delObj(query) {
  return request({
    url: '/mp/wxmaterial',
    method: 'delete',
    params: query
  })
}

export function putObj(obj) {
  return request({
    url: '/mp/wxmaterial',
    method: 'put',
    data: obj
  })
}

export function getMaterialOther(query) {
  return request({
    url: '/mp/wxmaterial/materialOther',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function getMaterialVideo(query) {
  return request({
    url: '/mp/wxmaterial/materialVideo',
    method: 'get',
    params: query
  })
}

export function  getTempMaterialOther(query) {
  return request({
    url: '/mp/wxmaterial/tempMaterialOther',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
