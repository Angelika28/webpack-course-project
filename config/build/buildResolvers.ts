import {Configuration} from "webpack"
import {BuildOptions} from "./types/types"

export function buildResolvers(options: BuildOptions): Configuration["resolve"] {
    return {
        extensions: [".tsx", ".ts", ".js"], // расширения, которые необходимо обработать
        alias: {
            "@": options.paths.src // чтобы можно было указывать абсолютные пути в импортах через @
        },
    }
}
