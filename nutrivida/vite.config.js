import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Configuración de Vitest (pruebas unitarias / de componentes).
  test: {
    environment: 'jsdom',            // usar el DOM simulado
    globals: true,                   // describe/it/expect disponibles sin importar
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.test.{js,jsx}'],
    css: false,
    // Cobertura de código: se genera con `npm run test:coverage` en la carpeta coverage/.
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/**/*.test.{js,jsx}', 'src/test/**', 'src/main.jsx'],
      // Mínimos obligatorios: si la cobertura baja, el comando termina con error (y el CI se detiene).
      // La guía exige 80 % para todo src/; mientras el proyecto tenga pocas pruebas, el mínimo se
      // aplica solo a los archivos que ya están probados. Agrega aquí cada archivo nuevo con test.
      // Cuando la cobertura global supere el 80 %, reemplaza este bloque por:
      //   thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
      thresholds: {
        'src/componente/FormularioContactanos.jsx': {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
  },
})
