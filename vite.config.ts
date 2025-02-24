import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@models': path.resolve(__dirname, './src/models'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@reducers': path.resolve(__dirname, './src/reducers'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  }
})
