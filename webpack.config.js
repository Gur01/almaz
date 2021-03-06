const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    entry: {
      main: './src/main.js'
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.pug$/,
          use: {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            MiniCssExtractPlugin.loader,
            'css-loader',
            // 'postcss-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          exclude: [/fonts/],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images',
              }
            },
            // {
            //   loader: 'image-webpack-loader',
            //   options: devMode ? {} : {
            //     mozjpeg: {
            //       progressive: true,
            //       quality: 65
            //     },
            //     // optipng.enabled: false will disable optipng
            //     optipng: {
            //       enabled: false,
            //     },
            //     pngquant: {
            //       quality: '65-90',
            //       speed: 4
            //     },
            //     gifsicle: {
            //       interlaced: false,
            //     },
            //     // the webp option will enable WEBP
            //     webp: {
            //       quality: 75
            //     }
            //   }
            // },
          ],
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader?limit=10000&mimetype=application/font-woff',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts',
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './fonts',
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.pug"
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
    ],

    devServer: {
      overlay: true,
      open: true
    },

    devtool: devMode ? 'eval-source-map' : '',

    resolve: {
      alias: {
        '@': path.resolve(__dirname),
        'src': path.resolve(__dirname, 'src'),
        'dist': path.resolve(__dirname, 'dist'),
      }
    }
  }
}