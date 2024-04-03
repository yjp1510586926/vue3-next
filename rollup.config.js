/*
 * @Description:
 * @Autor: yjp
 * @Date: 2024-04-02 16:49:13
 * @LastEditors: yjp
 * @LastEditTime: 2024-04-02 17:09:35
 * @FilePath: /vue3-next/rollup.config.js
 */
// 引入相关依赖
import ts from "rollup-plugin-typescript2" // 解析ts
import json from '@rollup/plugin-json'
import { nodeResolve } from "@rollup/plugin-node-resolve" // 解析第三方插件
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
// 获取文件路径
let packagesDir =  path.resolve(__dirname, 'packages')

// 2.1 获取需要打包的包
let packageDir = path.resolve(packagesDir, process.env.TARGET)

// 2.2 获取 每个包的项目配置
let resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const name = path.basename(packageDir)

// 3 创建一个映射表
const  outputOptions = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es',
  },
  'esm-browser': {
    file: resolve(`dist/${name}.esm-browser.js`),
    format: 'es',
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs',
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife',
  },
  // runtime-only builds, for main "vue" package only
  'esm-bundler-runtime': {
    file: resolve(`dist/${name}.runtime.esm-bundler.js`),
    format: 'es',
  },
  'esm-browser-runtime': {
    file: resolve(`dist/${name}.runtime.esm-browser.js`),
    format: 'es',
  },
  'global-runtime': {
    file: resolve(`dist/${name}.runtime.global.js`),
    format: 'iife',
  },
}
// 获取到打包的包
const options = pkg.buildOptions
// rollup需要导出一个配置
function creatConfig(format, output) {
  output.name = options.name
  output.sourcemap = true
  // 生成rollup的配置
  return {
    input: resolve("src/index.ts"), // 打包入口
    output,
    plugins: [
      json(),
      ts({
        // 解析ts语法
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
      }),
      nodeResolve(),
    ],
  }
}
export default options.formats.map((format) =>
  creatConfig(format, outputOptions[format])
)
