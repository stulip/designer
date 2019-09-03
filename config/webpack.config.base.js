const fs = require('fs-extra');
const path = require('path');
const os = require("os");
const appRootPath = require("app-root-path");
const webpack = require('webpack');
const uuid = require('uuid');
// const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {getLastVersion} = require('../scripts/utils');

const configData = require('./config.json5');
const argv = require('yargs').argv;
const NODE_ENV = argv.mode || process.env.NODE_ENV || 'development';
const isDebug = NODE_ENV !== 'production';

// 模块名称
const moduleName = argv.module;
const moduleRoot = "modules";

//CDN 配置
const config = {
    isDebug,
    moduleRoot,
    isRelease: !!argv.release,
    proxy: configData.proxy,
    module: {
        config: configData.module[moduleName],
        name: moduleName || "",
        // 模块列表
        block: configData.block[argv.block || 'dev'],
        list: configData.module,
    },
    //项目根目录
    rootPath: appRootPath.path,
    // entry 入口文件名称
    entryName: "index",//uuid.v4().substr(0, 8);
    uuid: uuid.v4().substr(0, 8),
    libsName: 'libs',
    libs: {
        name: 'libs',
        min: isDebug ? '' : '.min',
    },
    externals: {
        // jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM',
        'object-assign': "Object.assign",
        "mobx": "mobx",
        "mobx-react": "mobxReact",
        "mobx-react-lite": "mobxReactLite",
        'fr-web': 'xt.web',
        'fr-ui': 'xt.ui',
        '@xt-web/core': "$xt.core",
        '@xt-web/react': "$xt.react",
        '@xt-web/react-dom': "$xt.reactDOM",
        'react-router': ['ReactRouterDOM'],
        'react-router-dom': "ReactRouterDOM",
        'react-router-config': "ReactRouterConfig",
        'lodash': "lodash",
    },
    provide: {
        // jQuery: "jquery",
    },
    alias:
        [
            '@babel', 'regenerator-runtime', 'react-hot-loader',
            ...isDebug ?
                [
                    'fast-levenshtein', 'hoist-non-react-statics', 'prop-types', 'react-is', 'sort-keys', 'is-plain-obj',
                    'shallowequal', 'react-lifecycles-compat', 'lodash/merge', 'normalize-url', 'prepend-http', 'query-string',
                    'strict-uri-encode'
                ] : []
        ]
};
config.modulePath = config.module.config? config.module.config.path: '';
//模块的package.json
config.packages = config.module.name ? require(`${config.rootPath}/${config.moduleRoot}/${config.modulePath}/package.json`) : {};

config.libs.cdn = {
    // jquery: {
    //     name: 'jquery.min.js',
    //     from: 'node_modules/jquery/dist',
    //     to: moduleConfig.CDNPath,
    // },
    react: {
        name: `react.${NODE_ENV}${config.libs.min}.js`,
        from: 'node_modules/react/umd',
        to: config.libs.name,
    },
    reactDom: {
        name: `react-dom.${NODE_ENV}${config.libs.min}.js`,
        // from: 'node_modules/react-dom/umd',
        from: isDebug ? 'node_modules/@hot-loader/react-dom/umd' : 'node_modules/react-dom/umd',
        to: config.libs.name,
    },
    mobx: {
        name: `mobx.umd${config.libs.min}.js`,
        from: 'node_modules/mobx/lib',
        to: config.libs.name,
    },
    mobxReacLite: {
        name: `mobx-react-lite.js`,
        from: `node_modules/mobx-react-lite/dist/index${config.libs.min}.js`,
        to: config.libs.name + `/mobx-react-lite${config.libs.min}.js`,
    },
    mobxReact: {
        name: `mobx-react.umd.js`,
        from: `node_modules/mobx-react/dist`,
        to: config.libs.name,
    },
    // umd react-router-dom include router package
    // reactRouter: {
    //     name: `react-router.min.js`,
    //     from: 'node_modules/react-router/umd',
    //     to: config.libs.name,
    // },
    reactRouterDOM: {
        name: `react-router-dom${config.libs.min}.js`,
        from: 'node_modules/react-router-dom/umd',
        to: config.libs.name,
    },
    reactRouter: {
        name: `react-router.js`,
        from: 'static/js',
        to: config.libs.name,
    },
    reactRouterConfig: {
        name: `react-router-config${config.libs.min}.js`,
        from: 'node_modules/react-router-config/umd',
        to: config.libs.name,
    },
    xtCore: {
        name: `xt.core.min.js`,
        from: 'node_modules/@xt-web/core/dist',
        to: config.libs.name,
    }
};

