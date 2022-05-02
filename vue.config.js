const publicPath = process.env.VUE_APP_PUBLIC_PATH
module.exports = {

    publicPath: publicPath,

    runtimeCompiler: true,

    // configure webpack-dev-server behavior
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8060,
        https: false,
        hotOnly: false,
        proxy: process.env.VUE_APP_ROOT_URL
    },

    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: './index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'SiCARF - Vistoria',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    }

}
