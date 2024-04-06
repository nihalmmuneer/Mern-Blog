import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api":{
         target:"http://localhost:3000",
        secure:false //we use secure inorder to avoid https issues here we use http instead of https
      }
    }
  },
  plugins: [react()],
})
