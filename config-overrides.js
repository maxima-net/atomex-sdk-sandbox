const webpack = require('webpack');

module.exports = function override(config, env) {
  config = {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
				https: 'agent-base',
			},
      fallback: {
        ...config.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        https: require.resolve('https-browserify'),
        crypto: false,
        assert: false,
        http: false,
        url: false,
        os: false,
        path: false,
      }
    },
    plugins: [
      ...config.plugins,
			new webpack.ProvidePlugin({
				Buffer: ['buffer', 'Buffer'],
			}),
      new webpack.ProvidePlugin({
				process: 'process/browser',
			}),
    ]
  };

  return config;
}