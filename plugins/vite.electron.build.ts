// Electron production environment
import type { Plugin } from "vite";
import * as ElectronBuilder from 'electron-builder'
import fs from "node:fs";
import path from "path";

const buildBackground = () => {
  // build electron background from ts to js
  require('esbuild').buildSync({
    entryPoints: ['src/background.ts'],
    outfile: 'dist/background.js',
    bundle: true,
    platform: 'node',
    target: 'node16',
    external: ['electron']
  })
  require('esbuild').buildSync({
    entryPoints: ['src/preload.ts'],
    outfile: 'dist/preload.js',
    bundle: true,
    platform: 'node',
    target: 'node16',
    external: ['electron']
  })
}

export const ElectronBuildPlugin = (): Plugin => {
  return {
    name: 'electron-build-plugin',
    closeBundle() { // wait vite build end
      buildBackground()
      const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      json.main = 'background.js'
      fs.writeFileSync(fs.openSync('dist/package.json', 'w'), JSON.stringify(json, null, 4))
      fs.mkdirSync('dist/node_modules') // 阻止 electron-builder 下载垃圾文件
      ElectronBuilder.build({
        config: {
          appId: 'com.electron.app',
          productName: 'electron-app',
          directories: {
            output: path.resolve(process.cwd(), 'release'),
            app: path.resolve(process.cwd(), 'dist')
          },
          files: ['**/*'],
          asar: true,
          nsis: {
            oneClick: false, // 取消一键安装操作
            allowToChangeInstallationDirectory: true, // 允许用户自定义安装目录
          }
        }
      })
    }
  }
}
