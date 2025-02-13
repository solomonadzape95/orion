//@ts-check

'use strict';

const path = require('path');
const webpack = require('webpack'); // Import webpack
const dotenv = require('dotenv'); // Import dotenv

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
    target: 'node',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // Set mode based on env
    entry: './src/extension.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ // Define plugin for env vars
            'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
        }),
    ],
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: "log",
    },
};
module.exports = [extensionConfig];