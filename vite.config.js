import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: el sitio funciona igual en GitHub Pages (subruta) que en la raíz de un dominio.
export default defineConfig({
  base: './',
  plugins: [react()],
});
