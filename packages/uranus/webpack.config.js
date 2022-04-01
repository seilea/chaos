const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = (config, context) => {
  nrwlConfig(config);

  const mode = config.mode;

  config.plugins[0].definitions['process.env'] = {
    ...config.plugins[0].definitions['process.env'],
    NODE_ENV: JSON.stringify(mode)
  };

  return {
    ...config,
    plugins: [
      ...config.plugins,
      new MomentLocalesPlugin(),
      new ProgressBarPlugin({
        format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    ],
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  };
};
