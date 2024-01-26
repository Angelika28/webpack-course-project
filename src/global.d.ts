declare module "*.module.scss" {
    interface IClassNames {
        [className: string]: string
    }

    const classNames: IClassNames
    export = classNames
}

declare module "*.png"
declare module "*.jpeg"
declare module "*.jpg"
declare module "*.svg" { // чтобы всплывали подсказки с возможными пропсами у svg
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __PLATFORM__ : "mobile" | "desktop" // декларируем константу, чтобы ее потом можно было использовать в коде
declare const __ENV__ : "production" | "development" // можно задать доп переменные, например, такую, чтобы потом использовать ее в качестве флага сборки
