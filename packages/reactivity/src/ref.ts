/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-05 09:58:04
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-05 10:36:19
 * @FilePath: /vue3-next/packages/reactivity/src/ref.ts
 */
import { hasChanged } from "@vue/shared"
import { TrackOpTypes,TriggerOpTypes } from "./constants"
import { Track, trigger } from "./effect"

export const ref = (rawValue) => {
    return createRef(rawValue)
}

const  createRef = (rawValue, shallow = false) => {
    return new RefImpl(rawValue, shallow)
}

class RefImpl {
  public __v_isRef = true
  public _rawValue
  public _value
  public shallow

    constructor(rawValue, shallow) {
        this._rawValue = rawValue
        this._value = shallow ? rawValue : rawValue
    }
    get value() {
      Track(this,TrackOpTypes.GET,'value')
        return this._value
    }
    set value(newVal) {
        if (hasChanged(newVal, this._rawValue)) {
            this._rawValue = newVal
            this._value = this.shallow ? newVal : newVal
            trigger(this, TriggerOpTypes.SET, 'value', newVal)
        }
    }
}

export const isRef = (v) => {
    return v ? v.__v_isRef === true : false
}

export const toRef = (obj, key) => {
return new ObjectRefImpl(obj,key)
}

class ObjectRefImpl {
  public __v_isRef = true
  public _obj
  public _key

  constructor(obj,key){
    this._obj=obj
    this._key=key
  }
  get value(){
    return this._obj[this._key]
  }
  set value(newVal){
    this._obj[this._key]=newVal
  }
}
export const toRefs = (obj) => {
  const ret = Array.isArray(obj) ? new Array(obj.length) : {}
  for (const key in obj) {
    ret[key] = toRef(obj, key)
  }
  return ret
}
