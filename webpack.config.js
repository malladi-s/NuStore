const { resolve } = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env, argv) => {
  let production = argv.mode === "production";

  const webpackConfig = {
    context: resolve(__dirname, "client"),
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
    plugins: [],
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
        }
      ]
    }
  };

  if (production) {
    webpackConfig.plugins.push(
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
        minRatio: 0.8
      })
    );
  }

  return webpackConfig;
};
