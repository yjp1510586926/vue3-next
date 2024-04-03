import { isArray, isIntegerKey } from "@vue/shared"
import { TriggerOpTypes } from "./constants"

/*
import options from '../../../rollup.config';
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-03 18:24:36
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-03 22:12:13
 * @FilePath: /vue3-next/packages/reactivity/src/effect.ts
 */
export const effect = (fn,options:any={}) => {
  const effect = createReactiveEffect(fn,options)
  if (!options.lazy) {
    effect()
  }
  return effect
}

let uid=0
let activeEffect
const effectStack = []


const createReactiveEffect = (fn,options) => {
  const effect = () => {
    if(!effectStack.includes(effect)){
      try{
        effectStack.push(effect)
        activeEffect=effect
        fn()
      }finally{
        effectStack.pop()
        activeEffect=effectStack[effectStack.length-1]
      }
    }
  }
  effect.id=uid++
  effect._isEffect=true
  effect.raw=fn
  effect.options=options
  return effect
}

let targetMap = new WeakMap()
export const Track = (target, type, key) => {
  // console.log(activeEffect,target, type, key)
  if(activeEffect===undefined){
    return
  }
  let depMap = targetMap.get(target)
  if(!depMap){
    depMap=new Map()
    targetMap.set(target,depMap)
  }
  let dep = depMap.get(key)
  if(!dep){
    dep=new Set()
    depMap.set(key,dep)
  }
  if(!dep.has(activeEffect)){
    dep.add(activeEffect)
  }
  console.log(targetMap)

}

export const trigger = (target, type, key, value, oldValue?) => {
  debugger
  let depMap = targetMap.get(target)
  if(!depMap){
    return
  }
  let deps = depMap.get(key)
  let effects = new Set()
  const add=(effectsToAdd)=>{
    if(effectsToAdd){
      effectsToAdd.forEach(effect=>{
        effects.add(effect)
      })
    }
  }
  if(key==='length'&&isArray(target)){
    debugger
    deps.forEach((dep)=>{
      if(dep.key==='length'||dep.key>=value){
        add(dep)
      }
    })
  }
  else{
    if(key!==undefined){
      add(deps.get(key))
    }
    switch(type){
      case TriggerOpTypes.ADD:
        if(isArray(target)&&isIntegerKey(key)){
          add(deps.get('length'))
        }
    }
  }
  effects.forEach((effect:any)=>{ effect() }
  )

}
