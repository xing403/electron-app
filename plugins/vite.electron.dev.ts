// Electron development environment
import type { Plugin } from "vite";
import type { AddressInfo } from "net";
import { spawn } from "child_process";
import fs from "node:fs";
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
let electronProcess
const startProcess = (IP) => {
  // bug 若为构建: require('electron') 改为 require.resolve("electron")
  electronProcess = spawn(require("electron"), [
    'dist/background.js',
    IP
  ])
}
export const ElectionDevPlugin = (): Plugin => {
  return {
    name: "electron-dev-plugin",
    configureServer(server) {
      buildBackground()

      server.httpServer?.once("listening", () => {
        // get vite server information
        const address = server.httpServer?.address() as AddressInfo;
        const IP = `http://localhost:${address.port}`
        startProcess(IP)
        fs.watchFile('plugins/electron/background.ts', () => {
          // build electron background from ts to js
          electronProcess.kill()
          buildBackground()
          startProcess(IP)
        })
      })
    }
  }
}
