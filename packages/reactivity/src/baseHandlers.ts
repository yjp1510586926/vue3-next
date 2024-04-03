/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-03 10:34:46
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-03 11:57:41
 * @FilePath: /vue3-next/packages/reactivity/src/baseHandlers.ts
 */

import { isObject,extend } from "@vue/shared"
import { reactive } from "./reactive"

const getFunc=(isReadonly=false,isShallow=false)=>{
  if(isReadonly){
    // console.warn('readonly')
  }
  return function(target,key,receiver){
   const data=  Reflect.get(target,key,receiver)
    if(isShallow){
      return data
    }

    if(isObject(data)){
      return reactive(data)
    }
    return data
  }
}

const setFunc =(shallow=false)=>{

  return function(target,key,value,receiver){
    console.log('set',key,value)
    return Reflect.set(target,key,value,receiver)
  }
}

let readonlyObj = {
  set: (target, key, value) => {
    console.log(`set ${value} on key ${key} is faild`)
  },
}


export const reactiveHandlers={
  get:getFunc(),
  set:setFunc()
}

export const shallowReactiveHandlers={
  get:getFunc(false,true),
  set:setFunc()
}

export const readonlyHandlers=extend(
  {get:getFunc()},readonlyObj
  )


export const shallowReadonlyHandlers=extend(
  {get:getFunc(true,true)},readonlyObj
)


