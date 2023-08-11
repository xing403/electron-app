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
}

export const ElectionDevPlugin = (): Plugin => {
  return {
    name: "electron-dev-plugin",
    configureServer(server) {
      buildBackground()

      server.httpServer?.once("listening", () => {
        // get vite server information
        const address = server.httpServer.address() as AddressInfo;
        const IP = `http://127.0.0.1:${address.port}`
        let electronProcess = spawn(require("electron"), [
          'dist/background.js',
          IP
        ])
        fs.watchFile('src/background.ts', () => {
          // build electron background from ts to js
          electronProcess.kill()
          buildBackground()
          electronProcess = spawn(require("electron"), [
            'dist/background.js',
            IP
          ])
          electronProcess.stderr.on('data',(data)=>{
            console.log(data.toString())
          })
        });

      });
    }
  }
}
