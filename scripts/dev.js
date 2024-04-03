/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-02 15:44:23
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-03 12:02:28
 * @FilePath: /vue3-next/scripts/dev.js
 */
import fs from 'node:fs'
import path from 'node:path'
import minimist from 'minimist'
import { execa, execaSync } from 'execa'



async function build(target) {
  const pkgDir = path.resolve(`packages/${target}`)


  await execa("rollup", ["-cw", "--environment", `TARGET:${target}`], {
    stdio: "inherit",
  }) // 子进程的输出在父包中输出
}

build('reactivity')
