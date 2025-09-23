import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, '../../')
  const env = loadEnv(mode, envDir, 'VITE_')

  const envVariables = Object.fromEntries(
    Object.entries(env).map(([key, value]) => [
      `import.meta.env.${key}`, JSON.stringify(value),
    ])
  )

  return {
    plugins: [react()],
    define: envVariables,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/pages': path.resolve(__dirname, './src/pages'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/services': path.resolve(__dirname, './src/services'),
        '@/assets': path.resolve(__dirname, './src/assets'),
      },
    },
  }
})
