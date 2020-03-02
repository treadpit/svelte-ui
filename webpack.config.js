const path = require("path");
const webpack = require("webpack");
// const TerserJSPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

const config = {
  mode,
  devtool: prod ? false : "source-map",
  entry: {
    bundle: ["./src/main.js"]
  },
  output: {
    path: __dirname + "/dist",
    filename: prod ? "js/[name].[chunkhash:8].js" : "[name].js",
    chunkFilename: prod ? "js/[name].[chunkhash:8].js" : "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: prod ? MiniCssExtractPlugin.loader : "style-loader",
            options: {
              // publicPath: '',
              hmr: !prod // 仅dev环境启用HMR功能
            }
          },
          "css-loader",
          "resolve-url-loader",
          "sass-loader?sourceMap"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "images/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 3000, // size <= 3000B, 改成5000B试试?
              publicPath: "fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: prod ? "css/[name].[hash].css" : "css/[name].css",
      chunkFilename: prod ? "css/[id].[hash].css" : "css/[id].css"
    }),
    new HtmlWebpackPlugin({
      mode,
      platform: "default",
      filename: "index.html",
      template: "src/index.ejs"
    })
  ],
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  optimization: {
    moduleIds: "named"
  }
};

if (prod) {
  config.optimization = {
    // minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    moduleIds: "hashed",
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial"
        }
        // styles: {
        //     name: 'styles',
        //     test: /\.css$/,
        //     chunks: 'all',
        //     enforce: true
        // }
      }
    }
  };
  const seen = new Set();
  const nameLength = 4;
  config.plugins.push(
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      const modules = Array.from(chunk.modulesIterable);
      if (modules.length > 1) {
        const hash = require("hash-sum");
        const joinedHash = hash(modules.map(m => m.id).join("_"));
        let len = nameLength;
        while (seen.has(joinedHash.substr(0, len))) len++;
        seen.add(joinedHash.substr(0, len));
        return `chunk-${joinedHash.substr(0, len)}`;
      } else {
        return modules[0].id;
      }
    })
  );
}

module.exports = config;
