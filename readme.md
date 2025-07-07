## This Repo is the template for the ReactJS without npx, we can we use it and to understand have listed down the steps.

## Steps to setup ReactJS without npx

1. Create project folder.
2. Initialize
    ```
    npm init -y
    ```
    This will create `package.json` file.
3. Install core libraries of react.
    ```
    npm install react react-dom
    ```
4. install development tools
    1. webpack:
        ```
        npm install --save-dev webpack webpack-cli webpack-dev-server
        ```
    2. babel:
        ```
        npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
        ```
    3. html-webpack-plugin:
        ```
        npm install --save-dev html-webpack-plugin
        ```

    Together (webpack + babel + html-webpack-plugin):
    ```
    npm install --save-dev \
        webpack webpack-cli webpack-dev-server \
        babel-loader @babel/core @babel/preset-env @babel/preset-react \
        html-webpack-plugin
    ```
    Explanation of Tools:
        - webpack: Bundles JS files

        - webpack-cli: CLI for webpack

        - webpack-dev-server: Development server for auto-reloading

        - babel-loader: Lets webpack use Babel

        - @babel/core: Babel compiler

        - @babel/preset-env: Transpiles ES6+ code

        - @babel/preset-react: Transpiles JSX

        - html-webpack-plugin: Injects bundled JS into your HTML file

5. Setup the folder structure:
    ```
    mkdir src public && touch src/index.js public/index.html
    ```
    Folder structure:
    ```
    - public
        - index.html
    - src
        - index.js
    ```

6. Add HTML Template: In `public/index.html`
    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Manual React App</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
    </html>
    ```

7. Add React entry point: In `src/index.js`
    ```
    import React from 'react';
    import ReactDOM from 'react-dom/client';

    const App = () => <h1>Hello React (Manual Setup)!</h1>;

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
    ```

8. Configure Babel: Create `.babelrc` file in root path and add this.
    ```
    {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
    }
    ```
    This tells Babel how to convert modern JavaScript and JSX into code browsers understand.

9. Configure webpack: Create a webpack.config.js file in the root and add this.
    ```
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
            static: './dist',
            port: 3000,
            open: true,
        },
        module: {
            rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
            template: 'public/index.html',
            }),
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
        },
    };
    ```
    This is the configuration Webpack uses to:
        - Start a server
        - Use Babel
        - Bundle JS
        - Inject your app into HTML

10. Add scripts to `package.json`: In scripts section add this.
    ```
    "scripts": {
        "start": "webpack serve",
        "build": "webpack"
    }
    ```
    - npm start: Runs the development server
    - npm run build: Bundles the app into /dist

11.  Start the App: </br>
    ```
    npm start
    ```
