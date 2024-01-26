import classes from "./App.module.scss"
import React, {useState} from "react"
import {Link, Outlet} from "react-router-dom"
import seaPng from "@/assets/sea.png"
import sea2Jpg from "@/assets/sea2.jpg"
import Hours24 from "@/assets/24-hours.svg"

// TREE SHAKING

function todo1(a: number) {  // эта функция не попадет в бандл, т.к. нигде не используется в коде
    console.log(a)
}

function todo2() {
    todo3()
}

function todo3() {
    throw new Error()
}

export const App = () => {
    const [count, setCount] = useState(0)
    const increment = () => {
        //setCount(prev => prev + 1)
        todo2()
    }

    // todo1(7)
    //
    // if (__PLATFORM__ === "mobile") {
    //     return (
    //         <div>Mobile Platform</div>
    //     )
    // }
    //
    // if (__PLATFORM__ === "desktop") {
    //     return (
    //         <div>Desktop Platform</div>
    //     )
    // }
    //
    //
    // //пример использования другой глобальной переменной
    // if (__ENV__ === "production") {
    //     // сделай что-то
    // }

    return (
        <div data-testid={"App"}>
            <h1 data-testid={"Platform"}>PLATFORM={__PLATFORM__}</h1>
            <div>
                <img width={100} height={100} src={seaPng}/>
                <img width={100} height={100} src={sea2Jpg}/>
            </div>
            <div>
                <Hours24 color={"green"} width={50} height={50}/>
            </div>
            <Link to={"/about"}>about</Link>
            <br/>
            <Link to={"/shop"}>shop</Link>
            <h1 className={classes.value}>{count}</h1>
            <button
                className={classes.button}
                onClick={increment}
            >
                inc
            </button>
            <Outlet/>
        </div>
    );
};

