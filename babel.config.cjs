// Babel solo se usa en las pruebas (Karma + webpack): traduce TypeScript/TSX a JavaScript.
// Vite (npm run dev / build) usa su propio compilador (esbuild).
module.exports = (api) => {
  const esTest = api.env('test');
  return {
    presets: [
      ['@babel/preset-env', { targets: { chrome: '100', firefox: '100' } }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    ],
    // istanbul instrumenta el código fuente para medir la cobertura
    plugins: esTest ? [['istanbul', { exclude: ['test/**', 'node_modules/**'] }]] : [],
  };
};