//css loader 配置信息
const cssLoader = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: process.env.NODE_ENV === 'development',
            // if hmr does not work, this is a forceful method.
            // reloadAll: true,
        }
    },
    {
        loader: "css-loader",
        options: {
            importLoaders: 1,
        },
    },
    "postcss-loader"
];

function plugins() {
    let proPlugins = [
        // new CleanWebpackPlugin(['dist'], {
        //     root: rootPath,
        //     verbose: true,
        //     dry: false
        // })
    ], devPlugin = [
        new CaseSensitivePathsPlugin(),
        // new webpack.DllReferencePlugin({
        //     context: path.join(__dirname, "build"),
        //     manifest: require("./build/manifest.debug.json")
        // }),
    ];

    return [
        new webpack.ProvidePlugin(config.provide),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: isDebug ? "css/[name].css" : "css/[chunkhash].css"
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            'process.env': {
                'MODULE_VERSION': JSON.stringify(getLastVersion(config.packages.version))
            }
        }),
        ...isDebug ? devPlugin : proPlugins
        // new PrepackWebpackPlugin({})
    ];
}

function optimization() {
    return {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                //这块代码放入 Web 里面
                // vendor: {
                //     name: 'vendor',
                //     chunks: 'initial',
                //     priority: -10,
                //     reuseExistingChunk: false,
                //     test: /node_modules\/(.*).js/
                // },
                // 开发模式关闭
                // styles: {
                //     name: 'styles',
                //     test: /.(less|css)$/,
                //     chunks: 'async',
                //     minChunks: 1,
                //     reuseExistingChunk: true,
                //     enforce: true
                // }
            }
        },
        ...!isDebug && {
            minimizer: [
                new UglifyJsPlugin({
                    cache: false,
                    parallel: true,
                    sourceMap: false,
                    uglifyOptions: {
                        compress: {
                            // warnings: false,
                            comparisons: false,
                            drop_console: true,
                            drop_debugger: true
                        },
                        mangle: {
                            // safari10: true,
                        },
                        safari10: true,
                        output: {
                            comments: false,
                            ascii_only: true,
                        }
                    }
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    };
}

const rules = [
    {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 512,
                name: 'image/[hash:8].[ext]',
                outputPath: '../art',
                publicPath: '/art'
            }
        },
    },
    {
        test: /\.js$/,
        // exclude: /(node_modules)/,
        include: RegExp(`(@xt-web|fr-${moduleName})`),
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
        }, "react-hot-loader/webpack", "babel-loader?cacheDirectory=true"]
    },
    {
        test: /\.less$/,
        exclude: /node_modules/,
        use: cssLoader.concat([
            require.resolve('less-loader')
        ])
    },
    {
        test: /\.(css|pcss)$/,
        use: cssLoader
    },
    {
        test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: {
            loader: "url-loader",
            options: {
                limit: 10000,
                name: "fonts/[hash:8].[ext]",
                outputPath: '../art',
                publicPath: '/art'
            }
        }
    }
];

module.exports = config;
module.exports.config = {
    // context: path.resolve('src/core'),
    devtool: config.isDebug ? "cheap-module-source-map" : undefined,
    plugins: plugins(),
    optimization: optimization(),
    entry: {
        [config.entryName]: [
            ...isDebug ? [
                require.resolve('webpack-plugin-serve/client')
            ] : [],
            `./${config.modulePath}/src/index`
        ]
    },
    output: {
        hashDigestLength: 8,
        filename: 'js/[name].js',
        chunkFilename: 'js/[chunkhash].js',
        hotUpdateMainFilename: "hot/[hash].update.json",
        hotUpdateChunkFilename: 'hot/[hash].update.js',
        //`${config.module.name.charAt(0).toUpperCase()}${config.module.name.slice(1)}`
        //["fr", `${config.module.name}`]
        library: ['xt', `${config.module.name}`],
    },
    module: {rules},
    resolve: {
        extensions: ['.js', '.json', '.css', '.less'],
        modules: [path.join(config.rootPath, config.moduleRoot, config.modulePath, "src")],
        alias: config.alias.reduce((abc, def) => (abc[def] = path.resolve('node_modules', def), abc), {
            'fr-art': path.resolve('modules', 'fr-art')
        }),
    },
    externals: config.externals
};
