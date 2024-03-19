import type { ModuleOptions } from 'webpack';

export const rules: Required<ModuleOptions>['rules'] = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
    resolve: {
      aliasFields: ['main']
    }
  },
  {
    test: /\.(ts|tsx|js|jsx)$/, // Match TypeScript and JavaScript files
    exclude: /node_modules/, // Exclude the node_modules directory
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react', '@babel/preset-typescript'], // Use React and TypeScript presets
      },
    },
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'], // Process CSS files
  },
];
