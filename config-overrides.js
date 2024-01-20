const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = function override(config, env) {
  // Add the Monaco Editor webpack plugin
  config.plugins.push(new MonacoWebpackPlugin());

  return config;
};
