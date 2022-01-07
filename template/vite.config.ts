import path from "path";
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

import {reactRenderRoutes} from '@tool-developer/vite-render-routes'
// import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

import routes from './src/config/route.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRenderRoutes({
      routes,
      // src:'./src/',
      suffix:'.tsx',
      locale:true
    }),
    reactRefresh(),
    //viteCommonjs()
  ],
  css:{
    modules:{
      //scopeBehaviour:'global'
    },
    preprocessorOptions:{
      less:{
        javascriptEnabled:true
      }
    }
  },
  resolve:{
    alias:{
      "@": [path.resolve(__dirname, "./src/")],
      "@@": [path.resolve(__dirname, "./src/.wo-vite/")],
      "~antd":[path.resolve(__dirname, "./node_modules/antd/")],
      //
      //"@tool-developer/wo-storage":[path.resolve(__dirname, "./node_modules/@tool-developer/wo-storage/dist")],
      //"@tool-developer/wo-request":[path.resolve(__dirname, "./node_modules/@tool-developer/wo-request/dist")]
    }
  },
  server: {
    proxy: {
      '/static/uploads':"http://127.0.0.1:3002/",
    }
  }
})