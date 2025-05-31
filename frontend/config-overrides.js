const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
    config.plugins.push(new MonacoWebpackPlugin({
        // languages: ['json', 'markdown', 'python', 'yaml']
    }));
    // add resolve.fallback: { "path": require.resolve("path-browserify") }
    config.resolve.fallback = { "path": require.resolve("path-browserify") };
    return config;
}