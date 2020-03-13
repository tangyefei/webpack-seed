const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRoot = process.cwd();

function setMPA() {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, 'src/*/index.js'));



  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/\/src\/(.*)\/index.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;

    console.log(pageName)

    return htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }));
  });
  return { entry, htmlWebpackPlugins };
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry: entry,
  module: {
    rules: [{
      // , 'eslint-loader'
      test: /\.js$/, use: ['babel-loader'],
    }, {
      test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
    }, {
      test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'],
    }, {
      test: /\.(png|jpe?g|gif)$/i, loader: 'file-loader',
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/, loader: 'file-loader',
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    autoprefixer,
    function done() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('-watch')) {
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  devtool: 'source-map',
};
