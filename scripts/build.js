/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-02 15:44:23
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-02 16:47:22
 * @FilePath: /vue3-next/scripts/build.js
 */
import fs from 'node:fs'
import path from 'node:path'
import minimist from 'minimist'
import { execa, execaSync } from 'execa'

// 只打包文件夹
const targets = fs.readdirSync('packages').filter(f => {
  if (
    !fs.statSync(`packages/${f}`).isDirectory() ||
    !fs.existsSync(`packages/${f}/package.json`)
  ) {
    return false
  }
  return true
})

async function build(target) {
  const pkgDir = path.resolve(`packages/${target}`)

  // if building a specific format, do not remove dist.
  // if ( fs.existsSync(`${pkgDir}/dist`)) {
  //   await fs.rm(`${pkgDir}/dist`, { recursive: true })
  // }

  await execa("rollup", ["-c", "--environment", `TARGET:${target}`], {
    stdio: "inherit",
  }) // 子进程的输出在父包中输出
}

const runParaller=async()=>{
  await Promise.all(targets.map(build))
  console.log('build success');

}

runParaller()
