// Configuración de Karma: ejecuta las pruebas de Jasmine en uno o varios navegadores.
process.env.BABEL_ENV = 'test';

// Usa el Chrome instalado (Puppeteer no es necesario). En Windows normalmente se detecta solo.
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    // Punto de entrada único que importa todos los archivos *.spec.tsx
    files: [
      { pattern: 'test/index.ts', watched: false },
      // Imágenes de /public servidas (sin incluir) para que las <img> carguen en las pruebas
      { pattern: 'public/img/*', watched: false, included: false, served: true },
    ],
    proxies: { '/img/': '/base/public/img/' },

    preprocessors: {
      'test/index.ts': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          // El proyecto es ESM ("type": "module"); permite importar sin escribir la extensión
          { test: /\.m?[jt]sx?$/, resolve: { fullySpecified: false } },
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
      },
      resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
    },

    reporters: ['spec', 'coverage'],

    // Informe de cobertura: HTML navegable + resumen en consola
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'text-summary' },
        { type: 'text' },
      ],
      check: {
        global: { statements: 80, branches: 70, functions: 80, lines: 80 },
      },
    },

    // Navegadores disponibles. Por defecto Chrome sin interfaz.
    // "npm run test:all" ejecuta además en Firefox.
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu'],
      },
    },

    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,
  });
};
