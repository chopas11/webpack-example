const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Environment Variables
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// Template of file names
const filename = (ext) => `[name].[fullhash].${ext}`;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', '@js/index.js'],
    // second: '@js/second.ts',
  },
  output: {
    filename: `js/${filename('js')}`,
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@js': path.resolve(__dirname, 'src/js'),
      '@models': path.resolve(__dirname, 'src/js/models'),
      '@fonts': path.resolve(__dirname, 'src/fonts'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@sass': path.resolve(__dirname, 'src/sass'),
    },
  },
  devServer: {
    port: 3000,
    //hot: isDev,
  },
  devtool: isDev ? 'source-map' : 'eval-cheap-source-map',
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: `css/${filename('css')}`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },

      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
};
