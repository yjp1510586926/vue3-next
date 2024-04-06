/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-05 10:55:57
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-05 11:31:02
 * @FilePath: /vue3-next/packages/reactivity/src/computed.ts
 */
import { TriggerOpTypes,TrackOpTypes } from "./constants"
import { Track, effect, trigger } from "./effect"

export const computed = (fn) => {
  let getter
  let setter

  if(typeof fn === 'function'){
    getter = fn
    setter = ()=>{}
  }else{
    getter = fn.get
    setter = fn.set
  }


  return new ComputedRefImpl(getter,setter)
}

class ComputedRefImpl {
    public __v_isRef = true

    public _value
    public _dirty = true
    public _effect
    public _scheduler

    constructor(getter,public setter) {

        this._effect = effect(getter, {
            lazy: true,
            scheduler: () => {
                if (!this._dirty) {
                    this._dirty = true
                }
            }
        })
    }
    get value() {
        if (this._dirty) {
            this._value = this._effect()
            this._dirty = false
        }
        debugger
        Track(this, TrackOpTypes.GET, 'value')
        return this._value
    }
    set value(newVal) {
        this.setter(newVal)
    }
}

