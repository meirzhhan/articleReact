import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins({
  paths,
  isDev,
  apiUrl,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
    }),
    new CopyPlugin({
      patterns: [{ from: paths.locales, to: paths.buildLocales }],
    }),
  ];

  if (isDev) {
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        // http://127.0.0.1:8888/
      }),
    );
  }

  // plugins.push(
  //   new BundleAnalyzerPlugin({
  //     openAnalyzer: true,
  //     // http://127.0.0.1:8888/
  //   }),
  // );
  return plugins;
}
