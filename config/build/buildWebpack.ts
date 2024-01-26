import webpack from "webpack"
import {buildDevServer} from "./buildDevServer"
import {buildLoaders} from "./buildLoaders"
import {buildPlugins} from "./buildPlugins"
import {buildResolvers} from "./buildResolvers"
import {BuildOptions} from "./types/types"


export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options
    const isDev = mode === "development"

    return {
        mode: mode ?? "development", // может быть прод или дев сборка, по умолчанию дев
        entry: paths.entry, // путь к основному файлу приложения
        output: {
            path: paths.output, // путь к папке, где лежит билд
            filename: '[name].[contenthash].js', // название билда будет меняться, если поменяется содержимое проекта(контент), а затем снова запустится билд
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? "inline-source-map" : "source-map", // карта исходного кода, которая помогает понять нам в каком виде был написан исходный код, чтобы отследить ошибки
        devServer: isDev ? buildDevServer(options) : undefined,// прерыдущая и эта настрйки будут работать только в режиме разработки, а в проде - нет, чтобы не захламлять код

    }
}
