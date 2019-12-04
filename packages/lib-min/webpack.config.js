/**
 *
 * @author tangzehua
 * @sine 2019-08-23 14:31
 */
const argv = require('yargs').argv;
const webpack = require('webpack');

// development
// production
const NODE_ENV = argv.mode || process.env.NODE_ENV || 'production';
const isDebug = NODE_ENV !== "production";

const config = {
    mode: NODE_ENV,
    entry: './index.js',
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // exclude: /(node_modules)/,
                // include: RegExp(`(@xt-web|fr-${moduleName})`),
                use: [{
                    loader: "thread-loader",
                    options: {
                        // workers: os.cpus().length,
                        workerParallelJobs: 50,
                        workerNodeArgs: ["--max-old-space-size=1024"],
                        poolRespawn: false,
                        poolTimeout: 2000,
                        poolParallelJobs: 50,
                        name: "webpack-pool"
                    }
                }, "babel-loader?cacheDirectory=true"]
            },
        ]
    },
    output: {
        filename: isDebug ? "web.js" : 'web.min.js',
        // path: path.resolve(__dirname, 'dist'),
        // library: "web",
        libraryTarget: "umd"
    }
};

module.exports = config;
