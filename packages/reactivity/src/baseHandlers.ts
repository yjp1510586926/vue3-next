/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-03 10:34:46
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-03 21:46:31
 * @FilePath: /vue3-next/packages/reactivity/src/baseHandlers.ts
 */

import { isObject,extend,isArray, isIntegerKey } from "@vue/shared"
import { reactive } from "./reactive"
import { TrackOpTypes,TriggerOpTypes } from "./constants"
import { Track, trigger } from "./effect"

const getFunc=(isReadonly=false,isShallow=false)=>{

  return function(target,key,receiver){
   const data=  Reflect.get(target,key,receiver)
   if(!isReadonly){
    Track(target,TrackOpTypes.GET,key)
    // console.warn('readonly')
  }
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
    const oldValue=target[key]

    let result=Reflect.set(target,key,value,receiver)
   const haskey= isArray(target)&&isIntegerKey (key)?Number(key)<target.length:key in target
   if(!haskey){
    //  console.log('add')
     trigger(target,TriggerOpTypes.ADD,key,value)
    }else if(oldValue!==value){
      // console.log('update')
      trigger(target,TriggerOpTypes.SET,key,value,oldValue)
    }
    return result
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


