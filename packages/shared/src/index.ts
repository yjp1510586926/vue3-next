/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-02 15:14:15
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-03 21:28:44
 * @FilePath: /vue3-next/packages/shared/src/index.ts
 */
export const isObject=(val:any)=>val!==null&&typeof val==='object'

export const extend=(a:any,b:any)=>{
  for(let key in b){
    a[key]=b[key]
  }
  return a
}
export const isArray=(val:any):val is Array<any>=>Array.isArray(val)
export const isFunction=(val:any):val is Function=>typeof val==='function'
export const isString=(val:any):val is string=>typeof val==='string'
export const isSymbol=(val:any):val is symbol=>typeof val==='symbol'

export const isIntegerKey=(key:any)=>{
  return parseInt(key)+''===key
}

export const hasOwn=(target:any,key:string)=>Object.prototype.hasOwnProperty.call(target,key)
