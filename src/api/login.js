/*
 *    Copyright (c) 2018-2025, cloud All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: cloud
 */
import request from '@/router/axios'
import qs from 'qs'

const scope = 'server'

export const loginByUsername = (username, password, code, randomStr) => {
  let grant_type = 'password'
  let dataObj = qs.stringify({'username': username, 'password': password})

  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: {randomStr, code, grant_type},
    data: dataObj
  })
}

export const refreshToken = (refresh_token) => {
  const grant_type = 'refresh_token'
  return request({
    url: '/auth/oauth/token',
    headers: {
      'isToken': false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: {refresh_token, grant_type, scope}
  })
}

export const loginByMobile = (mobile, code) => {
  const grant_type = 'mobile'
  return request({
    url: '/auth/mobile/token/sms',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: {mobile: 'SMS@' + mobile, code: code, grant_type}
  })
}

export const loginBySocial = (state, code) => {
  const grant_type = 'mobile'
  return request({
    url: '/auth/mobile/token/social',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: {mobile: state + '@' + code, grant_type}
  })
}

export const getUserInfo = () => {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}
