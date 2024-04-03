/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-02 15:14:15
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-03 09:58:42
 * @FilePath: /vue3-next/packages/shared/src/index.ts
 */
export const isObject=(val:any)=>val!==null&&typeof val==='object'

export const extend=(a:any,b:any)=>{
  for(let key in b){
    a[key]=b[key]
  }
  return a
}
