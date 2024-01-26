import {BuildOptions} from "../types/types"
import {removeDataTestIdBabelPlugin} from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader(options: BuildOptions) {
    const {mode} = options
    const isDev = mode === "development"
    const isProd = mode === "production"

    const plugins = []

    if(isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin(), // этот плагин используется, чтогбы удалить какие-то атрибуты из дерева. Например, дебаг айдишники или тест айдишники
            {
                props: ["data-testid"] // передаем тот атрибут, который хотим удалить
            }
        ])
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    [ "@babel/preset-react",
                        {
                            runtime: isDev ? "automatic" : "classic",
                        }
                    ]
                ],
                plugins: plugins.length ? plugins : undefined
            }
        }
    }
}
