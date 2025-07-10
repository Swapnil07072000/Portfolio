const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            // filename: 'bundle.js',
            publicPath: '/Portfolio/',
            filename: 'bundle.[contenthash].js',
            clean: true,
        },
        mode: 'production',
         performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {             
                    test: /\.(sass|less|css)$/i,
                    use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'] 
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                        },
                    ],
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
            }),
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.css'],
        },
    };