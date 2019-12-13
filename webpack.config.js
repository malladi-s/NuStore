const { resolve } = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  let production = argv.mode === "production";

  const webpackConfig = {
    context: resolve(__dirname, "src"),
    entry: {
      app: ["@babel/polyfill", "./index.jsx"]
    },
    output: {
      filename: "[name].bundle.js",
      path: resolve(__dirname, "public/dist")
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    optimization: {
      namedModules: true,
      splitChunks: {
        name: "vendor",
        minChunks: 2
      },
      noEmitOnErrors: true,
      concatenateModules: true
    },
    plugins: [new Dotenv()],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|public\/)/,
          loader: "babel-loader"
        },
        {
          test: /\.(jpg|eot|gif|otf|png|svg|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: "file-loader"
        }
      ]
    }
  };

  if (!production) {
    webpackConfig.devtool = "cheap-module-eval-source-map";
  }

  if (production) {
    webpackConfig.plugins.push(
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.jpg$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
        minRatio: 0.8
      })
    );
  }

  return webpackConfig;
};
