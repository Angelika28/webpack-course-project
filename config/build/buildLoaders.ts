import {ModuleOptions} from "webpack"
import {getCustomTransformers} from "ts-loader/dist/instances"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ReactRefreshTypeScript from "react-refresh-typescript"
import {BuildOptions} from "./types/types"
import {buildBabelLoader} from "./babel/buildBabelLoader"

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === "development"

    const assetLoader = { // для загрузки изображений
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: "@svgr/webpack",
                options: {
                    icon: true, // чтобы можно было менять размер svg (в моем случае - иконка 24ч)
                    svgoConfig: {
                        plugins: [
                            {
                                name: "convertColors",
                                params: {
                                    currentColor: true // плагин, который позволяет поменять цвет svg (не инлайново, а через классы. Но почему-то не заработало)
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[path][name]__[local]" : "[hash.base64:8]"
            },
        }
    }
    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    // const tsLoader = {
    //     // ts-loader умеет работать с JSX. Если бы его не было(т.е. не использовали ts), то нужен бы был babel-loader(ниже его и установили)
    //     test: /\.tsx?$/, // обработка ts и tsx файлов
    //     exclude: /node_modules/, // название папки, что не обрабатывается
    //     use: [
    //         {
    //             loader: "ts-loader",
    //             options: {
    //                 transpileOnly: true, // этот флаг нужен, чтобы выводить и подсвечивать тайпскриптовые ошибки
    //                 getCustomTransformers: () => ({
    //                     before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
    //                 })
    //             }
    //         }
    //     ]
    // }


    const babelLoader = buildBabelLoader(options)

    return [
        // порядок правил имеет значение!
        assetLoader,
        scssLoader,
        // tsLoader,
        svgrLoader,
        babelLoader,
    ]
}
