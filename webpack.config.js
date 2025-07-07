const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            clean: true,
        },
        mode: 'development',
        devServer: {
            host: '0.0.0.0',
            static: './dist',
            port: 9000,
            open: true,
            hot: true,
            historyApiFallback: true,
            allowedHosts: 'all'
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