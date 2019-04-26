const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = env => {
  const isProduction = env === "production";

  return {
    entry: "./src/client.jsx",
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js",
      publicPath: "/public/"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.jsx?$/,
          exclude: "/node_modules/"
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => autoprefixer()
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
        chunkFilename: "prod.css"
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, "public"),
      port: 9000,
      historyApiFallback: true,
      publicPath: "/dist/"
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : ""
  };
};
