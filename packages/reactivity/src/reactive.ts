/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-03 09:51:57
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-03 11:16:14
 * @FilePath: /vue3-next/packages/reactivity/src/reactive.ts
 */


import { isObject } from "@vue/shared"
import { reactiveHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers } from "./baseHandlers"



const reactiveMap=new WeakMap();
const readonlyMap=new WeakMap()
const createReactObj=(target:object,isReadonly:boolean,baseHandlers)=>{

  if(!isObject(target)){
    return
  }
  const propsMap=isReadonly?readonlyMap:reactiveMap
  if(propsMap.has(target)){
    return propsMap.get(target)
  }

  const proxy=new Proxy(target,baseHandlers)

  propsMap.set(target,proxy)
  return proxy

}


export const  reactive =(target:object)=>createReactObj(target,false,reactiveHandlers)

export const  shallowReactive =(target:object)=>createReactObj(target,false,shallowReactiveHandlers)

export const  readonly =(target:object)=>createReactObj(target,true,readonlyHandlers)

export const  shallowReadonly =(target:object)=>createReactObj(target,true,shallowReadonlyHandlers)
