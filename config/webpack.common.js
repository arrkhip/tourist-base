// vars
const paths = require('./paths');
const path = require('path');
const glob = require('glob');

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const views = [];

// config
module.exports = {
  entry: {
    bundle: paths.src + '/js/views/bundle.js',
    index: paths.src + '/js/views/index.js',
  },

  output: {
    path: paths.build,
    filename: '[name].js',
  },

  plugins: [
    new CleanWebpackPlugin(),

    // HTML
    ...glob.sync('./src/views/**/*.html').map((html) => {
      const filename = path.basename(html).replace(/\.[^.]+$/, '');
      views.push(filename);
      return new HtmlWebpackPlugin({
        filename: `${filename}.html`,
        template: html,
        chunks: ['bundle', filename],
        minify: false,
      });
    }),

    // Handlebars
    ...glob.sync('./src/views/**/*.hbs').map((html) => {
      const filename = path.basename(html).replace(/\.[^.]+$/, '');
      views.push(filename);
      return new HtmlWebpackPlugin({
        filename: `${filename}.html`,
        template: html,
        chunks: ['bundle', filename],
        templateParameters: {
          title: filename,
        },
        minify: false,
      });
    }),

    // Sitemap
    (() => {
      const sitemapViews = views.map((view) => {
        if (view === 'sitemap') return false;
        return {
          name: view,
          href: `./${view}.html`,
        };
      });

      return new HtmlWebpackPlugin({
        filename: 'sitemap.html',
        template: path.join(paths.src, '/views/sitemap.hbs'),
        templateParameters: {
          title: 'sitemap',
          views: sitemapViews,
        },
        minify: false,
      });
    })(),

    // Fonts
    // new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   as(entry) {
    //     if (/\.(woff|woff2)$/.test(entry)) return 'font';
    //   },
    //   fileWhitelist: [/\.(woff|woff2)$/],
    //   include: 'allAssets',
    // }),

    // SVG
    new SpriteLoaderPlugin(),

    // Images
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 70,
          },
        },
      ],
      overrideExtension: false,
      detailedLogs: false,
      silent: false,
      strict: true,
    }),
  ],

  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
      // Handlebars
      {
        test: /\.hbs$/i,
        loader: 'handlebars-loader',
        options: {
          inlineRequires: '/img/',
          rootRelative: '../modules/',
          partialDirs: [path.join(paths.src, '/modules/')],
        },
      },
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      // Images
      {
        test: /\.(gif|png|jpe?g|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              esModule: false,
            },
          },
        ],
      },
      // SVG
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              outputPath: 'svg/',
            },
          },
        ],
        include: [path.join(paths.src, '/svg/')],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              esModule: false,
            },
          },
        ],
        include: [path.join(paths.src, '/img/svg/')],
      },
      // Fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      ...require('../aliases.config.js').webpack,
    },
  },
};
