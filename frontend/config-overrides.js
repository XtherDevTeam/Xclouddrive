const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    config.plugins.push(new MonacoWebpackPlugin({
        // languages: ['json', 'markdown', 'python', 'yaml']
    }));
    // add resolve.fallback: { "path": require.resolve("path-browserify") }
    config.plugins.push(new CopyWebpackPlugin({
        patterns: [
            {
                from: 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
                to: '.' // Copies to the root of your output directory (e.g., dist or build)
            },
        ],
    }))
    config.resolve.fallback = { "path": require.resolve("path-browserify") };
    return config;
}