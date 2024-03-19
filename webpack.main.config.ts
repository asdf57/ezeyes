/**
 * The main configuration file for the Electron main process.
 * This file is responsible for bundling the main process code.
 * @see https://webpack.js.org/configuration/
 */

import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

export const mainConfig: Configuration = {
  entry: './src/electron/main.ts',
  module: {
    rules
  },
    plugins,
    resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    fallback: {
      "assert": require.resolve("assert/"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "process": require.resolve("process/browser"),
    },
    alias: {
      'iconv-lite$': 'iconv-lite/lib/index.js',
    },
  },
};
