import webpack, {Configuration, DefinePlugin} from "webpack"
import path from "path"
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import {BuildOptions} from "./types/types"

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
    const {mode, paths, analyzer, platform} = options
    const isDev = mode === "development"
    const isProd = mode === "production"

    const plugins: Configuration["plugins"] = [
        new HtmlWebpackPlugin({template: paths.html, favicon: path.resolve(paths.public, "favicon.ico")}),
        new DefinePlugin({ // подменяет глобальные переменные, которые используем в коде, на те значения, что задаются при сборке
            __PLATFORM__: JSON.stringify(platform) // переменные сборки лучше задавать капсом, чтобы не потерять
        }),
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin()) // этот плагин показывает в терминале, какой процент сборки вебпака уже прошел
        plugins.push(new ForkTsCheckerWebpackPlugin()) // благодаря этому плагину сборка замедляться не будет, плюс типы будут проверяться в реал тайм, но сама сборка соберется
        plugins.push(new ReactRefreshWebpackPlugin()) // помогает обновлять данные, не перегружая страницу
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        }))
        plugins.push(new CopyPlugin({  // плагин помогает скопировать данные из папки lang в build
            patterns: [
                { from: path.resolve(paths.public, "lang"), to: path.resolve(paths.output, "lang") },
            ],
        }))
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin()) // этот плагин позволяет в браузере посмотреть граф зависимостей приложения, что сколько весит. Для этого в терминале надо передать переменную analyzer, то есть запустить npm run build: prod -- -- env analyzer=true
    }
    return plugins
}
