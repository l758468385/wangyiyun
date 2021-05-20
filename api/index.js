import request from '../utils/request'

/* 获取轮播图 */
export function getBanner(url,data) {
  return request(url,data)
}

/* 获取推荐栏 */

export function getRec(url,data){
  return request(url,data)
}

/* 获取排行榜数据 */
export function getTop(url,data){
  return request(url,data)
}